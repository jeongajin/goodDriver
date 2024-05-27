// 알림 기능을 토글하는 함수
function toggleAlert(alertType) {
    // 특정 알리미가 활성화되었는지 확인
    const isChecked = document.getElementById(`${alertType}-alert`).checked;
    console.log(`${alertType} 알리미 토글: ${isChecked ? '활성화됨' : '비활성화됨'}`);
}

// 블루투스 신호를 받아서 알리미 상태를 확인하고 알림을 보내는 함수
function checkAlertsAndNotify(signalType) {
    // 각 알리미의 활성화 상태 확인
    const crosswalkAlert = document.getElementById('crosswalk-alert').checked;
    const pedestrainAlert = document.getElementById('pedestrain-alert').checked;
    const buslaneAlert = document.getElementById('buslane-alert').checked;

    console.log(`Received signalType: ${signalType}`);
    console.log(`crosswalkAlert: ${crosswalkAlert}, pedestrainAlert: ${pedestrainAlert}, buslaneAlert: ${buslaneAlert}`);

    // 신호 유형에 따라 알림 보내기
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
    // 알림 권한이 허용된 경우
    console.log(`Sending notification - Title: ${title}, Body: ${body}`);
    if (Notification.permission === 'granted') {
        new Notification(title, { body });
    } 
    // 알림 권한이 아직 거부되지 않은 경우
    else if (Notification.permission !== 'denied') {
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
    // signal은 교차로, 무단횡단, 버스 전용 도로 등의 값을 가정
    checkAlertsAndNotify(signal);
}

// 블루투스 신호를 시뮬레이션하는 함수
function simulateBluetoothSignal(signalType) {
    console.log('Simulating Bluetooth signal:', signalType);
    handleBluetoothSignal(signalType);
}

// 페이지가 로드될 때 실행될 초기 설정
document.addEventListener('DOMContentLoaded', () => {
    // 브라우저가 블루투스를 지원하는지 확인
    if ('bluetooth' in navigator) {
        navigator.bluetooth.requestDevice({ acceptAllDevices: true })
            .then(device => {
                // 블루투스 연결 성공 시 상태 업데이트
                document.getElementById('status').textContent = '연결됨';
                // 블루투스 연결이 끊어졌을 때의 이벤트 핸들러
                device.addEventListener('gattserverdisconnected', () => {
                    document.getElementById('status').textContent = '연결 대기 중...';
                });
                // 실제 신호 수신을 위한 연결 설정
                return device.gatt.connect();
            })
            .then(server => {
                // 서비스와 특성의 UUID를 설정하여 실제 신호 수신 구현 필요
                // 예시: return server.getPrimaryService('service-uuid');
            })
            .catch(error => {
                console.error('Bluetooth 연결 실패:', error);
                document.getElementById('status').textContent = '연결 실패';
            });
    } else {
        console.error('이 브라우저는 블루투스를 지원하지 않습니다.');
    }

    // 알림 권한 요청
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            console.log('알림 권한이 허용되었습니다.');
        } else {
            console.log('알림 권한이 거부되었습니다.');
        }
    });
});
