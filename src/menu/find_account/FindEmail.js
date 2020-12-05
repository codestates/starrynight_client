import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";


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
    if (!mobile.length) {
      this.setState({
        errorMsg: "연락처를 입력해주세요."  // completedFindEmail에 props로 내리기
      })
    }
    else {
      axios.post("https://api.mystar-story.com/user/find/email", mobile)
        .then((respoense) => {
          this.setState({
            result: respoense.data,
            isCompletedFindEmailOpen: true

          })
        })
        .catch((error) => {
          this.setState({
            errorMsg: error.respoense.data
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
  CompletedFindEmailModalOFFWithFindEmailModal = () => {
    this.props.handleFindEmailModal()  // 엄마꺼 끄고
    this.handleCompletedFindModal()   // 내껀 켜고
  }



  render() {
    console.log("FindEmail state", this.state)
    console.log("findemail 프롭스", this.props)
    return (

      <div>
        {this.props.isOpen ?
          this.state.isCompletedFindEmailOpen === true ? 

          <CompletedFindEmail
            resultOfFind={this.state.result}
            CompletedFindEmailModalOFFWithFindEmailModal={this.CompletedFindEmailModalOFFWithFindEmailModal}
            isCompletedFindEmailOpen={this.state.isCompletedFindEmailOpen}
            handleCompletedFindModal={this.handleCompletedFindModal}
            handleFindEmailModal={this.props.handleFindEmailModal}
          />
          :
          <div className="modal_findEmail">
            <div className="modal_findEmail_overlay" onClick={this.props.handleFindEmailModal} ></div>
            <div className="modal_findEmail_content">
              {/* -------------------------- 타이틀 -------------------------*/}
              <h2>이메일 찾기</h2>
              {/* -------------------------- 연락처 입력 칸 -------------------------*/}
              <form>
                <div className="mobile_input_container">
                  <div>사이즈 테스트 중</div>
                  <div className="mobile_div">
                    <span>연락처</span>
                    <input onChange={this.handleInputValue("mobile")} />
                    <div>{this.state.errorMsg}</div>

                  </div>
                </div>
                </form>

                {/* -------------------------- submit 버튼 칸 --------------------*/}
                <div>
                  <div>
                    <button className="findEmail_button" onClick={this.handleClickSubmit}>
               
                        이메일 찾기
                
                    </button>
                  </div>
                  <div>
                    <button className="signUp_button_inFindEmail">
                      회원 가입
                    </button>
                  </div>

                  <div>
                    소셜 로그인 버튼도 삽입하기!
            </div>
                </div>

              
            </div>
          </div>
          : null}
      </div>
    )
  }
}

export default FindEmail;



