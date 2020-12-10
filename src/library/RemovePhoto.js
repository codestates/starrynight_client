import React, { Component } from "react";
import "../css/RemovePhoto.css";

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
              <button className="removePhoto_DeleteBtn">삭제</button>
              <br />
              <button
                className="removePhoto_ReturnBtn"
                onClick={this.handleRemovePhotoModalClose}
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
