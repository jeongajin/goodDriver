const fetch = require('node-fetch');

let yoloResults = [];

exports.handler = async function(event, context) {
    if (event.httpMethod === "POST") {
        const data = JSON.parse(event.body);

        // YOLO 데이터를 처리하는 로직
        console.log("Received YOLO data:", data);
        yoloResults = data.detections;

        // TTS로 읽어주는 함수 호출
        if (yoloResults.length > 0) {
            readTTS(yoloResults);
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

// TTS로 YOLO 데이터를 읽어주는 함수
function readTTS(detections) {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
        const message = `Detected objects are: ${detections.join(', ')}`;
        const utterance = new SpeechSynthesisUtterance(message);
        window.speechSynthesis.speak(utterance);
    } else {
        console.log("TTS 기능을 사용할 수 없습니다.");
    }
}
