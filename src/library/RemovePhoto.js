// import Axios from "axios";
const axios = require("axios").default;
import React, { Component } from "react";
import "../css/RemovePhoto.css";
import Button from "../menu/Button";

class RemovePhoto extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    if (this.props.isRemovePhotoOpen) {
      let myModal = document.querySelector(".myModal_RemovePhoto");
      myModal.style.display = "block";
    }
  }

  handleRemovePhotoModalClose = () => {
    this.props.removePhotoControl();
    let modal = document.querySelector(".myModal_RemovePhoto");
    modal.style.display = "none";
  };

  removePhoto = () => {
    //this.props.photoId
    console.log(this.props.photoId);
    let url = `https://api.mystar-story.com/${this.props.photoId}/delete`;
    axios
      .delete(url, {
        data: {
          id: this.props.photoId,
        },
        // withCredentials: true,
      })
      .then((res) => {
        alert("사진이 삭제되었습니다.");
        window.location.replace("/");
        // this.handleRemovePhotoModalClose();
        // this.props.handleModalClose();
        // this.props.afterRemoveComment();
      })
      .catch((err) => {
        alert(err.response.data);
        window.location.replace("/");
        // this.handleRemovePhotoModalClose();
        // this.props.handleModalClose();
        // this.props.afterRemoveComment();
      });
  };

  render() {
    return (
      <div>
        <div>
          <div className="myModal_RemovePhoto">
            <div className="modalContent_RemovePhoto">
              <div className="removePhoto_text">
                사진 삭제
                <hr />
              </div>
              <div>
                <br />
                <br />
                <br />
                <Button
                  className="removePhoto_DeleteBtn"
                  onClick={this.removePhoto}
                  size="deletePhoto"
                  color="blue"
                >
                  삭제
                </Button>
                <br />
                <Button
                  className="removePhoto_ReturnBtn"
                  onClick={this.handleRemovePhotoModalClose}
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
