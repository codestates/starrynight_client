import React, { Component } from "react";
import "../css/Comments.scss";
const axios = require("axios").default;
import RemovePhoto from "./RemovePhoto";
import RemoveComment from "./RemoveComment";
import KakaoMap from "../KakaoMap";
import { MdStarBorder } from "react-icons/md";
import { MdStar } from "react-icons/md";

let fakeData = {
  id: 1,
  photoPath:
    "https://s3.ap-northeast-2.amazonaws.com/mystar-story.com/uploadPhotos/img1.jpg",
  photoTitle: "Test Photo1",
  location: "신촌역 3번출구",
  writer: "Dummy2",
  writerProfilePath: "logologo",
  hashtags: [
    {
      subject: "어딘가1",
    },
  ],
  replies: [
    {
      writerId: 1,
      comment: "멋져요!! 3",
      nickname: "Dummy1",
      commenterProfilePath: "logologo",
      date: "2020.12.14",
    },
    {
      writerId: 1,
      comment: "멋져요!! 6",
      nickname: "Dummy1",
      commenterProfilePath: "logologo",
      date: "2020.12.14",
    },
    {
      writerId: 1,
      comment: "멋져요!! 9",
      nickname: "Dummy1",
      commenterProfilePath: "logologo",
      date: "2020.12.14",
    },
  ],
  favorite: false,
};

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgData: { ...fakeData },
      isRemovePhotoOpen: false,
      isRemoveCommentOpen: false,
      infoOpen: false,
      isFavorite: false,
      comment: "",
      commentId: "",
      writeComment: "",
    };
  }

  // 타이틀 수정 페이지 열기
  handleModifyInfo = () => {
    this.setState({
      infoOpen: !this.state.infoOpen,
    });
    // console.log(!this.state.infoOpen);
  };

  // 타이틀 수정 완료(axios 보내기, 수정 반영한 결과 출력)
  completeModifyInfo = () => {
    // onClick시 axios 요청
    // <input type="text" />을 다시 photoTitle로
    this.setState({
      infoOpen: false,
    });
    console.log("타이틀 수정 완료");
  };

  componentDidMount() {
    let url = `https://api.mystar-story.com/${this.props.isCommentId}`;
    axios.get(url).then((data) => {
      this.setState({
        imgData: data.data,
      });
      console.log(this.state.imgData);
    });
  }

  // 댓글 삭제, 등록 후 사진 정보를 새로 반영하기
  afterRemoveComment = () => {
    let url = `https://api.mystar-story.com/${this.props.isCommentId}`;
    axios.get(url).then((data) => {
      this.setState({
        imgData: data.data,
      });
      console.log(this.state.imgData);
    });
  };

  stars = () => {
    console.log(this.props.imgData.location);
  };

  // 모달 창 닫기
  handleModalClose = () => {
    this.props.handleModalClose();
    let myModal = document.querySelector(".myModal");
    let modalContent = document.querySelector(".modalContent");
    myModal.style.display = "none";
    modalContent.style.display = "none";
  };

  // 이미지 삭제 모달 실행
  removePhotoControl = () => {
    this.setState({
      isRemovePhotoOpen: !this.state.isRemovePhotoOpen,
    });
  };

  // 댓글 삭제 모달 실행
  removeCommentOpen = (a, b) => {
    this.setState({
      isRemoveCommentOpen: true,
      comment: a,
      commentId: b,
    });
  };

  // 댓글 삭제 모달 끄기
  removeCommentClose = () => {
    this.setState({
      isRemoveCommentOpen: false,
    });
  };

  // 입력 댓글 state에 저장
  handleCommentOnchange = (e) => {
    this.setState({
      writeComment: e.target.value,
    });
    console.log(this.state.writeComment);
  };

  // 댓글 전송
  handleMakeComment = () => {
    console.log(this.state.writeComment);
    let url = "https://api.mystar-story.com/makecomment";
    if (this.state.writeComment.length === 0) {
      alert("댓글을 입력해주세요.");
    } else {
      axios
        .post(url, {
          photoPath: this.state.imgData.photoPath,
          comment: this.state.writeComment,
        })
        .then((res) => {
          alert("댓글이 등록되었습니다.");
          this.afterRemoveComment();
        });
    }
  };

  // 좋아요 클릭
  handleFavoriteClick = () => {
    this.setState({
      isFavorite: !this.state.isFavorite,
    });
  };

  render() {
    return (
      <div>
        {/* ------------------댓글 삭제 모달------------------ */}
        <RemoveComment
          isRemoveCommentOpen={this.state.isRemoveCommentOpen}
          removeCommentClose={this.removeCommentClose}
          comment={this.state.comment}
          commentId={this.state.commentId}
          photoId={this.state.imgData.id}
          afterRemoveComment={this.afterRemoveComment}
        />
        {/* ------------------사진 삭제 모달------------------ */}
        <RemovePhoto
          isRemovePhotoOpen={this.state.isRemovePhotoOpen}
          removePhotoControl={this.removePhotoControl}
          photoId={this.state.imgData.id}
        />
        {/* ------------------포토뷰모달------------------ */}
        <div className="myModal" onClick={this.handleModalClose}></div>
        <div className="modalContent">
          <div className="modalContent_Left">
            {/* ------------------name------------------ */}
            <div className="photoName">
              {this.state.infoOpen === true ? (
                <div>
                  <input
                    type="text"
                    className="modifyPhotoName"
                    value={this.state.imgData.photoTitle}
                  />
                  <button
                    className="modifyPhotoNameBtn"
                    onClick={this.completeModifyInfo}
                  >
                    수정
                  </button>
                </div>
              ) : (
                this.state.imgData.photoTitle
              )}
            </div>
            {/* ------------------photo------------------ */}
            <img
              className="selectPhoto"
              src={this.state.imgData.photoPath}
              alt="img"
            />
            {/* ------------------hashTag------------------ */}
            <div className="hashTag">
              {this.state.imgData.hashtags.map((res) => {
                return <span>{res.subject}</span>;
              })}
            </div>
            {/* <div className="hashTag">
              <span>test</span>
            </div> */}
            {/* ------------------userInfo(userFace, userName)------------------ */}
            <div className="userInfo">
              <img
                className="userFace"
                src={this.state.imgData.writerProfilePath}
              />
              <span className="userName">{this.state.imgData.writer}</span>
            </div>
            {/* ------------------수정버튼, 삭제버튼------------------ */}
            <div className="btns">
              <button className="modifyBtn" onClick={this.handleModifyInfo}>
                수정
              </button>
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
            <div className="mapImg">
              <KakaoMap place={this.state.imgData.location} />
            </div>

            {/* ------------------How to go 버튼------------------ */}
            <div className="HowToGo_div">
              {/* <button className="HowToGo">How to go</button> */}
              <a
                href={`https://map.kakao.com/link/to/${
                  this.state.imgData.location
                },${window.sessionStorage.current
                  .split("")
                  .slice(-(window.sessionStorage.current.length - 1), -1)
                  .map((el) => (el !== " " ? el : null))
                  .join("")}`}
                target="_blank"
              >
                <button className="HowToGo">How to go</button>
              </a>
            </div>
            {/* ------------------favorite 버튼------------------ */}
            <div className="favorite_div">
              {/* <button
                // onClick={() => console.log(this.props.imgData.location)}
              >
                별
              </button> */}
              <span onClick={this.handleFavoriteClick}>
                {this.state.isFavorite === true ? (
                  <MdStar className="favorite" />
                ) : (
                  <MdStarBorder className="favoriteBorder" />
                )}
              </span>
            </div>
            {/* ------------------댓글, 메시지입력btn------------------ */}
            <div className="commentDiv">
              <div className="comments">
                {this.state.imgData.replies.length === 0 ? (
                  <span className="emptyComments">
                    첫번째 댓글을 남겨주세요.
                  </span>
                ) : (
                  this.state.imgData.replies.map((data, index) => {
                    return (
                      <div className="comment">
                        <img
                          src={data.commenterProfilePath}
                          className="commentFace"
                          alt="img"
                        />
                        <span className="commentUserName">{data.nickname}</span>
                        <span className="commentDate">{data.date}</span>
                        <div className="commentComment">{data.comment}</div>
                        <span className="commentRemove">
                          <button>수정</button>
                          <button
                            className="testButton"
                            name={index}
                            onClick={() =>
                              this.removeCommentOpen(data.comment, data.id)
                            }
                          >
                            삭제
                          </button>
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
              {/* 댓글 입력 기능 */}
              {/* <button className="commentBtn">메시지를 입력하세요.</button> */}
              <div>
                <input
                  type="text"
                  placeholder="댓글을 입력하세요."
                  className="commentWriter"
                  onChange={this.handleCommentOnchange}
                />
                <button className="commentBtn" onClick={this.handleMakeComment}>
                  등록
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Comments;
