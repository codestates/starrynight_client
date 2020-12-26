import React from "react";
import axios from "axios";

// components
import Google from "./social_user/Google";
import Kakao from "./social_user/Kakao";

// css
import "../css/Mypage.scss";
import Button from "./Button";
import { BiCamera } from "react-icons/bi";

// const FormData = require('form-data');

class Mypage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 순전히 화면에 변경 전의 정보를 렌더하는 역할
      currentUserInfo: {
        email: this.props.currentUserInfo.email,
        password: this.props.currentUserInfo.password,
        nickname: this.props.currentUserInfo.nickname,
        mobile: this.props.currentUserInfo.mobile,
        oauth: "",
        profile: this.props.currentUserInfo.profilePath,
      },

      previewURL: "", // 프로필 사진 업로드 전 미리보기를 위한 로컬의 사진 경로
      // currentUserInfo: this.props.currentUserInfo,

      // 변경될 유저 정보, 깃북수정요청 전까지는 올바른 변수명으로 전달하기 위해 이렇게 놔두자.
      // onChange로 셋팅하고 이걸 axios로 보내
      password: "",
      nickname: "",
      mobile: "",
      oauth: "",
      profile: "",

      isModifyBtnProfile: false,

      isModifyBtnOfPw: false,
      isModifyBtnOfNickname: false,
      isModifyBtnOfMobile: false,

      isGoogleModalOpen: false,
      isKakaoModalOpen: false,

      errMsg: "",  // 프사 업로드 에러메세지
    };
    // this.getUserInfo()
    console.log("Mypage STATE PROPS", this.state.currentUserInfo);
  }

  handleGoogleModalOpen = () => {
    this.setState({
      isGoogleModalOpen: !this.state.isGoogleModalOpen
    })
  }
  handleKakaoModalOpen = () => {
    this.setState({
      isKakaoModalOpen: !this.state.isKakaoModalOpen
    })
  }



  // 프로필 사진 변경

  handleModifyBtnOfProfileClick = () => {
    this.setState({
      // isModifyBtnProfile: !this.state.isModifyBtnProfile,
      isModifyBtnProfile: true
    });
  };


  handleModifyProfileOnChange = (e) => {
    // 업로드전 미리보기 & 제출될 사진 state로 저장
    // e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    this.setState({
      profile: e.target.files[0],  // 업로드 제출용
    });
    reader.onloadend = () => {
      this.setState({
        previewURL: reader.result,    // 미리보기용 blob형식
      });
      // this.setState({
      //   profile: ""         // 미리보기 사진이 마음에 안들어서 다시 사진 선택했을 때 새로운 미리보기로 렌더하기 위해 초기화
      // })
      // window.sessionStorage.removeItem("preview_profile") // 중복방지를 위해 우선 해당 객체키 초기화
      // window.sessionStorage.setItem("preview_profile", reader.result)
    };
    reader.readAsDataURL(file); // 이거 안해놓으면 액박뜸..
  };
  handlePost = (e) => {
    // 변경 버튼에 클릭이벤트로 걸어놓기.
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", this.state.profile);

    // console.log("formData", this.state.file.File)

    // const photo = window.sessionStorage.getItem("profile")
    const config = {
      // headers: formData.getHeaders()
      // headers: { "Content-type": "imageFile.type" }
      headers: { "Content-Type": "multipart/form-data" },
      // headers: { 'Content-Type': 'application/json' }
    };

    axios
      .patch(
        "https://api.mystar-story.com/user/modify/profile",
        formData,
        config
      )
      .then((respoense) => {
        console.log("사진이 업로드 되었습니다.", respoense.data);
        this.setState({
          profile: respoense.data.profilePath,
          isModifyBtnProfile: false
        });
      })
      .catch((error) => {
        console.log("사진 업로드 실패", error.response.data);
        this.setState({
          errMsg: error.response.data,
        });
      });
    this.handleModifyBtnOfProfileClick();
  };

  // 토큰 보내고 GET요청 -> 해당 유저의 정보를 받아옴.현재 화면에 렌더만 할 것임.
  getUserInfo = () => {
    axios
      .get("https://api.mystar-story.com/user/mypage", {
        withCredentials: true,
      })
      .then((response) => {
        console.log("마이페이지 리스폰스 뭘받아와?", response);
        this.setState({
          ...this.state,
          currentUserInfo: {
            loginPlatformId: response.data.loginPlatformId,
            email: response.data.email,
            password: response.data.password,
            nickname: response.data.nickname,
            mobile: response.data.mobile,
            oauth: response.data.oauth,
            profile: response.data.profilePath,
          },
        });
        console.log("CurrentUserInfo: ", this.state.currentUserInfo);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  /* ---------------------------프로필사진----------------------------------------- */

  // 각 input창에 들어오는 입력값들을 새로운 state 값으로 저장
  handleChangeUserInfo = (key) => (text) => {
    this.setState({
      [key]: text.target.value,
    });
  };

  /* ------------------ 수정버튼 클릭하면 수정할 수 있는 input칸 만들어놓기 ------------------- */
  handleModifyBtnOfPwClick = () => {
    this.setState({
      isModifyBtnOfPw: !this.state.isModifyBtnOfPw, // 불린값 반전시키기. 아래 수정칸 활성화여부에 이용될 것임.
    });
  };
  // 수정요청 보내기
  requestModifyPw = () => {
    const passwordToBeModified = {
      password: this.state.password,
    };
    axios
      .patch(
        "https://api.mystar-story.com/user/modify/password",
        passwordToBeModified,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        alert(response.data);
        this.setState({
          // currentUserInfo: {
          //   email: this.state.currentUserInfo.email,
          //   password: this.state.currentUserInfo.password,
          //   nickname: this.state.currentUserInfo.nickname,
          //   mobile: this.state.currentUserInfo.mobile
          // }
        });
        this.handleModifyBtnOfPwClick();
      });
  };
  //UX: input에 작성완료하면 엔터로 바로 제출가능하게 함
  modifyPwOnkeyPress = (e) => {
    if (e.key === "Enter") {
      this.requestModifyPw();
    }
  };



  handleModifyBtnOfNicknameClick = () => {
    this.setState({
      isModifyBtnOfNickname: !this.state.isModifyBtnOfNickname,
    });
  };
  requestModifyNickname = () => {
    const nicknameToBeModified = {
      nickname: this.state.nickname,
    };
    axios
      .patch(
        "https://api.mystar-story.com/user/modify/nickname",
        nicknameToBeModified,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log("asdfasdfasdfasdfasdfasdfasdfasdㅂ", response);
        alert(`별명이 ${response.data.nickname}로 변경되었습니다.`);
        this.setState({
          ...this.state,
          currentUserInfo: {
            email: this.props.currentUserInfo.email,
            password: this.props.currentUserInfo.password,
            nickname: response.data.nickname,
            mobile: this.props.currentUserInfo.mobile,

          },
        });
        this.handleModifyBtnOfNicknameClick();
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };
  modifyNicknameOnkeyPress = (e) => {
    if (e.key === "Enter") {
      this.requestModifyNickname();
    }
  };


  handleModifyBtnOfMobileClick = () => {
    this.setState({
      isModifyBtnOfMobile: !this.state.isModifyBtnOfMobile,
    });
  };
  requestModifyMobile = () => {
    const mobileToBeModified = {
      mobile: this.state.mobile,
    };
    axios
      .patch(
        "https://api.mystar-story.com/user/modify/mobile",
        mobileToBeModified,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log("mobile 뭐받아와?", response);
        alert(`연락처가 ${response.data.mobile}로 변경되었습니다.`);
        this.setState({
          currentUserInfo: {
            email: this.state.currentUserInfo.email,
            password: this.state.currentUserInfo.password,
            nickname: this.state.currentUserInfo.nickname,
            mobile: response.data.mobile,

          },
        });
        this.handleModifyBtnOfMobileClick();
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };
  modifyMobileOnkeyPress = (e) => {
    if (e.key === "Enter") {
      this.requestModifyMobile();
    }
  };

  /* -------------- 소셜 로그인 모달 핸들링 ----------------- */

  // handleGoogleMyPage = () => {
  //   this.setState({
  //     isGoogleModalOpen: !this.state.isGoogleModalOpen
  //   })
  //   this.props.isMypageModalOpen()
  // }

  componentDidMount() {
    // if (this.props.isMypageModalOpen === true) {
    //   console.log("마이페이지 기본정보 들어옴?")
    // this.handlePost()
    this.getUserInfo();

    // }
    // this.props.mypageClick

    // this.setState({
    //   currentUserInfo: this.props.currentUserInfo
    // })
  }
  // componentDidUpdate() {
  //   this.handlePost()
  // }




  render() {
    let profile_preview = <img className="profile_img" src="https://t1.daumcdn.net/cfile/tistory/2513B53E55DB206927" alt="프로필 사진 허허 안나오네" onClick={this.handleModifyBtnOfProfileClick} />;
    if (this.state.currentUserInfo.profile !== undefined || this.state.currentUserInfo.profile !== "" || !this.state.currentUserInfo.profile.length) {
      if (this.state.profile !== "") {
        profile_preview = <img className="profile_img" src={this.state.previewURL} alt="프로필 사진" onClick={this.handleModifyBtnOfProfileClick} />
      }
      else {
        profile_preview =
          <img
            className="profile_img"
            src={this.state.currentUserInfo.profile}    // 서버에서 보내는 기본 프사
            alt="프로필 사진"
            onClick={this.handleModifyBtnOfProfileClick}
          />
      }
    }
    else {
      profile_preview
    }


    // console.log("바뀌어야할 프로필 사진", this.state.currentUserInfo.profile)
    // let profile_preview = <img className="profile_img" src="https://t1.daumcdn.net/cfile/tistory/2513B53E55DB206927" alt="프로필 사진 허허 안나오네" />;
    // if (this.state.currentUserInfo.profile !== undefined || this.state.currentUserInfo.profile !== "" || !this.state.currentUserInfo.profile.length) {
    //   profile_preview = <img className="profile_img" src={this.state.profile} alt="프로필 사진" />
    // }
    // else {
    //   profile_preview
    // }

    console.log("isModifyBtnProfile", this.state.isModifyBtnProfile);
    // console.log("변경될 비밀번호", this.state.password)
    // console.log("변경될 별명", this.state.nickname)
    // console.log("변경될 연락처", this.state.mobile)
    // console.log("마이페이지 프롭", this.props)
    // console.log("마이페이지 state", this.state)
    // console.log("플랫폼 아이디!!!", this.props.currentUserInfo.loginPlatformId)
    return (
      <div>
        {this.props.isMypageModalOpen === true ? (
          // this.props.currentUserInfo.loginPlatformId !== null ?
          this.props.currentUserInfo.loginPlatformId === 2 ? (
            <Google
              isMypageModalOpen={this.props.isMypageModalOpen}
              handleMypageModal={this.props.handleMypageModal}
              currentUserInfo={this.props.currentUserInfo}
              DoubleCheckRemoveUsersClick={this.props.DoubleCheckRemoveUsersClick}
              handleCompletedRemoveUser={this.props.handleCompletedRemoveUser}
              loginPlatformId={this.props.currentUserInfo.loginPlatformId}
            // DoubleCheckRemoveUser={this.props.isDoubleCheckRemoveUsersModalOpen}
            // completedRemoveUser={this.props.isCompletedRemoveUserModalOpen}
            />
          ) : this.props.currentUserInfo.loginPlatformId === 3 ? (
            <Kakao
              isMypageModalOpen={this.props.isMypageModalOpen}
              handleMypageModal={this.props.handleMypageModal}
              currentUserInfo={this.props.currentUserInfo}
              DoubleCheckRemoveUsersClick={this.props.DoubleCheckRemoveUsersClick}
              handleCompletedRemoveUser={this.props.handleCompletedRemoveUser}
              loginPlatformId={this.props.currentUserInfo.loginPlatformId}
            // DoubleCheckRemoveUser={this.props.isDoubleCheckRemoveUsersModalOpen}
            // completedRemoveUser={this.props.isCompletedRemoveUserModalOpen}
            />
          ) : (
                <div className="modal_Mypage">
                  <div
                    className="modal_Mypage_overlay"
                    onClick={this.props.handleMypageModal}
                  ></div>
                  <div className="modal_Mypage_content">
                    {/* -------------------------- 프로필 사진 업로드 칸 -------------------------*/}

                    <form>
                      <div className="profile_img_box">
                        <label>
                          <div className="profile_img_box_1">
                            <div
                              className="profile_img_box_2"
                              onClick={this.handleModifyBtnOfProfileClick}
                            >
                              <BiCamera className="modify_profile" />
                              {/* <img
                      className="profile_img"
                      src={this.props.currentUserInfo.profile} alt="프로필 사진" /> */}
                            </div>
                          </div>
                          {/* 
                          {this.state.currentUserInfo.profile !== undefined ? (
                            this.state.profile !== "" ? (
                              <img
                                className="profile_img"
                                // src={this.state.previewURL}
                                src={window.sessionStorage.getItem("preview_profile")}
                                alt="프로필 사진"
                                onClick={this.handleModifyBtnOfProfileClick}
                              />
                            ) : (
                                <img
                                  className="profile_img"
                                  src={this.state.currentUserInfo.profile}
                                  alt="프로필 사진"
                                  onClick={this.handleModifyBtnOfProfileClick}
                                />
                              )
                          ) : (
                              <img
                                className="profile_img"
                                src="https://t1.daumcdn.net/cfile/tistory/2513B53E55DB206927"
                                alt="프로필 사진 허허 안나오네"
                                onClick={this.handleModifyBtnOfProfileClick}
                              />
                            )} */}

                          {profile_preview}
                          <input
                            type="file"
                            accept="image/jpg,image/png,image/jpeg,image/gif"
                            id="modify_profile"
                            name="modify_profile"
                            onChange={this.handleModifyProfileOnChange}
                          />
                        </label>
                        <div>{this.state.errMsg}</div>
                      </div>

                      {/* 프로필 사진 눌렀을 때 변경버튼 나오게 하고 업로드 후 변경버튼을 눌러 submit 했을 땐, 다시 버튼 사라지게 하기. */}
                      {/* 블린값 반전시켜주는 이벤트는 프로필 사진 클릭아벤트로 걸어두기 */}

                      {this.state.isModifyBtnProfile === true ? (
                        <Button
                          size="small_mypage_profile"
                          nanoWidth_mypage_profile
                          color="gray"
                          onClick={this.handlePost}
                        >
                          변경
                        </Button>
                      ) : null}
                    </form>

                    <h1>{this.state.currentUserInfo.nickname}</h1>
                    <div id="sub">{this.props.currentUserInfo.email}</div>
                    {/* -------------------------- 연락처 입력 칸 -------------------------*/}

                    <div className="userInfo_input_container_inMypage">
                      <div className="email_div_inMypage">
                        <div className="float">
                          <span>이메일</span>
                        </div>

                        <div className="bold"><b>{this.state.currentUserInfo.email}</b></div>
                        {/* <div>{this.props.sendStateForMypage.email}</div> */}
                      </div>

                      <div className="pw_div_inMypage">
                        <div className="pw_input_container">
                          <span>비밀번호</span>

                          {/* <div>{this.props.sendStateForMypage.password}</div> */}
                          {this.state.isModifyBtnOfPw === false ? (
                            <span className="bold"><b>******</b></span>
                          ) : (
                              <span>
                                <input
                                  type="password"
                                  onChange={this.handleChangeUserInfo("password")}
                                  onKeyPress={this.modifyPwOnkeyPress}
                                />
                              </span>
                            )}
                        </div>
                        {this.state.isModifyBtnOfPw ? (
                          <Button onClick={this.requestModifyPw} nanoWidth_mypage>
                            저장
                          </Button>
                        ) : (
                            <Button
                              onClick={this.handleModifyBtnOfPwClick}
                              color="lightGray"
                              nanoWidth_mypage

                            >
                              수정
                            </Button>
                          )}
                      </div>

                      <div className="nickname_div_inMypage">
                        <div className="nickname_input_container">
                          <span>별명</span>

                          {/* <div>{this.props.sendStateForMypage.nickname}</div> */}
                          {this.state.isModifyBtnOfNickname === false ? (
                            <span className="bold"><b>{this.state.currentUserInfo.nickname}</b></span>
                          ) : (
                              <span>
                                <input
                                  type="text"
                                  placeholder={this.state.currentUserInfo.nickname}
                                  onChange={this.handleChangeUserInfo("nickname")}
                                  onKeyPress={this.modifyNicknameOnkeyPress}
                                />
                              </span>
                            )}
                        </div>
                        {this.state.isModifyBtnOfNickname ? (
                          <Button
                            onClick={this.requestModifyNickname}

                            nanoWidth_mypage
                          >
                            저장
                          </Button>
                        ) : (
                            <Button
                              onClick={this.handleModifyBtnOfNicknameClick}
                              color="lightGray"
                              nanoWidth_mypage

                            >
                              수정
                            </Button>
                          )}
                      </div>

                      <div className="mobile_div_inMypage">
                        <div className="mobile_input_container">
                          <span>연락처</span>

                          {/* <div>{this.props.sendStateForMypage.mobile}</div> */}
                          {this.state.isModifyBtnOfMobile === false ? (
                            <span className="bold"><b>{this.state.currentUserInfo.mobile}</b></span>
                          ) : (
                              <span>
                                <input
                                  placeholder={this.state.currentUserInfo.mobile}
                                  onChange={this.handleChangeUserInfo("mobile")}
                                  onKeyPress={this.modifyMobileOnkeyPress}
                                />
                              </span>
                            )}
                        </div>
                        {this.state.isModifyBtnOfMobile ? (
                          <Button
                            onClick={this.requestModifyMobile}

                            nanoWidth_mypage

                          >
                            저장
                          </Button>
                        ) : (
                            <Button
                              onClick={this.handleModifyBtnOfMobileClick}
                              // outline
                              nanoWidth_mypage
                              // size="small"
                              color="lightGray"
                            // color="lightBlue"
                            >
                              수정
                            </Button>
                          )}
                      </div>
                    </div>

                    {/* -------------------------- 회원 탈퇴 버튼 칸 --------------------*/}
                    <div>
                      <div className="Button_container_InSignUp">
                        <div>
                          {/* axios post 요청 보내기 */}
                          <Button
                            onClick={this.props.DoubleCheckRemoveUsersClick}
                            outline
                            size="small"
                            nanoWidth_removeuser_inmapage
                          >
                            회원 탈퇴
                      </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
        ) : null}
      </div>
    );
  }
}

export default Mypage;
