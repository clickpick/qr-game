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