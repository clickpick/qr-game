import React from 'react';
import { arrayOf, shape, string, number } from 'prop-types';
import classNames from 'classnames';

import { CIPHER_LENGTH } from 'constants/cipher';

import './Cipher.css';

const findSymbolCallback = function(symbol) {
    return symbol.order === this;
};

const Cipher = ({ className, activatedKeys }) => {
    const encryptedSymbol = '*';
    const symbols = (new Array(CIPHER_LENGTH)).fill(1).map((_, order) => {
        const symbol = activatedKeys.find(findSymbolCallback, order);
        if (symbol) {
            return symbol;
        }

        return { value: encryptedSymbol, order };
    });

    const renderSymbol = (symbol) =>
        <span
            key={symbol.order}
            className={classNames('Cipher__symbol', { 'Cipher__symbol--disabled': symbol.value === encryptedSymbol })}
            children={symbol.value} />

    return <div
        className={classNames(className, 'Cipher')}
        children={symbols.map(renderSymbol)} />;
};

Cipher.propTypes = {
    className: string,
    activatedKeys: arrayOf(shape({
        value: string.isRequired,
        order: number.isRequired,
    }))
};

export default Cipher;