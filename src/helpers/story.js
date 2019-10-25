import { APP_ID, APP_LINK, USE_API_VERSION } from 'constants/vk';
import * as constants from "constants/story";
import { shareStory as upload } from "api";

const load = (src, width, height) => new Promise((resolve, reject) => {
    const img = new Image(width, height);
    img.onload = () => {
        resolve(img);
    };
    img.onerror = () => {
        reject(`Can't load img: ${img.scr}`);
    };
    img.src = src;
});

const draw = (template, img) => new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    canvas.width = constants.SIZES.background.width;
    canvas.height = constants.SIZES.background.height;

    const ctx = canvas.getContext("2d");

    return Promise.all([
        load(template, constants.SIZES.background.width, constants.SIZES.background.height),
        load(img, constants.SIZES.foreground.width, constants.SIZES.foreground.height)
    ]).then(([background, foreground]) => {
        ctx.drawImage(background, constants.SIZES.background.x, constants.SIZES.background.y);
        ctx.drawImage(foreground,
            constants.SIZES.foreground.x, constants.SIZES.foreground.y,
            constants.SIZES.foreground.width, constants.SIZES.foreground.height);
        resolve(canvas.toDataURL());
    }).catch((error) => {
        reject(error);
    });
});

const shareStory = (connect, qrcode, reply, link = APP_LINK) => new Promise((resolve, reject) => {
    return connect.sendPromise("VKWebAppGetAuthToken", { app_id: APP_ID, scope: "stories" })
        .then((response) => {
            const { access_token } = response;

            const params = {
                access_token,
                add_to_news: "1",
                link_text: "open",
                link_url: link,
                v: USE_API_VERSION
            };

            if (reply) {
                params.reply = reply;
            }

            connect.sendPromise("VKWebAppCallAPIMethod", {
                method: "stories.getPhotoUploadServer",
                params
            }).then((response) => {
                const { upload_url } = response.response;

                return draw(constants.TEMPLATE_URL, qrcode)
                    .then((story) => {
                        upload(upload_url, story)
                            .then(() => resolve(response.response.upload_url))
                            .catch((chain) => reject({ error_code: 3, error_text: "Can't upload story", error_chain: chain }));
                    });
            }).catch((chain) => reject({ error_code: 2, error_text: "Can't get upload url", error_chain: chain }));
        }).catch((chain) => reject({ error_code: 1, error_text: "Can't get access_token", error_chain: chain }));
});

export { draw, shareStory };
