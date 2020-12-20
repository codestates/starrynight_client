import React, { Component } from "react";
import "../css/All.css";
const axios = require("axios").default;
import fake1 from "../image/fakeData/fake1.jpg";
import fake2 from "../image/fakeData/fake2.jpg";
import fake3 from "../image/fakeData/fake3.jpeg";
import fake4 from "../image/fakeData/fake4.jpg";
import fake5 from "../image/fakeData/fake5.jpg";
import fake6 from "../image/fakeData/fake6.jpg";
import fake7 from "../image/fakeData/fake7.jpg";
import fake8 from "../image/fakeData/fake8.jpg";
import fake9 from "../image/fakeData/fake9.jpeg";
import fake10 from "../image/fakeData/fake10.png";
import fake11 from "../image/fakeData/fake11.jpg";
import fake12 from "../image/fakeData/fake12.jpg";
import fake13 from "../image/fakeData/fake13.jpeg";
import fake14 from "../image/fakeData/fake14.jpg";
import fake15 from "../image/fakeData/fake15.jpg";
import fake16 from "../image/fakeData/fake16.jpg";
import fake17 from "../image/fakeData/fake17.jpg";
import fake18 from "../image/fakeData/fake18.jpg";
import fake19 from "../image/fakeData/fake19.jpg";
import fake20 from "../image/fakeData/fake20.jpg";
import fake21 from "../image/fakeData/fake21.jpg";
import fake22 from "../image/fakeData/fake22.jpg";
import fake23 from "../image/fakeData/fake23.jpg";
import fake24 from "../image/fakeData/fake24.jpg";
import fake25 from "../image/fakeData/fake25.jpg";
import fake26 from "../image/fakeData/fake26.jpg";
import fake27 from "../image/fakeData/fake27.jpg";
import fake28 from "../image/fakeData/fake28.png";
import fake29 from "../image/fakeData/fake29.jpg";
import fake30 from "../image/fakeData/fake30.jpg";
let fakeData = [
  fake1,
  fake2,
  fake3,
  fake4,
  fake5,
  fake6,
  fake7,
  fake8,
  fake9,
  fake10,
  fake11,
  fake12,
  fake13,
  fake14,
  fake15,
  fake16,
  fake17,
  fake18,
  fake19,
  fake20,
  fake21,
  fake22,
  fake23,
  fake24,
  fake25,
  fake26,
  fake27,
  fake28,
  fake29,
  fake30,
];
class All extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: 0,
      preItems: 0,
      data: [...fakeData],
    };
  }
  componentDidMount() {
    let url = "https://api.mystar-story.com/main";
    axios.get(url).then((res) => {
      this.setState({
        data: res.data,
      });
      console.log(res.data);
    });
    document.addEventListener("scroll", this.infiniteScroll, true);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.infiniteScroll, true);
  }

  infiniteScroll = () => {
    const { items, data } = this.state;
    const clientHeight = document.querySelector(".ViewPhoto").clientHeight;
    const scrollTop = document.querySelector(".ViewPhoto").scrollTop;
    const scrollHeight = document.querySelector(".ViewPhoto").scrollHeight;
    const flex = document.querySelector(".flex");
    const col1 = document.querySelector(".column1");
    const col2 = document.querySelector(".column2");
    const col3 = document.querySelector(".column3");
    if (flex.clientWidth >= 0 && flex.clientWidth <= 640) {
      if (clientHeight + scrollTop + 10 > scrollHeight) {
        let makeImg1 = () => {
          if (items < data.length) {
            let img = document.createElement("img");
            img.src = data[items].photoPath;
            img.name = data[items].id;
            img.className = "photo";
            img.onclick = this.props.handleModalOpen;
            img.alt = "fake";
            col1.appendChild(img);
          }
        };
        makeImg1();
        if (items <= data.length) {
          this.setState({
            items: items + 1,
          });
        }
        // console.log(`items: `, items);
        // console.log("length: ", data.length);
      }
    } else if (flex.clientWidth >= 641 && flex.clientWidth <= 1280) {
      if (clientHeight + scrollTop + 10 > scrollHeight) {
        let makeImg1 = () => {
          if (items < data.length) {
            let img = document.createElement("img");
            img.src = data[items].photoPath;
            img.name = data[items].id;
            img.className = "photo";
            img.onclick = this.props.handleModalOpen;
            img.alt = "fake";
            col1.appendChild(img);
          }
        };
        let makeImg2 = () => {
          if (items + 1 < data.length) {
            let img = document.createElement("img");
            img.src = data[items + 1].photoPath;
            img.name = data[items + 1].id;
            img.className = "photo";
            img.onclick = this.props.handleModalOpen;
            img.alt = "fake";
            col2.appendChild(img);
          }
        };
        makeImg1();
        makeImg2();
        if (items <= data.length) {
          this.setState({
            items: items + 2,
          });
        }
        // console.log(`items: `, items);
        // console.log("length: ", data.length);
      }
    } else if (flex.clientWidth >= 1281) {
      if (clientHeight + scrollTop + 10 > scrollHeight) {
        let makeImg1 = () => {
          if (items < data.length) {
            let img = document.createElement("img");
            img.src = data[items].photoPath;
            img.name = data[items].id;
            img.className = "photo";
            img.onclick = this.props.handleModalOpen;
            img.alt = "fake";
            col1.appendChild(img);
          }
        };
        let makeImg2 = () => {
          if (items + 1 < data.length) {
            let img = document.createElement("img");
            img.src = data[items + 1].photoPath;
            img.name = data[items + 1].id;
            img.className = "photo";
            img.onclick = this.props.handleModalOpen;
            img.alt = "fake";
            col2.appendChild(img);
          }
        };
        let makeImg3 = () => {
          if (items + 2 < data.length) {
            let img = document.createElement("img");
            img.src = data[items + 2].photoPath;
            img.name = data[items + 2].id;
            img.className = "photo";
            img.onclick = this.props.handleModalOpen;
            img.alt = "fake";
            col3.appendChild(img);
          }
        };
        makeImg1();
        makeImg2();
        makeImg3();
        if (items <= data.length) {
          this.setState({
            items: items + 3,
          });
        }
        // console.log(`items: `, items);
        // console.log("length: ", data.length);
      }
    }
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
export default All;
