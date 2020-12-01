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
  handleInputValue = (key) => (text) => {
    // console.log("잘입력되요?")
    // console.log("key", key)
    // console.log("text", text)
    this.setState({
      [key]: text.target.value
    });
  };
  // 위의 입력 이벤트로 인해 새로운 정보로 할당된 state값을 활용한다.
  // 회원가입한 신규 유저 정보를 데이터베이스에 저장하도록 셋팅한다.
  // 서버에 회원가입을 요청을 한 후, 로그인 페이지로 요청한다.
  handleClickAddNewUserInfo = () => {
    const NewUserInfo = {
      email: this.state.email,
      nickname: this.state.nickname,
      password: this.state.password,
      mobile: this.state.mobile
    }

    // 에러메세지의 state값을 초기화하고 아래 렌더부분에서 렌더시킨다.
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

      axios.post("https://www.mystar-story.com/user/signup", NewUserInfo)
        .then(response => {
          console.log(response)
        })
      // 모든 값들과 조건이 충족되지 않으면 요청 x 각 위치에서 에러메세지 계속 보여주기
    }

  }




  componentWillUpdate() {
    this.errMsgInit()
    this.handleClickAddNewUserInfo
  }


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