import React, { Component } from "react";
import "../css/Comments.css";
import img1 from "../image/numData/img1.jpg";
import userFace from "../image/faceCircle.png";
import faceCircle1 from "../image/faceCircle1.png";
import faceCircle2 from "../image/faceCircle2.png";
import faceCircle3 from "../image/faceCircle3.png";
import faceCircle4 from "../image/faceCircle4.png";
import faceCircle5 from "../image/faceCircle5.png";
import mapImg from "../image/mapImg.png";
import RemovePhoto from "./RemovePhoto";
import RemoveComment from "./RemoveComment";

// name, image, hashTag, userFaceCircle, userName,
// 수정, 삭제, 지도, how to go, favorite, 댓글, 메시지입력btn

let data = [
  {
    name: "울릉도 동남쪽 백길따라 이백리",
    photo: img1,
    hashTag: "#울릉도#동남쪽#백길따라#이백리",
    userFace: userFace,
    userName: "태진아",
    map: mapImg,
    favorite: false,
    comments: [
      {
        faceCircle: faceCircle1,
        userName: "금강산산산산",
        date: "2020-12-06",
        comment: "너무 예뻐요. 자주 소통해요!",
      },
      {
        faceCircle: faceCircle2,
        userName: "식후경",
        date: "2020-12-06",
        comment: "사진 접어라",
      },
      {
        faceCircle: faceCircle3,
        userName: "민방위훈련",
        date: "2020-12-06",
        comment: "@mj_Lovely 자기야 이사진좀 봐ㅎㅎ",
      },
      {
        faceCircle: faceCircle4,
        userName: "대방어",
        date: "2020-12-06",
        comment: "나 슬퍼서 살아야 하네~",
      },
      {
        faceCircle: faceCircle5,
        userName: "캡틴징크스",
        date: "2020-12-06",
        comment: "px가서 k2 사와!",
      },
    ],
  },
];

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [...data],
      removePhotoOpen: false,
    };
  }

  componentDidUpdate() {
    if (this.props.isOpen) {
      let myModal = document.querySelector(".myModal");
      myModal.style.display = "block";
    }
  }

  handleModalClose = () => {
    this.props.handleModalControl();
    let myModal = document.querySelector(".myModal");
    myModal.style.display = "none";
  };

  removePhotoClick = () => {
    this.setState({
      removePhotoOpen: !this.state.removePhotoOpen,
    });
  };

  render() {
    return (
      <div>
        <div>
          <RemoveComment />
        </div>
        <div>
          <RemovePhoto removePhotoOpen={this.state.removePhotoOpen} />
        </div>
        <div>
          <div className="myModal">
            <div className="modalContent">
              {/* close버튼 */}
              <span className="close" onClick={this.handleModalClose}>
                &times;
              </span>
              {/* name */}
              <span className="name">{this.state.data[0].name}</span>
              {/* photo */}
              <img
                className="selectPhoto"
                src={this.state.data[0].photo}
                alt="img"
              />

              {/* hashTag */}
              <div className="hashTag">
                <span>{this.state.data[0].hashTag}</span>
              </div>
              {/* userInfo(userFace, userName) */}
              <div className="userInfo">
                <img className="userFace" src={this.state.data[0].userFace} />
                <span className="userName">{this.state.data[0].userName}</span>
              </div>

              {/* 수정버튼, 삭제버튼 */}
              <div className="btns">
                <button className="modifyBtn" onClick={this.removePhotoClick}>
                  수정
                </button>
                <button className="deleteBtn">삭제</button>
              </div>
              {/* 지도  */}
              <img className="mapImg" src={this.state.data[0].map} />
              {/* How to go 버튼 */}
              <button className="HowToGo">How to go</button>
              {/* favorite 버튼 */}
              <button className="favorite">별</button>
              {/* 댓글, 메시지입력btn */}
              <div className="commentDiv">
                <div className="comments">
                  {this.state.data[0].comments.map(function (data) {
                    return (
                      <div className="comment">
                        <div className="commentLeft">
                          <img
                            src={data.faceCircle}
                            className="commentFace"
                            alt="faceCircle"
                          />
                        </div>
                        <div className="commentRight">
                          <span className="commentUserName">
                            {data.userName}
                          </span>
                          <span className="commentDate">{data.date}</span>
                          <div className="commentComment">{data.comment}</div>
                        </div>
                        <hr />
                        <div className="commentHr"></div>
                      </div>
                    );
                  })}
                </div>
                <button className="commentBtn">메시지를 입력하세요.</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Comments;
