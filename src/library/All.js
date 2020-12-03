import React, { Component } from "react";
import "../css/All.css";
import fake1 from "../image/fakeData/fake1.jpg";
import fake2 from "../image/fakeData/fake2.jpg";
import fake3 from "../image/fakeData/fake3.jpeg";
import fake4 from "../image/fakeData/fake4.jpg";
import fake5 from "../image/fakeData/fake5.jpg";
import fake6 from "../image/fakeData/fake6.jpg";
import fake7 from "../image/fakeData/fake7.png";
import fake8 from "../image/fakeData/fake8.jpg";
import fake9 from "../image/fakeData/fake9.jpeg";
import fake10 from "../image/fakeData/fake10.png";
import fake11 from "../image/fakeData/fake11.jpg";
import fake12 from "../image/fakeData/fake12.jpg";
import fake13 from "../image/fakeData/fake13.jpeg";
import fake14 from "../image/fakeData/fake14.jpg";
import fake15 from "../image/fakeData/fake15.jpeg";
import fake16 from "../image/fakeData/fake16.jpg";
import fake17 from "../image/fakeData/fake17.jpg";
import fake18 from "../image/fakeData/fake18.jpeg";
import fake19 from "../image/fakeData/fake19.jpg";
import fake20 from "../image/fakeData/fake20.jpg";
import fake21 from "../image/fakeData/fake21.jpg";
import fake22 from "../image/fakeData/fake22.jpg";
import fake23 from "../image/fakeData/fake23.jpeg";
import fake24 from "../image/fakeData/fake24.jpg";
import fake25 from "../image/fakeData/fake25.jpg";
import fake26 from "../image/fakeData/fake26.jpg";
import fake27 from "../image/fakeData/fake27.png";
import fake28 from "../image/fakeData/fake28.jpg";
import fake29 from "../image/fakeData/fake29.jpeg";
import fake30 from "../image/fakeData/fake30.png";
import fake31 from "../image/fakeData/fake31.jpg";
import fake32 from "../image/fakeData/fake32.jpg";
import fake33 from "../image/fakeData/fake33.jpeg";
import fake34 from "../image/fakeData/fake34.jpg";
import fake35 from "../image/fakeData/fake35.jpeg";
import fake36 from "../image/fakeData/fake36.jpg";
import fake37 from "../image/fakeData/fake37.jpg";
import fake38 from "../image/fakeData/fake38.jpeg";
import fake39 from "../image/fakeData/fake39.jpg";
import fake40 from "../image/fakeData/fake40.jpg";
import fake41 from "../image/fakeData/fake41.jpg";
import fake42 from "../image/fakeData/fake42.jpg";
import fake43 from "../image/fakeData/fake43.jpeg";
import fake44 from "../image/fakeData/fake44.jpg";
import fake45 from "../image/fakeData/fake45.jpg";
import { createPortal } from "react-dom";

let dataObj = {
  0: fake1,
  1: fake2,
  2: fake3,
  3: fake4,
  4: fake5,
  5: fake6,
  6: fake7,
  7: fake8,
  8: fake9,
  9: fake10,
  10: fake11,
  11: fake12,
  12: fake13,
  13: fake14,
  14: fake15,
  15: fake16,
  16: fake17,
  17: fake18,
  18: fake19,
  19: fake20,
  20: fake21,
  21: fake22,
  22: fake23,
  23: fake24,
  24: fake25,
  25: fake26,
  26: fake27,
  27: fake28,
  28: fake29,
  29: fake30,
  30: fake31,
  31: fake32,
  32: fake33,
  33: fake34,
  34: fake35,
  35: fake36,
  36: fake37,
  37: fake38,
  38: fake39,
  39: fake40,
  40: fake41,
  41: fake42,
  42: fake43,
  43: fake44,
  44: fake45,
};

let data = [
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
  fake31,
  fake32,
  fake33,
  fake34,
  fake35,
  fake36,
  fake37,
  fake38,
  fake39,
  fake40,
  fake41,
  fake42,
  fake43,
  fake44,
  fake45,
];

class All extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: 0,
      preItems: 0,
      fakeData: [...data],
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.infiniteScroll, true);
  }

  infiniteScroll = () => {
    const clientHeight = document.querySelector(".ViewPhoto").clientHeight;
    const scrollTop = document.querySelector(".ViewPhoto").scrollTop;
    const scrollHeight = document.querySelector(".ViewPhoto").scrollHeight;

    // clientHeight + scrollTop === scrollHeight
    if (clientHeight + scrollTop === scrollHeight) {
      // console.log(data);
      let col1 = document.querySelector(".column1");
      let col2 = document.querySelector(".column2");
      let col3 = document.querySelector(".column3");
      let { fakeData } = this.state;

      // let test = document.querySelector(".test");
      // test.innerHTML = "<h1>테스트입니다.</h1>";

      let makeImg1 = () => {
        if (this.state.items + 1 < this.state.fakeData.length) {
          let img = document.createElement("img");
          img.src = fakeData[this.state.items + 1];
          col1.appendChild(img);
          this.setState({
            items: this.state.items + 1,
          });
        }
      };

      let makeImg2 = () => {
        if (this.state.items + 1 < this.state.fakeData.length) {
          let img = document.createElement("img");
          img.src = fakeData[this.state.items + 2];
          col2.appendChild(img);
          this.setState({
            items: this.state.items + 1,
          });
        }
      };

      let makeImg3 = () => {
        if (this.state.items + 1 < this.state.fakeData.length) {
          let img = document.createElement("img");
          img.src = fakeData[this.state.items + 3];
          col3.appendChild(img);
          this.setState({
            items: this.state.items + 1,
          });
        }
      };

      makeImg1();
      makeImg2();
      makeImg3();
      console.log(`items: `, this.state.items);
      console.log("length: ", this.state.fakeData.length);
    }
  };

  render() {
    return (
      <div>
        <div className="flex">
          <div className="column1">
            {/* <img src={fake1} alt="fake1" />
            <img src={fake4} alt="fake2" />
            <img src={fake7} alt="fake3" />
            <img src={fake10} alt="fake4" />
            <img src={fake13} alt="fake5" /> */}
          </div>
          <div className="column2">
            {/* <img src={fake2} alt="fake4" />
            <img src={fake5} alt="fake13" />
            <img src={fake8} alt="fake3" />
            <img src={fake11} alt="fake19" />
            <img src={fake14} alt="fake17" /> */}
          </div>
          <div className="column3">
            {/* <img src={fake3} alt="fake5" />
            <img src={fake6} alt="fake11" />
            <img src={fake9} alt="fake9" />
            <img src={fake12} alt="fake12" />
            <img src={fake15} alt="fake6" /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default All;
