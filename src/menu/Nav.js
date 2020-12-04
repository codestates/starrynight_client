import React from "react";
import { BrowserRouter, withRouter, NavLink } from "react-router-dom";

//logo
import imgFile from "../image/logo_StarryNight.png";

//components
import AfterLogin from "./AfterLogin";
import BeforeLogin from "./BeforeLogin";

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


  //! ----------------------- signIn 관련 & signUp 모달 관련 메소드들: before과 signIn, signUp 형제관계 형성. ------------------------------- */

  /* --------------------- 모달창 이벤트 --------------------- */
  // 각각의 모달창 중복 작동 방지를 위해 이벤트를 각각 생성
  // isModalOpen이 false로 변하면 아래 render부분에서 삼항연산자를 통해 false시 null효과를 받게되고 창은 꺼지게 할 것임.



  handleSignInModal = () => {
    this.setState({
      isSignInModalOpen: !this.state.isSignInModalOpen,   // state 불린값 반전 시키기
    })
    // this.props.handleHamburgerclick()
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
              signInClick={this.signInClick}
              handleHamburgerclick={this.handleHamburgerclick}
              isSignInModalOpen={this.state.isSignInModalOpen}
              handleSignInModal={this.handleSignInModal}
              isSignUpModalOpen={this.state.isSignUpModalOpen}
              handleSignUpModal={this.handleSignUpModal}

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



        <SignIn
          isOpen={this.state.isSignInModalOpen}
          handleResponseSuccess={this.props.handleResponseSuccess}
          handleModal={this.handleSignInModal} // overlay를 눌렀을때 모달창 꺼지도록 사용할 것임
          FindEmailClick={this.FindEmailClick}
          FindPwClick={this.FindPwClick}
        />
        <SignUp
          isOpen={this.state.isSignUpModalOpen}
          handleModal={this.handleSignUpModal}
        />
        <FindEmail
          isOpen={this.state.isFindEmailModalOpen}
          handleModal={this.handleFindEmailModal}
        />

        <FindPw
          isOpen={this.state.isFindPwModalOpen}
          handleModal={this.handleFindPwModal}
        />
      </div>
    );
  }
}

export default withRouter(Nav);
