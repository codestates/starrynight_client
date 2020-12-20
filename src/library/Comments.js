import React, { Component } from "react";
import "../css/Comments.scss";
const axios = require("axios").default;
import RemovePhoto from "./RemovePhoto";
import RemoveComment from "./RemoveComment";
import KakaoMap from "../KakaoMap";
import { MdStarBorder } from "react-icons/md";
import { MdStar } from "react-icons/md";
import Button from "../menu/Button";

let fakeData = {
  id: 1,
  photoPath:
    "https://s3.ap-northeast-2.amazonaws.com/mystar-story.com/uploadPhotos/img1.jpg",
  photoTitle: "Test Photo1",
  location: "동서대학교",
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
      isFavorite: false,
      infoOpen: false,
      comment: "",
      commentId: "",
      writeComment: "",
      hashTag: "",
    };
  }

  // 해시태그 수정 페이지 열기
  handleModifyInfo = () => {
    this.setState({
      infoOpen: !this.state.infoOpen,
    });
    // console.log(!this.state.infoOpen);
    let btn = document.querySelector(".modifyBtn");
    btn.style.display = "none";
  };

  // 변경하는 해시태그 내용을 state에 저장
  handleModifyInfoChange = (e) => {
    this.setState({
      hashTag: e.target.value,
    });
    console.log("hashTag: ", this.state.hashTag);
  };

  // 해시태그 수정 완료(axios 보내기, 수정 반영한 결과 출력)
  completeModifyInfo = () => {
    // onClick시 axios 요청
    // let test = [
    //   { subject: "#지금" },
    //   { subject: "#바꾸고" },
    //   { subject: "#있습니다." },
    // ];

    let hashtag = this.state.hashTag.split(" ");

    let url = `https://api.mystar-story.com/${this.state.imgData.id}/modify`;
    axios
      .patch(url, {
        hashtags: hashtag,
        id: this.state.imgData.id,
      })
      .then((res) => {
        alert("해시태그를 수정했습니다.");
        this.setState({
          infoOpen: false,
        });
        console.log("타이틀 수정 완료");
        let btn = document.querySelector(".modifyBtn");
        btn.style.display = "inline-block";
        this.afterRemoveComment();
      })
      .catch((err) => {
        alert(err);
      });
  };

  componentDidMount() {
    let url = `https://api.mystar-story.com/${this.props.isCommentId}`;
    axios.get(url).then((data) => {
      this.setState({
        imgData: data.data,
      });
    });
  }

  // 댓글 삭제, 등록 후 사진 정보를 새로 반영하기 = 픽포토를 통한 새로고침
  afterRemoveComment = () => {
    let url = `https://api.mystar-story.com/${this.props.isCommentId}`;
    axios.get(url).then((res) => {
      this.setState({
        imgData: res.data,
      });
    });
    console.log("버튼클릭 : ", this.state.imgData);
  };

  // 모달 창 닫기
  handleModalClose = () => {
    this.props.handleModalClose();
    this.setState({
      isFavorite: !this.state.isFavorite,
    });
    this.afterRemoveComment();
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
          let inputComment = document.querySelector(".commentWriter");
          inputComment.value = "";
          this.afterRemoveComment();
        })
        .catch((err) => {
          alert("로그인 후 이용해주세요.");
        });
    }
  };

  // 좋아요 on/off
  handleFavoriteClickControl = () => {
    console.log("beforeClick: ", this.state.imgData.favorite);
    let url = `https://api.mystar-story.com/makelike`;
    axios
      .post(url, {
        photoId: this.state.imgData.id,
      })
      .then((data) => {
        console.log(this.state.imgData.favorite);
        this.afterRemoveComment();
      })
      .catch((err) => {
        alert("로그인 후 이용해주세요.");
      });
    console.log("beforeClick: ", this.state.imgData.favorite);
  };

  test = () => {
    this.setState({
      location: this.state.imgData.location,
    });
    this.afterRemoveComment();
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
          handleModalClose={this.handleModalClose}
          afterRemoveComment={this.afterRemoveComment}
          photoId={this.state.imgData.id}
        />
        {/* ------------------포토뷰모달------------------ */}
        <div className="myModal" onClick={this.handleModalClose}></div>
        <div className="modalContent">
          <div className="modalContent_Left">
            {/* ------------------name------------------ */}
            <div className="photoName">{this.state.imgData.photoTitle}</div>
            {/* ------------------photo------------------ */}
            <img
              className="selectPhoto"
              src={this.state.imgData.photoPath}
              alt="img"
            />
            {/* ------------------hashTag------------------ */}
            <div className="hashTag">
              {this.state.infoOpen === true ? (
                <div>
                  <input
                    type="text"
                    className="modifyPhotoHashtag"
                    placeholder="#태그 #태그 형식으로 입력"
                    onChange={this.handleModifyInfoChange}
                  />
                  <Button
                    className="modifyPhotoHashtagBtn"
                    onClick={this.completeModifyInfo}
                    size="completeModify_hashtag"
                  >
                    수정완료
                  </Button>
                </div>
              ) : (
                this.state.imgData.hashtags.map((res) => {
                  return <span>{res.subject}</span>;
                })
              )}
            </div>
            {/* ------------------userInfo(userFace, userName)------------------ */}
            <div className="userInfo">
              <img
                className="userFace"
                src={this.state.imgData.writerProfilePath}
              />
              <span className="userName">{this.state.imgData.writer}</span>
            </div>
            {/* ------------------수정버튼, 삭제버튼------------------ */}
            {this.props.isGalleryOpen && (
              <div className="btns">
                <span className="modifyBtn">
                  <Button onClick={this.handleModifyInfo} size="modify_hashtag">
                    수정
                  </Button>
                </span>
                <Button
                  className="deleteBtn"
                  onClick={this.removePhotoControl}
                  size="photo_delete"
                >
                  삭제
                </Button>
              </div>
            )}
          </div>
          <div className="modalContent_Right">
            {/* ------------------지도------------------ */}
            <div className="mapImg">
              {this.state.imgData.location !== "동서대학교" ? (
                <KakaoMap place={this.state.imgData.location} />
              ) : null}
            </div>

            {/* ------------------How to go 버튼------------------ */}
            <div className="HowToGo_div">
              <Button className="HowToGo" fullWidth>
                How to go
              </Button>
              {/* <a
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
              </a> */}
            </div>
            {/* ------------------favorite 버튼------------------ */}
            <div className="favorite_div">
              {this.state.imgData.favorite ? (
                <MdStar
                  className="favorite"
                  onClick={this.handleFavoriteClickControl}
                />
              ) : (
                <MdStarBorder
                  className="favoriteBorder"
                  onClick={this.handleFavoriteClickControl}
                />
              )}
              {/* <button onClick={this.handleFavoriteClickControl}>
                좋아요요청
              </button> */}
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
                          <Button
                            className="commentRemoveBtn"
                            name={index}
                            onClick={() =>
                              this.removeCommentOpen(data.comment, data.id)
                            }
                            size="comment_delete"
                          >
                            삭제
                          </Button>
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="댓글을 입력하세요."
                  className="commentWriter"
                  onChange={this.handleCommentOnchange}
                />
                <Button
                  className="commentBtn"
                  onClick={this.handleMakeComment}
                  // size="small_mypage_profile"
                  size="small_Comment"
                  // middleWidth
                >
                  등록
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Comments;
