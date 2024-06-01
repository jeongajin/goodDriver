document.addEventListener('DOMContentLoaded', () => {
    // 알림 기능을 토글하는 함수
    function toggleAlert(alertType) {
        const isChecked = document.getElementById(`${alertType}-alert`).checked;
        console.log(`${alertType} 알리미 토글: ${isChecked ? '활성화됨' : '비활성화됨'}`);
    }

    // 알리미 상태를 확인하고 알림을 보내는 함수
    function checkAlertsAndNotify(signalType) {
        const crosswalkAlert = document.getElementById('crosswalk-alert').checked;
        const pedestrainAlert = document.getElementById('pedestrain-alert').checked;
        const buslaneAlert = document.getElementById('buslane-alert').checked;

        console.log(`Received signalType: ${signalType}`);
        console.log(`crosswalkAlert: ${crosswalkAlert}, pedestrainAlert: ${pedestrainAlert}, buslaneAlert: ${buslaneAlert}`);

        if (signalType === 'crosswalk' && crosswalkAlert) {
            sendNotification('교차로 알림이', '교차로에서 신호를 받았습니다.');
        } else if (signalType === 'pedestrain' && pedestrainAlert) {
            sendNotification('무단횡단 알리미', '무단횡단 신호를 받았습니다.');
        } else if (signalType === 'buslane' && buslaneAlert) {
            sendNotification('버스 전용 도로 알리미', '버스 전용 도로 신호를 받았습니다.');
        }
    }

    // 사용자에게 알림을 보내는 함수
    function sendNotification(title, body) {
        console.log(`Sending notification - Title: ${title}, Body: ${body}`);
        if (Notification.permission === 'granted') {
            new Notification(title, { body });
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                console.log(`Notification permission: ${permission}`);
                if (permission === 'granted') {
                    new Notification(title, { body });
                }
            });
        }
    }

    // 신호를 시뮬레이션하는 함수
    function simulateSignal(signalType) {
        console.log('Simulating signal:', signalType);
        checkAlertsAndNotify(signalType);
    }

    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            console.log('알림 권한이 허용되었습니다.');
        } else {
            console.log('알림 권한이 거부되었습니다.');
        }
    });

    // YOLO 결과를 가져와 표시하는 함수
    function fetchYOLOResults() {
        fetch('/.netlify/functions/yolo-handler')
            .then(response => response.json())
            .then(data => {
                const resultsDiv = document.getElementById('results');
                resultsDiv.innerHTML = '';
                data.forEach(result => {
                    const div = document.createElement('div');
                    div.innerHTML = `Class: ${result.name}, Confidence: ${result.confidence.toFixed(2)}`;
                    resultsDiv.appendChild(div);
                });
            })
            .catch(error => console.error('Error fetching YOLO results:', error));
    }

    // 주기적으로 YOLO 결과를 가져오기
    setInterval(fetchYOLOResults, 5000); // 5초마다 결과 갱신

    // 랜덤 YOLO 데이터를 생성하여 서버로 전송하는 함수
    window.simulateYOLOData = function () {
        const randomDetections = Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => ({
            xmin: Math.random() * 100,
            ymin: Math.random() * 100,
            xmax: Math.random() * 100 + 100,
            ymax: Math.random() * 100 + 100,
            confidence: Math.random(),
            class: Math.floor(Math.random() * 80),
            name: `Class${Math.floor(Math.random() * 80)}`
        }));

        fetch('/.netlify/functions/yolo-handler', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ detections: randomDetections })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Random YOLO data sent:', data);
        })
        .catch(error => console.error('Error sending YOLO data:', error));
    }
});
