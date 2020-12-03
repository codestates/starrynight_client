import { NavLink } from "react-router-dom"

//css
import "../../css/FindEmail.scss"


function FindEmail(props) {
  return (
    <div>
      {props.isOpen ?
        <div className="modal_findEmail">
          <div className="modal_findEmail_overlay" onClick={props.handleModal} ></div>
          <div className="modal_findEmail_content">
            {/* -------------------------- 타이틀 -------------------------*/}
            <h2>이메일 찾기</h2>
            {/* -------------------------- 연락처 입력 칸 -------------------------*/}
            <form>
              <div className="mobile_input_container">
                <div>사이즈 테스트 중</div>
                <div className="mobile_div">
                  <span>연락처</span>
                  <input />

                </div>
              </div>

              {/* -------------------------- submit 버튼 칸 --------------------*/}
              <div>
                <div>
                  <button className="findEmail_button" type="submit">
                    <NavLink to="/completedfindemail">
                      이메일 찾기
                </NavLink>
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

            </form>
          </div>
        </div>
        : null}
    </div>
  )
}

export default FindEmail;



