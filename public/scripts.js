document.addEventListener('DOMContentLoaded', () => {
    // TTS 메시지를 보내는 함수
    function sendTTSMessage(message) {
        if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(message);
        }
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
            sendTTSMessage('교차로에서 신호를 받았습니다.');
        } else if (signalType === 'pedestrain' && pedestrainAlert) {
            sendTTSMessage('무단횡단 신호를 받았습니다.');
        } else if (signalType === 'buslane' && buslaneAlert) {
            sendTTSMessage('버스 전용 도로 신호를 받았습니다.');
        }
    }

    // 신호를 시뮬레이션하는 함수
    function simulateSignal(signalType) {
        console.log('Simulating signal:', signalType);
        checkAlertsAndNotify(signalType);
    }

    // 임의의 신호 타입을 사용한 알림 테스트
    document.getElementById('test-notification').addEventListener('click', () => {
        sendTTSMessage('우측에 보행자가 있습니다. 주의하세요.');
    });
});
