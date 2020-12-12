import React, { useState } from "react";

// 기능 관련
import KakaoMap from "./KakaoMap";
import Axios from "axios";

// 스타일 관련
import { Typography, Button, Form } from "antd";
import Dropzone from "react-dropzone";
import "../src/css/AddPhoto.scss";
import Search from "antd/lib/input/Search";
const { Title } = Typography;

function AddPhoto(props) {
  // 로그인 유저 식별정보를 가져온다
  // const userToken = props.localStorage.responseMsg;

  // modal에서 관리할 상태들을 설정한다
  const [FileName, setFileName] = useState("");
  const [SearchKeyword, setSearchKeyword] = useState("");
  const [PhotoFormData, setPhotoFormData] = useState([]);
  const [PhotoTitle, setPhotoTitle] = useState("");
  const [PhotoLocation, setPhotoLocation] = useState("");
  const [PhotoHashtag, setPhotoHashtag] = useState("");

  // 사진업로드 Drag & Drop을 정의한다
  const onDrop = (files) => {
    // 업로드 파일을 drop하면 FormData 태그 인스턴스 생성 후, "file" 속성을 만들어서 files[0] 엘리먼트를 주입
    // 참고자료: https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
    let formData = new FormData();
    formData.append("file", files[0]);
    console.log("Drop한 사진", files[0]);
    setFileName(files[0].name);
    setPhotoFormData(formData);
  };

  // 파일을 클릭하여 drop을 취소한다
  const cancelDrop = (e) => {
    e.preventDefault();
    setFileName("");
    setPhotoFormData([]);
    console.log("업로드하려던 사진의 drop을 취소했습니다");
  };

  // 검색키워드를 KakaoMap 컴포넌트의 콜백함수 displayMarker의 인자로 내린다
  const searchPlace = () => {
    setPhotoLocation(SearchKeyword);
  };

  // 사진업로드 & DB저장을 요청한다
  const onSubmit = (e) => {
    e.preventDefault();
    if (PhotoFormData === []) {
      alert("업로드할 사진을 골라주세요");
      return;
    }

    // 사진에 대한 S3 url 생성 요청
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    Axios.post("https://api.mystar-story.com/addphoto", PhotoFormData, config)
      .then((res) => {
        if (res.data.success) {
          console.log("사진 Dropdown 및 URL 생성 성공!! ", res.data.url);
          if (PhotoTitle === "" || PhotoLocation === "") {
            alert("사진제목과 사진을 찍은 위치는 반드시 입력해야 합니다");
            return;
          }

          // 성공적으로 생성된 사진 url을 바탕으로 사진정보를 Photo 모델에 저장 요청
          const photo = {
            // userToken: userToken, // from localStorage
            title: PhotoTitle,
            photoPath: res.data.url,
            location: PhotoLocation,
          };

          Axios.post("https://api.mystar-story.com/savephoto", photo).then(
            (res) => {
              if (res.data.success) {
                // 해시태그가 있으면 해당 정보도 HashTag 모델 및 Photo 모델에 저장 요청
                if (PhotoHashtag !== "") {
                  const hashtag = {
                    hashtag: PhotoHashtag,
                    photoPath: photo.photoPath,
                  };

                  Axios.post(
                    "https://api.mystar-story.com/hashtager",
                    hashtag
                  ).then((res) => {
                    if (res.data.success) {
                      console.log("해시태그 포함 최종정보", res.data);
                    } else {
                      alert("해시태그 등록 실패");
                    }
                  });
                }

                alert("사진 업로드에 성공하였습니다");
                window.location.replace("/"); // props.history.push("/")를 쓰지 않는 이유: 보여주기 위한 경로 refresh가 아니라, 진짜 브라우저 refresh가 필요하기 때문
              } else {
                alert("사진 업로드 실패");
              }
            }
          );
        } else {
          alert("사진 Dropdown 실패");
        }
      })
      .then();
  };

  // 입력필드를 활성화한다(사진제목)
  const onPhotoTitleChange = (e) => {
    setPhotoTitle(e.currentTarget.value);
  };

  // 입력필드를 활성화한다(사진위치)
  const onInputSearchKeyword = (e) => {
    setSearchKeyword(e.currentTarget.value);
  };

  // 입력필드를 활성화한다(해시태그)
  const onPhotoHashtagChange = (e) => {
    setPhotoHashtag(e.currentTarget.value);
  };

  // 렌더링
  return (
    <>
      {props.isOpen && (
        <div
          className="modal"
          style={{
            position: `fixed`,
            top: 0,
            left: 0,
            width: `100vw`,
            height: `100vh`,
            display: `flex`,
            justifyContent: `center`,
            alignItems: `center`,
          }}
        >
          <div
            className="modal_overlay"
            onClick={props.handleModal}
            style={{
              backgroundColor: `#00000099`,
              position: `fixed`,
              width: `100vw`,
              height: `100vh`,
              cursor: `auto`,
            }}
          />
          <div
            className="modal_content_a"
            style={{
              backgroundColor: `white`,
              width: `40vw`,
              position: `relative`,
              textAlign: `center`,
              borderRadius: `10px`,
              color: `black`,
              border: `0.1rem solid #565f7e`,
              cursor: `auto`,
            }}
          >
            <div style={{ maxWidth: `700px`, margin: `2rem auto` }}>
              {/* close button */}
              <span class="close" onClick={props.handleModal}>
                &times;
              </span>

              {/* modal PhotoTitle zone */}
              <div
                style={{
                  textAlign: `center`,
                  marginTop: `-1rem`,
                  marginBottom: `1rem`,
                  marginLeft: `2rem`,
                }}
              >
                <Title level={2}>사진공유</Title>
              </div>

              <Form onSubmit={onSubmit}>
                {/* 사진 Drag & drop zone */}
                <div>
                  <div
                    style={{
                      float: `left`,
                      width: `25%`,
                      justifyContent: `center`,
                    }}
                  >
                    <Dropzone
                      onDrop={onDrop}
                      multiple={false}
                      maxSize={100000000}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div
                          style={{
                            marginLeft: `2vw`,
                            height: `2rem`,
                            width: `5rem`,
                            border: `0.5px solid lightgray`,
                            display: `flex`,
                            alignItems: `center`,
                            justifyContent: `center`,
                          }}
                          {...getRootProps()}
                        >
                          <input {...getInputProps()} />
                          <div
                            style={{ fontWeight: `light`, fontSize: `1.5rem` }}
                          >
                            +
                          </div>
                        </div>
                      )}
                    </Dropzone>
                  </div>

                  {/* drop된 업로드파일 확인 및 업로드취소 */}
                  <div
                    style={{
                      float: `left`,
                      marginTop: `0.2rem`,
                    }}
                  >
                    {PhotoFormData && (
                      <div style={{ marginLeft: `2vw`, textAlign: `left` }}>
                        <span
                          style={{
                            marginRight: `1rem`,
                            fontSize: `0.8rem`,
                            fontWeight: `lighter`,
                            color: `lightgray`,
                            cursor: `auto`,
                          }}
                          onClick={cancelDrop}
                        >
                          {FileName}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <br />
                <br />

                {/* description and input zone */}
                {/* 카카오맵 출력 zone */}
                <div
                  style={{
                    marginLeft: `2vw`,
                    marginRight: `2vw`,
                    marginTop: `1rem`,
                    display: `flex`,
                    alignItems: `center`,
                    justifyContent: `center`,
                  }}
                >
                  {PhotoLocation && <KakaoMap place={PhotoLocation} />}
                </div>

                {/* 사진위치 찾기 zone */}
                <div
                  style={{
                    textAlign: `left`,
                    marginLeft: `2vw`,
                    marginRight: `2vw`,
                  }}
                >
                  <label style={{ marginRight: `1rem` }}>사진위치</label>
                  <input
                    className="input-search"
                    type="text"
                    name="search"
                    onChange={onInputSearchKeyword}
                    value={SearchKeyword}
                    placeholder="위치"
                  />
                  <button className="search-button" onClick={searchPlace}>
                    검색
                  </button>
                </div>
                <br />

                {/* 사진제목 입력 zone */}
                <div
                  style={{
                    textAlign: `left`,
                    marginLeft: `2vw`,
                    marginRight: `2vw`,
                  }}
                >
                  <label style={{ marginRight: `1rem` }}>사진제목</label>
                  <input
                    type="text"
                    onChange={onPhotoTitleChange}
                    value={PhotoTitle}
                    style={{
                      boxSizing: `border-box`,
                      border: `2px solid #ccc`,
                      borderRadius: `4px`,
                      backgroundColor: `white`,
                      padding: `5px 7px 5px 7px`,
                      width: `25vw`,
                    }}
                  />
                </div>
                <br />

                {/* 해시태그 입력 zone */}
                <div
                  style={{
                    textAlign: `left`,
                    marginLeft: `2vw`,
                    marginRight: `2vw`,
                  }}
                >
                  <label style={{ marginRight: `1rem` }}>해시태크</label>
                  <input
                    type="text"
                    onChange={onPhotoHashtagChange}
                    value={PhotoHashtag}
                    style={{
                      boxSizing: `border-box`,
                      border: `2px solid #ccc`,
                      borderRadius: `4px`,
                      backgroundColor: `white`,
                      padding: `5px 7px 5px 7px`,
                      width: `25vw`,
                    }}
                  />
                </div>

                <br />
                <br />

                {/* submit button */}
                <Button
                  className="addphoto-button"
                  type="primary"
                  size="large"
                  onClick={onSubmit}
                >
                  Post!
                </Button>
              </Form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddPhoto;
