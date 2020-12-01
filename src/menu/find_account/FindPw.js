import { NavLink } from "react-router-dom";
import "../../css/FindPw.scss";

function FindPw(props) {
  return (
    <div>
      {props.isOpen ?
        <div className="modal_findPw">
          <div className="modal_findPw_overlay" onClick={props.handleModal} />
          <div className="modal_findPw_content">
            {/* -------------------------- 타이틀 -------------------------*/}
            <h2>비밀번호 찾기</h2>
            {/* -------------------------- 이메일, 연락처 입력 칸 -------------------------*/}
            <form>

              <div className="email_mobile_input_container">
                <div>사이즈 테스트 중</div>
                <div className="email_input_div">
                  <span>이메일</span>
                  <input type="email" />
                </div>
                <div className="mobile_input_div">
                  <span>연락처</span>
                  <input />
                </div>
              </div>

              {/* -------------------------- submit 버튼 칸 --------------------*/}
              <div>
                <div>
                  <button className="findPw_button" type="submit">
                    <NavLink to="/completedfindpw">
                      비밀번호 찾기
                </NavLink>
                  </button>
                </div>
                <div>
                  <button className="signUp_button_inFindPw">
                    <NavLink to="/signup">
                      회원 가입
                </NavLink>
                  </button>
                </div>
                <div>
                  소셜 로그인 찾기 버튼도 삽입!
            </div>
              </div>

            </form>
          </div>
        </div>
        : null}
    </div>
  )
}

export default FindPw;
