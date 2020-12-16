import Button from "../Button";

//css
import "../../css/CompletedFindPw.scss";
import { AiOutlineKey } from "react-icons/ai";


function CompletedFindPw(props) {
  return (
    <>
      {props.isCompletedFindPwOpen ?
        <div className="modal_CompletedFindPw">
          <div className="modal_CompletedFindPw_overlay" onClick={props.CompletedFindPwModalOFFWithFindPwModal} ></div>
          <div className="modal_CompletedFindPw_content">
            {/* -------------------------- 타이틀 -------------------------*/}
            <h2>
              {/* 비밀번호 찾기 */}
              <AiOutlineKey
                className="completedFindPw_title_icon"
              />
              비밀번호 찾기
            </h2>
            {/* -------------------------- 연락처 입력 칸 -------------------------*/}

            <div className="division_line"></div>

            <div className="pw_result_container">

              <div className="pw_result_div">
                <div>귀하의 <span className="highlighted">이메일</span>로 임시 비밀번호를 보내드렸습니다.<br />
                  <br />
                  소중한 고객 정보를 보호하기 위해<br />
                  <span className="highlighted">반드시</span> 비밀번호를 변경해주시길 바랍니다.</div>

              </div>
              
            
            <div className="division_line"></div>
            {/* -------------------------- submit 버튼 칸 --------------------*/}
              
            <div className="btn_result_findPw_container">
                <Button
                  size="small"
                  color="gray"
                  middleWidth_completedFind
                >
                  
                로그인
              
                </Button>
              </div>
            </div>
          </div>
        </div>
        : null }
         {/* : <div className="spinner"></div>} */}
    </>
  )
}

export default CompletedFindPw;