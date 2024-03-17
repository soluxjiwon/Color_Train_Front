import React from "react";
import '../style_components/Home.css';

function Home(){
    //회원가입 창 연결
    const handleHomeSignup = () => {
        window.location.href = '/Signup';
    };

    return(
        <div className="home">
            <div className="home-title">
                <div className="title1">조화로운 색을 잇다</div>
                <div className="title2">ColorTrain</div>
            </div>

            <div className="home-divider"></div>

            <div className="home-subtitle">
                <img src="/logo.png" alt="로고" width="25%" />
                <div className="subtitle">
                    <div>원하는 컬러팔레트를 쉽게</div>
                    <div>검색, 제작, 점검 할 수 있는</div>
                    <div>편의성 웹 사이트입니다.</div>
                </div>
            </div>

            <div className="home-divider"></div>

            <div className="palette-use">
                <div className="home-explain-title">
                    <div className="explain-title-bar"></div>
                    <div className="home-explain-title-font">컬러팔레트 쓰임새</div>
                </div>
                <div className="palette-use-part">
                    <div className="palette-use-time">
                        <img src="/time.png" alt="시간단축" width="200px" height="175px" />
                        <div className="palette-use-detail">작업물 시간단축</div>
                    </div>
                    <div className="palette-use-perfection">
                        <img src="/perfection.png" alt="완성도 향상" width="200px" height="175px" />
                        <div className="palette-use-detail">작업물 완성도 향상</div>
                    </div>
                    <div className="palette-use-image">
                        <img src="/image.png" alt="이미지 구축" width="200px" height="175px"/>
                        <div className="palette-use-detail">작업물 이미지 구축</div>
                    </div>
                </div>
            </div>

            <div className="home-divider"></div>

            <div className="features-usage">
                <div className="features-usage-title">
                    <div className="explain-title-bar"></div>
                    <div className="home-explain-title-font">기능</div>
                </div>
                <div className="signup-explain-part">
                    <div className="signup-explain-save">
                        <img src="/search.png" alt="시간단축" width="200px" height="175px" />
                        <div className="signup-explain-detail">팔레트 검색</div>
                    </div>
                    <div className="signup-explain-recom">
                        <img src="/imagepick.png" alt="시간단축" width="200px" height="175px" />
                        <img src="/colorpick.png" alt="시간단축" width="200px" height="175px" />
                        <div className="signup-explain-detail">팔레트 생성</div>
                    </div>
                    <div className="signup-explain-recom">
                        <img src="/confirm.png" alt="시간단축" width="200px" height="175px" />
                        <div className="signup-explain-detail">팔레트 점검</div>
                    </div>
                </div>
            </div>
            
            <div className="home-divider"></div>

            <div className="signup-explain">
                <div className="signup-explain-title">
                    <div className="signup-explain-title-bar"></div>
                    <div className="signup-explain-title-font">
                        <div>회원 전용 기능</div>
                    </div>
                </div>
                <div className="signup-explain-part">
                    <div className="signup-explain-save">
                        <img src="/save.png" alt="시간단축" width="200px" height="175px" />
                        <div className="signup-explain-detail">컬러팔레트 저장</div>
                    </div>
                    <div className="signup-explain-recom">
                        <img src="/recommend.png" alt="시간단축" width="200px" height="175px" />
                        <div className="signup-explain-detail">컬러팔레트 맞춤추천</div>
                    </div>
                </div>
                <div>
                    <button className="homeSignupButton" onClick={handleHomeSignup}>회원가입</button>
                </div>
            </div>
        </div>

    );
}
export default Home;


