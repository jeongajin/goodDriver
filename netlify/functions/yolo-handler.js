exports.handler = async function(event, context) {
    if (event.httpMethod === "POST") {
        const data = JSON.parse(event.body);

        // 여기에 YOLO 데이터를 처리하는 로직을 추가합니다.
        console.log("Received data:", data);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Data received successfully" })
        };
    } else {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: "Method Not Allowed" })
        };
    }
};
