import { NavLink } from "react-router-dom";

//css
import "../../css/CompletedFindPw.scss";

function CompletedFindPw(props) {
  return (
    <>
      {props.isCompletedFindPwOpen ?
        <div className="modal_CompletedFindPw">
          <div className="modal_CompletedFindPw_overlay" onClick={props.CompletedFindPwModalOFFWithFindPwModal} ></div>
          <div className="modal_CompletedFindPw_content">
            {/* -------------------------- 타이틀 -------------------------*/}
            <h2>이메일 찾기</h2>
            {/* -------------------------- 연락처 입력 칸 -------------------------*/}

            <div className="pw_result_container">

              <div className="pw_result_div">
                <div>귀하의 <b>이메일</b>로 임시 비밀번호를 보내드렸습니다.<br />
                  <br />
              소중한 고객 정보를 보호하기 위해<br />
                  <b>반드시</b> 비밀번호를 변경해주시길 바랍니다.</div>

              </div>
            </div>

            {/* -------------------------- submit 버튼 칸 --------------------*/}
            <div>
              <div>
                <button className="signIn_button_CompletedFindPw">
                  {/* <NavLink to="/signin"> */}
                로그인
              {/* </NavLink> */}
                </button>
              </div>
            </div>
          </div>
        </div>
        : null}
    </>
  )
}

export default CompletedFindPw;