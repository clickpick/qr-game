import * as constants from "constants/story";
import { shareStory as upload } from "api";

const load = (src) => new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
        resolve(img);
    };
    img.src = src;
});

const draw = (template, img, x, y) => new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1920;

    const ctx = canvas.getContext("2d");

    return Promise.all([
        load(template),
        load(img)
    ]).then(([background, foreground]) => {
        ctx.drawImage(background, 0, 0);
        ctx.drawImage(foreground, x, y);
        resolve(canvas.toDataURL());
    });
});

const shareStory = (connect, qrcode, reply) => new Promise((resolve, reject) => {
    connect.sendPromise("VKWebAppGetAuthToken", { app_id: constants.APP_ID, scope: "stories" })
        .then((response) => {
            console.log("response", response);

            const { access_token } = response.data;

            console.log("access_token", access_token);

            const params = {
                access_token,
                add_to_news: "1",
                link_text: "open",
                link_url: `https://vk.com/app${constants.APP_ID}`,
                v: constants.USE_API_VERSION
            };

            if (reply) {
                params.reply = reply;
            }

            console.log("params", params);

            connect.sendPromise("VKWebAppCallAPIMethod", {
                method: "stories.getPhotoUploadServer",
                params
            }).then((response) => {
                console.log("upload response", response);

                const { upload_url } = response.data.response;

                console.log("upload_url", upload_url);

                return draw(constants.TEMPLATE_URL, qrcode, constants.COORDINATES.x, constants.COORDINATES.y)
                    .then((story) => {
                        upload(upload_url, story)
                            .then(() => resolve(response.response.story))
                            .catch(() => reject({ error_code: 3, error_text: "Can't upload story" }))
                    });
            }).catch(() => reject({ error_code: 2, error_text: "Can't get upload url" }))
        }).catch(() => reject({ error_code: 1, error_text: "Can't get access_token" }))
});

export { shareStory };
