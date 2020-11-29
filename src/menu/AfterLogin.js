import { BrowserRouter, NavLink, Switch } from "react-router-dom";
import SignInRoutes from "../Routes"

function AfterLogin() {
  return (

    <div className="menuList_After_Login">
      <BrowserRouter>
        <SignInRoutes />
        <ul className="nav_link">
          {/* 로그인 경우 */}
          <li className="firstList">
            <NavLink to="/gallery">
              갤러리
            </NavLink>
          </li>
          <li>
            <NavLink to="/favorites">
              즐겨찾기
            </NavLink>
          </li>
          <li>
            <NavLink to="/mypage">
              마이페이지
            </NavLink>
          </li>
          <li>
            <NavLink to="/signout">
              로그아웃
            </NavLink>
          </li>
        </ul>


      </BrowserRouter>
    </div>

  )
}

export default AfterLogin;