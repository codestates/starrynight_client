import React from "react"
import { NavLink } from "react-router-dom"

// 로고
import imgFile from "../image/logo_StarryNight_Only_Letter.png";

//css
import "../css/SignIn.scss";


class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFindEmailModalOpen: false,
      isFindPwModalOpen: false
    }
  }


  /* --------------------- 모달창 이벤트 --------------------- */
  // 각각의 모달창 중복 작동 방지를 위해 이벤트를 각각 생성
  // isModalOpen이 false로 변하면 아래 render부분에서 삼항연산자를 통해 false시 null효과를 받게되고 창은 꺼지게 할 것임.

  handleFindEmailModal = () => {
    this.setState({
      isFindEmailModalOpen: !this.state.isFindEmailModalOpen  // state의 불린값 반전
    })
  }


  handleFindPwModal = () => {
    this.setState({
      isFindPwModalOpen: !this.state.isFindPwModalOpen  // state의 불린값 반전
    })
  }



  render() {
    // console.log("사인인 프롭스", this.props)
    return (

      <div>

        {this.props.isOpen ?
          <div className="modal_signIn" >
            <div className="modal_signIn_overlay" onClick={this.props.handleModal} ></div>

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
                    />
                  </div>
                  <div className="pw_div">
                    <span>비밀번호</span>
                    <input
                      type="password"
                    />
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
                {/* -------------------------- submit 버튼 칸 --------------------*/}
                <div>
                  <div>
                    <button className="signIn_Button" type="submit">
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
              </form>

            </div>
          </div>
          : null}
      </div>
    )
  }
}

export default SignIn;
