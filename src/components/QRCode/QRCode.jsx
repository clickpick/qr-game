import React, { useState, useEffect } from 'react';
import { string, oneOfType, node } from 'prop-types';
import classNames from 'classnames';

import vkQr from '@vkontakte/vk-qr';
import { toDataURL } from 'helpers';

import './QRCode.css';

const QRCode = React.forwardRef(({ className, userPic, token, foregroundColor, loader }, ref) => {
    const [qrSvg, setQrSvg] = useState('');

    useEffect(() => {        
        if (userPic) {
            toDataURL(userPic, (logoData) => setQrSvg(
                vkQr.createQR(`https://vk.com/app7150862#token=${token}`, {
                    qrSize: 262,
                    isShowLogo: true,
                    logoData,
                    foregroundColor,
                })
            ));
        } else {
            setQrSvg(
                vkQr.createQR(`https://vk.com/app7150862#token=${token}`, {
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