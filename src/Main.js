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


import { IoIosAddCircle } from "react-icons/io";
import AddPhoto from "./AddPhoto";

// css
import "../src/css/Main.scss";

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
      <div>
        <Nav isLogin={this.state.isLogin} />


        <br />
        <hr />
        <br />
        <div style={{ fontSize: `1rem`, color: `white`, textAlign: `center` }}>
          이곳은 Nav.js, 로그와 햄벅 메뉴가 위치할 곳
        </div>
        <br />
        <hr />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div style={{ fontSize: `1rem`, color: `white`, textAlign: `center` }}>
          이곳은 ViewPhoto.js의 All.js, 사진 라이브러리 그리드가 위치할 곳
        </div>

        {/* 11/28 백시우 추가 : 사진추가 아이콘 */}
        <div className="AddPhoto">
          <IoIosAddCircle className="AddPhoto-icon" onClick={this.openModal} />
          <AddPhoto isOpen={this.state.isModalOpen} close={this.closeModal} />
        </div>
      </div>
    );
  }
}

export default withRouter(Main);