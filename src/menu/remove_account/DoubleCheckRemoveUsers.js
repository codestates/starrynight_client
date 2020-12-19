//css
import "../../css/DoubleCheckRemoveUsers.scss";
import Button from "../Button";
import { BiMessageRoundedError } from "react-icons/bi";


function DoubleCheckRemoveUsers(props) {
  console.log('더블체크회원탈퇴 프롭', props)
  return (
    <div>
    {props.isOpen === true ?
    <div className="modal_DoubleCheckRemoveUsers">
      <div className="modal_DoubleCheckRemoveUsers_overlay" onClick={props.redirectFromDoubleCheckToMypage}></div>
      <div className="modal_DoubleCheckRemoveUsers_content">
        {/* -------------------------- 타이틀 -------------------------*/}
        <h2>
          {/* <BiMessageRoundedError className="doubleCheck_title_icon" /> */}
          회원 탈퇴

        </h2>
        {/* -------------------------- 안내 문구 -------------------------*/}
        <div className="division_line" />

        <div className="message_container_DoubleCheckRemoveUsers">

          <div className="message_container_DoubleCheckRemoveUsers_div">
            <div>
              정말로 탈퇴하실 건가요?<br/>
              <br/>
              탈퇴하시면 저장해놓은 사진들이<br/>
              <br/>
              <span><b>영구적</b></span>으로 삭제됩니다.<br/>
            </div>

          </div>


        
        <div className="division_line" />
        {/* -------------------------- 버튼  --------------------*/}
        <div className="btn_container">
          <div>
            <Button
              className="redirect_to_mypage_inDoubleCheckRemoveUsers"
              onClick={props.redirectFromDoubleCheckToMypage}
              size="small"
              color="gray"
              middleWidth_completedFind  
            >
              
                돌아가기
              
            </Button>
          </div>
          <div>
            <Button
              className="remove_user_button_DoubleCheckRemoveUsers"
              onClick={props.CompletedRemoveUserClick}
              size="small"
              color="red"
              middleWidth_completedFind  
            >
              
                탈퇴하기
              
            </Button>
          </div>
        </div>
        </div>
      </div>
    </div>
    : null}
    </div>
  )
}

export default DoubleCheckRemoveUsers;