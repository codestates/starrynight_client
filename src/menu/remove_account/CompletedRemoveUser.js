// css
import "../../css/CompletedRemoveUser.scss"

function CompletedRemoveUser(props) {
  console.log("일반 회원탈퇴 완료 프롭", props)
  return (
    <div>
      {props.isOpen === true ?

        <div className="modal_CompletedRemoveUser">
          <div className="modal_CompletedRemoveUser_overlay" onClick={props.handleModal}></div>
          <div className="modal_CompletedRemoveUser_content">
            {/* -------------------------- 타이틀 -------------------------*/}
            <h2>회원 탈퇴</h2>
            {/* -------------------------- 안내 문구  -------------------------*/}
            <div className="message_container_CompletedRemoveUser">

              <div>
                그동안 Starry Night를 이용해주셔서<br />
              진심으로 감사드립니다 😊<br />
                <br />
              다시 저희와 밤 하늘을 올려다 볼 그날까지<br />
              고객님을 기다리겠습니다.
            </div>

            </div>

            {/* -------------------------- 돌아가기 버튼  -------------------------*/}
            <button>돌아가기</button>

          </div>
        </div>
        : null}
    </div>

  )
}

export default CompletedRemoveUser;
