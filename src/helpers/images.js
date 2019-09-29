export function toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

export function svgToBase64(svg) {
    return `data:image/svg+xml;base64,${btoa(new XMLSerializer().serializeToString(svg))}`
}

export function svgPrepare(svg) {
    const clone = svg.cloneNode(true);

    clone.removeAttribute('width');
    clone.removeAttribute('height');

    return clone;
}
