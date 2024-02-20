import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style_components/Navbar.css';

function Navbar() {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동 함수를 가져옵니다.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로고 클릭 시 메인 화면으로 이동하는 함수
  const handleLogoClick = () => {
    navigate('/'); // 홈 페이지로 이동
  };

  //로그인 여부 확인
  const checkLoginStatus= async ()=>{
    try {
        const response = await axios.get('http://localhost:5000/api/users/auth', { withCredentials: true });
        const isUserLoggedIn = response.data.isAuth;
        setIsLoggedIn(isUserLoggedIn);
        return isUserLoggedIn;
        
      } catch (error) {
        console.error('Error checking login status:', error);
      }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/logout', { withCredentials: true });

      if (response.status === 200) {
        setIsLoggedIn(false);
        navigate('/');
      } else {
        console.error('Logout failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <nav>
      <div className="logo">
          <img onClick={handleLogoClick} src="/logo.png" alt="로고" width="80%"/>
      </div>
      <ul className="menu">
        <li><Link to="/search">팔레트 검색</Link></li>
        <div className="menu-divider"></div> {/* 메뉴 항목 간에 구분선 추가 */}
        <li><Link to="/create">팔레트 생성</Link></li>
        <div className="menu-divider"></div> {/* 메뉴 항목 간에 구분선 추가 */}
        <li><Link to="/check">팔레트 점검</Link></li>
        <div className="menu-divider"></div> {/* 메뉴 항목 간에 구분선 추가 */}
        <li><Link to="/my_palettes">나의 팔레트</Link></li>
      </ul>

      <div className="auth">
        {isLoggedIn ? (
            <button onClick={handleLogout}>로그아웃</button>
          ) : (
            <>
              <Link to="/login">
                <button>로그인</button>
              </Link>
              <Link to="/signup">
                <button>회원가입</button>
              </Link>
            </>
          )}
      </div>
      <div className="nav-divider"></div> {/* 구분선 추가 */}
    </nav>
  );
}
export default Navbar;