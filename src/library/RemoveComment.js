import React, { Component } from "react";
import "../css/RemoveComment.css";
const axios = require("axios").default;
import Button from "../menu/Button";

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
        alert("해당 사용자가 아닙니다.");
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
              <div>
                <br />
                <br />
                <br />
                <Button
                  className="removeComment_DeleteBtn"
                  onClick={this.handleRemoveComment}
                  size="deletePhoto"
                  color="red"
                >
                  삭제
                </Button>
                <br />
                <Button
                  className="removeComment_ReturnBtn"
                  onClick={this.handleRemoveCommentModalClose}
                  size="deletePhoto"
                  color="blue"
                >
                  돌아가기
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RemovePhoto;
