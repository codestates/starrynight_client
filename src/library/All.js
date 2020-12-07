import React, { Component } from "react";
import "../css/All.css";
import img1 from "../image/numData/img1.jpg";
import img2 from "../image/numData/img2.jpg";
import img3 from "../image/numData/img3.jpg";
import img4 from "../image/numData/img4.jpg";
import img5 from "../image/numData/img5.jpg";
import img6 from "../image/numData/img6.jpg";
import img7 from "../image/numData/img7.jpg";
import img8 from "../image/numData/img8.jpg";
import img9 from "../image/numData/img9.jpg";
import img10 from "../image/numData/img10.jpg";
import img11 from "../image/numData/img11.jpg";
import img12 from "../image/numData/img12.jpg";
import img13 from "../image/numData/img13.jpg";
import img14 from "../image/numData/img14.jpg";
import img15 from "../image/numData/img15.jpg";
import img16 from "../image/numData/img16.jpg";
import img17 from "../image/numData/img17.jpg";
import img18 from "../image/numData/img18.jpg";
import img19 from "../image/numData/img19.jpg";
import img20 from "../image/numData/img20.jpg";
import img21 from "../image/numData/img21.jpg";
import img22 from "../image/numData/img22.jpg";
import img23 from "../image/numData/img23.jpg";
import img24 from "../image/numData/img24.jpg";
import img25 from "../image/numData/img25.jpg";
import img26 from "../image/numData/img26.jpg";
import img27 from "../image/numData/img27.jpg";
import img28 from "../image/numData/img28.jpg";
import img29 from "../image/numData/img29.jpg";
import img30 from "../image/numData/img30.jpg";
import img31 from "../image/numData/img31.jpg";
import img32 from "../image/numData/img32.jpg";
import img33 from "../image/numData/img33.jpg";
import img34 from "../image/numData/img34.jpg";
import img35 from "../image/numData/img35.jpg";
import img36 from "../image/numData/img36.jpg";
import img37 from "../image/numData/img37.jpg";
import img38 from "../image/numData/img38.jpg";
import img39 from "../image/numData/img39.jpg";
import img40 from "../image/numData/img40.jpg";
import img41 from "../image/numData/img41.jpg";
import img42 from "../image/numData/img42.jpg";
import img43 from "../image/numData/img43.jpg";
import img44 from "../image/numData/img44.jpg";
import img45 from "../image/numData/img45.jpg";

let data = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
  img16,
  img17,
  img18,
  img19,
  img20,
  img21,
  img22,
  img23,
  img24,
  img25,
  img26,
  img27,
  img28,
  img29,
  img30,
  img31,
  img32,
  img33,
  img34,
  img35,
  img36,
  img37,
  img38,
  img39,
  img40,
  img41,
  img42,
  img43,
  img44,
  img45,
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
    const { items, fakeData } = this.state;
    const clientHeight = document.querySelector(".ViewPhoto").clientHeight;
    const scrollTop = document.querySelector(".ViewPhoto").scrollTop;
    const scrollHeight = document.querySelector(".ViewPhoto").scrollHeight;

    if (clientHeight + scrollTop + 20 > scrollHeight) {
      let col1 = document.querySelector(".column1");
      let col2 = document.querySelector(".column2");
      let col3 = document.querySelector(".column3");

      let makeImg1 = () => {
        if (items + 1 < fakeData.length) {
          let img = document.createElement("img");
          img.src = fakeData[items];
          img.className = "photo";
          img.onclick = this.props.handleModalControl;
          img.alt = "fake";
          col1.appendChild(img);
        }
      };

      let makeImg2 = () => {
        if (items + 1 < fakeData.length) {
          let img = document.createElement("img");
          img.src = fakeData[items + 1];
          img.className = "photo";
          img.onclick = this.props.handleModalControl;
          img.alt = "fake";
          col2.appendChild(img);
        }
      };

      let makeImg3 = () => {
        if (items + 1 < fakeData.length) {
          let img = document.createElement("img");
          img.src = fakeData[items + 2];
          img.className = "photo";
          img.onclick = this.props.handleModalControl;
          img.alt = "fake";
          col3.appendChild(img);
        }
      };

      makeImg1();
      makeImg2();
      makeImg3();
      if (items <= fakeData.length) {
        this.setState({
          items: items + 3,
        });
      }
      console.log(`items: `, items);
      console.log("length: ", fakeData.length);
    }
  };

  render() {
    return (
      <div>
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
