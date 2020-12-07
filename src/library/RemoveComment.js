import React, { Component } from "react";
import "../css/RemoveComment.css";

class RemovePhoto extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    if (this.props.removePhotoOpen) {
      let myModal = document.querySelector(".myModal_RemoveComment");
      myModal.style.display = "block";
    }
  }

  render() {
    return (
      <div>
        <div>
          <div className="myModal_RemoveComment">
            <div className="modalContent_RemoveComment">
              <div className="removeComment_text">
                댓글 삭제
                <hr />
              </div>
              <button className="removeComment_DeleteBtn">삭제</button>
              <br />
              <button className="removeComment_ReturnBtn">돌아가기</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RemovePhoto;
