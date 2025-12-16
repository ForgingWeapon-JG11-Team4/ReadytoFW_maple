import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './MapleStoryLogin.css';

const API_URL = 'http://localhost:4000';

export default function MapleStoryLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLogin, setIsLogin] = useState(!location.state?.isSignup);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('token', data.access_token);
        alert('로그인 성공');
        navigate('/');
      } else {
        alert(data.message || '로그인 실패');
      }
    } catch (error) {
      alert('서버 연결 실패');
    }
  };

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        alert('회원가입 완료! 로그인해주세요.');
        setIsLogin(true);
        setPassword('');
        setConfirmPassword('');
      } else {
        alert(data.message || '회원가입 실패');
      }
    } catch (error) {
      alert('서버 연결 실패');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  return (
    <div className="login-page">
      {/* 로고 - 클릭 시 메인페이지로 이동 */}
      <div className="login-logo" onClick={() => navigate('/')}>
        <span className="login-logo-icon">🍁</span>
        MapleStory
      </div>

      <div className="login-container">
        <h1 className="login-title">
          {isLogin ? '로그인' : '회원가입'}
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
              required
            />
          </div>

          <div className="input-group">
            <label>비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>

          {!isLogin && (
            <div className="input-group">
              <label>비밀번호 확인</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="비밀번호를 다시 입력하세요"
                required
              />
            </div>
          )}

          <button type="submit" className="submit-btn">
            {isLogin ? '로그인' : '회원가입'}
          </button>
        </form>

        <div className="toggle-section">
          {isLogin ? (
            <p>
              계정이 없으신가요?{' '}
              <span onClick={() => setIsLogin(false)}>회원가입</span>
            </p>
          ) : (
            <p>
              이미 계정이 있으신가요?{' '}
              <span onClick={() => setIsLogin(true)}>로그인</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}