import React from "react";
import axios from "axios";

import Button from "../Button";
import { HiArrowNarrowRight } from "react-icons/hi";


//css
import "../../css/FindEmail.scss"
import CompletedFindEmail from "./CompletedFindEmail";


class FindEmail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mobile: "",
      result: "",
      errorMsg: "",
      isCompletedFindEmailOpen: false   // 새로 모달창을 띄우는 것이 아닌 모달창 내용만 바꾸게.
    }
  }

  handleInputValue = (key) => (text) => {
    console.log("text", text)
    this.setState({
      [key]: text.target.value
    })
  }

  handleClickSubmit = () => {
    const { mobile } = this.state;
    const userMobile = {
      mobile: mobile
    }

    // console.log("asdfasdf", mobile)
    if (!mobile.length) {
      this.setState({
        errorMsg: "연락처를 입력해주세요."  // completedFindEmail에 props로 내리기
      })
    }
    else {
      axios.post("https://api.mystar-story.com/user/find/email", userMobile, {
        withCredentials: true
      })
        .then((respoense) => {
          console.log("이메일찾기 결과 res", respoense)
          this.setState({
            result: {
              email: respoense.data.email,
              createdAt: respoense.data.createdAt
            },
            
            isCompletedFindEmailOpen: true

          })
        })
        .catch((error) => {
          console.log("이메일찾기 결과 errrrr", error.response.data)
          this.setState({
            errorMsg: error.response.data
          })
        })
    }
  }

  /* ---------- 이중모달 렌더 방지 ------- 아래 삼항연산자 구현부분까지 1set!!! --------------- */
  handleCompletedFindModal = () => {
    // if(!this.state.isCompletedFindEmailOpen) {  // CompletedFindEmail을 끄면 다시 FindEmail의 내용이 렌더가 됨. 따라서 동시에 끌 필요가 있음
    //   // FindEmail은 아직 true일테니 이것도 false로 돌려주기. 
    //   this.props.handleFindEmailModal()  // --> FindEmail의 내용도 렌더하지말고 아예 모달자체를 꺼라.
    // }
    this.setState({
      isCompletedFindEmailOpen: !this.state.isCompletedFindEmailOpen
    })
  }
  /* FindEmail의 모달 틀 위에서 보여질 화면들을 CompletedFindEmail 컴포넌트를 씌운것이니
    FindEmail 모달과 CompletedFindEmail을 모두 false로 만들게 할 것(둘 중 하나 true일 경우 true가 렌더되니)
    ! cf) 부모-자식(FindEmail-CompletedFindEmail) 관계라 가능 -> 엄마꺼 끄고, 내것도 끄고! 혹은 엄마꺼 끄고 내껀 켜고 등등
    만약 형제 관계라면 형제끼리 공유하지않고 충돌만 일으키므로 엄마가 중재를 맡아 엄마가 두 놈의 자식 것을 꺼줘야 함.
    */
  // CompletedFindEmailModalOFFWithFindEmailModal = () => {
  //   this.props.handleFindEmailModal()  // 엄마꺼 끄고 or 내꺼 끄고
  //   this.handleCompletedFindModal()   // 내껀 켜고 or 엄마꺼 켜고
  // }


    // 엔터키를 눌르면 이메일찾기 버튼 누르게 하는 기능  ---> 연락처 input에 적용시키자.

  findEmailPress = (e) => {
    if (e.key === "Enter") {
      this.handleClickSubmit();
    }
  }


  render() {
    console.log("FindEmail state", this.state)
    console.log("findemail 프롭스", this.props)
    return (

      <div>
        {this.props.isFindEmailModalOpen ?
          (this.state.isCompletedFindEmailOpen === true ? 

          <CompletedFindEmail
            resultOfFind={this.state.result}
            handleSignInModal={this.props.handleSignInModal}
            isCompletedFindEmailOpen={this.state.isCompletedFindEmailOpen}
            handleCompletedFindModal={this.handleCompletedFindModal}
            handleFindEmailModal={this.props.handleFindEmailModal}
            handleFindPwModal={this.props.handleFindPwModal}
            isOpen={this.props.isOpen}
          />
          :
          <div className="modal_findEmail">
            <div className="modal_findEmail_overlay" onClick={this.props.handleFindEmailModal} ></div>
            <div className="modal_findEmail_content">

              {/* -------------------------- 타이틀 -------------------------*/}
                <h2>이메일 찾기</h2>
              <div className="find_email_box">
              {/* -------------------------- 연락처 입력 칸 -------------------------*/}
              <div className="userInfo_find_email_container">
                <div className="mobile_input_container_in_findEmail">
                  <div className="find_email_title">MOBILE</div>
                  <div className="mobile_div">
                    {/* <span>연락처</span> */}
                    <input
                    placeholder="연락처를 입력하세요."
                    onChange={this.handleInputValue("mobile")}
                    onKeyPress={this.findEmailPress}
                    />
                    <div>{this.state.errorMsg}</div>

                  </div>
                </div>
                

                {/* -------------------------- submit 버튼 칸 --------------------*/}
                <div className="button_container_findEmail">
                  <div>
                    <Button 
                      size="small"
                      color="gray"
                      middleWidth_main_btn
                      onClick={this.handleClickSubmit}>
               
                        이메일 찾기
                
                    </Button>
                  </div>
                  <div>
                    <Button
                     size="small"
                     middleWidth_main_btn
                     onClick={this.props.linkToSignUpfromfindEmail}
                     >
                      회원 가입
                    </Button>
                  </div>
                </div>
              </div>
                

              <div className="division_line_findemail"></div>

              {/* ----------------소셜 로그인------------------------- */}
              <div className="social_login_container">
                <div className="socialLogin_findEmail">
                  <div id="social_login_title_findEmail">SOCIAL LOGIN</div>

                  <div className="socialLogin_btn_findEmail">
                      <Button
                        color="red"
                        outline
                        smallWidth_singin
                        onClick={this.props.googleLogin}
                      >
                        Google
                      </Button>
                    </div>
                    <div className="socialLogin_btn_findEmail">
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
          </div>)
          
          : null}
      </div>
    )
  }
}

export default FindEmail;



