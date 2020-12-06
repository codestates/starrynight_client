import React from "react"
import { NavLink, withRouter } from "react-router-dom"
import axios from "axios"

// 로고
import imgFile from "../image/logo_StarryNight_Only_Letter.png";

//css
import "../css/SignIn.scss";


class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",

      // isFindEmailModalOpen: false,
      // isFindPwModalOpen: false
    }
  }


  /* --------------------- 모달창 이벤트 --------------------- */
  // 각각의 모달창 중복 작동 방지를 위해 이벤트를 각각 생성
  // isModalOpen이 true면 모달이 켜지고, 다시 false로 변하면 아래 render부분에서 삼항연산자를 통해 false시 null효과를 받게되고 창은 꺼지게 할 것임.

  // handleFindEmailModal = () => {
  //   this.setState({
  //     isFindEmailModalOpen: !this.state.isFindEmailModalOpen  // state의 불린값 반전
  //   })
  // }


  // handleFindPwModal = () => {
  //   this.setState({
  //     isFindPwModalOpen: !this.state.isFindPwModalOpen  // state의 불린값 반전
  //   })
  // }

  handleInputValue = (key) => (text) => {
    console.log('key', key)
    console.log('text', text)
    this.setState({
      [key]: text.target.value
    });
  };

  // 입력된 정보가  state에 할당이 되고 그 할당된 state값이 아래 signInInfo로 들어올 것임
  handleSignIn = () => {
    const signInInfo = {
      email: this.state.email,
      password: this.state.password
    };

    // 이메일 형식 기준
    for (let i = 0; i < signInInfo.email.length; i++) {
      if (!signInInfo.email.includes("@") || !signInInfo.email.includes(".")) {
        this.setState({
          errMsgOfEmailForm: "올바른 이메일 형식이 아닙니다."
        })
      }
    }

    // 이메일, 비밀번호 미입력시 에러 메세지 출력
    if (!signInInfo.email.length) {
      this.setState({
        errMsgOfEmailBlanks: "이메일을 입력하세요."
      })
    }
    if (!signInInfo.password.length) {
      this.setState({
        errMsgOfPasswordBlanks: "비밀번호를 입력하세요."
      })
    }
    else {
      axios.post("https://api.mystar-story.com/user/signin", signInInfo, {
        withCredentials: true
      })
        .then((response) => {
          console.log("사인인 뭘 받아와?", response)
          console.log("쿠키", document.cookie)

          const accessToken = response.data.accessToken;
          console.log("accessToken", accessToken)
          //API 요청하는 콜마다 헤더에 accseeToken을 담아 보내도록 설정
          // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          axios.defaults.headers.common['Authorization'] = accessToken;
          console.log("asdfasdfasdf", axios.defaults.headers)

          // accessToken을 localStorage, cookie 등에 저장하지 않는다.

          this.setState({
            // email: response.data.email,
            userId: response.data.userId,
            // loginPlatformId: response.data.loginPlatformId
          });
          this.doSignIn();
          this.props.history.push("/"); //로그인 response를 성공적으로 받아오면 모달창 꺼질 것. //! 임시 엔드포인트, 수정할 것!!!! //! 임시 엔드포인트, 수정할 것!!!!
          // this.props.history.push("/main");
        })
      // .catch((error) => )
    }
  }
  // 엔터키를 눌러도 로그인 버튼 누르게 하는 기능
  signInPress = (e) => {
    if (e.key === "Enter") {
      this.handleSignIn();
    }
  }

  //! 세션 스토리지에 저장 후, 중앙제어시스템격인 isLogin 스위치를 가지고 있는 main.js에서 만약 세션 스토리지에 email이 있다면 isLogin을 true로 혹은 false로 제어하여 하위 컴포넌트들이 이 영향을 받아 출력 혹은 비출력하게 할 것.
  doSignIn = () => {
    const { email, userId, loginPlatformId } = this.state;
    // window.sessionStorage.setItem("email", email);
    window.localStorage.setItem("userId", userId)
    // window.sessionStorage.setItem("loginPlatformId", loginPlatformId);
    this.props.handleResponseSuccess();   // Main-> Nav로 타고내려온 Main의 isLogin을 true로 바꿔줌
    this.props.handleSignInModal();
  }

  render() {
    console.log("BeforeLogin컴포넌트로부터 내려오는 사인인 프롭스", this.props)
    console.log("signIn 스테이트", this.state)
    return (

      <div>

        {this.props.isOpen ?
          <div className="modal_signIn">
            <div className="modal_signIn_overlay" onClick={this.props.handleSignInModal}></div>

            <div className="modal_signIn_content">
              {/* -------------------------- 로고삽입 칸 -------------------------*/}
              <img
                id="signIn_logo"
                src={imgFile} alt="Starry Night Logo"
              />
              {/* -------------------------- 이메일, pw 입력칸 --------------------*/}
              <form>
                <div className="Email_PW_container">
                  <div>사이즈 테스트 중</div>
                  <div className="email_div">
                    <span>이메일</span>
                    <input
                      type="email"
                      onChange={this.handleInputValue("email")}
                    />
                    <div>{this.state.errMsgOfEmailBlanks}</div>
                  </div>
                  <div className="pw_div">
                    <span>비밀번호</span>
                    <input
                      type="password"
                      onChange={this.handleInputValue("password")}
                    />
                    <div>{this.state.errMsgOfPasswordBlanks}</div>
                  </div>
                </div>
                {/* -------------------------- 이메일, pw 찾기 --------------------*/}
                <div className="findAccount_span">
                  <div className="find_Account">
                    <span onClick={this.props.FindEmailClick}>
                      이메일 찾기
                    </span>


                    <span> | </span>

                    <span onClick={this.props.FindPwClick}>
                      비밀번호 찾기
                    </span>
                  </div>
                </div>

              </form>
              {/* -------------------------- submit 버튼 칸 --------------------*/}
              <div>
                <div>
                  <button
                    className="signIn_Button"
                    // type="submit"
                    onClick={this.handleSignIn}
                    onKeyPress={this.signInPress}
                  >
                    로그인
                    </button>
                </div>
                <div>
                  <button className="signUp_Button_inSignIn">
                    <NavLink to="/signup">
                      회원 가입
                  </NavLink>
                  </button>
                </div>
                <div>

                  소셜로그인 버튼도 넣기
                  </div>
              </div>


            </div>
          </div>
          : null}

      </div>
    )
  }
}

export default withRouter(SignIn);
