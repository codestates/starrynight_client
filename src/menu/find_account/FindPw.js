import React from "react";
import axios from "axios";

// components
import CompletedFindPw from "./CompletedFindPw";

// css
import "../../css/FindPw.scss";

class FindPw extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      mobile: "",
      errorMsgOfEmail: "",
      errorMsgOfMobile: "",

      result: "",
      
      isCompletedFindPwOpen: false
    }
  }

  handleInputValue = (key) => (text) => {
    this.setState({
      [key]: text.target.value
    })
  }

  handleClickSubmit = () => {
    const { email, mobile } = this.state
    const userInfo = {
      email: email,
      mobile: mobile
    }
    if(!userInfo.email.length) {
      this.setState({
        errorMsgOfEmail: "이메일을 입력하세요."
      })
    }
    else if(!userInfo.mobile.length) {
      this.setState({
        errorMsgOfMobile: "연락처를 입력하세요."
      })
    }
    else {
      axios.post("https://api.mystar-story.com/user/find/password", userInfo, {
        withCredentials: true
      })
      .then ((response) => {
        console.log("findPW 뭘 받아와?", response)
        this.setState({
          result: response.data,
          isCompletedFindPwOpen: true
        })
      })
      .catch((error) => {
        // console.log("findPW 에러 뭘받아와?", error)
        this.setState({
          result: error.response.data
        })
      })
    }
  }
/* ---------- 이중모달 렌더 방지 ------- 아래 삼항연산자 구현부분까지 1set!!! --------------- */

    handleCompletedFindPw = () => {
      this.setState({
        isCompletedFindPwOpen: !this.state.isCompletedFindPwOpen
      })
    }
    CompletedFindPwModalOFFWithFindPwModal = () => {
      this.props.handleFindPwModal()
      this.handleCompletedFindPw()
    }


  render() {
    return (
      <div>
        {this.props.isFindPwModalOpen ?
          this.state.isCompletedFindPwOpen ?
            <CompletedFindPw
              isCompletedFindPwOpen={this.state.isCompletedFindPwOpen}
              CompletedFindPwModalOFFWithFindPwModal={this.CompletedFindPwModalOFFWithFindPwModal}
            />
            :
            <div className="modal_findPw">
              <div className="modal_findPw_overlay" onClick={this.props.handleFindPwModal} />
              <div className="modal_findPw_content">
                {/* -------------------------- 타이틀 -------------------------*/}
                <h2>비밀번호 찾기</h2>
                {/* -------------------------- 이메일, 연락처 입력 칸 -------------------------*/}
                <form>

                  <div className="email_mobile_input_container">
                    <div>사이즈 테스트 중</div>
                    <div className="email_input_div">
                      <span>이메일</span>
                      <input type="email" onChange={this.handleInputValue("email")} />
                      <div>{this.state.errorMsgOfEmail}</div>
                    </div>
                    <div className="mobile_input_div">
                      <span>연락처</span>
                      <input onChange={this.handleInputValue("mobile")} />
                      <div>{this.state.errorMsgOfMobile}</div>
                    </div>
                  </div>
                </form>
                {/* -------------------------- submit 버튼 칸 --------------------*/}
                <div>
                  <div>
                    <button className="findPw_button" onClick={this.handleClickSubmit} >
                      
                        비밀번호 찾기
              
                    </button>
                  </div>
                  <div>
                    <button
                     className="signUp_button_inFindPw"
                     onClick={this.props.linkToSignUpfromfindPw}
                     >
                      
                        회원 가입
              
                    </button>
                  </div>
                  <div>
                    소셜 로그인 찾기 버튼도 삽입!
                  </div>
                </div>


              </div>
            </div>
          : null}
      </div>
    )
  }
}

export default FindPw;
