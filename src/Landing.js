import React from "react";
import { useSpring, animated } from "react-spring";
import "../src/css/Landing.scss";

import starsVideo from "./image/stars_landing_test1.mp4";
import { FiChevronDown } from "react-icons/fi";

const Landing = () => {

  const scrollToTop = () => {
    document.querySelector(".flex").scrollIntoView({ behavior: "smooth" });
    // window.scrollIntoView({ behavior: 'smooth' });
    // let location1 = document.querySelector("#nav").offsetTop;
    // document.querySelector(".scrolledsection").scrollTo(0, 0)
    // document.querySelector(".scrolledsection").scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    // document.querySelector(".flex").scrollTo({ top: location1, behavior: "smooth" })
    // document.querySelector("#nav").scrollTo(location1, 0)
    // console.log("좌표", location1)
  };

  // // const props = useSpring({
  // //   from: {
  // //     left: "0%",
  // //     top: "0%",
  // //     width: "0%",
  // //     height: "0%",
  // //     background: "lightgreen",
  // //   },
  // //   to: async (next) => {
  // //     while (1) {
  // //       await next({
  // //         left: "0%",
  // //         top: "0%",
  // //         width: "100%",
  // //         height: "100%",
  // //         background: "lightblue",
  // //       });
  // //       await next({ height: "50%", background: "lightgreen" });
  // //       await next({
  // //         width: "50%",
  // //         left: "50%",
  // //         background: "lightgoldenrodyellow",
  // //       });
  // //       await next({ top: "0%", height: "100%", background: "lightpink" });
  // //       await next({ top: "50%", height: "50%", background: "lightsalmon" });
  // //       await next({ width: "100%", left: "0%", background: "lightcoral" });
  // //       await next({ width: "50%", background: "lightseagreen" });
  // //       await next({ top: "0%", height: "100%", background: "lightskyblue" });
  // //       await next({ width: "100%", background: "lightslategrey" });
  // //     }
  // //   },
  // });
  return (

    <div className="video_box">
      {/* <div>
        Hello World!
      </div> */}
      {/* <video playsinline autoplay loop> */}
      <video muted autoPlay loop className="landing_video">
        <source src={starsVideo} type="video/mp4" />
        <strong>귀하의 브라우저는 video tag를 지원하지 않습니다.</strong>
      </video>

      <div className="landing_text">
        별이 빛나는 밤에
      </div>
      <div
        className="scrollDown"
        onClick={scrollToTop}
      >
        <FiChevronDown />
      </div>
      {/* <div id="test">
        테스트 중
      </div> */}
    </div>
    //   <>
    //     <animated.div className="script-box" style={props} />
    //   </>
  );
};

export default Landing;
