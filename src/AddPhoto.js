import React, { useState } from "react";
import { Typography, Button, Form, message, Input, AutoComplete } from "antd";
// import { EnvironmentFilled } from "@ant-design/icons";
import { IoSearchCircleSharp } from "react-icons/io5";

import Dropzone from "react-dropzone";
import Axios from "axios";
import "../src/css/AddPhoto.scss";

const { Title } = Typography;

// AddPhoto 컴포넌트 진또배기
function AddPhoto(props) {
  // 로그인 유저 식별정보를 가져온다
  // console.log("AddPhoto에 전달된 로컬스토리지:", props.localStorage);
  const userToken = props.localStorage.responseMsg;
  console.log("AddPhoto 내 토큰:", userToken);

  // modal에서 관리할 상태들을 설정한다
  const [PhotoFormData, setPhotoFormData] = useState([]);
  const [PhotoTitle, setPhotoTitle] = useState("");
  const [PhotoLocation, setPhotoLocation] = useState("");
  const [PhotoHashtag, setPhotoHashtag] = useState("");

  // 위치 찾기(개발예정)
  // const handleSearch = (value) => {};

  // 사진업로드 drop & down을 정의한다
  const onDrop = (files) => {
    // 업로드 파일을 drop하면 FormData 태그 인스턴스 생성 후, "file" 속성을 만들어서 files[0] 엘리먼트를 주입
    // 참고자료: https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
    let formData = new FormData();
    formData.append("file", files[0]);
    console.log("Drop한 사진", files[0]);
    setPhotoFormData(formData);
  };

  // 사진업로드 & DB저장을 요청한다
  const onSubmit = (e) => {
    e.preventDefault();

    // 사진에 대한 S3 url 생성 요청
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    Axios.post(
      // "https://api.mystar-story.com/addphoto",
      "http://localhost:8000/addphoto",
      PhotoFormData,
      config
    )
      .then((res) => {
        if (res.data.success) {
          console.log("사진 Dropdown 및 URL 생성 성공!! ", res.data.url);

          // 성공적으로 생성된 사진 url을 바탕으로 사진정보를 Photo 모델에 저장 요청
          const photo = {
            userToken: userToken, // from localStorage
            title: PhotoTitle,
            photoPath: res.data.url,
            location: PhotoLocation,
          };

          // Axios.post("https://api.mystar-story.com/savephoto", photo)
          Axios.post("http://localhost:8000/savephoto", photo).then((res) => {
            if (res.data.success) {
              // 해시태그가 있으면 해당 정보도 HashTag 모델 및 Photo 모델에 저장 요청
              if (PhotoHashtag !== "") {
                const hashtag = {
                  hashtag: PhotoHashtag,
                  photoPath: photo.photoPath,
                };

                // Axios.post("https://api.mystar-story.com/hashtager", hashtag)
                Axios.post("http://localhost:8000/hashtager", hashtag).then(
                  (res) => {
                    if (res.data.success) {
                      console.log("해시태그 포함 최종정보", res.data);
                    } else {
                      alert("해시태그 등록 실패");
                    }
                  }
                );
              }

              alert("사진 업로드에 성공하였습니다");
              window.location.replace("/"); // props.history.push("/")를 쓰지 않는 이유: 보여주기 위한 경로 refresh가 아니라, 진짜 브라우저 refresh가 필요하기 때문
            } else {
              alert("사진 업로드 실패");
            }
          });
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
  const onPhotoLocationChange = (e) => {
    setPhotoLocation(e.currentTarget.value);
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
            }}
          />
          <div
            className="modal_content_a"
            style={{
              backgroundColor: `#1d2b52`,
              width: `40vw`,
              position: `relative`,
              textAlign: `center`,
              borderRadius: `10px`,
              color: `#d5f0ff`,
              border: `0.1rem solid #565f7e`,
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
                {/* dropdown zone */}
                <Dropzone onDrop={onDrop} multiple={false} maxSize={100000000}>
                  {({ getRootProps, getInputProps }) => (
                    <div
                      style={{
                        width: `60%`,
                        height: `10rem`,
                        border: `1px solid lightgray`,
                        display: `flex`,
                        alignItems: `center`,
                        justifyContent: `center`,
                        margin: `auto`,
                      }}
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />
                      {/* <PlusOutlined style={{ fontSize: `1rem` }} /> */}
                      <div
                        style={{ fontWeight: `lighter`, fontSize: `0.8rem` }}
                      >
                        이곳을 클릭하거나, 이곳에 파일을 끌어다놓으세요
                      </div>
                    </div>
                  )}
                </Dropzone>
                <br />

                {/* description and input zone */}
                <div
                  id="map"
                  style={{
                    width: `60%`,
                    height: `10rem`,
                    border: `1px solid gray`,
                    margin: `auto`,
                  }}
                ></div>
                <br />
                <label style={{ marginRight: `1rem` }}>사진위치</label>
                <Input
                  onChange={onPhotoLocationChange}
                  value={PhotoLocation}
                  style={{ width: `40%`, display: `inline-block` }}
                />
                <IoSearchCircleSharp
                  className="search"
                  value={PhotoLocation}
                // onClick={() => `http://map.kakao.com/?q=${PhotoLocation}`}
                />
                <br />
                <br />

                <label style={{ marginRight: `1rem` }}>사진제목</label>
                <Input
                  onChange={onPhotoTitleChange}
                  value={PhotoTitle}
                  style={{ width: `45%` }}
                />
                <br />
                <br />

                <label style={{ marginRight: `1rem` }}>해시태크</label>
                <Input
                  onChange={onPhotoHashtagChange}
                  value={PhotoHashtag}
                  style={{ width: `45%` }}
                />
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
