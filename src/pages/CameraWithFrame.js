import React, { useRef, useEffect, useState } from 'react';

const CameraWithFrame = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [photo, setPhoto] = useState(null);

    // 카메라 켜기
    useEffect(() => {
        const getVideo = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error('카메라 접근 실패:', err);
            }
        };
        getVideo();
    }, []);

    // 캡처 함수
    const takePhoto = () => {
        const width = 640;
        const height = 480;
        const context = canvasRef.current.getContext('2d');
        canvasRef.current.width = width;
        canvasRef.current.height = height;

        context.drawImage(videoRef.current, 0, 0, width, height);
        const data = canvasRef.current.toDataURL('image/png');
        setPhoto(data);
    };

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-[640px] h-[480px] border-4 border-black">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover rounded" />

                {/* 네모 가이드 박스 */}
                <div
                    className="absolute border-4 border-yellow-400 rounded"
                    style={{ top: '30%', left: '10%', width: '80%', height: '40%' }}
                ></div>
            </div>

            <button
                onClick={takePhoto}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded shadow"
            >
                캡처
            </button>

            {photo && (
                <div className="mt-4">
                    <h3 className="mb-2 font-bold">캡처된 이미지</h3>
                    <img src={photo} alt="Captured" className="border rounded w-[320px]" />
                </div>
            )}

            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
    );
};

export default CameraWithFrame;
