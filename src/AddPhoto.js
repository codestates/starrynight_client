import React, { useEffect, useState } from "react";

// 기능 관련
import KakaoMap from "./KakaoMap";
import Axios from "axios";

// 스타일 관련
import { Typography, Button, Form } from "antd";
import Dropzone from "react-dropzone";
import "../src/css/AddPhoto.scss";
const { Title } = Typography;

function AddPhoto(props) {
  // 로그인 유저 식별정보를 가져온다
  // const userToken = props.localStorage.responseMsg;

  // modal에서 관리할 상태들을 설정한다
  const [FileName, setFileName] = useState(""); // Drag & Drop된 사진을 표시하고 제거도 하기 위한 state
  const [PhotoFormData, setPhotoFormData] = useState([]); // s3 업로드를 통해 url을 따기 위한 state
  const [PhotoTitle, setPhotoTitle] = useState(""); // 제목 입력창의 input을 받기 위한 state
  const [SearchKeyword, setSearchKeyword] = useState(""); // 위치검색창의 input을 받기 위한 state
  const [PhotoLocation, setPhotoLocation] = useState(""); // 작성된 위치검색 키워드를 KakaoMap.js 컴포넌트로 내리기 위한 state
  const [PhotoHashtag, setPhotoHashtag] = useState(""); // 해시태그 입력창의 input을 받기 위한 state
  const [CompleteTag, setCompleteTag] = useState([]); // 해시태그 완성을 위한 state

  // 사진업로드 Drag & Drop을 정의한다
  const onDrop = (files) => {
    // 업로드 파일을 drop하면 FormData 태그 인스턴스 생성 후, "file" 속성을 만들어서 files[0] 엘리먼트를 주입
    // 참고자료: https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
    let formData = new FormData();
    formData.append("file", files[0]);
    console.log("업로드 대기열 ***", files[0]);
    setFileName(files[0].name);
    setPhotoFormData(formData);
  };

  // 파일을 클릭하여 drop을 취소한다
  const cancelDrop = (e) => {
    e.preventDefault();
    setFileName("");
    setPhotoFormData([]);
    console.log("사진을 업로드 대기열에서 삭제했습니다");
  };

  // 사진업로드 & DB저장을 요청한다
  const onSubmit = (e) => {
    e.preventDefault();

    // 사진에 대한 S3 url 생성 요청
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    Axios.post("https://api.mystar-story.com/addphoto", PhotoFormData, config)
      .then((res) => {
        if (res.data.success) {
          console.log("사진 URL 생성 성공 ***", res.data.url);

          // 위치검색 결과가 제대로 window.sessionStorage.current에 담기지 않으면 alert
          if (window.sessionStorage.getItem("current") === "") {
            alert("위치를 다시 검색해주세요");
            return;
          }

          // 성공적으로 생성된 사진 url을 바탕으로 사진정보를 Photo 모델에 저장 요청
          const photo = {
            // userToken: userToken, // from localStorage
            title: PhotoTitle,
            photoPath: res.data.url,
            location: PhotoLocation,
            hashtag: CompleteTag,
          };
          console.log("사진 업로드 최종정보 ***", photo);

          Axios.post("https://api.mystar-story.com/savephoto", photo)
            .then((res) => {
              if (res.data.success) {
                // 해시태그가 있으면 해당 정보도 HashTag 모델 및 Photo 모델에 저장 요청
                if (photo.hashtag !== "") {
                  const hashtag = {
                    hashtag: CompleteTag,
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
            })
            .catch((err) => {
              alert("반드시 사진제목과 위치를 모두 입력해야 합니다");
              console.log("업로드 정보 ***", photo);
            });
        } else {
          alert("사진 url 생성 실패");
        }
      })
      .catch((err) => {
        alert("업로드할 사진을 선택해야 합니다");
      });
  };

  // 입력필드를 활성화한다(사진제목)
  const onPhotoTitleChange = (e) => {
    setPhotoTitle(e.target.value);
  };

  // 입력필드를 활성화한다(사진위치)
  const onInputSearchKeyword = (e) => {
    // 위치 검색입력(SearchKeyword) 및 카카오맵 검색입력(PhotoLocation)이 있다면 일단 삭제
    if (SearchKeyword !== "" || PhotoLocation !== "") {
      setSearchKeyword("");
      setPhotoLocation("");
    }
    setSearchKeyword(e.target.value);
  };

  // 검색키워드를 KakaoMap 컴포넌트의 콜백함수 displayMarker의 인자로 내린다
  const searchPlace = () => {
    setPhotoLocation(SearchKeyword);
  };

  // 입력필드를 활성화한다(해시태그)
  const onPhotoHashtagChange = (e) => {
    // 기호들은 해시태그 입력금지로 규정한다
    const regex = /[~!@$%^&*()_+|<>?:{}]/g;
    if (regex.test(e.target.value)) {
      alert("# 만 해시태그의 기호로 사용할 수 있습니다");
      setPhotoHashtag("");
    }
    setPhotoHashtag(e.target.value);
  };

  useEffect(() => {
    // 문자열을 # 기준으로 배열의 엘리먼트로 쪼갠다(킥킥킼ㅋ킥)
    let result = [];
    let tags = PhotoHashtag.split(" ");
    for (let i = 0; i < tags.length; i++) {
      result.push(tags[i]);
    }
    setCompleteTag(result);
    console.log("해시태그 ***", CompleteTag);
  }, [PhotoHashtag]);

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
                  marginBottom: `3rem`,
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
                            marginLeft: `4vw`,
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
                    marginLeft: `4vw`,
                    marginRight: `4vw`,
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
                    marginLeft: `4vw`,
                    marginRight: `4vw`,
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
                {sessionStorage === "no place" ? (
                  <div
                    style={{
                      textAlign: `left`,
                      marginLeft: `4vw`,
                      marginTop: `0.3rem`,
                      fontSize: `0.7rem`,
                      color: `red`,
                    }}
                  >
                    다른 위치를 검색해주세요
                  </div>
                ) : null}
                <br />

                {/* 사진제목 입력 zone */}
                <div
                  style={{
                    textAlign: `left`,
                    marginLeft: `4vw`,
                    marginRight: `4vw`,
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
                    marginLeft: `4vw`,
                    marginRight: `4vw`,
                  }}
                >
                  <label style={{ marginRight: `1rem` }}>해시태그</label>
                  <input
                    type="text"
                    onChange={onPhotoHashtagChange}
                    value={PhotoHashtag}
                    placeholder="#태그 #태그 형식으로 입력"
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
                {PhotoTitle !== "" &&
                PhotoLocation !== "" &&
                PhotoFormData !== [] ? (
                  <Button
                    className="addphoto-button"
                    type="primary"
                    size="large"
                    onClick={onSubmit}
                  >
                    Post!
                  </Button>
                ) : (
                  <Button className="addphoto-notyet" size="large">
                    Post!
                  </Button>
                )}
              </Form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddPhoto;
