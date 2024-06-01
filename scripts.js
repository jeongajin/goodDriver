document.addEventListener('DOMContentLoaded', () => {
    if (typeof document !== 'undefined') {
        // 브라우저 환경에서만 실행될 코드
        document.getElementById("someElement").innerText = "Hello, World!";
    } else {
        console.log("This code is running in a Node.js environment.");
    }

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
});


