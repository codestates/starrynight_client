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
  console.log("AddPhoto에 전달된 히스토리:", props.history);
  console.log("AddPhoto에 전달된 로컬스토리지:", props.localStorage);

  // 로그인 유저 식별정보를 가져온다
  const userToken = props.localStorage.responseMsg;
  console.log("AdDPhoto에서 확인된 토큰:", userToken);

  // modal에서 관리할 상태들을 설정한다
  const [PhotoFormData, setPhotoFormData] = useState([]);
  const [PhotoTitle, setPhotoTitle] = useState("");
  const [PhotoLocation, setPhotoLocation] = useState("");
  const [PhotoHashtag, setPhotoHashtag] = useState("");
  const [FilePath, setFilePath] = useState("");

  // 위치 찾기
  // const handleSearch = (value) => {};

  // 사진업로드 drop & down을 정의한다
  const onDrop = (files) => {
    // 업로드 파일을 drop하면 FormData 태그 인스턴스 생성 후, "file" 속성을 삽입
    let formData = new FormData();
    formData.append("file", files[0]);
    console.log("업로드 중...", files);
    setPhotoFormData(formData);

    // // 업로드 파일을 drop하면 FormData 태그 인스턴스 생성 후, "file" 속성을 삽입
    // let formData = new FormData();
    // formData.append("file", files[0]);
    // console.log("업로드 중...", files);

    // // header에 실어서 보낼 데이터타입 설정하여 서버에 업로드
    // const config = {
    //   header: { "content-type": "multipart/form-data" },
    // };
    // Axios.post(
    //   // "https://api.mystar-story.com/addphoto",
    //   "http://localhost:8000/addphoto",
    //   formData,
    //   config
    // ).then((res) => {
    //   if (res.data.success) {
    //     console.log("업로드완료!", res.data);
    //     setFilePath(res.data.url);
    //   } else {
    //     alert("업로드에 실패했습니다");
    //   }
    // });
  };

  // 사진업로드 & 서버전송을 정의한다
  const onSubmit = (e) => {
    e.preventDefault(); // 새로고침 방지

    // header에 실어서 보낼 데이터타입 설정하여 서버에 업로드
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    Axios.post(
      // "https://api.mystar-story.com/addphoto",
      "http://localhost:8000/addphoto",
      PhotoFormData,
      config
    ).then((res) => {
      if (res.data.success) {
        console.log("사진 Dropdown 성공 !!!", res.data);
        setFilePath(res.data.url);
      } else {
        alert("사진 Dropdown 실패");
      }
    });

    const photo = {
      userToken: userToken, // from localStorage
      title: PhotoTitle,
      photoPath: FilePath,
      location: PhotoLocation,
    };

    const hashtag = {
      hashtag: PhotoHashtag,
      photoPath: FilePath,
    };

    // Axios.post("https://api.mystar-story.com/savephoto", photo)
    Axios.post("http://localhost:8000/savephoto", photo).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        message.success("사진 업로드 성공 !!!... 2초 후 메인으로 이동");

        setTimeout(() => {
          props.history.push("/");
        }, 2000);

        // 해시태그가 있으면 해당 정보도 POST한다
        if (PhotoHashtag !== "") {
          Axios.post("http://localhost:8000/hashtag", hashtag).then((res) => {
            if (res.data.success) {
              console.log(res.data);
            } else {
              alert("해시태그 등록 실패");
            }
          });
        }
      } else {
        alert("사진 업로드 실패");
      }
    });
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
                {/* <div style={{ display: `flex`, justifyContent: `space-between` }}></div> */}
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

                {/* thumbnail zone : 있을 때만 div-img 엘리먼트 보여주기 */}
                {/* {ThumbnailPath && (
                  <div>
                    <img
                      src={`http://localhost:5000/${ThumbnailPath}`}
                      alt="thumbnail"
                    />
                  </div>
                )} */}
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
