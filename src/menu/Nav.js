import React from "react";
import axios from "axios";

import { BrowserRouter, withRouter, NavLink } from "react-router-dom";

//logo
import imgFile from "../image/logo_StarryNight.png";

/* components */
import AfterLogin from "./AfterLogin";
import BeforeLogin from "./BeforeLogin";

// afterLogin
import Gallery from "./Gallery";
import Favorites from "./Favorites";
import Mypage from "./Mypage";
import SignOut from "./SignOut";
import DoubleCheckRemoveUsers from "./remove_account/DoubleCheckRemoveUsers";
import CompletedRemoveUser from "./remove_account/CompletedRemoveUser";
import SocialLogInDisconnected from "./remove_account/SocialLogInDisconnected";

// beforeLogin
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import FindEmail from "./find_account/FindEmail";
import FindPw from "./find_account/FindPw";

//css
import "../css/Nav.scss";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHamburgerOn: false,

      currentUserInfo: {},

      // afterLogin
      isGalleryModalOpen: false,
      isFavoritesModalOpen: false,
      isMypageModalOpen: false,
      isSignOutModalOpen: false,
      isDoubleCheckRemoveUsersModalOpen: false,
      isCompletedRemoveUserModalOpen: false,
      isSocialLogInDisconnectedOpen: false,

      // beforeLogin
      isSignInModalOpen: false,
      isSignUpModalOpen: false,
      isFindEmailModalOpen: false,
      isFindPwModalOpen: false

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


  //! ----------------------- AfterLogin 모달 관련 메소드들: after과 관련 컴포넌트들 형제관계 형성. ------------------------------- */

  /* --------------------- 모달창 이벤트 --------------------- */
  // 각각의 모달창 중복 작동 방지를 위해 이벤트를 각각 생성
  // isModalOpen이 false로 변하면 아래 render부분에서 삼항연산자를 통해 false시 null효과를 받게되고 창은 꺼지게 할 것임.

  handleGalleryModal = () => {
    this.setState({
      isGalleryModalOpen: !this.state.isGalleryModalOpen
    })
  }
  galleryClick = () => {
    this.handleHamburgerclick()
    this.handleGalleryModal()
  }

  handleFavoritesModal = () => {
    this.setState({
      isFavoritesModalOpen: !this.state.isFavoritesModalOpen
    })
  }
  favoritesClick = () => {
    this.handleHamburgerclick()
    this.handleFavoritesModal()
  }

  handleMypageModal = () => {
    this.setState({
      isMypageModalOpen: !this.state.isMypageModalOpen
    })
    //! 모달창 띄웠을 때 body의 스크롤 방지
    //? 원래 모달오픈이 true이면 hidden으로 스크롤 방지가 되어야하는데 여기선 그 반대가 되야 작동 및 해제가 된다. 
    //? 왜 그런걸까............?..........ㅜㅜ........
    if (this.state.isMypageModalOpen === false) {
      document.body.style.overflow = "hidden";
    }
    if (this.state.isMypageModalOpen === true) {
      // 모달이 켜져있을 때 스크롤방지기능 작동했던 것을 다시 해제
      document.body.style.overflow = "unset";
    }
  }
  mypageClick = () => {
    this.handleHamburgerclick()
    this.handleMypageModal()

    // axios.get("https://api.mystar-story.com/user/mypage", {
    //   withCredentials: true
    // })
    //   .then((response) => {
    //     console.log("마이페이지 리스폰스 뭘받아와?", response)
    //     this.setState({
    //       ...this.state,
    //       currentUserInfo: {
    //         email: response.data.email,
    //         password: response.data.password,
    //         nickname: response.data.nickname,
    //         mobile: response.data.mobile,
    //         oauth: response.data.oauth,
    //         profile: response.data.profile
    //       }
    //     })
    //   })
    //   .catch((error) => {
    //     console.log(error.response.data)
    //   })
  }

  // handleSignOutModal = () => {
  //   this.setState({
  //     isSignOutModalOpen: !this.state.isSignOutModalOpen
  //   })
  // }

  handleDoubleCheckRemoveUsersModal = () => {
    this.setState({
      isDoubleCheckRemoveUsersModalOpen: !this.state.isDoubleCheckRemoveUsersModalOpen
    })
  }
  // Mypage로 props로 전달이 될 것. 
  // 회원 탈퇴버튼에 이벤트를 걸 예정이며,
  // 버튼 클릭과 동시에 여기(AfterLogin) 컴포넌트에서 Mypage를 false로 만들어 끄게 할 것이며
  // 그와 동시에 회원탈퇴 모달이 true로 바뀌어 작동할 수 있게끔 셋팅해주는 이벤트 핸들러.
  //! (주의) 한 개의 화면에 한 개의 모달을 띄우기 위해서는
  //! Mypage컴포넌트와 회원탈퇴 컴포넌트를 부모-자식 관계로 두면 꼬여버리니, 형제관계로 만들어 state끌어올리기 식으로 구현!
  //? 연동해체모달과 탈퇴완료 모달도 마찬가지.
  DoubleCheckRemoveUsersClick = () => {   // 회원탈퇴를 누르면  
    this.setState({
      isMypageModalOpen: !this.state.isMypageModalOpen    // 마이페이지 모달 끄고
    })
    this.handleDoubleCheckRemoveUsersModal()  // 정말 탈퇴할건지 재확인 모달 켜.
  }

  // 일반 회원 탈퇴 완료(더블체크컴포넌트와 형제관계 Yes! 부모관계 No!!!)
  handleCompletedRemoveUser = () => {
    this.setState({
      isCompletedRemoveUserModalOpen: !this.state.isCompletedRemoveUserModalOpen
    })
  }
  CompletedRemoveUserClick = () => {
    // 더블체크 모달에서 회원탈퇴를 누르는 순간 탈퇴 GET요청을 보내고 회원탈퇴완료모달 띄우기
    axios.get("https://api.mystar-story.com/user/delete", {    // 회원탈퇴 요청보내고
      withCredentials: true
    })
      .then((response) => {
        console.log("회원탈퇴 요청 성공 메세지 =>", response.data)
      })

    this.setState({
      isDoubleCheckRemoveUsersModalOpen: false    // 더블체크 모달 끄고
    })
    this.handleCompletedRemoveUser()    // 회원탈퇴완료 모달을 띄워라.
  }

  // 소셜로그인 성공시 구현 마무리 하기
  handleSocialLogInDisconnected = () => {
    this.setState({
      isSocialLogInDisconnectedOpen: !this.state.isSocialLogInDisconnectedOpen
    })
  }



  //! ----------------------- BeforeLogin 모달 관련 메소드들: before과 signIn, signUp 형제관계 형성. ------------------------------- */

  /* --------------------- 모달창 이벤트 --------------------- */
  // 각각의 모달창 중복 작동 방지를 위해 이벤트를 각각 생성
  // isModalOpen이 false로 변하면 아래 render부분에서 삼항연산자를 통해 false시 null효과를 받게되고 창은 꺼지게 할 것임.



  handleSignInModal = () => {
    this.setState({
      isSignInModalOpen: !this.state.isSignInModalOpen,   // state 불린값 반전 시키기
    })
  }

  signInClick = () => {         // 로그인 버튼 누르면  

    this.setState({
      isHamburgerOn: false      // Nav는 햄버거 모달을 끄고 
    })
    this.handleSignInModal()    // SignIn 모달을 켜라. 
    // this.myRef.current.classList.toggle("nav_link")

    // this.setState({
    //   isSignInModalOpen: true     
    // })

    // this.handleHamburgerclick()   // 햄버거 모달 꺼라
    // // this.handleSignInModal()    // 사인인 모달 켜고
    // if (this.isHamburgerOn === false) {
    //   this.setState({
    //     isSignInModalOpen: !!true
    //   })
    // }
  }

  handleSignUpModal = () => {
    this.setState({
      isSignUpModalOpen: !this.state.isSignUpModalOpen   // state 불린값 반전 시키기
    })
  }
  signUpClick = () => {   // 회원가입 버튼을 누르면
    this.setState({
      isHamburgerOn: false    // 부모 Nav는 햄버거 모달창을 종료하고
    })
    this.handleSignUpModal()    // SignUp 모달창을 활성화 시켜라.
  }



  handleFindEmailModal = () => {
    this.setState({
      isFindEmailModalOpen: !this.state.isFindEmailModalOpen
    })
  }
  FindEmailClick = () => {   // signin-findemail은 부모관계가 아닌 형제 관계를 형성하고, 클릭이벤트만 signin에게 props로 전달하여 이메일찾기버튼에 이벤트 걸고 발생한 이벤트를 state끌어올리기로 다시 가져온다음 다시 findemail로 전달한다.
    this.setState({         // 추가설명은 AfterLogin에 있음
      isSignInModalOpen: false // * 클릭과 동시에 signin이 false로 변경되면서 모달이 꺼지고, findemail모달이 true로 변하면서 활성화되어야 한다. (findemail모달도 활성화 작업 꼭 하기)
    })
    this.handleFindEmailModal()
  }


  handleFindPwModal = () => {
    this.setState({
      isFindPwModalOpen: !this.state.isFindPwModalOpen
    })
  }
  FindPwClick = () => {
    this.setState({
      isSignInModalOpen: false
    })
    this.handleFindPwModal()
  }

  render() {
    console.log("nav 프롭", this.props);
    console.log("마이페이지 불린값", this.state.isMypageModalOpen)
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
              handleHamburgerclick={this.handleHamburgerclick}
              galleryClick={this.galleryClick}
              favoritesClick={this.favoritesClick}
              mypageClick={this.mypageClick}
              // handleSignOut={this.props.handleSignOut}
              hamburgerModalOFFWithSignOut={this.hamburgerModalOFFWithSignOut}
            />
            :
            <BeforeLogin
              isHamburgerOn={this.state.isHamburgerOn}
              signInClick={this.signInClick}
              signUpClick={this.signUpClick}
              handleHamburgerclick={this.handleHamburgerclick}
              isSignInModalOpen={this.state.isSignInModalOpen}
              isSignUpModalOpen={this.state.isSignUpModalOpen}


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

        {/* ------afterLogin 관련 모달들 (형제관계로 변경함.) ----------------------- */}
        <Gallery
          isGalleryModalOpen={this.state.isGalleryModalOpen}
          // galleryClick={this.galleryClick}
          handleGalleryModal={this.handleGalleryModal}
        />
        <Favorites
          isFavoritesModalOpen={this.state.isFavoritesModalOpen}
          handleFavoritesModal={this.handleFavoritesModal}
        />

        {/* 회원탈퇴의 경우 마이페이지에서 자식컴포넌트로 생성하는 것보다는 마이페이지와 형제 관계를 형성한 후 
   마이페이지 컴포넌트에 위치한 "회원탈퇴" 버튼에 
   회원탈퇴 모달을 띄우기 위한 회원탈퇴 state=true변환이 아니라!
  "마이페이지 => false로 만드는 클릭이벤트만 props으로 내려 버튼에 건다!!"(발상의 전환) --> 
  --> 버튼을 클릭 시 발생하는 이벤트는 다시 state 끌어올리기로 인해 afterlogin 컴포넌트에서의 Mypage의 state값이 다시 false로 변환이되어
  Mypage 컴포넌트는 꺼지고 곧바로 회원탈퇴 모달이 켜지도록(handleDoubleCheckRemoveUsersModal) 이벤트핸들러를 혼합한다.  */}
        <Mypage
          // sendStateForMypage={this.state.currentUserInfo}
          isMypageModalOpen={this.state.isMypageModalOpen}
          handleMypageModal={this.handleMypageModal}  // 오버레이 누르면 모달 꺼지기
          DoubleCheckRemoveUsersClick={this.DoubleCheckRemoveUsersClick}  // 마이페이지 끄고 더블체크모달로 가기
        />
        <DoubleCheckRemoveUsers
          isOpen={this.state.isDoubleCheckRemoveUsersModalOpen}
          // handleModal={this.handleDoubleCheckRemoveUsersModal}  // 오버레이 누르면 모달 꺼지기
          redirectFromDoubleCheckToMypage={this.DoubleCheckRemoveUsersClick}  // 마이페이지로 "돌아가기"
          CompletedRemoveUserClick={this.CompletedRemoveUserClick}  // 회원탈퇴완료모달로 이동
        />
        <CompletedRemoveUser
          isOpen={this.state.isCompletedRemoveUserModalOpen}
        />

        {/* ------beforeLogin 관련 모달들 (형제관계로 변경함.) ----------------------- */}

        <SignIn
          isOpen={this.state.isSignInModalOpen}
          handleResponseSuccess={this.props.handleResponseSuccess}
          handleSignInModal={this.handleSignInModal} // overlay를 눌렀을때 모달창 꺼지도록 사용할 것임
          FindEmailClick={this.FindEmailClick}
          FindPwClick={this.FindPwClick}
        />
        <SignUp
          isOpen={this.state.isSignUpModalOpen}
          handleSignUpModal={this.handleSignUpModal}
        />
        <FindEmail
          isOpen={this.state.isFindEmailModalOpen}
          handleFindEmailModal={this.handleFindEmailModal}
        />

        <FindPw
          isOpen={this.state.isFindPwModalOpen}
          handleFindPwModal={this.handleFindPwModal}
        />
      </div>
    );
  }
}

export default withRouter(Nav);
