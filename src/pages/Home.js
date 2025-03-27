import CameraCapture from "./CameraCapture";


const Home = () => {

    return(
        <div>
            <h1>Home</h1>
            <p>Welcome to the Home page!</p>

            <a href="/login">로그인</a>
            <br />
            <a href="/naverLogin">네이버버</a>
            <CameraCapture/>
            <a href="/picture2">사진찍기</a>
        </div>
    );
};

export default Home;