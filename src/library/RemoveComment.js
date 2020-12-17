import React, { Component } from "react";
import "../css/RemoveComment.css";
const axios = require("axios").default;

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
    this.props.removeCommentClose();
    let modal = document.querySelector(".myModal_RemoveComment");
    modal.style.display = "none";
  };

  handleRemoveComment = () => {
    // this.props.comment
    let url = `https://api.mystar-story.com/cancelcomment`;
    axios
      .post(url, {
        commentId: this.props.commentId,
        photoId: this.props.photoId,
        comment: this.props.comment,
      })
      .then((res) => {
        alert("댓글이 삭제되었습니다.");
        this.handleRemoveCommentModalClose();
        this.props.afterRemoveComment();
      })
      .catch((err) => {
        alert(err);
      });
  };

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
              <button
                className="removeComment_DeleteBtn"
                onClick={this.handleRemoveComment}
              >
                삭제
              </button>
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
