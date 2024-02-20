import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../style_components/Login.css';

function Login(){


    const [email, setEmail]=useState('');
    const [pw,setPw]=useState('');

    const [emailValid, setEmailValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);


      //이메일, 비밀번호 조건
      const handleEmail = (e) => {
        setEmail(e.target.value);
        const regex =
          /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (regex.test(e.target.value)) {
          setEmailValid(true);
        } else {
          setEmailValid(false);
        }
      };
      const handlePw = (e) => {
        setPw(e.target.value);
        const regex = /^.{4,}$/;
        if (regex.test(e.target.value)) {
          setPwValid(true);
        } else {
          setPwValid(false);
        }
      };
      //버튼 활성화
      useEffect(() => {
        if(emailValid && pwValid) {
          setNotAllow(false);
          return;
        }
        setNotAllow(true);
      }, [emailValid, pwValid]);


      //로그인 API 연결
      const handleLogin = () => {
        const userData = {
            email: email,
            password: pw
          };
          axios
          .post('http://localhost:5000/api/users/login', userData, { withCredentials: true })
          .then((response) => {
            if (response.data.loginSucess) {
              console.log('Login successful', response.data);
              alert('환영합니다');
              window.location.href = '/';
            } else {
              console.error('Login failed', response.data.message);
              alert(response.data.message);
            }
          })
          .catch((error) => {
            console.error('Login failed', error);
            alert('로그인 중 오류가 발생했습니다.');
          });
          
        };

        //엔터키 이벤트 함수
        const handleOnKeyPress = e =>{
          if(e.key == 'Enter') {
            handleLogin();
          }
        }
        const xhr = new XMLHttpRequest();
          xhr.open('GET', 'http://localhost:5000', true);
          xhr.withCredentials = true;
          xhr.send(null);

    
      
        //회원가입 창 연결
        const handleLoginSignup = () => {
            window.location.href = '/Signup';
          };
      
    return(
        <div className="loginPage">
            <div className="logoPart">
                <img className="logoImg" src="/logo.png" alt="로고" />
            </div>

            <div className="loginPart">
                <div className="titleWrap">
                    로그인
                </div>
                <div className="contentWrap">
                    <div className="inputTitle">이메일 주소</div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            placeholder="colorTrain@gmail.com"
                            value={email}
                            onChange={handleEmail}  />
                    </div>
                    <div className="errorMessageWrap">
                        {!emailValid && email.length > 0 && (
                            <div>올바른 이메일을 입력해주세요.</div>
                        )}
                    </div>

                    <div style={{marginTop: "26px"}} className="inputTitle">비밀번호</div>
                    <div className="inputWrap">
                        <input 
                            className="input"
                            placeholder="4자리 이상"
                            value={pw}
                            onChange={handlePw}
                            onKeyPress={handleOnKeyPress} />
                    </div>
                    <div className="errorMessageWrap">
                        {!pwValid && pw.length > 0 && (
                            <div>4자 이상의 비밀번호를 입력해주세요.</div>
                        )}
                    </div>


                    <div>
                        <button disabled={notAllow} onClick={handleLogin} className="loginButton">로그인</button>
                    </div>

                    <div className="singupButtonPart">
                        계정이 없다면 회원가입을 해주세요.
                        <button className="loginSignupButton" onClick={handleLoginSignup}>회원가입</button>   
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;