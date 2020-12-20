import React from "react";

// css
import { withRouter } from "react-router-dom";
import "../../css/CompletedRemoveUser.scss"
import Button from "../Button";

class CompletedRemoveUser extends React.Component {
  constructor(props) {
    super(props)
  }

  // 로그아웃되면서 새로고침하고 메인페이지로 돌아가기
  signOutAndMoveToHome = () => {
    window.localStorage.clear();
    window.sessionStorage.clear();
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

              <div className="division_line" />

              <div className="message_container_CompletedRemoveUser">
                <div className="message_container_CompletedRemoveUser_div">
                  <div>
                    그동안 <span><b>Starry Night</b></span>를 이용해주셔서<br />
                    <br />
                  진심으로 감사드립니다 😊<br />
                    <br />
                    <br />
                  다시 저희와 밤 하늘을 올려다 볼 그날까지<br />
                    <br />
                  고객님을 기다리겠습니다.
                  <br />
                  </div>

                </div>

                <div className="division_line" />

                {/* -------------------------- 돌아가기 버튼  -------------------------*/}

                <div className="btn_container">
                  <Button
                    onClick={this.signOutAndMoveToHome}
                    size="small"
                    color="gray"
                    middleWidth_completedFind
                  >
                    돌아가기
                  </Button>
                </div>
              </div>
            </div>
          </div>
          : null}
      </div>

    )
  }
}

export default CompletedRemoveUser;
