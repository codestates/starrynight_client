function Favorites(props) {
  return (
    <div>
 {props.isOpen === true ?
      <div className="modal_findEmail">
        <div className="modal_findEmail_overlay" onClick={props.handleModal}></div>
        <div className="modal_findEmail_content">
          {/* -------------------------- 타이틀 -------------------------*/}
          <h2>즈으으을겨어어</h2>
          {/* -------------------------- 연락처 입력 칸 -------------------------*/}
          <form>
            <div className="mobile_input_container">
              <div>      즐겨찾기!
      재성님 코드 삽입

      임시로 모달만 구현</div>
              <div className="mobile_div">
                <span>연락처</span>
                <input />

              </div>
            </div>

            {/* -------------------------- submit 버튼 칸 --------------------*/}
            <div>
              <div>
                <button className="findEmail_button" type="submit">
                  
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

          </form>
        </div>
      </div>

    : null}

    </div>
  )
}

export default Favorites;