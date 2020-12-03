import React from "react";
import axios from 'axios'

//css
import "../css/SignUp.scss";


class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      nickname: "",
      password: "",
      mobile: "",
    }
  }


  // 모달창이 꺼지고 다시 회원가입 모달 활성화했을 때, 기본 유저정보 State와 에러메세지가 계속 띄어져있는 것을 방지하기 위해
  // state값을 빈 스트링으로 렌더링 시킨다.
  // componentWillUpdate에 걸어둔다.
  errMsgInit = () => {
    if (this.props.isOpen === false) {
      console.log("초기화 됨?")
      this.setState({
        email: "",
        nickname: "",
        password: "",
        mobile: "",
        errMsgOfEmailBlanks: "",
        errMsgOfNickNameBlanks: "",
        errMsgOfPasswordBlanks: "",
        errMsgOfMobileBlanks: ""
      })
    }
  }


  // 정보입력 이벤트
  // State 할당: 입력받은 정보를 위의 빈 스트링으로 셋팅이 된 state값을 채운다.

  //! 콜백을 사용하는 이유: 입력값 한글자라도 그 존재여부에 따라 에러메세지를 실시간으로 바로 지우기 위함.
  handleInputValue = (key) => (text) => {
    console.log("ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ입력된 정보 할당")
    // console.log("잘입력되요?")
    // console.log("key", key)
    // console.log("text", text)
    this.setState({
      [key]: text.target.value
    });

    // 에러메세지의 state값을 업데이트하고 아래 렌더부분에서 렌더시킨다.
    // 에러메세지 - email
    //! !this.state.email.length를 사용하면 사용자의 입력행위로 length가 1이상이 되었음에도 불구하고 0으로 인식하여 에러메세지를 출력. 따라서 ""를 사용. 
    //! 또한 다음 input을 채우는 행위를 하면 직전에 작성한 input 쪽에서 작성한 정보가 말그대로 ""가 아니기에 에러메세지를 그제서야 출력 따라서 & !length 를 사용.
    // if (this.state.email !== "") {
    if (this.state.email.length > 0) {
      this.setState({
        errMsgOfEmailBlanks: "",
      })
      console.log("ㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴ에러메세지 초기화")
    }

    if (this.state.nickname !== "") {
      this.setState({
        errMsgOfNickNameBlanks: "",
      })
    }

    if (this.state.password !== "") {
      this.setState({
        errMsgOfPasswordBlanks: "",
      })
    }

    if (this.state.mobile !== "") {
      this.setState({
        errMsgOfMobileBlanks: ""
      })
    }


    // if (this.state.email !== "" && !this.state.email.length) {
    //   return this.setState({
    //     errMsgOfEmailBlanks: "이메일은 필수입니다."
    //   })
    // }
    // else {  // 입력칸이 공백이 아니게 된 순간 바로 에러메시지 삭제
    //   this.setState({
    //     errMsgOfEmailBlanks: ""
    //   })
    // }

    // // 에러메세지 - nickname
    // // 위의 email 입력칸을 채우는 순간 그 다음 입력칸인 별명에서 곧바로 에러메세지가 출력되는 것을 방지하기 위해 조건문에 email.length 조건 걸어둠.
    // if (!this.state.nickname.length) {
    //   return this.setState({
    //     errMsgOfNickNameBlanks: "별명을 입력해주세요."
    //   })
    // }
    // else {
    //   this.setState({
    //     errMsgOfNickNameBlanks: ""
    //   })
    // }

    // // 에러메세지 - password
    // if (this.state.nickname.length && this.state.password !== "" && !this.state.password.length) {
    //   return this.setState({
    //     errMsgOfPasswordBlanks: "비밀번호는 필수입니다."
    //   })
    // }
    // else {
    //   this.setState({
    //     errMsgOfPasswordBlanks: ""
    //   })
    // }

    // // 에러메세지 - mobile
    // if (this.state.password.length && this.state.mobile !== "" && !this.state.mobile.length) {
    //   return this.setState({
    //     errMsgOfMobileBlanks: "연락처를 입력해주세요."
    //   })
    // }
    // else {
    //   this.setState({
    //     errMsgOfMobileBlanks: ""
    //   })
    // }

  };
  // 위의 입력 이벤트로 인해 새로운 정보로 할당된 state값을 활용한다.
  // 회원가입한 신규 유저 정보를 데이터베이스에 저장하도록 셋팅한다.
  // 서버에 회원가입을 요청을 한 후, 로그인 페이지로 요청한다.
  //! 에러메세지 셋팅을 여기서 또 한 이유 : 모달을 활성화시킨 후 사용자의 입력행위가 없다면 에러메세지 출력할 필요가 없으니, 에러메세지는 당연히 출력이 안되어 있을 것.
  //! 따라서 아무 입력행위 없이 회원가입버튼을 누르면 모든 정보를 입력하라는 에러메세지를 출력하기 위함.
  handleClickAddNewUserInfo = () => {
    const NewUserInfo = {
      loginPlatformId: 1,   /// 수정하기 소셜하고도 구분해야하는 알고리즘 짜야함.
      email: this.state.email,
      nickname: this.state.nickname,
      password: this.state.password,
      mobile: this.state.mobile
    }

    // 에러메세지의 state값을 업데이트하고 아래 렌더부분에서 렌더시킨다.
    // 에러메세지 - email
    if (!this.state.email.length) {
      this.setState({
        errMsgOfEmailBlanks: "이메일은 필수입니다."
      })
    }
    else {
      this.setState({
        errMsgOfEmailBlanks: ""
      })
    }

    // 에러메세지 - nickname
    if (!this.state.nickname.length) {
      this.setState({
        errMsgOfNickNameBlanks: "별명을 입력해주세요."
      })
    }
    else {
      this.setState({
        errMsgOfNickNameBlanks: ""
      })
    }

    // 에러메세지 - password
    if (!this.state.password.length) {
      this.setState({
        errMsgOfPasswordBlanks: "비밀번호는 필수입니다."
      })
    }
    else {
      this.setState({
        errMsgOfPasswordBlanks: ""
      })
    }

    // 에러메세지 - mobile
    if (!this.state.mobile.length) {
      this.setState({
        errMsgOfMobileBlanks: "연락처를 입력해주세요."
      })
    }
    else {
      this.setState({
        errMsgOfMobileBlanks: ""
      })
    }


    // 모든 값들과 이메일형식이 충족이 되면 !

    if (
      this.state.email.length &&
      this.state.nickname.length &&
      this.state.password.length &&
      this.state.mobile.length
    ) {

      axios.post("https://api.mystar-story.com/user/signup", NewUserInfo)
        .then(response => {
          console.log("무엇을 받아오십니까 회원가입", response)
        })
      // 모든 값들과 조건이 충족되지 않으면 요청 x 각 위치에서 에러메세지 계속 보여주기
    }

  }




  // componentWillUpdate() {
  //   this.errMsgInit()
  //   this.handleClickAddNewUserInfo
  // }


  render() {
    console.log("BeforeLogin에서 내려 온 회원가입 프롭스", this.props)
    console.log("회원가입: 새로 할당된 state", this.state)
    return (
      <div>
        {this.props.isOpen === true ?
          <div className="modal_SignUp">
            <div className="modal_SignUp_overlay" onClick={this.props.handleModal}></div>
            <div className="modal_SignUp_content">
              {/* -------------------------- 타이틀 -------------------------*/}
              <h2>회원 가입</h2>

              {/* -------------------------- 프로필 사진 업로드 칸 -------------------------*/}

              <div> 작업!!!!! </div>

              {/* -------------------------- 연락처 입력 칸 -------------------------*/}
              <form>
                <div className="userInfo_input_container">
                  <div>사이즈 테스트 중</div>

                  <div className="email_div">
                    <span>이메일</span>
                    <input onChange={this.handleInputValue("email")} />
                    <div className="text_style_SignUp">{this.state.errMsgOfEmailBlanks}</div>
                  </div>

                  <div className="nickname_div">
                    <span>별명</span>
                    <input onChange={this.handleInputValue("nickname")} />
                    <div className="text_style_SignUp">{this.state.errMsgOfNickNameBlanks}</div>
                  </div>

                  <div className="password_div">
                    <span>비밀번호</span>
                    <input onChange={this.handleInputValue("password")} />
                    <div className="text_style_SignUp">{this.state.errMsgOfPasswordBlanks}</div>
                  </div>

                  <div className="mobile_div">
                    <span>연락처</span>
                    <input onChange={this.handleInputValue("mobile")} />
                    <div className="text_style_SignUp">{this.state.errMsgOfMobileBlanks}</div>
                  </div>

                </div>


              </form>
              {/* -------------------------- submit 버튼 칸 --------------------*/}
              <div>
                <div className="button_container_InSignUp">
                  <div>
                    {/* axios post 요청 보내기 */}
                    <button className="signUp_button_inSignUp" onClick={this.handleClickAddNewUserInfo}>
                      회원 가입
                </button>
                  </div>
                  <div>
                    <button className="redirectToMain">
                      {/* 메인페이지로 돌아가게 하자밀고 모달창 종료 기능을 적용시켜 현재 보고있는 사진 위치 유지시킬 것 */}
                  돌아가기
                </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          : null}

      </div>
    )
  }
}

export default SignUp;