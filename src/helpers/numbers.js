const polyfill = (n) => {
    let int = '';
    // eslint-disable-next-line
    if (typeof n === 'number' && n === n) {
        int += Math.floor(n * 100) / 100;
    } else {
        int += parseFloat(n);
    }
    if (int === 'NaN') {
        return 0;
    }
    let dot = int.lastIndexOf('.');
    let result = '';
    for (let i = (dot > 0 ? dot : int.length), c = 0; i--; ++c) {
        if (c % 3 === 0) {
            result = ' ' + result;
        }
        result = int[i] + result;
    }
    return result.slice(0, -1) + (dot > 0 ? (+int).toFixed(2).slice(dot) : '');
};

const format = (() => {
    if (window.Intl && typeof window.Intl.NumberFormat === 'function') {
        const provider = new Intl.NumberFormat('ru-RU');
        if (provider && typeof provider.format === 'function') {
            return (n) => provider.format(n);
        }
    }

    return polyfill;
})();

export const stringToNumber = (str) => {
    return str ? parseFloat(str.replace(/(\s)|(₽)|(,)/g, '')) || 0 : 0;
};

export const getCutNumber = (a, b, postfix = '') => {
    const value = (a / b).toFixed(1);

    if (value.substr(value.length - 1, 1) === '0') {
        return `${Number(value).toFixed(0)}${postfix}`;
    }

    return `${value}${postfix}`;
};

export { format as numberToString, format as gaps };
