import { useState } from 'react';
import './MapleStoryHome.css';

// ========================================
// 메이플스토리 클론 - 컴포넌트 구조
// ========================================

// 1. 헤더 네비게이션 컴포넌트
function Header() {
  const menuItems = ["뉴스", "가이드", "랭킹", "커뮤니티", "미디어", "고객지원"];
  
  return (
    <header className="header">
      {/* 로고 */}
      <div className="logo">
        <span className="logo-icon">🍁</span>
        메이플스토리
      </div>
      
      {/* 메뉴 */}
      <nav className="nav">
        {menuItems.map((item, index) => (
          <span key={index} className="nav-item">
            {item}
            {item === "뉴스" && <span className="nav-dot">●</span>}
          </span>
        ))}
      </nav>
      
      {/* 다크모드 토글 */}
      <div className="dark-toggle" />
    </header>
  );
}

// 2. 메인 배너 컴포넌트
function MainBanner() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 21;
  
  return (
    <div className="main-banner">
      {/* 왼쪽 텍스트 */}
      <div className="banner-content">
        <h1 className="banner-title">메이플스토리 X 원펀맨</h1>
        <p className="banner-subtitle">11월 20일(목)부터 콜라보 시작!</p>
        
        {/* 슬라이드 컨트롤 */}
        <div className="slide-controls">
          <button 
            className="slide-btn"
            onClick={() => setCurrentSlide(prev => Math.max(1, prev - 1))}
          >
            ◀
          </button>
          <span className="slide-indicator">
            {currentSlide} / {totalSlides}
          </span>
          <button 
            className="slide-btn"
            onClick={() => setCurrentSlide(prev => Math.min(totalSlides, prev + 1))}
          >
            ▶
          </button>
          <button className="slide-menu-btn">≡</button>
        </div>
      </div>
      
      {/* 오른쪽 캐릭터 이미지 영역 */}
      <div className="banner-character">👊</div>
      
      <div className="banner-copyright">©O, M/S, H</div>
    </div>
  );
}

// 3. 공지사항 아이템 컴포넌트
function NoticeItem({ type, title, description, isNew, isUpdated }) {
  return (
    <div className="notice-item">
      <div className="notice-item-header">
        <span className="notice-tag">{type}</span>
        {isUpdated && <span className="notice-tag update">수정</span>}
        <span className="notice-item-title">{title}</span>
        {isNew && <span className="notice-new">N</span>}
      </div>
      {description && (
        <p className="notice-description">{description}</p>
      )}
    </div>
  );
}

// 4. 공지사항 섹션 컴포넌트
function NoticeSection() {
  const notices = [
    { type: "공지", title: "CROWN 쇼케이스 선물지급 안내", description: "쇼케이스 선물은 12/31(수) 오후 11시 59분까지 수령해 주세요.", isNew: true },
    { type: "공지", title: "아스트라 보조무기 사양 및 전승 규칙 사전 안내", description: "1/15(목) 업데이트 시 적용될 예정입니다.", isNew: true },
    { type: "공지", title: "12/18(목) 메이플스토리 운영정책 변경 안내", description: "보이스챗 도입 관련 운영정책 변경을 안내드립니다.", isNew: true },
    { type: "공지", title: "웨딩 시스템 사양 변경점 사전 안내", description: "1/15(목) 업데이트부터 변경되는 내용을 확인해주세요.", isNew: true },
    { type: "공지", title: "12/11(목) 스카니아 월드 서버장애 안내", description: "스카니아 월드에 사과 보상을 지급해드립니다. (~12/17(수))", isNew: true, isUpdated: true },
  ];

  return (
    <div className="notice-section">
      <div className="notice-header">
        <h2 className="notice-title">공지사항</h2>
        <span className="notice-plus">+</span>
      </div>
      
      <div>
        {notices.map((notice, index) => (
          <NoticeItem key={index} {...notice} />
        ))}
      </div>
    </div>
  );
}

// 5. 로그인 박스 컴포넌트
function LoginBox() {
  return (
    <div className="login-box">
      {/* Game Start 버튼 */}
      <div className="game-start-btn">
        <div className="game-start-inner">
          GAME<br/>START
        </div>
      </div>
      <div className="download-btn">
        다운로드 <span className="download-arrow">▼</span>
      </div>
      
      <p className="login-text">로그인을 해주세요.</p>
      
      <button className="login-btn">넥슨ID 로그인 →</button>
      
      <div className="login-links">
        <div className="login-link">넥슨ID & 비밀번호 찾기</div>
        <div className="login-link">메이플ID에 연동된 넥슨 ID 찾기</div>
        <div className="login-link">메이플ID & 비밀번호 찾기</div>
        <div className="login-link">회원가입</div>
      </div>
    </div>
  );
}

// 6. 업데이트 정보 컴포넌트
function UpdateInfo() {
  const [currentMystic, setCurrentMystic] = useState(2);
  const totalMystic = 9;

  return (
    <div className="update-section">
      {/* 주요 업데이트 정보 */}
      <div className="update-info">
        <div className="update-header">
          <div>
            <h3 className="update-title">주요 업데이트 정보</h3>
            <p className="update-date">2025.11.20</p>
          </div>
        </div>
        <p className="update-version">ver.1.2.409 업데이트</p>
        <button className="update-more-btn">자세히 보기 &gt;</button>
        
        {/* 캐릭터 */}
        <div className="update-character">👊</div>
        <div className="update-copyright">©O, M/S, H</div>
      </div>
      
      {/* 미스틱 컬렉션 배너 */}
      <div className="mystic-banner">
        <h3 className="mystic-title">미스틱 컬렉션</h3>
        <p className="mystic-date">
          2025년 11월 20일(목) 점검 후 ~<br/>
          12월 17일(수) 오후 11시 59분
        </p>
        
        <div className="mystic-footer">
          <span className="mystic-character">🧙‍♂️</span>
          <div className="mystic-controls">
            <span 
              className="mystic-arrow"
              onClick={() => setCurrentMystic(prev => Math.max(1, prev - 1))}
            >
              ◀
            </span>
            <span className="mystic-indicator">
              {currentMystic} / {totalMystic}
            </span>
            <span 
              className="mystic-arrow"
              onClick={() => setCurrentMystic(prev => Math.min(totalMystic, prev + 1))}
            >
              ▶
            </span>
          </div>
        </div>
        <div className="mystic-copyright">©O, M/S, H</div>
      </div>
    </div>
  );
}

// 메이플스토리 홈 컴포넌트 (export)
export default function MapleStoryHome() {
  return (
    <div className="maple-home">
      {/* 헤더 */}
      <Header />
      
      {/* 메인 배너 */}
      <MainBanner />
      
      {/* 컨텐츠 영역 */}
      <div className="content-area">
        {/* 공지사항 */}
        <NoticeSection />
        
        {/* 로그인 박스 */}
        <LoginBox />
        
        {/* 업데이트 정보 */}
        <UpdateInfo />
      </div>
    </div>
  );
}
