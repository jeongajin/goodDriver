const fetch = require('node-fetch');

let yoloResults = [];
let expoPushToken = ''; // 저장된 푸시 토큰 (사용자마다 다름)

exports.handler = async function(event, context) {
    if (event.httpMethod === "POST") {
        const data = JSON.parse(event.body);

        // YOLO 데이터를 처리하는 로직
        console.log("Received YOLO data:", data);
        yoloResults = data.detections;

        // 예시: 특정 조건을 만족하면 푸시 알림 전송
        if (yoloResults.length > 0) {
            await sendPushNotification(expoPushToken, yoloResults);
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Data received and processed successfully" })
        };
    } else if (event.httpMethod === "GET") {
        return {
            statusCode: 200,
            body: JSON.stringify(yoloResults)
        };
    } else {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: "Method Not Allowed" })
        };
    }
};

// 푸시 알림을 전송하는 함수
async function sendPushNotification(token, data) {
    const message = {
        to: token,
        sound: 'default',
        title: 'YOLO Detection',
        body: `Detected ${data.length} objects`,
        data: { data },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}
