import React, { Component } from "react";
import "../css/RemoveComment.css";

class RemovePhoto extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    if (this.props.isRemoveCommentOpen) {
      let modal = document.querySelector(".myModal_RemoveComment");
      modal.style.display = "block";
    }
  }

  handleRemoveCommentModalClose = () => {
    this.props.removeCommentControl();
    let modal = document.querySelector(".myModal_RemoveComment");
    modal.style.display = "none";
  };

  removeComment = () => {};

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
              <button
                className="removeComment_ReturnBtn"
                onClick={this.handleRemoveCommentModalClose}
              >
                돌아가기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RemovePhoto;
