import React from "react";

// css
import { withRouter } from "react-router-dom";
import "../../css/CompletedRemoveUser.scss"

class CompletedRemoveUser extends React.Component {
  constructor(props) {
    super(props)
  }

  // 로그아웃되면서 새로고침하고 메인페이지로 돌아가기
  signOutAndMoveToHome = () => {
    window.localStorage.clear();
    window.location.href = "/";
  }

  render() {
    console.log("일반 회원탈퇴 완료 프롭", this.props)
    return (
      <div>
        {this.props.isOpen === true ?

          <div className="modal_CompletedRemoveUser">
            <div className="modal_CompletedRemoveUser_overlay" onClick={this.signOutAndMoveToHome}></div>
            <div className="modal_CompletedRemoveUser_content">
              {/* -------------------------- 타이틀 -------------------------*/}
              <h2>회원 탈퇴</h2>
              {/* -------------------------- 안내 문구  -------------------------*/}
              <div className="message_container_CompletedRemoveUser">

                <div>
                  그동안 <b>Starry Night</b>를 이용해주셔서<br />
                  진심으로 감사드립니다 😊<br />
                  <br />
                  다시 저희와 밤 하늘을 올려다 볼 그날까지<br />
                  고객님을 기다리겠습니다.
                </div>

              </div>

              {/* -------------------------- 돌아가기 버튼  -------------------------*/}
              <button onClick={this.signOutAndMoveToHome}>돌아가기</button>

            </div>
          </div>
          : null}
      </div>

    )
  }
}

export default CompletedRemoveUser;
