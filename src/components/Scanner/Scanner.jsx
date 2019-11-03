import React, { useRef, useState, useCallback } from 'react';
import { func } from 'prop-types';

import './Scanner.css';

import jsQR from 'jsqr';

import { debounce } from 'helpers';

import useMount from 'hooks/use-mount';
import useUnmount from 'hooks/use-unmount';

const statuses = {
    wait: 'Ждём твое разрешение',
    connect: 'Подключаемся...',
    nocam: 'Мы не нашли твою камеру. Она у тебя вообще есть?',
    nopermission: 'Ты не дал доступ к камере',
    nosupport: 'Упс! Похоже система дала сбой'
};

const Scanner = ({ onScanned }) => {
    const video = document.createElement('video');
    const canvasRef = useRef();

    const [status, setStatus] = useState(statuses.wait);

    const getResult = debounce((code) => {
        if (onScanned) {
            onScanned(code);
        }
    }, 3000);

    const stop = useCallback(() => {
        if (video) {
            let stream = video.srcObject;

            if (stream) {
                let tracks = stream.getTracks();

                tracks.forEach(function (track) {
                    track.stop();
                });

                video.srcObject = null;
            }
        }
    }, [video]);

    const tick = useCallback(() => {
        if (canvasRef.current) {
            const canvasElement = canvasRef.current;
            const canvas = canvasElement.getContext('2d');

            function drawLine(begin, end, color) {
                canvas.beginPath();
                canvas.moveTo(begin.x, begin.y);
                canvas.lineTo(end.x, end.y);
                canvas.lineWidth = 4;
                canvas.strokeStyle = color;
                canvas.stroke();
            }

            if (video.readyState === video.HAVE_ENOUGH_DATA) {
                canvasElement.hidden = false;
                canvasElement.height = 262;
                canvasElement.width = 262;

                canvas.drawImage(video, 0, 0, 262, 262, video.width / 1.5, video.height / 1.5, 262, 262);
                const imageData = canvas.getImageData(0, 0, 262, 262);
                const code = jsQR(imageData.data, imageData.width, imageData.height, {
                    inversionAttempts: 'dontInvert',
                });

                if (code) {
                    drawLine(code.location.topLeftCorner, code.location.topRightCorner, '#FF3B58');
                    drawLine(code.location.topRightCorner, code.location.bottomRightCorner, '#FF3B58');
                    drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, '#FF3B58');
                    drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, '#FF3B58');

                    getResult(code.data);
                }
            }

            requestAnimationFrame(tick);
        }
    }, [getResult, video]);

    const start = useCallback(async () => {
        try {
            const { mediaDevices } = navigator;

            if (!mediaDevices) {
                setStatus(statuses.nosupport);
                return;
            }

            const getDevices = mediaDevices.enumerateDevices;

            if (!getDevices) {
                setStatus(statuses.nosupport);
                return;
            }

            const available = (await getDevices.call(mediaDevices)).some((device) => {
                return device.kind === 'videoinput';
            });

            if (!available) {
                setStatus(statuses.nocam);
                return;
            }

            const getMedia = mediaDevices.getUserMedia || mediaDevices.webkitGetUserMedia;

            if (!getMedia) {
                setStatus(statuses.nosupport);
                return;
            }

            const stream = await getMedia.call(mediaDevices, { video: { facingMode: 'environment' } });
            setStatus(statuses.connect);

            if ('srcObject' in video) {
                video.srcObject = stream;
            } else {
                video.src = URL.createObjectURL(stream);
            }

            video.setAttribute('playsinline', true);
            video.onloadedmetadata = () => {
                video.play();
                requestAnimationFrame(tick);
            };
        } catch (e) {
            if (e.name === 'NotAllowedError') {
                setStatus(statuses.nopermission);
                return;
            }

            if (e.name === 'NotFoundError' || e.name === 'NotReadableError') {
                setStatus(statuses.nocam);
                return;
            }

            setStatus(statuses.nosupport);
        }
    }, [tick, video]);

    useMount(start);
    useUnmount(stop);

    return (
        <div className="Scanner">
            <p className="Scanner__status" children={status} onClick={start} />
            <canvas className="Scanner__camera" id="canvas" ref={canvasRef} hidden />
        </div>
    );
};

Scanner.propTypes = {
    onScanned: func
};

export default Scanner;