import React from "react";
import { useSpring, animated } from "react-spring";
import "../src/css/Landing.scss";

import starsVideo from "./image/stars_landing_test1.mp4";
import { FiChevronDown } from "react-icons/fi";

class Landing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isplay: true
    }
    this.videoControllerRef = React.createRef();

  }


  videoPlaystate = () => {     // 비디오 재생이 끝나면 Main 페이지로 유도하는 화살표 등의 이모티콘 활성화
    this.setState({             // video tag에 걸어 영상 재생이 끝나면 false로 변환하게 할 것임.
      isplay: false
    })
  }


  scrollToMain = () => {
    document.querySelector(".flex").scrollIntoView({ behavior: "smooth" });
    // window.scrollIntoView({ behavior: 'smooth' });
    // let location1 = document.querySelector("#nav").offsetTop;
    // document.querySelector(".scrolledsection").scrollTo(0, 0)
    // document.querySelector(".scrolledsection").scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    // document.querySelector(".flex").scrollTo({ top: location1, behavior: "smooth" })
    // document.querySelector("#nav").scrollTo(location1, 0)
    // console.log("좌표", location1)
  };
  //
  componentDidMount() {
    this.videoControllerRef.current.playbackRate = 0.7
    // this.videoControllerRef.current.defaultPlaybackRate = 0.3
  }
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

  render() {


    return (

      <div className="video_box">
        {/* <div>
        Hello World!
      </div> */}
        {/* <video playsinline autoplay loop> */}
        <div>
          <video muted autoPlay className="landing_video" ref={this.videoControllerRef} onEnded={this.videoPlaystate} >
            {/* <video muted autoPlay loop className="landing_video"> */}
            <source src={starsVideo} type="video/mp4" />
            <strong>귀하의 브라우저는 video tag를 지원하지 않습니다.</strong>
          </video>
        </div>
        <div className="landing_text">
          <div className="text_box">
            {/* <div className="landing_text_intro_1"><span>반</span><span>짝</span><span>이</span><span>는</span><span>&nbsp;</span><span>밤</span><span>하</span><span>늘</span><span>의</span><span>&nbsp;</span><span>별</span><span>처</span><span>럼</span><span>,</span></div>
          <div className="landing_text_intro_2"><span>셔</span><span>터</span><span>&nbsp;</span><span>속</span><span>에</span><span>&nbsp;</span><span>빛</span><span>나</span><span>는</span><span>&nbsp;</span><span>당</span><span>신</span><span>의</span><span>&nbsp;</span><span>모</span><span>든</span><span>&nbsp;</span><span>순</span><span>간</span><span>&nbsp;</span><span>-</span></div>
          <div className="landing_text_intro_3"><span>나</span><span>랑</span><span>&nbsp;</span><span>별</span><span>보</span><span>러</span><span>&nbsp;</span><span>가</span><span>지</span><span>&nbsp;</span><span>않</span><span>을</span><span>래</span><span>?</span></div> */}
            {/* <div className="brackets_top">[</div> */}
            {/* <div className="landing_text_intro_1">반짝이는 밤하늘의 별처럼,</div>
          <div className="landing_text_intro_2">셔터 속에 빛나는 당신의 모든 순간 -</div> */}
            {/* <div className="landing_text_intro_3">나랑 별보러 가지 않을래?</div> */}


            <div className="landing_text_intro_1">반짝이는 밤하늘의 별처럼,</div>
            {/* <div className="landing_text_intro_2">밤하늘의 별처럼,</div> */}
            <div className="landing_text_intro_2">셔터 속에 빛나는</div>
            <div className="landing_text_intro_3">당신의 모든 순간..</div>

            {/* <div className="brackets_bottom">]</div> */}
          </div>
        </div>
        <div
          className="scrollDown"
          onClick={this.scrollToMain}
        >

          {this.state.isplay ?
            null
            :
            <FiChevronDown />

          }
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
};

export default Landing;
