import React from "react";
import axios from "axios";

import Button from "../Button";
import { HiArrowNarrowRight } from "react-icons/hi";

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

      isLoading: false,
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
    if (!userInfo.email.length) {
      this.setState({
        errorMsgOfEmail: "이메일을 입력하세요."
      })
    }
    else if (!userInfo.mobile.length) {
      this.setState({
        errorMsgOfMobile: "연락처를 입력하세요."
      })
    }
    else {
      // if(this.state.isLoading === false) {
      this.setState({
        isLoading: true
      })
      // }
      axios.post("https://api.mystar-story.com/user/find/password", userInfo, {
        withCredentials: true
      })
        .then((response) => {
          // if(this.state.isLoading === false) {
          //   this.setState({
          //     isLoading: true
          //   })
          // }
          // else {
          console.log("findPW 뭘 받아와?", response)
          this.setState({
            result: response.data,
            isCompletedFindPwOpen: true,
            isLoading: false  // 로딩바 다시 제거
          })
          // }
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
  CompletedFindPwModalOFFWithFindPwModal = () => { // completedFindEmail에서 다 끄고 메인화면으로
    this.props.handleFindPwModal()
    this.handleCompletedFindPw()
  }

  completedFindPwOffAndMoveToSignIn = () => {  // completedFindEmail에서 다 끄고 로그인모달로 이동
    this.CompletedFindPwModalOFFWithFindPwModal()
    this.props.handleSignInModal()
  }


  // 엔터키를 눌르면 비밀번호찾기 버튼 누르게 하는 기능  ---> 연락처 input에 적용시키자.
  findPwPress = (e) => {
    if (e.key === "Enter") {
      this.handleClickSubmit()
    }
  }
  // componentDidMount() {
  //   this.setState({
  //     isLoading: false
  //   })
  // }

  render() {
    // if (this.state.isLoading) {
    //   return (
    //     <div>
    //       <div className="spinner"></div>
    //     </div>
    //   )
    // }
    // else {


    return (
      <div>

        {this.props.isFindPwModalOpen ?
          this.state.isCompletedFindPwOpen ?
            // this.state.isLoading === true ? 
            // <div className="spinner"></div>
            // :  
            <CompletedFindPw
              isCompletedFindPwOpen={this.state.isCompletedFindPwOpen}
              CompletedFindPwModalOFFWithFindPwModal={this.CompletedFindPwModalOFFWithFindPwModal} // 오버레이 누르면 모달 꺼짐
              completedFindPwOffAndMoveToSignIn={this.completedFindPwOffAndMoveToSignIn}
            />
            :

            <div className="modal_findPw">
              <div className="modal_findPw_overlay" onClick={this.props.handleFindPwModal} />
              <div className="modal_findPw_content">

                {/* completed 모달로 이동하기 전 지연시간에 로딩바 삽입 */}

                {this.state.isLoading === true ?
                  <div className="spinner"></div>
                  :
                  null}

                {/* <div className="close_icon">
                    <div className="close_icon_1"></div>
                    <div className="close_icon_2"></div>
                  </div> */}
                {/* -------------------------- 타이틀 -------------------------*/}
                <h2>비밀번호 찾기</h2>
                {/* -------------------------- 이메일, 연락처 입력 칸 -------------------------*/}
                <div className="find_pw_box">

                  <div className="userInfo_find_pw_container">
                    <div className="userInfo_input_container_in_findPw">
                      <div className="find_pw_title">USER</div>
                      <div className="email_input_div">
                        {/* <span>이메일</span> */}
                        <input
                          type="email"
                          placeholder="이메일을 입력하세요."
                          onChange={this.handleInputValue("email")}
                        />
                        <div>{this.state.errorMsgOfEmail}</div>
                      </div>

                      <div className="mobile_input_div">
                        {/* <span>연락처</span> */}
                        <input
                          className="control_margin_top"
                          placeholder="연락처를 입력하세요."
                          onChange={this.handleInputValue("mobile")}
                          onKeyPress={this.findPwPress}
                        />
                        <div>{this.state.errorMsgOfMobile}</div>
                      </div>
                    </div>




                    {/* -------------------------- submit 버튼 칸 --------------------*/}
                    <div className="button_container_find_pw">
                      <div>
                        <Button
                          size="small_find_pw"
                          color="gray"
                          middleWidth_main_btn
                          onClick={this.handleClickSubmit}
                        >

                          비밀번호 찾기

                            </Button>
                      </div>
                      <div>
                        <Button
                          size="small"
                          middleWidth_main_btn
                          onClick={this.props.linkToSignUpfromfindPw}
                        >

                          회원 가입

                            </Button>
                      </div>
                      {/* <div className="rediect_To_Signin">로그인페이지로 돌아가기</div> */}
                    </div>
                  </div>


                  <div className="division_line_find_pw"></div>

                  {/* ----------------소셜 로그인------------------------- */}

                  <div className="social_login_container_findPW">
                    <div className="socialLogin_find_pw">
                      <div id="social_login_title_find_pw">SOCIAL LOGIN</div>

                      <div className="socialLogin_btn_find_pw">
                        <Button
                          color="red"
                          outline
                          smallWidth_singin
                          onClick={this.props.googleLogin}
                        >
                          Google
                      </Button>
                      </div>
                      <div className="socialLogin_btn_find_pw">
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

          : null}
      </div>
    )
  }
}
// }

export default FindPw;
