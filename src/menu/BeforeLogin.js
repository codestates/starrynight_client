import { BrowserRouter, NavLink } from "react-router-dom"


function BeforeLogin() {
  return (
    <div className="menuList_Before_Login">
      <BrowserRouter>
        <ul className="nav_link">
          {/* 비로그인 경우 */}

          <li className="firstList">
            <NavLink to="/signin">
              로그인
            </NavLink>
          </li>
          <li>
            <NavLink to="/signup">
              회원가입
            </NavLink>
          </li>
        </ul>
      </BrowserRouter>
    </div>
  )
}

export default BeforeLogin;