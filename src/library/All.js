import React from "react";
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

const All = () => {
  return (
    <div>
      <div className="flex">
        <div className="column">
          <div className="overlay"></div>
          <img src={fake1} alt="fake1" />
          <img src={fake2} alt="fake2" />
          <img src={fake3} alt="fake3" />
          <img src={fake4} alt="fake4" />
          <img src={fake5} alt="fake5" />
          <img src={fake6} alt="fake6" />
          <img src={fake7} alt="fake7" />
          <img src={fake8} alt="fake8" />
          <img src={fake9} alt="fake9" />
          <img src={fake10} alt="fake10" />
        </div>
        <div className="column">
          <img src={fake4} alt="fake4" />
          <img src={fake7} alt="fake7" />
          <img src={fake3} alt="fake3" />
          <img src={fake10} alt="fake10" />
          <img src={fake5} alt="fake5" />
          <img src={fake9} alt="fake9" />
          <img src={fake1} alt="fake1" />
          <img src={fake8} alt="fake8" />
          <img src={fake2} alt="fake2" />
          <img src={fake6} alt="fake6" />
        </div>
        <div className="column">
          <img src={fake5} alt="fake5" />
          <img src={fake1} alt="fake1" />
          <img src={fake9} alt="fake9" />
          <img src={fake6} alt="fake6" />
          <img src={fake2} alt="fake2" />
          <img src={fake3} alt="fake3" />
          <img src={fake7} alt="fake7" />
          <img src={fake4} alt="fake4" />
          <img src={fake8} alt="fake8" />
          <img src={fake10} alt="fake10" />
        </div>
        <div className="column">
          <img src={fake4} alt="fake4" />
          <img src={fake6} alt="fake6" />
          <img src={fake1} alt="fake1" />
          <img src={fake10} alt="fake10" />
          <img src={fake7} alt="fake7" />
          <img src={fake9} alt="fake9" />
          <img src={fake3} alt="fake3" />
          <img src={fake2} alt="fake2" />
          <img src={fake8} alt="fake8" />
          <img src={fake5} alt="fake5" />
        </div>
      </div>
    </div>
  );
};

export default All;
