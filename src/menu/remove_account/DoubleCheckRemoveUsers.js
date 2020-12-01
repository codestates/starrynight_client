//css
import "../../css/DoubleCheckRemoveUsers.scss";

function DoubleCheckRemoveUsers(props) {
  console.log('더블체크회원탈퇴 프롭', props)
  return (
    <div>
    {props.isOpen === true ?
    <div className="modal_DoubleCheckRemoveUsers">
      <div className="modal_DoubleCheckRemoveUsers_overlay" onClick={props.handleModal}></div>
      <div className="modal_DoubleCheckRemoveUsers_content">
        {/* -------------------------- 타이틀 -------------------------*/}
        <h2>회원 탈퇴</h2>
        {/* -------------------------- 안내 문구 -------------------------*/}

        <div className="message_container_DoubleCheckRemoveUsers">

          <div className="message_container_DoubleCheckRemoveUsers_div">
            <div>
              진짜로 탈퇴하실 건가요?<br/>
              탈퇴하시면 저장해놓은 사진들이<br/>
              영구적으로 삭제됩니다.<br/>
            </div>

          </div>
        </div>

        {/* -------------------------- 버튼  --------------------*/}
        <div>
          <div>
            <button className="redirect_to_main_inDoubleCheckRemoveUsers" type="submit">
              
                돌아가기
              
            </button>
          </div>
          <div>
            <button className="remove_user_button_DoubleCheckRemoveUsers" onClick={props.CompletedRemoveUserClick}>
              
                탈퇴하기
              
            </button>
          </div>
        </div>
      </div>
    </div>
    : null}
    </div>
  )
}

export default DoubleCheckRemoveUsers;