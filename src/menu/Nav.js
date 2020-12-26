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
import CompletedRemoveSocial from "./remove_account/CompletedRemoveSocial";
import SocialLogInDisconnected from "./remove_account/SocialLogInDisconnected";

// beforeLogin
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import FindEmail from "./find_account/FindEmail";
import FindPw from "./find_account/FindPw";

import { IoIosAddCircle } from "react-icons/io";
import { MdAddAPhoto } from "react-icons/md";
import AddPhoto from "../AddPhoto";

//css
import "../css/Nav.scss";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHamburgerOn: false,
      isAddPhotoModalOpen: false,

      // 순전히 화면에 변경 전의 정보를 렌더하는 역할
      currentUserInfo: {
        email: "",
        password: "",
        nickname: "",
        mobile: "",
        oauth: "",
        profile: "",
      },

      // afterLogin
      isGalleryModalOpen: false,
      isFavoritesModalOpen: false,
      isMypageModalOpen: false,
      isSignOutModalOpen: false,
      isDoubleCheckRemoveUsersModalOpen: false,
      isCompletedRemoveUserModalOpen: false,
      isCompletedRemoveSocialOpen: false,

      // beforeLogin
      isSignInModalOpen: false,
      isSignUpModalOpen: false,
      isFindEmailModalOpen: false,
      isFindPwModalOpen: false,
    };
  }
  // !수정하기!
  //로고 클릭시 메인?페이지로 리다이렉트  --> 메인페이지 라우팅 연구 후 메인으로 리다이렉트 하는 걸로 하고 일단 main 페이지로 리다이렉트 하기.
  handleLogoClickToRedirectToMain = () => {
    console.log("잘클릭????롷고???");
    // this.props.history.push("/main");
    window.history.go(0);
    // window.location.href = "/";
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
  };

  //! ----------------------- AfterLogin 모달 관련 메소드들: after과 관련 컴포넌트들 형제관계 형성. ------------------------------- */

  /* --------------------- 모달창 이벤트 --------------------- */
  // 각각의 모달창 중복 작동 방지를 위해 이벤트를 각각 생성
  // isModalOpen이 false로 변하면 아래 render부분에서 삼항연산자를 통해 false시 null효과를 받게되고 창은 꺼지게 할 것임.

  handleGalleryModal = () => {
    this.setState({
      isGalleryModalOpen: !this.state.isGalleryModalOpen,
    });
  };

  // 이재성 건드림. <Gallery />와 연결
  galleryClick = () => {
    this.handleHamburgerclick();
    // this.handleGalleryModal();
    this.props.handleIsGalleryOpen();
  };

  handleFavoritesModal = () => {
    this.setState({
      isFavoritesModalOpen: !this.state.isFavoritesModalOpen,
    });
  };

  // 이재성 건드림. <Favorite />와 연결
  favoritesClick = () => {
    this.handleHamburgerclick();
    // this.handleFavoritesModal();
    this.props.handleIsFavoriteOpen();
  };

  handleMypageModal = () => {
    this.setState({
      isMypageModalOpen: !this.state.isMypageModalOpen,
    });
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
  };
  mypageClick = () => {
    this.handleHamburgerclick();
    this.handleMypageModal();

    axios
      .get("https://api.mystar-story.com/user/mypage", {
        withCredentials: true,
      })
      .then((response) => {
        console.log("마이페이지 리스폰스 뭘받아와?", response);
        this.setState({
          ...this.state,
          currentUserInfo: {
            loginPlatformId: response.data.loginPlatformId,
            email: response.data.email,
            password: response.data.password,
            nickname: response.data.nickname,
            mobile: response.data.mobile,
            oauth: response.data.oauth,
            profile: response.data.profilePath,
          },
        });
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  // handleSignOutModal = () => {
  //   this.setState({
  //     isSignOutModalOpen: !this.state.isSignOutModalOpen
  //   })
  // }

  handleDoubleCheckRemoveUsersModal = () => {
    this.setState({
      isDoubleCheckRemoveUsersModalOpen: !this.state
        .isDoubleCheckRemoveUsersModalOpen,
    });
  };
  // Mypage로 props로 전달이 될 것.
  // 회원 탈퇴버튼에 이벤트를 걸 예정이며,
  // 버튼 클릭과 동시에 여기(AfterLogin) 컴포넌트에서 Mypage를 false로 만들어 끄게 할 것이며
  // 그와 동시에 회원탈퇴 모달이 true로 바뀌어 작동할 수 있게끔 셋팅해주는 이벤트 핸들러.
  //! (주의) 한 개의 화면에 한 개의 모달을 띄우기 위해서는
  //! Mypage컴포넌트와 회원탈퇴 컴포넌트를 부모-자식 관계로 두면 꼬여버리니, 형제관계로 만들어 state끌어올리기 식으로 구현!
  //? 연동해체모달과 탈퇴완료 모달도 마찬가지.
  DoubleCheckRemoveUsersClick = () => {
    // 회원탈퇴를 누르면
    this.setState({
      isMypageModalOpen: !this.state.isMypageModalOpen, // 마이페이지 모달 끄고
    });
    this.handleDoubleCheckRemoveUsersModal(); // 정말 탈퇴할건지 재확인 모달 켜.
  };

  // 일반 회원 탈퇴 완료(더블체크컴포넌트와 형제관계 Yes! 부모관계 No!!!)
  handleCompletedRemoveUser = () => {
    this.setState({
      isCompletedRemoveUserModalOpen: !this.state.isCompletedRemoveUserModalOpen,
    });
  };

  CompletedRemoveUserClick = () => {
    // 더블체크 모달에서 회원탈퇴를 누르는 순간 탈퇴 GET요청을 보내고 회원탈퇴완료모달 띄우기
    axios
      .get("https://api.mystar-story.com/user/delete", {
        // 회원탈퇴 요청보내고
        withCredentials: true,
      })
      .then((response) => {
        console.log("회원탈퇴 요청 성공 메세지 =>", response.data);
      });

    this.setState({
      isDoubleCheckRemoveUsersModalOpen: false, // 더블체크 모달 끄고
    });
    this.handleCompletedRemoveUser(); // 회원탈퇴완료 모달을 띄워라.
  };

  // 소셜로그인 성공시 구현 마무리 하기
  handleCompletedRemoveSocial = () => {
    this.setState({
      isCompletedRemoveSocialOpen: !this.state.isCompletedRemoveSocialOpen
    })
  }
  CompletedRemoveSocialClick = () => {
    // 더블체크 모달에서 회원탈퇴를 누르는 순간 탈퇴 GET요청을 보내고 회원탈퇴완료모달 띄우기
    axios
      .get("https://api.mystar-story.com/user/delete", {
        // 회원탈퇴 요청보내고
        withCredentials: true,
      })
      .then((response) => {
        console.log("회원탈퇴 요청 성공 메세지 =>", response.data);
      });

    this.setState({
      isDoubleCheckRemoveUsersModalOpen: false, // 더블체크 모달 끄고
    });
    this.handleCompletedRemoveSocial(); // 회원탈퇴완료 모달을 띄워라.
  };

  //! ----------------------- BeforeLogin 모달 관련 메소드들: before과 signIn, signUp 형제관계 형성. ------------------------------- */

  /* --------------------- 모달창 이벤트 --------------------- */
  // 각각의 모달창 중복 작동 방지를 위해 이벤트를 각각 생성
  // isModalOpen이 false로 변하면 아래 render부분에서 삼항연산자를 통해 false시 null효과를 받게되고 창은 꺼지게 할 것임.

  handleSignInModal = () => {
    this.setState({
      isSignInModalOpen: !this.state.isSignInModalOpen, // state 불린값 반전 시키기
    });
  };

  signInClick = () => {
    // 로그인 버튼 누르면

    this.setState({
      isHamburgerOn: false, // Nav는 햄버거 모달을 끄고
    });
    this.handleSignInModal(); // SignIn 모달을 켜라.
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
  };

  handleSignUpModal = () => {
    this.setState({
      isSignUpModalOpen: !this.state.isSignUpModalOpen, // state 불린값 반전 시키기
    });
  };
  signUpClick = () => {
    // 회원가입 버튼을 누르면
    this.setState({
      isHamburgerOn: false, // 부모 Nav는 햄버거 모달창을 종료하고
    });
    this.handleSignUpModal(); // SignUp 모달창을 활성화 시켜라.
  };
  signUpClickInSignIn = () => {
    this.setState({
      isSignInModalOpen: !this.state.isSignInModalOpen,
    });
    this.handleSignUpModal();
  };

  handleFindEmailModal = () => {
    this.setState({
      isFindEmailModalOpen: !this.state.isFindEmailModalOpen,
    });
  };
  findEmailClick = () => {
    // signin-findemail은 부모관계가 아닌 형제 관계를 형성하고, 클릭이벤트만 signin에게 props로 전달하여 이메일찾기버튼에 이벤트 걸고 발생한 이벤트를 state끌어올리기로 다시 가져온다음 다시 findemail로 전달한다.
    this.setState({
      // 추가설명은 AfterLogin에 있음
      isSignInModalOpen: !this.state.isSignInModalOpen, // * 클릭과 동시에 signin이 false로 변경되면서 모달이 꺼지고, findemail모달이 true로 변하면서 활성화되어야 한다. (findemail모달도 활성화 작업 꼭 하기)
    });
    this.handleFindEmailModal();
  };
  linkToSignUpfromfindEmail = () => {
    this.setState({
      isSignUpModalOpen: !this.state.isSignUpModalOpen,
    });
    this.handleFindEmailModal();
  };

  handleFindPwModal = () => {
    this.setState({
      isFindPwModalOpen: !this.state.isFindPwModalOpen,
    });
  };
  findPwClick = () => {
    this.setState({
      isSignInModalOpen: false,
    });
    this.handleFindPwModal();
  };
  linkToSignUpfromfindPw = () => {
    // findPw모달에 이벤트클릭을 프롭스로 내리기 그 후 끌어올리기로 작동할 것임.
    this.setState({
      // signUp 모달 활성화
      isSignUpModalOpen: !this.state.isSignUpModalOpen,
    });
    this.handleFindPwModal(); // findPw 모달 비활성화
  };

  /* ------------------------- 소셜 로그인 ------------------------------- */

  // location 객체를 통해 Access Token을 URL 파라미터로부터 받아올 수 있다.
  // 받아온 쿼리스트링에 담긴 값 중 토큰만 추출
  getToken = () => {
    const query = window.location.search.substring(1);
    const token = query.split("access_token=")[1];

    // if (token !== undefined) {
    window.localStorage.setItem("token", token);
    // }
    axios.defaults.headers.common["Authorization"] = token;
  };

  googleLogin = () => {
    window.location.href =
      "https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/userinfo.profile&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=https%3A//api.mystar-story.com/user/signin/google&client_id=6637807643-0mis27736asip5thchf3v3ksk8mnor2f.apps.googleusercontent.com";
  };

  kakaoLogin = () => {
    window.location.href =
      "https://accounts.kakao.com/login?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fresponse_type%3Dcode%26redirect_uri%3Dhttps%253A%252F%252Fapi.mystar-story.com%252Fuser%252Fsignin%252Fkakao%26client_id%3D2b6f01d8fb5368ff66de28e3749cefda";
  };

  // 유저가 다시 직접 로그인하도록 유도하지 않고 조용히 자동으로 로그인 연장하는 기능

  componentDidMount() {
    // this.requestSignIn()

    // 여기서 didMount를 걸어야 마이페이지까지 authorization이 잘 전달됨. (새로고침해도!)
    const query = window.location.search.substring(1);
    const socialUserToken = query.split("access_token=")[1];
    const localUserToken = window.localStorage.getItem("token");
    if (socialUserToken !== undefined) {
      // 소셜로그인 토큰 저장: 쿼리스트링으로 담겨온 값 중 토큰을 추출하고 그것을 로컬스토리지에 저장하는 함수
      this.getToken();
    }
    // 일반로그인 토큰 받아와 로컬스토리지에 저장하는 것은 handleSignIn에서 함(로그인버튼 눌렀을때 로컬스토리지에 저장될 것. 그것을 꺼내 사용)
    else if (localUserToken) {
      axios.defaults.headers.common["Authorization"] = localUserToken;
    }
  }

  // 12/1 사진추가버튼 모달창 수정
  handleAddPhotoModal = () => {
    this.setState({ isAddPhotoModalOpen: !this.state.isAddPhotoModalOpen });
  };

  render() {
    console.log("nav 프롭", this.props);
    console.log("마이페이지 불린값", this.state.isMypageModalOpen);
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

        {/* 12/20 사진공유 모달창 위치수정 */}
        {this.props.isLogin ? (
          <div className="AddPhoto">
            <MdAddAPhoto
              className="AddPhoto-icon"
              onClick={this.handleAddPhotoModal}
              style={{ fontSize: `35px` }}
            />
            <AddPhoto
              // 12/8 로그인 유저의 토큰을 활용하기 위해 props로 상속추가
              localStorage={window.localStorage}
              isLogin={this.props.isLogin}
              isOpen={this.state.isAddPhotoModalOpen}
              handleModal={this.handleAddPhotoModal}
            />
          </div>
        ) : null}

        {/* 로그인 경우 vs 비로그인 경우로 나누기 */}

        {this.state.isHamburgerOn ? (
          this.props.isLogin === true ? (
            <AfterLogin
              isHamburgerOn={this.state.isHamburgerOn}
              handleHamburgerclick={this.handleHamburgerclick}
              galleryClick={this.galleryClick}
              favoritesClick={this.favoritesClick}
              mypageClick={this.mypageClick}
              // handleSignOut={this.props.handleSignOut}
              hamburgerModalOFFWithSignOut={this.hamburgerModalOFFWithSignOut}
            />
          ) : (
              <BeforeLogin
                isHamburgerOn={this.state.isHamburgerOn}
                signInClick={this.signInClick}
                signUpClick={this.signUpClick}
                handleHamburgerclick={this.handleHamburgerclick}
                isSignInModalOpen={this.state.isSignInModalOpen}
                isSignUpModalOpen={this.state.isSignUpModalOpen}
              />
            )
        ) : null}

        {/* 햄버거 토글 */}
        {this.state.isHamburgerOn ? (
          <div
            className="hamburgerToggle_ON"
            onClick={this.handleHamburgerclick}
          >
            <div className="line-1"></div>
            <div className="line-2"></div>
            <div className="line-3"></div>
          </div>
        ) : (
            <div
              className="hamburgerToggle_OFF"
              onClick={this.handleHamburgerclick}
            >
              <div className="line-1"></div>
              <div className="line-2"></div>
              <div className="line-3"></div>
            </div>
          )}

        {/* ------afterLogin 관련 모달들 (형제관계로 변경함.) ----------------------- */}
        {this.props.isLogin ? (
          <>
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
              mypageClick={this.mypageClick}
              currentUserInfo={this.state.currentUserInfo}
              isMypageModalOpen={this.state.isMypageModalOpen}
              handleMypageModal={this.handleMypageModal} // 오버레이 누르면 모달 꺼지기
              DoubleCheckRemoveUsersClick={this.DoubleCheckRemoveUsersClick} // 마이페이지 끄고 더블체크모달로 가기
            />
            <DoubleCheckRemoveUsers
              isOpen={this.state.isDoubleCheckRemoveUsersModalOpen}
              loginPlatformId={this.state.currentUserInfo.loginPlatformId}
              // handleModal={this.handleDoubleCheckRemoveUsersModal}  // 오버레이 누르면 모달 꺼지기
              redirectFromDoubleCheckToMypage={this.DoubleCheckRemoveUsersClick} // 마이페이지로 "돌아가기"
              CompletedRemoveUserClick={this.CompletedRemoveUserClick} // 회원탈퇴완료모달로 이동
              CompletedRemoveSocialClick={this.CompletedRemoveSocialClick} // 소셜 회원탈퇴모달로 이동
            />
            <CompletedRemoveUser
              isOpen={this.state.isCompletedRemoveUserModalOpen}
            />
            <CompletedRemoveSocial
              isCompletedRemoveSocialOpen={this.state.isCompletedRemoveSocialOpen}
            />
          </>
        ) : null}

        {/* ------beforeLogin 관련 모달들 (형제관계로 변경함.) ----------------------- */}

        <SignIn
          isOpen={this.state.isSignInModalOpen}
          handleResponseSuccess={this.props.handleResponseSuccess}
          handleSignInModal={this.handleSignInModal} // overlay를 눌렀을때 모달창 꺼지도록 사용할 것임
          findEmailClick={this.findEmailClick}
          findPwClick={this.findPwClick}
          signUpClickInSignIn={this.signUpClickInSignIn} // signIn 모달에서 회원가입 누르면 signIn모달꺼지고 signUp 모달 활성화
          getToken={this.getToken} // 소셜로그인
          googleLogin={this.googleLogin} // 소셜로그인
          kakaoLogin={this.kakaoLogin} // 소셜로그인
        />
        <SignUp
          isOpen={this.state.isSignUpModalOpen}
          handleSignUpModal={this.handleSignUpModal}
          redirectToSignIn={this.signUpClickInSignIn} // 이 이벤트가 만들어진 본래 목적은 402줄이지만 역으로 사인업모달 끄고, 사인인 모달 활성화 시킬 것임.
          getToken={this.getToken} // 소셜로그인
          googleLogin={this.googleLogin} // 소셜로그인
          kakaoLogin={this.kakaoLogin} // 소셜로그인
        />
        <FindEmail
          isFindEmailModalOpen={this.state.isFindEmailModalOpen}
          handleSignInModal={this.handleSignInModal} //  completedEmail에서 email을 찾은 후 곧바로 signIn모달로 가기 위해 여기에 props로 내림.
          handleFindEmailModal={this.handleFindEmailModal}
          handleFindPwModal={this.handleFindPwModal} // completedEmail에서 email을 찾은 후 곧바로 findPw모달로 가기 위해 여기에 props로 내림.
          linkToSignUpfromfindEmail={this.linkToSignUpfromfindEmail} // findEmail모달에서 signUp 모달로 이동
          getToken={this.getToken} // 소셜로그인
          googleLogin={this.googleLogin} // 소셜로그인
          kakaoLogin={this.kakaoLogin} // 소셜로그인
        />

        <FindPw
          isFindPwModalOpen={this.state.isFindPwModalOpen}
          linkToSignUpfromfindPw={this.linkToSignUpfromfindPw} // 회원가입 버튼을 누르면 findPw모달이 꺼지고 signUp모달이 활성화 될 것임.
          handleSignInModal={this.handleSignInModal} // completedFindPw에서 다시 로그인으로 돌아가게 하기 위함
          handleFindPwModal={this.handleFindPwModal}
          getToken={this.getToken} // 소셜로그인
          googleLogin={this.googleLogin} // 소셜로그인
          kakaoLogin={this.kakaoLogin} // 소셜로그인
        />
      </div>
    );
  }
}

export default withRouter(Nav);
