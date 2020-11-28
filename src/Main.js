import React from "react";
import { Switch, BrowserRouter, Link, Route } from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscAccount } from "react-icons/vsc";
import AddPhoto from "./AddPhoto";
import Hamburger from "../src/menu/Hamburger";
// import SignIn from "../src/menu/SignIn"
// import SignUp from "../src/menu/SignUp"
import ViewPhoto from "../src/library/ViewPhoto";
// import Gallery from "../src/library/Gallery";
// import Favorites from "../src/library/Favorites";
// import Mypage from "../src/library/Mypage";
// import SignOut from "../src/library/SignOut";
import HamburgerBox from "../src/image/hamburger-box.jpg";
import "../src/css/Main.scss";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      profilePath: "",
    };
  }

  render() {
    const listStyle = {
      textDecoration: `none`,
      color: `black`,
    };
    return (
      <>
        <BrowserRouter>
          <ul>
            <div className="Hamburger-box">
              <img src={HamburgerBox} />
              <div className="Hamburger-profile">
                {!this.state.isLogin ? <VscAccount /> : this.state.profilePath}
              </div>
              <div className="Hamburger-icon">
                <GiHamburgerMenu />
              </div>
            </div>
            {!this.state.isLogin ? (
              <div className="Hamburger-item">
                <li>
                  <Link to="/signin" style={listStyle}>
                    로그인
                  </Link>
                </li>
                <li>
                  <Link to="/signup" style={listStyle}>
                    회원가입
                  </Link>
                </li>
              </div>
            ) : (
              <div className="Hamburger-item">
                <li>
                  <Link to="/gallery" style={listStyle}>
                    갤러리
                  </Link>
                </li>
                <li>
                  <Link to="/favorites" style={listStyle}>
                    즐겨찾기
                  </Link>
                </li>
                <li>
                  <Link to="/mypage" style={listStyle}>
                    마이페이지
                  </Link>
                </li>
                <li>
                  <Link to="/signout" style={listStyle}>
                    로그아웃
                  </Link>
                </li>
              </div>
            )}
          </ul>
          <div className="AddPhoto">
            <IoIosAddCircle />
          </div>
          <Switch>
            {/* 햄버거 라우팅 세팅 */}
            <Route path="/hamburger" component={Hamburger} />
            {/* <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} /> */}

            {/* 뷰포토 라우팅 세팅 */}
            <Route path="/viewphoto" component={ViewPhoto} />
            {/* <Route path="/gallery" component={Gallery} />
            <Route path="/favorites" component={Favorites} />
            <Route path="/mypage" component={Mypage} />
            <Route path="/signout" component={SignOut} /> */}
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default Main;
