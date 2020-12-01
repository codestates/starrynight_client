import React from "react";
import axios from 'axios'

//css
import "../css/SignUp.scss";



class SignUp extends React.Component {
  constructor(props) {
    super()
    this.state = {
      email: "",
      nickname: "",
      password: "",
      mobile: ""
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

    axios.post("https://mystar-story.com/user/signup", NewUserInfo)
      .then(response => {
        console.log(response)
      })

  }

  render() {
    // console.log("회원가입 프롭스", this.props)
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
                  </div>
                  <div className="nickname_div">
                    <span>별명</span>
                    <input onChange={this.handleInputValue("nickname")} />
                  </div>
                  <div className="password_div">
                    <span>비밀번호</span>
                    <input onChange={this.handleInputValue("password")} />
                  </div>
                  <div className="mobile_div">
                    <span>연락처</span>
                    <input onChange={this.handleInputValue("mobile")} />
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