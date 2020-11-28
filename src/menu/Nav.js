import React from "react";
import { BrowserRouter, NavLink } from "react-router-dom";

import "../Route";

//components
import AfterLogin from "./AfterLogin";

//css
import "../css/Nav.scss"

class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isHamburgerOn: false
    }
  }


  /* 햄버거 토글 ON / OFF */
  /* state값 false -> true or true -> false 반전시키기 */
  handleHamburger() {
    this.setState({
      isHamburgerOn: !this.state.isHamburgerOn
    });
  }

  render() {

    return (
      <div className="App">
        <div className="nav_div">
          {/* nav 바 안에 로고, 햄버거 삽입 */}
          <section>
            <nav>
              <div className="starryNigth_logo">
                로고사진배치: 홈 경로로 돌아가게 하기.
            </div>


              {/* 햄버거 토글 */}
              <div className="hamburgerToggle">
                <div className="line-1"></div>
                <div className="line-2"></div>
                <div className="line-3"></div>
              </div>
            </nav>
          </section>
          {/* 로그인 경우 vs 비로그인 경우로 나누기 */}
          <AfterLogin />

        </div>


        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div>asdfasd</div>
        <header className="App-header">햄벅 컴포넌트 입니다.</header>
      </div>
    );
  };
}

export default Nav;
