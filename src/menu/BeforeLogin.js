import React from "react";
import { NavLink } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import FindEmail from "./find_account/FindEmail";
import FindPw from "./find_account/FindPw";

class BeforeLogin extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   isSignInModalOpen: false,
    //   isSignUpModalOpen: false,
    //   isFindEmailModalOpen: false,
    //   isFindPwModalOpen: false
    // };
  };

  // /* --------------------- 모달창 이벤트 --------------------- */
  // // 각각의 모달창 중복 작동 방지를 위해 이벤트를 각각 생성
  // // isModalOpen이 false로 변하면 아래 render부분에서 삼항연산자를 통해 false시 null효과를 받게되고 창은 꺼지게 할 것임.



  // handleSignInModal = () => {
  //   this.setState({
  //     isSignInModalOpen: !this.state.isSignInModalOpen,   // state 불린값 반전 시키기
  //   })
  //   // this.props.handleHamburgerclick()
  // }

  // signInClick = () => {         // 로그인 버튼 누르면  


  //   // this.myRef.current.classList.toggle("nav_link")

  //   // this.setState({
  //   //   isSignInModalOpen: true     
  //   // })

  //   this.props.handleHamburgerclick()   // 햄버거 모달 꺼라
  //   // this.handleSignInModal()    // 사인인 모달 켜고
  //   if (this.props.isHamburgerOn === false) {
  //     this.setState({
  //       isSignInModalOpen: !!true
  //     })
  //   }
  // }

  // handleSignUpModal = () => {
  //   this.setState({
  //     isSignUpModalOpen: !this.state.isSignUpModalOpen   // state 불린값 반전 시키기
  //   })
  // }



  // handleFindEmailModal = () => {
  //   this.setState({
  //     isFindEmailModalOpen: !this.state.isFindEmailModalOpen
  //   })
  // }
  // FindEmailClick = () => {   // signin-findemail은 부모관계가 아닌 형제 관계를 형성하고, 클릭이벤트만 signin에게 props로 전달하여 이메일찾기버튼에 이벤트 걸고 발생한 이벤트를 state끌어올리기로 다시 가져온다음 다시 findemail로 전달한다.
  //   this.setState({         // 추가설명은 AfterLogin에 있음
  //     isSignInModalOpen: false // * 클릭과 동시에 signin이 false로 변경되면서 모달이 꺼지고, findemail모달이 true로 변하면서 활성화되어야 한다. (findemail모달도 활성화 작업 꼭 하기)
  //   })
  //   this.handleFindEmailModal()
  // }


  // handleFindPwModal = () => {
  //   this.setState({
  //     isFindPwModalOpen: !this.state.isFindPwModalOpen
  //   })
  // }
  // FindPwClick = () => {
  //   this.setState({
  //     isSignInModalOpen: false
  //   })
  //   this.handleFindPwModal()
  // }



  render() {
    console.log("비포로그인 프롭스", this.props)
    return (

      <div>

        {this.props.isHamburgerOn ?

          <div className="menuList_Before_Login">
            <div className="modal_menuList_Before_Login_overlay" onClick={this.props.handleHamburgerclick}></div>
            {/* 비로그인 경우 */}

            <div className="nav_link">

              <div className="list" onClick={this.props.signInClick}>
                로그인
              </div>

              {/* 이중 모달 방지를 위해 beforlogin과 signIn 을 형제관계로 만들고 여기 nav에 singIn 달아놈 . beforelogin에서 올라오는걸 nav가 건져 전달해줄것임. */}
              {/* <SignIn
                isOpen={this.state.isSignInModalOpen}
                handleResponseSuccess={this.props.handleResponseSuccess}
                handleModal={this.handleSignInModal} // overlay를 눌렀을때 모달창 꺼지도록 사용할 것임
                FindEmailClick={this.FindEmailClick}
                FindPwClick={this.FindPwClick}
              /> */}

              <div className="list" onClick={this.props.signUpClick}>
                회원 가입
              </div>
              {/* <SignUp
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
              /> */}

            </div>
          </div>
          : null}



      </div>

    )
  }
}

export default BeforeLogin;