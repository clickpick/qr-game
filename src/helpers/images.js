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

export function userPicPrepare(url, callback) {
    const img = new Image();
    const canvas = document.createElement("canvas");

    img.onload = () => {
        const width = img.naturalWidth || img.width;
        const height = img.naturalHeight || img.height;
        const vmin = Math.min(width, height);

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");

        const radius = vmin / 2;

        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2, true);
        ctx.clip();

        ctx.drawImage(img, 0, 0);

        callback(canvas.toDataURL());
    };

    img.src = url;
}

export function svgToBase64(svg) {
    return `data:image/svg+xml;base64,${btoa(new XMLSerializer().serializeToString(svg))}`
}

export function svgPrepare(svg) {
    const clone = svg.cloneNode(true);

    clone.setAttribute('width', '100%');
    clone.setAttribute('height', '100%');

    return clone;
}
