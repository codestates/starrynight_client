import React from "react";
import axios from "axios";
import "../src/css/AddPhoto.scss";

class AddPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: "",
      title: "",
      photoPath: "",
      location: "",
      hashTag: "",
    };
  }

  onChangeHandler = (e) => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  };

  onClickUpload = () => {
    const { userid, title, photoPath, location, hashTag } = this.state;
    axios
      .post("https://www.mystar-story.com/addphoto", {
        headers: {},
        body: JSON.stringify({ userid, title, photoPath }),
      })
      .then((res) => {
        console.log(res);
        res.json();
      });
  };

  render() {
    const { isOpen, close } = this.props; // inherited props from Main.js
    return (
      <>
        {isOpen ? (
          <div className="modal-AddPhoto">
            <div onClick={close}>
              <div className="modal-AddPhoto-item">
                <span className="close" onClick={close}>
                  &times;
                </span>
                <div className="form-AddPhoto" onClick={isOpen}>
                  <h2>사진공유</h2>
                  <li className="input-list">
                    <div className="input-description">사진제목</div>
                    <input
                      type="text"
                      name="title"
                      value={this.state.title}
                      placeholder={"사진의 제목을 입력하세요"}
                      onChange={this.onChangeHandler}
                    />
                  </li>
                  <li className="input-list">
                    <div className="input-description">파일경로</div>
                    <input
                      type="text"
                      name="photoPath"
                      value={this.state.photoPath}
                      placeholder={"사진을 업로드해주세요"}
                      onChange={this.onChangeHandler}
                    />
                  </li>
                  <li className="input-list">
                    <div className="input-description">사진위치</div>
                    <input
                      type="text"
                      name="location"
                      value={this.state.location}
                      placeholder={"사진 찍은 위치를 입력하세요"}
                      onChange={this.onChangeHandler}
                    />
                  </li>
                  <li className="input-list">
                    <div className="input-description">해시태그</div>
                    <input
                      type="text"
                      name="hashTag"
                      value={this.state.hashTag}
                      placeholder={"#태그할내용"}
                      onChange={this.onChangeHandler}
                    />
                  </li>
                </div>
                <button className="upload-button">공유</button>
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

export default AddPhoto;
