import React from "react";
import { withRouter, Switch, Route } from "react-router-dom";

//components
import Landing from "./Landing";
import Nav from "./menu/Nav";
import Gallery from "./menu/Gallery";
import Favorites from "./menu/Favorites";
import Mypage from "./menu/Mypage";
import SignOut from "./menu/SignOut";
// import SignIn from "./menu/SignIn";
import SignUp from "./menu/SignUp";
import FindEmail from "./menu/find_account/FindEmail";
import FindPw from "./menu/find_account/FindPw";
import CompletedFindEmail from "./menu/find_account/CompletedFindEmail";
import CompletedFindPw from "./menu/find_account/CompletedFindPw";
import ViewPhoto from "./library/ViewPhoto";

import { IoIosAddCircle } from "react-icons/io";
import AddPhoto from "./AddPhoto";

// css
import "../src/css/Main.scss";

// 재성_All.jstest
import All from "./library/All";
import "./css/All.css";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      isAddPhotoModalOpen: false,
    };
  }

  // 12/1 사진추가버튼 모달창 수정
  handleAddPhotoModal = () => {
    this.setState({ isAddPhotoModalOpen: !this.state.isAddPhotoModalOpen });
  };

  render() {
    return (
      <>
        <div className="nav">{<Nav isLogin={this.state.isLogin} />}</div>
        <br />
        <hr />
        <br />
        {/* <div style={{ fontSize: `1rem`, color: `white`, textAlign: `center` }}>
          이곳은 ViewPhoto.js의 All.js, 사진 라이브러리 그리드가 위치할 곳
        </div> */}
        <ViewPhoto />
        {/* <All /> */}

        {/* 12/1 사진추가버튼 모달창 수정 */}
        {!this.state.isLogin ? (
          <div className="AddPhoto">
            <IoIosAddCircle
              className="AddPhoto-icon"
              onClick={this.handleAddPhotoModal}
            />
            <AddPhoto
              isLogin={this.state.isLogin}
              isOpen={this.state.isAddPhotoModalOpen}
              handleModal={this.handleAddPhotoModal}
            />
          </div>
        ) : null}
      </>
    );
  }
}

export default withRouter(Main);
