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

    // 블루투스 신호를 받아서 알리미 상태를 확인하고 알림을 보내는 함수
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

    // 블루투스 신호를 받아 처리하는 함수
    function handleBluetoothSignal(signal) {
        console.log('Received Bluetooth signal:', signal);
        checkAlertsAndNotify(signal);
    }

    // 블루투스 신호를 시뮬레이션하는 함수
    function simulateBluetoothSignal(signalType) {
        console.log('Simulating Bluetooth signal:', signalType);
        handleBluetoothSignal(signalType);
    }

    // 페이지가 로드될 때 실행될 초기 설정
    if ('bluetooth' in navigator) {
        navigator.bluetooth.requestDevice({ acceptAllDevices: true })
            .then(device => {
                document.getElementById('status').textContent = '연결됨';
                device.addEventListener('gattserverdisconnected', () => {
                    document.getElementById('status').textContent = '연결 대기 중...';
                });
                return device.gatt.connect();
            })
            .then(server => {
                // 서비스와 특성의 UUID를 설정하여 실제 신호 수신 구현 필요
            })
            .catch(error => {
                console.error('Bluetooth 연결 실패:', error);
                document.getElementById('status').textContent = '연결 실패';
            });
    } else {
        console.error('이 브라우저는 블루투스를 지원하지 않습니다.');
    }

    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            console.log('알림 권한이 허용되었습니다.');
        } else {
            console.log('알림 권한이 거부되었습니다.');
        }
    });
});
