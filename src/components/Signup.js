import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../style_components/Signup.css';

function Signup(){
    const [name, setName]=useState('');
    const [nickname,setNickname]=useState('');
    const [email, setEmail]=useState('');
    const [pw,setPw]=useState('');
    const [pw_c,setPw_c]=useState('');

    const [nameValid, setNameValid]=useState(false);
    const [nicknameValid, setNicknameValid]=useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [pw_cValid, setPw_cValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);

    //이메일, 비밀번호 조건
    const handleNickname=(e)=>{
        setNickname(e.target.value);
        setNicknameValid(true);
    }
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
      const handlePw_c=(e)=>{
        setPw_c(e.target.value);
        setPw_cValid(true);
      }
       //버튼 활성화
       useEffect(() => {
        if(nicknameValid && emailValid && pwValid && pw_cValid) {
          setNotAllow(false);
          return;
        }
        setNotAllow(true);
      }, [nicknameValid, emailValid, pwValid, pw_cValid]);

      const handleSignup=()=>{
        if (pw !== pw_c) {
          alert("비밀번호가 일치하지 않습니다.");
          return;
        }

        axios
        .post('https://port-0-color-train-server-am952nlsu6unuj.sel5.cloudtype.app/api/users/register', {
          name: nickname,
          email: email,
          password: pw,
          password_c: pw_c
        })
        .then((response) => {
          console.log('Server Response:', response.data);
          if (response.data.success) {
            alert('회원가입이 완료되었습니다.');
            window.location.href = '/login'
          } else {
            alert('회원가입에 실패했습니다.');
          }
      
        })
        .catch((error) => {
            console.error('Registration failed', error);
            alert("회원가입에 실패했습니다.")
        });
      }


    return(
        <div className="signupPage">
            <div className="logoPart">
                <img className="logoImg" src="/logo.png" alt="로고" />
            </div>

            <div className="signupPart">
                <div className="signupTitleWrap">
                    회원가입
                </div>

                <div className="signupContentWrap">
                    <div className="signupInputTitle">닉네임</div>
                    <div className="signupInputWrap">
                        <input
                            className="signupInput"
                            placeholder="눈송이"
                            value={nickname}
                            onChange={handleNickname}    />
                    </div>

                    <div className="signupInputTitle">이메일</div>
                    <div className="signupInputWrap">
                        <input
                            className="signupInput"
                            placeholder="colorTrain@gmail.com"
                            value={email}
                            onChange={handleEmail}  />
                    </div>
                    <div className="signupErrorMessageWrap">
                        {!emailValid && email.length > 0 && (
                            <div>올바른 이메일을 입력해주세요.</div>
                        )}
                    </div>

                    <div style={{marginTop: "10px"}} className="signupInputTitle">비밀번호</div>
                    <div className="signupInputWrap">
                        <input 
                            className="signupInput"
                            placeholder="4자리 이상"
                            value={pw}
                            onChange={handlePw} />
                    </div>
                    <div className="signupErrorMessageWrap">
                        {!pwValid && pw.length > 0 && (
                            <div>4자 이상의 비밀번호를 입력해주세요.</div>
                        )}
                    </div>

                    <div className="signupInputTitle">비밀번호 확인</div>
                    <div className="signupInputWrap">
                        <input 
                            className="signupInput"
                            placeholder="설정한 비밀번호를 한 번 더 입력해주세요"
                            value={pw_c}
                            onChange={handlePw_c} />
                    </div>
                    <div>
                        <button disabled={notAllow} onClick={handleSignup} className="signupButton">회원가입</button>
                    </div>
                </div>
            </div>
        </div>

    )

}
export default Signup;