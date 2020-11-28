import { BrowserRouter, NavLink } from "react-router-dom";

// css
import "../css/AfterLogin.scss"


function AfterLogin() {
  return (
    <div className="menuList_After_Login">
      <BrowserRouter>
        <ul className="nav_link">
          {/* 로그인 경우 */}
          <li>
            <NavLink to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/gallery">
              갤러리
            </NavLink>
          </li>
          <li>
            <NavLink to="/favorite">
              즐겨찾기
            </NavLink>
          </li>
          <li>
            <NavLink to="/mypage">
              마이페이지
            </NavLink>
          </li>
          <li>
            <NavLink to="/signOut">
              로그아웃
            </NavLink>
          </li>
        </ul>
      </BrowserRouter>
    </div>
  )
}

export default AfterLogin;