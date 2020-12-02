import React from "react";
import { BrowserRouter, withRouter, NavLink } from "react-router-dom";

//logo
import imgFile from "../image/logo_StarryNight.png";

//components
import HamburgerTemp from "./HamburgerTemp";
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
  //로고 클릭시 메인?페이지로 리다이렉트  --> 메인페이지 라우팅 연구 후 메인으로 리다이렉트 하는 걸로 하고 일단 landing페이지로 리다이렉트 하기.
  handleLogoClickToRedirectToMain = () => {
    this.props.history.push("/signIn");
  };

  /* 햄버거 토글 ON / OFF */
  /* state값 false -> true or true -> false 반전시키기 */
  handleHamburgerclick = () => {
    this.setState({
      isHamburgerOn: !this.state.isHamburgerOn,
    });
  };

  render() {
    console.log("nav 프롭", this.props);
    return (
      <>
        {/* <div className="nav_div"> */}
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
          (this.props.isLogin === true ? <AfterLogin /> : <BeforeLogin handleResponseSuccess={this.props.handleResponseSuccess} />)
          : <HamburgerTemp />}

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
      </>
    );
  }
}

export default withRouter(Nav);
