import React, { Component } from "react";
import "../css/Comments.scss";
const axios = require("axios").default;
import fake25 from "../image/fakeData/fake25.jpg";
import fake6 from "../image/fakeData/fake6.jpg";
import userFace from "../image/faceCircle.png";
import faceCircle1 from "../image/faceCircle1.png";
import faceCircle2 from "../image/faceCircle2.png";
import faceCircle3 from "../image/faceCircle3.png";
import faceCircle4 from "../image/faceCircle4.png";
import faceCircle5 from "../image/faceCircle5.png";
import mapImg from "../image/mapImg.png";
import RemovePhoto from "./RemovePhoto";
import RemoveComment from "./RemoveComment";

let data = [
  {
    id: 1,
    photoPath: fake25,
    photoTitle: "울릉도 동남쪽 백길따라 이백리",
    hashtag: "#울릉도#동남쪽#백길따라#이백리",
    writerProfilePath: userFace,
    writer: "태진아",
    map: mapImg,
    favorite: false,
    replies: [
      {
        commentId: 1,
        profilePath: faceCircle1,
        nickname: "금강산산산산",
        date: "2020-12-06",
        comment: "너무 예뻐요. 자주 소통해요!",
      },
      {
        commentId: 2,
        profilePath: faceCircle2,
        nickname: "식후경",
        date: "2020-12-06",
        comment: "사진 접어라",
      },
      {
        commentId: 3,
        profilePath: faceCircle3,
        nickname: "민방위훈련",
        date: "2020-12-06",
        comment: "@mj_Lovely 자기야 이사진좀 봐ㅎㅎ",
      },
      {
        commentId: 4,
        profilePath: faceCircle4,
        nickname: "대방어",
        date: "2020-12-06",
        comment: "나 슬퍼서 살아야 하네~",
      },
      {
        commentId: 5,
        profilePath: faceCircle5,
        nickname: "캡틴징크스",
        date: "2020-12-06",
        comment: "px가서 k2 사와!",
      },
    ],
  },
];

let exam = {
  id: 1,
  photoPath:
    "https://s3.ap-northeast-2.amazonaws.com/mystar-story.com/uploadPhotos/img1.jpg",
  photoTitle: "Test Photo1",
  writer: "Dummy2",
  writerProfilePath: "logologo",
  replies: [
    {
      commentId: 1,
      comment: "멋져요!! 3",
      nickname: "Dummy1",
      commenterProfilePath: "logologo",
      date: "2020-12-11T13:32:00.000Z",
    },
    {
      commentId: 1,
      comment: "멋져요!! 6",
      nickname: "Dummy1",
      commenterProfilePath: "logologo",
      date: "2020-12-11T13:32:00.000Z",
    },
    {
      commentId: 1,
      comment: "멋져요!! 9",
      nickname: "Dummy1",
      commenterProfilePath: "logologo",
      date: "2020-12-11T13:32:00.000Z",
    },
  ],
  favorite: false,
};

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fakeData: [...data],
      isRemovePhotoOpen: false,
      isRemoveCommentOpen: false,
    };
  }

  componentDidUpdate() {
    if (this.props.isCommentsOpen) {
      let myModal = document.querySelector(".myModal");
      let modalContent = document.querySelector(".modalContent");
      myModal.style.display = "block";
      modalContent.style.display = "block";
    }
  }

  handleModalClose = () => {
    this.props.handleModalClose();
    let myModal = document.querySelector(".myModal");
    let modalContent = document.querySelector(".modalContent");
    myModal.style.display = "none";
    modalContent.style.display = "none";
  };

  removePhotoControl = () => {
    this.setState({
      isRemovePhotoOpen: !this.state.isRemovePhotoOpen,
    });
  };

  removeCommentControl = () => {
    this.setState({
      isRemoveCommentOpen: !this.state.isRemoveCommentOpen,
    });
  };

  render() {
    return (
      <div>
        {/* ------------------댓글 삭제 모달------------------ */}
        <RemoveComment
          isRemoveCommentOpen={this.state.isRemoveCommentOpen}
          removeCommentControl={this.removeCommentControl}
        />
        {/* ------------------사진 삭제 모달------------------ */}
        <RemovePhoto
          isRemovePhotoOpen={this.state.isRemovePhotoOpen}
          removePhotoControl={this.removePhotoControl}
        />
        {/* ------------------포토뷰모달------------------ */}
        <div className="myModal" onClick={this.handleModalClose}></div>
        <div className="modalContent">
          <div className="modalContent_Left">
            {/* ------------------name------------------ */}
            <div className="photoName">{this.props.imgData.photoTitle}</div>
            {/* ------------------photo------------------ */}
            <img
              className="selectPhoto"
              src={this.props.imgData.photoPath}
              alt="img"
            />
            {/* ------------------hashTag------------------ */}
            <div className="hashTag">
              {/* <span>{this.state.data[0].hashtag}</span> */}
              <span>hashtag</span>
            </div>
            {/* ------------------userInfo(userFace, userName)------------------ */}
            <div className="userInfo">
              <img
                className="userFace"
                src={this.props.imgData.writerProfilePath}
              />
              <span className="userName">{this.props.imgData.writer}</span>
            </div>
            {/* ------------------수정버튼, 삭제버튼------------------ */}
            <div className="btns">
              <button className="modifyBtn">수정</button>
              <button className="deleteBtn" onClick={this.removePhotoControl}>
                삭제
              </button>
            </div>
          </div>
          <div className="modalContent_Right">
            {/* ------------------close버튼------------------ */}
            {/* <span className="close" onClick={this.handleModalClose}>
              &times;
            </span> */}
            {/* ------------------지도------------------ */}
            <img className="mapImg" src={this.state.fakeData[0].map} />
            {/* ------------------How to go 버튼------------------ */}
            <div className="HowToGo_div">
              <button className="HowToGo">How to go</button>
            </div>
            {/* ------------------favorite 버튼------------------ */}
            <div className="favorite_div">
              <button className="favorite">별</button>
            </div>
            {/* ------------------댓글, 메시지입력btn------------------ */}
            <div className="commentDiv">
              <div className="comments">
                {this.state.fakeData[0].replies.map((data) => {
                  return (
                    <div className="comment">
                      <img
                        src={data.profilePath}
                        className="commentFace"
                        alt="faceCircle"
                      />
                      <span className="commentUserName">{data.nickname}</span>
                      <span className="commentDate">{data.date}</span>
                      <div className="commentComment">{data.comment}</div>
                      <span className="commentRemove">
                        <button onClick={this.removeCommentControl}>
                          삭제
                        </button>
                      </span>
                    </div>
                  );
                })}
              </div>
              <button className="commentBtn">메시지를 입력하세요.</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Comments;
