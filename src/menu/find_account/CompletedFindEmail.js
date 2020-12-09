import React from "react";

//css
import "../../css/CompletedFindEmail.scss";


class CompletedFindEmail extends React.Component {
  constructor(props){
    super(props)
    console.log("이메일안내", this.props)
  }
  // 우선 찾기완료 모달을 false로 만들고, findEmail모달도 끄고(FindEmail컴포넌트 안의 삼항연산자영향때문에 별도로 이렇게 꺼줘야함)
  // nav로 올라가서 findPw를 켜달라고 요청해라 
  linkToFindPw = () => {
    this.props.handleCompletedFindModal()
    this.props.handleFindEmailModal()
    
    this.props.handleFindPwModal()
    
  }
  render(){
    return (
    <>
      {this.props.isCompletedFindEmailOpen ?
        <div className="modal_CompletedFindEmail">
          {/* FindEmail의 모달 틀 위에서 보여질 화면들을 CompletedFindEmail 컴포넌트를 씌운것이니
              FindEmail 모달과 CompletedFindEmail을 모두 false로 만들게 할 것(둘 중 하나 true일 경우 true가 렌더되니)*/}
          <div className="modal_CompletedFindEmail_overlay" 
            // onClick={this.props.CompletedFindEmailModalOFFWithFindEmailModal}
            onClick={this.props.handleCompletedFindModal}
          ></div>
          <div className="modal_CompletedFindEmail_content">
            {/* -------------------------- 타이틀 -------------------------*/}
            <h2>이메일 찾기</h2>
            {/* -------------------------- 연락처 입력 칸 -------------------------*/}

            <div className="email_result_container">

              <div className="email_result_div">
                <div>
                  고객님의 정보와 일치하는 이메일 목록입니다.
                <div className="email_info">
                    {this.props.resultOfFind}
                  </div>
                </div>

              </div>
            </div>

            {/* -------------------------- submit 버튼 칸 --------------------*/}
            <div>
              <div>
                <button 
                className="findPw_button_inCompletedFindEmail" 
                onClick={this.linkToFindPw}
                >
                  
                    비밀번호 찾기
                  
                </button>
              </div>
              <div>
                <button
                className="signIn_button_CompletedFindEmail"
                onClick={this.linkToFindPw}
                >
                  
                    로그인
                    
                </button>
              </div>
            </div>
          </div>
        </div>
      : null} 
    </>
    )
  }
}

export default CompletedFindEmail;