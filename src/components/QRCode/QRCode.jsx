import React, { useState, useEffect } from 'react';
import { string, oneOfType, node } from 'prop-types';
import classNames from 'classnames';

import vkQr from '@vkontakte/vk-qr';
import { APP_LINK } from 'constants/vk';
import { userPicPrepare } from 'helpers';

import './QRCode.css';

const QRCode = React.forwardRef(({ className, userPic, token, foregroundColor, loader }, ref) => {
    const [qrSvg, setQrSvg] = useState('');

    useEffect(() => {
        if (userPic && userPic.indexOf('https://vk.com/images/camera_200.png') === -1) {
            userPicPrepare(userPic, (logoData) => setQrSvg(
                vkQr.createQR(`${APP_LINK}#token=${token}`, {
                    qrSize: 262,
                    isShowLogo: true,
                    logoData,
                    foregroundColor,
                })
            ));
        } else {
            setQrSvg(
                vkQr.createQR(`${APP_LINK}#token=${token}`, {
                    qrSize: 262,
                    isShowLogo: false,
                    foregroundColor,
                })
            );
        }
    }, [userPic, token, foregroundColor]);

    className = classNames(className, 'QRCode');

    return (qrSvg)
        ? <div className={className} ref={ref} dangerouslySetInnerHTML={{ __html: qrSvg }} />
        : <div className={className} children={loader} />;
});

QRCode.propTypes = {
    className: string,
    userPic: string,
    token: string,
    foregroundColor: string,
    loader: oneOfType([string, node]),
};

QRCode.defaultProps = {
    foregroundColor: '#327CF6',
    loader: 'Загрузка...'
};

export default QRCode;