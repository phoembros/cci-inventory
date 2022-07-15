import { TelegramClient } from 'messaging-api-telegram';

// get accessToken from telegram [@BotFather](https://telegram.me/BotFather)
export const client = new TelegramClient({
    accessToken: '5514126172:AAGQgCbcUFxvFz88u65jp3NHkSon0ZB4CDg',
    onRequest: ({ method, url, headers, body }) => {
        /* */
        headers['Content-Type'] = 'multipart/form-data'
    },
});


export const sendMessage = async ({content}) => {

    try {
        // id chat -1001577534545
        const response = await client.sendMessage(-1001737199873, content, {
            parse_mode: 'HTML',
            allow_sending_without_reply: true,
        });

        console.log("response:", response);
    } catch (error) {
        console.log("error:", error);
    }
}
