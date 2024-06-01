let yoloResults = [];

exports.handler = async function(event, context) {
    if (event.httpMethod === "POST") {
        const data = JSON.parse(event.body);

        // YOLO 데이터를 처리하는 로직
        console.log("Received YOLO data:", data);
        yoloResults = data.detections;

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Data received successfully" })
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
