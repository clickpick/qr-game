import React, { useState, useEffect, useRef } from 'react';
import { string, oneOf, arrayOf, shape, bool, func } from 'prop-types';
import classNames from 'classnames';

import './Dialog.css';

import Loader from 'components/Loader';
import Button from 'components/Button';

import { ReactComponent as IconArrowDown } from 'svg/arrow-down.svg';

import success from 'images/success.png';
import info from 'images/info.png';
import error from 'images/error.png';
import rules from 'images/rules.png';
import leopard from 'images/leopard.png';
import connect from 'images/connect.png';
import cheat from 'images/cheat.png';

const images = {
    success,
    info,
    error,
    rules,
    leopard,
    connect,
    cheat
};

const Dialog = ({ className, visible, animationType, type, imageType, title, message, children, actions }) => {
    const rootRef = useRef();
    const [showFooter, setShowFooter] = useState(false);

    useEffect(() => {        
        if (visible) {
            if (rootRef && rootRef.current) {
                rootRef.current.scrollTop = 0;
                const { scrollHeight, offsetHeight } = rootRef.current;
                
                setShowFooter(scrollHeight > offsetHeight);
            }
        }
    }, [visible, rootRef]);
    

    function handleScroll(e) {
        const scrolledHeight = e.target.scrollTop + e.target.offsetHeight + 30;

        setShowFooter(scrolledHeight < e.target.scrollHeight);
    }
    
    function handleClick(e) {
        e.stopPropagation();
    }

    function getImage() {
        switch (imageType) {
            case 'loading':
                return <div className="Dialog__status"><Loader className="Dialog__loader" /></div>
            case 'success': case 'info': case 'error': case 'rules': case 'leopard': case 'connect': case 'cheat':
                return <div className="Dialog__status"><img className="Dialog__image" src={images[imageType]} alt="" /></div>;
            default:
                return null;
        }
    }

    function renderAction(action, index) {
        return <Button
            key={index}
            className="Dialog__action"
            theme={action.theme}
            size="medium"
            children={action.title}
            full={action.full}
            onClick={action.action}
            disabled={action.disabled} />;
    }

    return (
        <div
            className={classNames(
                className,
                'Dialog',
                `Dialog--${type}`,
                `Dialog--slide-down-${animationType}`
            )}
            onClick={handleClick}
            onScroll={handleScroll}
            ref={rootRef}>
            {getImage()}
            <h3 className="Dialog__title" children={title} />
            {message && <p className="Dialog__message" dangerouslySetInnerHTML={{ __html: message }} />}
            {children}

            {(Array.isArray(actions) && actions.length > 0) &&
                <div className="Dialog__actions" children={actions.map(renderAction)} />}
            
            <footer className={classNames('Dialog__footer', { 'Dialog__footer--show': showFooter })}>
                <IconArrowDown />
            </footer>
        </div>
    );
};

Dialog.propTypes = {
    className: string,
    visible: bool,
    animationType: oneOf(['enter', 'leave']).isRequired,
    type: oneOf(['info', 'success', 'danger']),
    imageType: oneOf(['loading', 'success', 'error', 'rules', 'info', 'leopard', 'connect', 'cheat']),
    title: string.isRequired,
    message: string,
    actions: arrayOf(shape({
        theme: oneOf(['primary', 'secondary', 'info']),
        title: string,
        action: func,
        full: bool
    }))
};

Dialog.defaultProps = {
    type: 'info',
};

export default Dialog;