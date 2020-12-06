import { NavLink } from "react-router-dom";

//css
import "../../css/CompletedFindEmail.scss";


function CompletedFindEmail(props) {
  console.log("이메일안내", props)
  return (
  <>
    {props.isCompletedFindEmailOpen ?
      <div className="modal_CompletedFindEmail">
        {/* FindEmail의 모달 틀 위에서 보여질 화면들을 CompletedFindEmail 컴포넌트를 씌운것이니
            FindEmail 모달과 CompletedFindEmail을 모두 false로 만들게 할 것(둘 중 하나 true일 경우 true가 렌더되니)*/}
        <div className="modal_CompletedFindEmail_overlay" 
          onClick={props.CompletedFindEmailModalOFFWithFindEmailModal}
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
                  {props.resultOfFind}
                </div>
              </div>

            </div>
          </div>

          {/* -------------------------- submit 버튼 칸 --------------------*/}
          <div>
            <div>
              <button className="findPw_button_inCompletedFindEmail" type="submit">
                
                  비밀번호 찾기
                
              </button>
            </div>
            <div>
              <button className="signIn_button_CompletedFindEmail">
                
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

export default CompletedFindEmail;