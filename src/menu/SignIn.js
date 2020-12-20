import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import Button from "./Button";
import { HiArrowNarrowRight } from "react-icons/hi";

import axios from "axios";

// 소셜로그인
import kakaoLogin from "react-kakao-login";

// 로고
import imgFile from "../image/logo_StarryNight_Only_Letter.png";
import kakaoLogo from "../image/kakao_login.png";
import googleLogo from "../image/google.png";
// import kakaolink_btn_medium from "../image/kakaolink_btn_medium.png";

//css
import "../css/SignIn.scss";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",

      // isFindEmailModalOpen: false,
      // isFindPwModalOpen: false
    };

    // 들어온 토큰 만료시간 설정 (24시간 밀리 초로 표현)
    const JWT_EXPIRY_TIME = 24 * 3600 * 1000;
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
    console.log("key", key);
    console.log("text", text);
    this.setState({
      [key]: text.target.value,
    });
  };

  // 입력된 정보가  state에 할당이 되고 그 할당된 state값이 아래 signInInfo로 들어올 것임
  handleSignIn = () => {
    const signInInfo = {
      email: this.state.email,
      password: this.state.password,
    };

    // 이메일 형식 기준
    for (let i = 0; i < signInInfo.email.length; i++) {
      if (!signInInfo.email.includes("@") || !signInInfo.email.includes(".")) {
        this.setState({
          errMsgOfEmailForm: "올바른 이메일 형식이 아닙니다.",
        });
      }
    }

    // 이메일, 비밀번호 미입력시 에러 메세지 출력
    if (!signInInfo.email.length) {
      this.setState({
        errMsgOfEmailBlanks: "이메일을 입력하세요.",
      });
    }
    if (!signInInfo.password.length) {
      this.setState({
        errMsgOfPasswordBlanks: "비밀번호를 입력하세요.",
      });
    } else {
      // 로그인 요청
      this.requestSignIn();
      // this.doSignIn();
      // this.props.history.push("/"); //로그인 response를 성공적으로 받아오면 모달창 꺼질 것. //! 임시 엔드포인트, 수정할 것!!!! //! 임시 엔드포인트, 수정할 것!!!!
      // this.props.history.href = "/";
      // window.location.href = "/";
    }
  };

  // 로그인 요청
  requestSignIn = () => {
    const signInInfo = {
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post("https://api.mystar-story.com/user/signin", signInInfo, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("사인인 뭘 받아와?", response);

        const accessToken = response.data.accessToken;
        window.localStorage.setItem("token", accessToken);

        // const token = window.localStorage.getItem("token")
        // console.log("token", token)
        //API 요청하는 콜마다 헤더에 accseeToken을 담아 보내도록 설정
        // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        // axios.defaults.headers.common['Authorization'] = token;

        // accessToken을 localStorage, cookie 등에 저장하지 않는다.

        this.setState({
          // email: response.data.email,
          userId: response.data.userId,
          // loginPlatformId: response.data.loginPlatformId
        });
        this.doSignIn();
        // this.props.history.push("/"); //로그인 response를 성공적으로 받아오면 모달창 꺼질 것. //! 임시 엔드포인트, 수정할 것!!!! //! 임시 엔드포인트, 수정할 것!!!!
        // 새로고침하여 true로 변한 값 완벽하게 셋팅하기
        history.go(0); //로그인 response를 성공적으로 받아오면 모달창 꺼질 것. //! 임시 엔드포인트, 수정할 것!!!! //! 임시 엔드포인트, 수정할 것!!!!
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };

  // /* ------------------------- 소셜 로그인 ------------------------------- */

  // // location 객체를 통해 Access Token을 URL 파라미터로부터 받아올 수 있다.
  // // 받아온 쿼리스트링에 담긴 값 중 토큰만 추출
  // getToken = () => {
  //   const query = window.location.search.substring(1)
  //   const token = query.split('access_token=')[1]

  //   // if (token !== undefined) {
  //   window.localStorage.setItem("token", token)
  //   // }
  //   axios.defaults.headers.common['Authorization'] = token;
  // }

  // googleLogin = () => {
  //   window.location.href = "https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/userinfo.profile&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=https%3A//api.mystar-story.com/user/signin/google&client_id=6637807643-0mis27736asip5thchf3v3ksk8mnor2f.apps.googleusercontent.com"

  // }

  // kakaoLogin = () => {
  //   window.location.href = "https://accounts.kakao.com/login?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fresponse_type%3Dcode%26redirect_uri%3Dhttps%253A%252F%252Fapi.mystar-story.com%252Fuser%252Fsignin%252Fkakao%26client_id%3D2b6f01d8fb5368ff66de28e3749cefda"
  // }

  // // 유저가 다시 직접 로그인하도록 유도하지 않고 조용히 자동으로 로그인 연장하는 기능

  // componentDidMount() {
  //   // this.requestSignIn()

  //   // 여기서 didMount를 걸어야 마이페이지까지 authorization이 잘 전달됨. (새로고침해도!)
  //   const query = window.location.search.substring(1)
  //   const socialUserToken = query.split('access_token=')[1]
  //   const localUserToken = window.localStorage.getItem("token")
  //   if (socialUserToken !== undefined) {
  //     // 소셜로그인 토큰 저장: 쿼리스트링으로 담겨온 값 중 토큰을 추출하고 그것을 로컬스토리지에 저장하는 함수
  //     this.getToken()
  //   }
  //   // 일반로그인 토큰 받아와 로컬스토리지에 저장하는 것은 handleSignIn에서 함(로그인버튼 눌렀을때 로컬스토리지에 저장될 것. 그것을 꺼내 사용)
  //   else if (localUserToken) {
  //     axios.defaults.headers.common['Authorization'] = localUserToken;
  //   }
  // }

  // 엔터키를 눌러도 로그인 버튼 누르게 하는 기능 ---> 비밀번호 input칸에 적용시키자.
  signInPress = (e) => {
    if (e.key === "Enter") {
      this.handleSignIn();
    }
  };

  //! 세션 스토리지에 저장 후, 중앙제어시스템격인 isLogin 스위치를 가지고 있는 main.js에서 만약 세션 스토리지에 email이 있다면 isLogin을 true로 혹은 false로 제어하여 하위 컴포넌트들이 이 영향을 받아 출력 혹은 비출력하게 할 것.
  doSignIn = () => {
    const { email, userId, loginPlatformId } = this.state;
    // window.sessionStorage.setItem("email", email);
    window.localStorage.setItem("userId", userId);
    // window.sessionStorage.setItem("loginPlatformId", loginPlatformId);
    this.props.handleResponseSuccess(); // Main-> Nav로 타고내려온 Main의 isLogin을 true로 바꿔줌
    this.props.handleSignInModal();
  };

  render() {
    console.log("BeforeLogin컴포넌트로부터 내려오는 사인인 프롭스", this.props);
    console.log("signIn 스테이트", this.state);
    return (
      <div>
        {this.props.isOpen ? (
          <div className="modal_signIn">
            <div
              className="modal_signIn_overlay"
              onClick={this.props.handleSignInModal}
            ></div>

            <div className="modal_signIn_content">
              {/* -------------------------- 로고삽입 칸 -------------------------*/}
              <h1>Starry Night</h1>
              {/* <img
                id="signIn_logo"
                src={imgFile} alt="Starry Night Logo"
              /> */}
              <div className="box">
                {/* -------------------------- 이메일, pw 입력칸 --------------------*/}
                <div className="container_signIn">
                  <div className="Email_PW_container">
                    <div className="user_title">USER</div>
                    <div className="email_div">
                      {/* <span>이메일</span> */}
                      <input
                        placeholder="이메일을 입력하세요."
                        type="email"
                        onChange={this.handleInputValue("email")}
                      />
                      <div>{this.state.errMsgOfEmailBlanks}</div>
                    </div>
                    <div className="pw_div">
                      {/* <span>비밀번호</span> */}
                      <input
                        className="input_pw_singin"
                        placeholder="비밀번호를 입력하세요."
                        type="password"
                        onChange={this.handleInputValue("password")}
                        onKeyPress={this.signInPress}
                      />
                      <div>{this.state.errMsgOfPasswordBlanks}</div>
                    </div>
                  </div>
                  {/* -------------------------- 이메일, pw 찾기 --------------------*/}
                  <div className="find_container">
                    <div className="findAccount_span">
                      <div className="find_Account">
                        <span
                          onClick={this.props.findEmailClick}
                          className="findEmailPw"
                        >
                          이메일 찾기
                        </span>

                        <span> | </span>

                        <span
                          onClick={this.props.findPwClick}
                          className="findEmailPw"
                        >
                          비밀번호 찾기
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* -------------------------- submit 버튼 칸 --------------------*/}
                  <div className="button_container_signin">
                    <div>
                      <Button
                        onClick={this.handleSignIn}
                        size="small"
                        // fullWidth
                        // color="black"
                        color="gray"
                        middleWidth_main_btn
                      // smallWidth
                      // className="Button_in_signIn"
                      // type="submit"
                      >
                        로그인
                        <HiArrowNarrowRight className="signIn_icon" />
                      </Button>
                    </div>

                    <Button
                      size="small"
                      // fullWidth
                      middleWidth_main_btn
                      // smallWidth
                      onClick={this.props.signUpClickInSignIn}
                    >
                      회원 가입
                    </Button>
                  </div>
                </div>

                <div className="division_line"></div>

                <div className="container2_siginIn">
                  <div className="socialLogin">
                    <div id="social_login_title">SOCIAL LOGIN</div>
                    {/* <span onClick={this.googleLogin}>구글</span> */}

                    {/* --------------------------로그인 아이콘--------------------------------- */}
                    {/* <img
                      className="socialLogin_btn"
                      src={googleLogo} alt="구글 로그인"
                      onClick={this.googleLogin}
                    /> */}
                    {/* <span> || </span> */}
                    {/* <img
                      className="socialLogin_btn"
                      src={kakaoLogo} alt="카카오 로그인"
                      onClick={this.kakaoLogin}
                    />W */}
                    <div className="socialLogin_btn">
                      <Button
                        color="red"
                        outline
                        smallWidth_singin
                        onClick={this.props.googleLogin}
                      >
                        Google
                      </Button>
                    </div>
                    <div className="socialLogin_btn">
                      <Button
                        color="gray"
                        outline
                        smallWidth_singin
                        onClick={this.props.kakaoLogin}
                      >
                        Kakao
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default withRouter(SignIn);

/*
구글
https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/userinfo.profile&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=https%3A//api.mystar-story.com/googleCallback&client_id=6637807643-0mis27736asip5thchf3v3ksk8mnor2f.apps.googleusercontent.com

카카오
https://accounts.kakao.com/login?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fresponse_type%3Dcode%26redirect_uri%3Dhttps%253A%252F%252Fapi.mystar-story.com%252Fuser%252Fsignin%252Fkakao%26client_id%3D2b6f01d8fb5368ff66de28e3749cefda
*/
