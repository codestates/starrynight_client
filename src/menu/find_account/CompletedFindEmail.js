import { NavLink } from "react-router-dom";

//css
import "../../css/CompletedFindEmail.scss";


function CompletedFindEmail() {
  return (
    <div className="modal_CompletedFindEmail">
      <div className="modal_CompletedFindEmail_overlay"></div>
      <div className="modal_CompletedFindEmail_content">
        {/* -------------------------- 타이틀 -------------------------*/}
        <h2>이메일 찾기</h2>
        {/* -------------------------- 연락처 입력 칸 -------------------------*/}

        <div className="email_result_container">

          <div className="email_result_div">
            <div>
              {`귀하의 이메일은 asdfasdf 입니다.`}
            </div>

          </div>
        </div>

        {/* -------------------------- submit 버튼 칸 --------------------*/}
        <div>
          <div>
            <button className="findPw_button_inCompletedFindEmail" type="submit">
              <NavLink to="/findpw">
                비밀번호 찾기
                </NavLink>
            </button>
          </div>
          <div>
            <button className="signIn_button_CompletedFindEmail">
              <NavLink to="/signin">
                로그인
                </NavLink>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompletedFindEmail;