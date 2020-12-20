import React, { useState } from "react";

import axios from "axios";

function AddProfilePhoto(props) {

  // 상태관리
  const [FileName, setFileName] = useState("");
  const [PhotoFormData, setPhotoFormData] = useState({});

  // 사진업로드 Drag & Drop을 정의
  const onDrop = (files) => {
    let formData = new FormData();
    formData.append("file", files[0]);
    setFileName(files[0].name);
    setPhotoFormData(formData);
  };

  // 파일을 클릭하여 drop을 취소
  const cancelDrop = (e) => {
    e.preventDefault();
    setFileName("");
    setPhotoFormData([]);
    console.log("사진을 업로드 대기열에서 제거하였습니다.")
  };



}