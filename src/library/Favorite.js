import React, { Component } from "react";
import "../css/All.css";
const axios = require("axios").default;

let fakeData = [
  {
    id: 100,
    photoPath:
      "https://s3.ap-northeast-2.amazonaws.com/mystar-story.com/uploadPhotos/20201217_135540.jpg",
  },
  {
    id: 99,
    photoPath:
      "https://s3.ap-northeast-2.amazonaws.com/mystar-story.com/uploadPhotos/20201217_135425.jpg",
  },
  {
    id: 98,
    photoPath:
      "https://s3.ap-northeast-2.amazonaws.com/mystar-story.com/uploadPhotos/20201217_13548.jpg",
  },
  {
    id: 97,
    photoPath:
      "https://s3.ap-northeast-2.amazonaws.com/mystar-story.com/uploadPhotos/20201217_135352.jpg",
  },
  {
    id: 96,
    photoPath:
      "https://s3.ap-northeast-2.amazonaws.com/mystar-story.com/uploadPhotos/20201217_135334.jpg",
  },
  {
    id: 95,
    photoPath:
      "https://s3.ap-northeast-2.amazonaws.com/mystar-story.com/uploadPhotos/20201217_133959.jpg",
  },
  {
    id: 94,
    photoPath:
      "https://s3.ap-northeast-2.amazonaws.com/mystar-story.com/uploadPhotos/20201217_133840.jpg",
  },
  {
    id: 93,
    photoPath:
      "https://s3.ap-northeast-2.amazonaws.com/mystar-story.com/uploadPhotos/20201217_13372.jpg",
  },
];

class Favorite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: 0,
      preItems: 0,
      data: [...fakeData],
    };
  }

  componentDidMount() {
    let url = "https://api.mystar-story.com/user/favorite";
    axios
      .get(url)
      .then((res) => {
        this.setState({
          data: res.data,
        });
        console.log(res.data);
        this.viewImgList();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  viewImgList = () => {
    const { items, data } = this.state;
    const col1 = document.querySelector(".column1");
    const col2 = document.querySelector(".column2");
    const col3 = document.querySelector(".column3");

    let makeImg1 = () => {
      for (let i = 0; i < data.length; i += 3) {
        let img = document.createElement("img");
        img.src = data[i].photoPath;
        img.name = data[i].id;
        img.className = "photo";
        img.onclick = this.props.handleModalOpen;
        img.alt = "fake";
        col1.appendChild(img);
      }
    };

    let makeImg2 = () => {
      for (let i = 1; i < data.length; i += 3) {
        let img = document.createElement("img");
        img.src = data[i].photoPath;
        img.name = data[i].id;
        img.className = "photo";
        img.onclick = this.props.handleModalOpen;
        img.alt = "fake";
        col2.appendChild(img);
      }
    };

    let makeImg3 = () => {
      for (let i = 2; i < data.length; i += 3) {
        let img = document.createElement("img");
        img.src = data[i].photoPath;
        img.name = data[i].id;
        img.className = "photo";
        img.onclick = this.props.handleModalOpen;
        img.alt = "fake";
        col3.appendChild(img);
      }
    };

    makeImg1();
    makeImg2();
    makeImg3();
  };

  render() {
    return (
      <div>
        <br />
        <br />
        <br />
        <div className="flex">
          <div className="column1"></div>
          <div className="column2"></div>
          <div className="column3"></div>
        </div>
      </div>
    );
  }
}

export default Favorite;
