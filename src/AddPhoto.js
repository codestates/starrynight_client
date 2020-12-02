import React from "react";
import axios from "axios";
import "../src/css/AddPhoto.scss";

class AddPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddPhotoModalOpen: false,
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
    return (
      <>
        {this.props.isOpen ? (
          <div className="modal_addphoto">
            <div
              className="modal_addphoto_overlay"
              onClick={this.props.handleModal}
            />
            <div className="modal_addphoto_content">
              <span class="close" onClick={this.props.handleModal}>
                &times;
              </span>
              <h2>사진공유</h2>
              <hr />
              <form className="addphoto-form">
                <li>
                  <div className="addphoto-above-input">
                    <div className="addphoto-fieldname">사진제목</div>
                  </div>

                  <input
                    className="addphoto-input"
                    type="text"
                    name="title"
                    value={this.state.title}
                    placeholder={"사진의 제목을 입력하세요"}
                    onChange={this.onChangeHandler}
                  />
                </li>
                <li>
                  <div className="addphoto-above-input">
                    <div className="addphoto-fieldname">파일경로</div>
                    <span className="addphoto-span">
                      <button className="addphoto-button-inner">...</button>
                    </span>
                  </div>

                  <input
                    className="addphoto-input"
                    type="text"
                    name="photoPath"
                    value={this.state.photoPath}
                    placeholder={"사진을 업로드해주세요"}
                    onChange={this.onChangeHandler}
                  />
                </li>
                <li>
                  <div className="addphoto-above-input">
                    <div className="addphoto-fieldname">사진위치</div>
                    <span className="addphoto-span">
                      <button className="addphoto-button-inner">+</button>
                    </span>
                  </div>

                  <input
                    className="addphoto-input"
                    type="text"
                    name="location"
                    value={this.state.location}
                    placeholder={"사진 찍은 위치를 입력하세요"}
                    onChange={this.onChangeHandler}
                  />
                </li>
                <li>
                  <div className="addphoto-above-input">
                    {" "}
                    <div className="addphoto-fieldname">해시태그</div>
                  </div>

                  <input
                    className="addphoto-input"
                    type="text"
                    name="hashTag"
                    value={this.state.hashTag}
                    placeholder={"#태그할내용"}
                    onChange={this.onChangeHandler}
                  />
                </li>
              </form>
              <div className="button-field">
                <button className="addphoto-button" type="submit">
                  공유하기
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

export default AddPhoto;
