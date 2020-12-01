import React from "react"
import { withRouter, Switch, Route } from "react-router-dom"

//components
import Landing from "./Landing";
import Nav from "./menu/Nav"
import Gallery from "./menu/Gallery";
import Favorites from "./menu/Favorites";
import Mypage from "./menu/Mypage";
import SignOut from "./menu/SignOut";
// import SignIn from "./menu/SignIn";
import SignUp from "./menu/SignUp";
import FindEmail from "./menu/find_account/FindEmail";
import FindPw from "./menu/find_account/FindPw";
import CompletedFindEmail from "./menu/find_account/CompletedFindEmail"
import CompletedFindPw from "./menu/find_account/CompletedFindPw"
import ViewPhoto from "./library/ViewPhoto";


class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: false,
      isModalOpen: false,
      profilePath: "",
    };
  }

  // 11/29 백시우 추가 : 모달 활성화 메소드
  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  // 11/29 백시우 추가 : 모달 셧다운 메소드
  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    return (
      <withRouter>

        {/* <ul>
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
        </ul> */}

        {/* 11/28 백시우 추가 : 사진추가 아이콘 */}
        {/* <div className="AddPhoto">
          <IoIosAddCircle
            className="AddPhoto-icon"
            onClick={this.openModal}
          />
          <AddPhoto isOpen={this.state.isModalOpen} close={this.closeModal} />
        </div> */}

        {/* <Switch> */}
        {/* 햄버거 라우팅 세팅 */}

        {/* 라우팅과 동시에 렌더가 되는 효과로 main.js에 라우팅
        <Route exact path="/" component={Landing} />
        </Switch> */}

        <Nav isLogin={this.state.isLogin} />

        <Switch>

          {/* <Route path="/signin" component={SignIn} /> */}
          {/* <Route path="/findemail" component={FindEmail} /> */}
          {/* <Route path="/findpw" component={FindPw} />
          <Route path="/completedfindemail" component={CompletedFindEmail} />
          <Route path="/completedfindpw" component={CompletedFindPw} />
          <Route path="/signup" component={SignUp} /> */}
          {/* <Route path="/gallery" component={Gallery} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/mypage" component={Mypage} />
          <Route path="/signout" component={SignOut} /> */}

          {/* 뷰포토 라우팅 세팅 */}
          <Route path="/viewphoto" component={ViewPhoto} />
          {/* <Route path="/gallery" component={Gallery} />
            <Route path="/favorites" component={Favorites} />
            <Route path="/mypage" component={Mypage} />
            <Route path="/signout" component={SignOut} /> */}

          {/* 11/28 백시우 추가 : AddPhoto 라우팅 세팅 */}
          {/* <Route path="/addphoto" component={AddPhoto} /> */}
        </Switch>
      </withRouter>
    );
  }
}

export default withRouter(Main);