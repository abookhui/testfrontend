import React, { useRef, useState, useEffect } from 'react';

const CameraWithFrame = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [photo, setPhoto] = useState(null);
    const [streaming, setStreaming] = useState(false);

    useEffect(() => {
        const enableCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
                videoRef.current.srcObject = stream;
                setStreaming(true);
            } catch (err) {
                console.error('카메라 접근 실패:', err);
            }
        };

        enableCamera();

        return () => {
            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    const capture = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const fullWidth = video.videoWidth;
        const fullHeight = video.videoHeight;

        // 프레임 영역 비율 (가운데 박스)
        const cropX = fullWidth * 0.1;
        const cropY = fullHeight * 0.3;
        const cropWidth = fullWidth * 0.8;
        const cropHeight = fullHeight * 0.4;

        // 캔버스를 프레임 크기로 설정
        canvas.width = cropWidth;
        canvas.height = cropHeight;

        // 프레임 영역만 캡처
        context.drawImage(video, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

        const imageDataURL = canvas.toDataURL('image/png');
        setPhoto(imageDataURL);
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>📸 신분증/가격표 촬영</h2>

            <div style={{ position: 'relative', width: '100%', maxWidth: '640px', margin: 'auto' }}>
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    style={{ width: '100%', borderRadius: '8px' }}
                />

                {/* 프레임 오버레이 */}
                <div
                    style={{
                        position: 'absolute',
                        top: '30%',
                        left: '10%',
                        width: '80%',
                        height: '40%',
                        border: '3px dashed #00f7ff',
                        borderRadius: '8px',
                        boxSizing: 'border-box',
                        pointerEvents: 'none',
                    }}
                />
            </div>

            <button onClick={capture} style={{ marginTop: '1rem', padding: '10px 20px' }}>
                📷 캡처
            </button>

            {photo && (
                <div style={{ marginTop: '1rem' }}>
                    <h3>🖼️ 캡처된 이미지</h3>
                    <img src={photo} alt="Captured" style={{ maxWidth: '100%', border: '1px solid #ccc' }} />
                </div>
            )}

            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
    );
};

export default CameraWithFrame;
