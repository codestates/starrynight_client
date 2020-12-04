import React, { useState } from "react";
import { Typography, Button, Form, message, Input, Icon } from "antd";
import Dropzone from "react-dropzone";

// Ant Design 라이브러리 사용
const { TextArea } = Input;
const { Title } = Typography;

function AddPhoto(props) {
  // 로그인 유저 식별정보를 가져온다
  const user = window.sessionStorage.email;

  // modal에서 관리할 상태들을 설정한다
  const [PhotoTitle, setPhotoTitle] = useState("");
  const [Hashtag, setHashtag] = useState("");
  const [FilePath, setFilePath] = useState("");
  const [Location, setLocation] = useState("");

  // 사진업로드 및 최종서버전송을 위한 onSubmit 메소드
  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      writer: user.userData._id, // from user store
      title: VideoTitle,
      description: Description,
      privacy: Private,
      filePath: FilePath,
      category: Category,
      duration: Duration,
      thumbnail: ThumbnailPath,
    };

    Axios.post("/api/video/uploadVideo", variables).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        message.success("업로드가 완료되었습니다");
        setTimeout(() => {
          props.history.push("/");
        }, 3000);
      } else {
        alert("Video upload is failure");
      }
    });
  }

  return (
    <div style={{ maxWidth: `700px`, margin: `2rem auto` }}>
      {/* modal title zone */}
      <div style={{ textAlign: `60%`, marginBottom: `2rem` }}>
        <Title level={2}>사진공유</Title>
      </div>

      {/* dropdown zone */}
      <Form onSubmit={onSubmit}>
        <div style={{ display: `flex`, justifyContent: `space-between` }}></div>
      </Form>
    </div>
  );
}

export default AddPhoto;
