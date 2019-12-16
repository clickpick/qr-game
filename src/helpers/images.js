export function userPicPrepare(url, callback) {
    const img = new Image();
    const canvas = document.createElement('canvas');

    img.onload = () => {
        const width = img.naturalWidth || img.width;
        const height = img.naturalHeight || img.height;
        const vmin = Math.min(width, height);

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');

        const radius = vmin / 2;

        ctx.beginPath();
        ctx.arc(radius, radius, radius, 0, Math.PI * 2, true);
        ctx.clip();

        ctx.drawImage(img, 0, 0);

        callback(canvas.toDataURL());
    };

    img.crossOrigin = 'Anonymous';
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

export function svgToPng(svgText, margin, fill) {
    return new Promise(function (resolve, reject) {
        try {
            var domUrl = window.URL || window.webkitURL || window;
            if (!domUrl) {
                throw new Error("(browser doesnt support this)")
            }

            var height = 256;
            var width = 256;
            margin = margin || 0;

            var canvas = document.createElement("canvas");
            canvas.width = height + margin * 2;
            canvas.height = width + margin * 2;
            var ctx = canvas.getContext("2d");


            var svg = new Blob([svgText], {
                type: "image/svg+xml;charset=utf-8"
            });

            var url = domUrl.createObjectURL(svg);

            var img = new Image();

            img.onload = function () {
                
                ctx.drawImage(this, margin, margin);

                if (fill) {
                    var styled = document.createElement("canvas");
                    styled.width = canvas.width;
                    styled.height = canvas.height;
                    var styledCtx = styled.getContext("2d");
                    styledCtx.save();
                    styledCtx.fillStyle = fill;
                    styledCtx.fillRect(0, 0, canvas.width, canvas.height);
                    styledCtx.strokeRect(0, 0, canvas.width, canvas.height);
                    styledCtx.restore();
                    styledCtx.drawImage(canvas, 0, 0);
                    canvas = styled;
                }
                domUrl.revokeObjectURL(url);
                console.log(canvas.toDataURL());
                
                resolve(canvas.toDataURL());
            };

            // load the image
            img.src = url;

        } catch (err) {
            reject('failed to convert svg to png ' + err);
        }
    });
};

export function getBlob(svg) {
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    return blob;
}

export function dataURLtoFile(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
}