import React, { useState, useEffect, useRef, useCallback } from 'react';
import { string, oneOf, arrayOf, shape, bool, func } from 'prop-types';
import classNames from 'classnames';

import './Dialog.css';

import Loader from 'components/Loader';
import Button from 'components/Button';

import { useSwipeable, UP, DOWN } from 'react-swipeable';
import useLockBody from 'hooks/use-lock-body';

import { ReactComponent as IconArrowDown } from 'svg/arrow-down.svg';

import success from 'images/success.png';
import info from 'images/info.png';
import error from 'images/error.png';
import rules from 'images/rules.png';
import leopard from 'images/leopard.png';
import connect from 'images/connect.png';
import cheat from 'images/cheat.png';
import prize from 'images/prize.png';

const images = {
    success,
    info,
    error,
    rules,
    leopard,
    connect,
    cheat,
    prize
};

const Dialog = ({ className, isHeaderPadding, disabled, onClose, animationType, type, imageType, title, message, children, actions }) => {
    useLockBody(true);

    const wrapperRef = useRef();
    const [showFooter, setShowFooter] = useState(false);

    const [top, setTop] = useState(0);
    const [hasScroll, setHasScroll] = useState(false);
    const [scrolling, setScrolling] = useState(false);
    const [dragging, setDragging] = useState(false);

    const initialWrapper = useCallback(() => {
        if (wrapperRef && wrapperRef.current) {
            const { scrollHeight, offsetHeight } = wrapperRef.current;

            setShowFooter(scrollHeight > offsetHeight + 20);
            setHasScroll(scrollHeight > offsetHeight);
        }
    }, [wrapperRef]);

    useEffect(() => {
        initialWrapper();

        window.addEventListener('resize', initialWrapper);

        return () => {
            window.removeEventListener('resize', initialWrapper);
        };
    }, [initialWrapper]);

    function handleSwiping({ deltaY, event, dir }) {
        if (disabled) {
            return;
        }

        const target = event.target;
        const wrapper = wrapperRef.current;

        if (target && wrapper) {
            const scrolled = wrapper.scrollTop === wrapper.scrollHeight - wrapper.offsetHeight;
            const scrollTop = dir === UP;
            const scrollDown = dir === DOWN;

            if (hasScroll && !target.classList.contains('Dialog__footer')) {
                setScrolling(true);

                if (scrollTop) {
                    // eslint-disable-next-line no-mixed-operators
                    if (!scrolled || scrolling && !dragging) {
                        return;
                    }
                    
                    setScrolling(false);
                }

                if (scrollDown) {
                    // eslint-disable-next-line no-mixed-operators
                    if (scrolled || scrolling && !dragging) {
                        return;
                    }
                }
            }
        }

        if (!scrolling) {
            event.preventDefault();

            if (!dragging) {
                setDragging(true);
            }

            if (deltaY > 0) {
                setTop(deltaY * (-1));
            }
        }
    }

    function handleSwipedUp() {
        if (scrolling) {
            setScrolling(false);
        }

        if (dragging) {
            setDragging(false);

            if (top < -50) {
                onClose();

                return;
            }

            const timerId = setInterval(() => {
                setTop((top) => {
                    if (top >= 0) {
                        clearInterval(timerId);
                        return 0;
                    }

                    return top + 1;
                });
            }, 1);
        }
    }

    const handlers = useSwipeable({
        onSwiping: handleSwiping,
        onSwipedUp: handleSwipedUp,
        preventDefaultTouchmoveEvent: false,
        trackMouse: true
    });

    function handleScroll(e) {
        const scrolledHeight = e.target.scrollTop + e.target.offsetHeight + 20;

        setShowFooter(scrolledHeight < e.target.scrollHeight);
    }
    
    function handleClick(e) {
        e.stopPropagation();
    }

    function getImage() {
        if (imageType === undefined) {
            return null;
        }

        if (imageType === 'loading') {
            return <div className="Dialog__status"><Loader className="Dialog__loader" /></div>;
        }
        
        return <div className="Dialog__status"><img className="Dialog__image" src={images[imageType]} alt="" /></div>;
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
                { 'Dialog--header-padding': isHeaderPadding },
                `Dialog--${type}`,
                `Dialog--slide-down-${animationType}`
            )}
            onClick={handleClick}
            {...handlers}
            style={{ top: `${top}px` }}>
            <div className="Dialog__wrapper" ref={wrapperRef} onScroll={handleScroll}>
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
        </div>
    );
};

Dialog.propTypes = {
    className: string,
    isHeaderPadding: bool,
    animationType: oneOf(['enter', 'leave']).isRequired,
    type: oneOf(['info', 'success', 'danger']),
    imageType: oneOf(['loading', 'success', 'error', 'rules', 'info', 'leopard', 'connect', 'cheat', 'prize']),
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
    isHeaderPadding: true,
};

export default Dialog;