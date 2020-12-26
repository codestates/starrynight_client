import "../css/Gallery.scss"

function Gallery(props) {
  return (
    <div>


    {props.isGalleryModalOpen === true ?
      <div className="modal_findEmail">
        <div className="modal_findEmail_overlay" onClick={props.handleGalleryModal}></div>
        <div className="modal_findEmail_content">
          {/* -------------------------- 타이틀 -------------------------*/}
          <h2>개애애애애애</h2>
          {/* -------------------------- 연락처 입력 칸 -------------------------*/}
          <form>
            <div className="mobile_input_container">
              <div>      갤러리!
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

export default Gallery;