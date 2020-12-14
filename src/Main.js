import React from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import axios from "axios";

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


// scoll to top
import { HiChevronUp } from "react-icons/hi"


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      isAddPhotoModalOpen: false,
      isAllOpen: true,
      isGalleryOpen: false,
      isFavoriteOpen: false,
    };
  }

  // isGalleryOpen을 변환함
  handleIsGalleryOpen = () => {
    this.setState({
      isAllOpen: false,
      isGalleryOpen: true,
      isFavoriteOpen: false,
    });
  };

  // isFavoriteOpen을 변환함
  handleIsFavoriteOpen = () => {
    this.setState({
      isAllOpen: false,
      isGalleryOpen: false,
      isFavoriteOpen: true,
    });
  };

  // isAllOpen을 변환함
  handleIsAllOpen = () => {
    this.setState({
      isAllOpen: true,
      isGalleryOpen: false,
      isFavoriteOpen: false,
    });
  };

  // SignIn을 성공하고 sessionStorage에 저장된 axios로 받아온 정보를 불러와 req하자.
  handleResponseSuccess = () => {
    axios.get("https://api.mystar-story.com/main", {
      withCredentials: true
    })
      .then((response) => {
        // window.localStorage.setItem("responseMsg", response.data)
        this.setState({
          isLogin: true,
        });
      })
      .catch((error) => {
        console.log(error.response.data)
        // alert(error.response.data)
      })
  };

  handleSignOut = () => {
    this.setState({
      isLogin: false,
    });
    //순서대로 작동하는 js특성을 이용
    if (this.state.isLogin === true) {
      alert("로그아웃에 성공하였습니다 :)");
    }
    this.doSignOut();

  };

  // 세션스토리지 저장 정보 모두 삭제. (세션 스토리지 정보로 새로고침 로그인 유지 기능을 더이상 사용하지 않기 위함.)
  doSignOut = () => {
    axios.get("https://api.mystar-story.com/user/signout", {
      withCredentials: true
    })
      .then(response => {
        console.log("로그아웃 성공!", response.data)
      })
    window.localStorage.clear();
    window.location.href = "/"

  };

  scrollToTop = () => {
    document.querySelector('.flex').scrollIntoView({ behavior: 'smooth' });
    // window.scrollIntoView({ behavior: 'smooth' });
    // let location1 = document.querySelector("#nav").offsetTop;
    // document.querySelector(".scrolledsection").scrollTo(0, 0)
    // document.querySelector(".scrolledsection").scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    // document.querySelector(".flex").scrollTo({ top: location1, behavior: "smooth" })
    // document.querySelector("#nav").scrollTo(location1, 0)
    // console.log("좌표", location1)

  }

  //! 세션 스토리지에 저장 후, 중앙제어시스템격인 isLogin 스위치를 가지고 있는 main.js에서 만약 세션 스토리지에 email이 있다면 isLogin을 true로 혹은 false로 제어하여 하위 컴포넌트들이 이 영향을 받아 출력 혹은 비출력하게 할 것.
  componentDidMount() {
    if (window.localStorage.getItem("token")) {

      this.setState({
        isLogin: true,
      });
    }
    // 이미 로그아웃 기능이 작동했지만, didmount로 더블체크 하게 함.
    else {
      this.setState({
        isLogin: false
      });
      window.localStorage.clear();
    }


  }

  // 12/1 사진추가버튼 모달창 수정
  handleAddPhotoModal = () => {
    this.setState({ isAddPhotoModalOpen: !this.state.isAddPhotoModalOpen });
  };

  render() {
    console.log("main.js isLogin 상태", this.state.isLogin);
    return (
      <>
        <div id="nav">
          {
            <Nav
              isLogin={this.state.isLogin}
              handleResponseSuccess={this.handleResponseSuccess}
              handleSignOut={this.handleSignOut}
              handleIsGalleryOpen={this.handleIsGalleryOpen}
              handleIsFavoriteOpen={this.handleIsFavoriteOpen}
            />
          }
        </div>
        <br />
        {/* br 이거 왜 지우면 에러코드 뜨고 무한로딩 돌지?? */}
        <br />
        <div className="top"></div>

        {/* <div style={{ fontSize: `1rem`, color: `white`, textAlign: `center` }}>
          이곳은 ViewPhoto.js의 All.js, 사진 라이브러리 그리드가 위치할 곳
        </div> */}
        <ViewPhoto
          isAllOpen={this.state.isAllOpen}
          isGalleryOpen={this.state.isGalleryOpen}
          isFavoriteOpen={this.state.isFavoriteOpen}
        />

        {/* 12/1 사진추가버튼 모달창 수정 */}
        {this.state.isLogin ? (
          <div className="AddPhoto">
            <IoIosAddCircle
              className="AddPhoto-icon"
              onClick={this.handleAddPhotoModal}
            />
            <AddPhoto
              // 12/8 로그인 유저의 토큰을 활용하기 위해 props로 상속추가
              localStorage={window.localStorage}
              isLogin={this.state.isLogin}
              isOpen={this.state.isAddPhotoModalOpen}
              handleModal={this.handleAddPhotoModal}
            />
          </div>

        ) : null}
        <div className="scoll_to_top">
          <HiChevronUp
            className="icons_to_top"
            // size="2.5rem"
            onClick={this.scrollToTop}
          />
        </div>
      </>
    );
  }
}

export default withRouter(Main);
