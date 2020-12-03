import React from "react";
import { BrowserRouter, withRouter, NavLink } from "react-router-dom";

//logo
import imgFile from "../image/logo_StarryNight.png";

//components
import AfterLogin from "./AfterLogin";
import BeforeLogin from "./BeforeLogin";

//css
import "../css/Nav.scss";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHamburgerOn: false,
    };
  }
  // !수정하기!
  //로고 클릭시 메인?페이지로 리다이렉트  --> 메인페이지 라우팅 연구 후 메인으로 리다이렉트 하는 걸로 하고 일단 main 페이지로 리다이렉트 하기.
  handleLogoClickToRedirectToMain = () => {
    this.props.history.push("/");
  };

  /* 햄버거 토글 ON / OFF */
  /* state값 false -> true or true -> false 반전시키기 */

  handleHamburgerclick = () => {
    this.setState({
      isHamburgerOn: !this.state.isHamburgerOn,
    });
  };

  // Main으로부터 내려오는 handleSignOut을 여기서 납치 (Main의 isLogin을 false로 바꿔줌 )
  // 또한 추후 로그아웃 후에도 계속 모달창이 켜져있는 것을 자동으로 꺼지게 할 것. 
  // 위의 두개 기능을 동시에 하게 하는 메소드
  hamburgerModalOFFWithSignOut = () => {
    this.props.handleSignOut();
    this.handleHamburgerclick();
  }

  render() {
    console.log("nav 프롭", this.props);
    return (
      <div className="nav_div">

        {/* nav 바 안에 로고, 햄버거 삽입 */}
        <div className="starryNigth_logo">
          {/* 로고사진배치: 홈 경로로 돌아가게 하기. */}
          <img
            id="nav_logo"
            src={imgFile}
            onClick={this.handleLogoClickToRedirectToMain}
          />
        </div>

        {/* 로그인 경우 vs 비로그인 경우로 나누기 */}

        {this.state.isHamburgerOn ?
          (this.props.isLogin === true ?
            <AfterLogin
              isHamburgerOn={this.state.isHamburgerOn}
              // handleHamburgerclick={this.handleHamburgerclick}
              // handleSignOut={this.props.handleSignOut}
              hamburgerModalOFFWithSignOut={this.hamburgerModalOFFWithSignOut}
            />
            :
            <BeforeLogin
              isHamburgerOn={this.state.isHamburgerOn}
              handleHamburgerclick={this.handleHamburgerclick}
              handleResponseSuccess={this.props.handleResponseSuccess}
            />
          )
          : null
        }


        {/* 햄버거 토글 */}
        {this.state.isHamburgerOn ?
          <div className="hamburgerToggle_ON" onClick={this.handleHamburgerclick}>
            <div className="line-1"></div>
            <div className="line-2"></div>
            <div className="line-3"></div>
          </div>
          :
          <div className="hamburgerToggle_OFF" onClick={this.handleHamburgerclick}>
            <div className="line-1"></div>
            <div className="line-2"></div>
            <div className="line-3"></div>
          </div>
        }
      </div>
    );
  }
}

export default withRouter(Nav);
