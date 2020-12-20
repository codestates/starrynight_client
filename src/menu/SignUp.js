import React from "react";
import axios from "axios";
import Button from "./Button";


const FormData = require('form-data');
//css
import "../css/SignUp.scss";
import { BiCamera } from "react-icons/bi";



class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      nickname: "",
      password: "",
      doubleCheckPw: "",
      mobile: "",

      file: "",
      previewURL: ""
    };
    // this.myRef = React.createRef();
  }
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // handleprofileOnChange = (event) => {
  //   event.preventDefault();
  //   let reader = new FileReader();
  //   let file = event.target.files[0]
  //   reader.onloadend = () => {
  //     this.setState({
  //       file: file,
  //       previewURL: reader.result
  //     })
  //   }
  //   reader.readAsDataURL(file);
  //   // const file = photoInput.current.files[0];
  //   // if(file) {
  //   //   const reader  = new FileReader();
  //   //   reader.read
  //   // }

  // }


  handleprofileOnChange = (e) => {
    // e.preventDefault();
    this.setState({
      file: e.target.files[0]
    })

    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        previewURL: reader.result
      });
    };
    reader.readAsDataURL(file);
  }
  handlePost = (e) => {
    // e.preventDefault();

    const formData = new FormData();
    formData.append("file", this.state.file);
    formData.append("email", this.state.email);
    formData.append("nickname", this.state.nickname);
    formData.append("password", this.state.password);
    formData.append("mobile", this.state.mobile);

    console.log("formData", this.state.file.File)



    // 에러메세지의 state값을 업데이트하고 아래 렌더부분에서 렌더시킨다.
    // 에러메세지 - email
    if (!this.state.email.length) {
      this.setState({
        errMsgOfEmailBlanks: "이메일은 필수입니다.",
      });
    } else {
      this.setState({
        errMsgOfEmailBlanks: "",
      });
    }

    // 에러메세지 - nickname
    if (!this.state.nickname.length) {
      this.setState({
        errMsgOfNickNameBlanks: "별명을 입력해주세요.",
      });
    } else {
      this.setState({
        errMsgOfNickNameBlanks: "",
      });
    }

    // 에러메세지 - password
    if (!this.state.password.length) {
      this.setState({
        errMsgOfPasswordBlanks: "비밀번호는 필수입니다.",
      });
    } else {
      this.setState({
        errMsgOfPasswordBlanks: "",
      });
    }

    // 에러메세지 - doubleCheckPw
    if (!this.state.doubleCheckPw.length) {
      this.setState({
        errMsgOfdoubleCheckPwBlanks: "비밀번호 중복확인은 필수입니다.",
      })
    }
    else if (this.state.doubleCheckPw !== this.state.password) {
      this.setState({
        errMsgOfdoubleCheckPw: "비밀번호가 일치하지 않습니다."
      })
    }
    else {
      this.setState({
        errMsgOfdoubleCheckPwBlanks: "",
        errMsgOfdoubleCheckPw: ""
      })
    }

    // 에러메세지 - mobile
    if (!this.state.mobile.length) {
      this.setState({
        errMsgOfMobileBlanks: "연락처를 입력해주세요.",
      });
    } else {
      this.setState({
        errMsgOfMobileBlanks: "",
      });
    }

    // 모든 값들과 이메일형식이 충족이 되면 !

    if (
      this.state.email.length &&
      this.state.nickname.length &&
      this.state.password.length &&
      this.state.doubleCheckPw.length &&
      this.state.doubleCheckPw === this.state.password &&
      this.state.mobile.length
    ) {




      // const photo = window.sessionStorage.getItem("profile")
      const config = {
        // headers: formData.getHeaders()
        // headers: { "Content-type": "imageFile.type" }
        headers: { 'Content-Type': 'multipart/form-data' }
        // headers: { 'Content-Type': 'application/json' }
      };

      axios.post("https://api.mystar-story.com/user/signup", formData, config)
        .then((respoense) => {
          console.log("사진이 업로드 되었습니다.", respoense.data)
          alert(respoense.data);
          this.props.redirectToSignIn(); // 회원가입 완료 후 로그인 모달창으로 돌아가!
        })
        .catch((error) => {
          this.setState({
            signUpFailedMsg: error.response.data,
          });
          console.log("사진 업로드 실패", error.response.data)
        })
    }

  }
  // requestProFile = () => {
  //   axios.post("https://api.mystar-story.com/user/signup", formData, config)
  //     .then((respoense) => {
  //       console.log("사진이 업로드 되었습니다.", respoense.data)
  //     })
  //     .catch((error) => {

  //       console.log("사진 업로드 실패", error.response.data)
  //     })
  // }


  // 모달창이 꺼지고 다시 회원가입 모달 활성화했을 때, 기본 유저정보 State와 에러메세지가 계속 띄어져있는 것을 방지하기 위해
  // state값을 빈 스트링으로 렌더링 시킨다.
  // componentWillUpdate에 걸어둔다.
  errMsgInit = () => {
    if (this.props.isOpen === false) {
      console.log("초기화 됨?");
      this.setState({
        email: "",
        nickname: "",
        password: "",
        doubleCheckPw: "",
        mobile: "",
        errMsgOfEmailBlanks: "",
        errMsgOfNickNameBlanks: "",
        errMsgOfPasswordBlanks: "",
        errMsgOfdoubleCheckPwBlanks: "",
        errMsgOfdoubleCheckPw: "",
        errMsgOfMobileBlanks: "",
      });
    }
  };




  // 정보입력 이벤트
  // State 할당: 입력받은 정보를 위의 빈 스트링으로 셋팅이 된 state값을 채운다.

  //! 콜백을 사용하는 이유: 입력값 한글자라도 그 존재여부에 따라 에러메세지를 실시간으로 바로 지우기 위함.
  handleInputValue = (key) => (text) => {
    console.log("ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ입력된 정보 할당");
    // console.log("잘입력되요?")
    // console.log("key", key)
    // console.log("text", text)
    this.setState({
      [key]: text.target.value,
    });

    // 에러메세지의 state값을 업데이트하고 아래 렌더부분에서 렌더시킨다.
    // 에러메세지 - email
    //! !this.state.email.length를 사용하면 사용자의 입력행위로 length가 1이상이 되었음에도 불구하고 0으로 인식하여 에러메세지를 출력. 따라서 ""를 사용.
    //! 또한 다음 input을 채우는 행위를 하면 직전에 작성한 input 쪽에서 작성한 정보가 말그대로 ""가 아니기에 에러메세지를 그제서야 출력 따라서 & !length 를 사용.
    // if (this.state.email !== "") {
    if (this.state.email.length > 0) {
      this.setState({
        errMsgOfEmailBlanks: "",
      });
      console.log("ㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴ에러메세지 초기화");
    }

    if (this.state.nickname !== "") {
      this.setState({
        errMsgOfNickNameBlanks: "",
      });
    }

    if (this.state.password !== "") {
      this.setState({
        errMsgOfPasswordBlanks: "",
      });
    }

    if (this.state.doubleCheckPw !== "") {
      this.setState({
        errMsgOfdoubleCheckPwBlanks: "",
      })
    }
    else if (this.state.doubleCheckPw === this.state.password) {
      this.setState({
        errMsgOfdoubleCheckPw: ""
      })
    }

    if (this.state.mobile !== "") {
      this.setState({
        errMsgOfMobileBlanks: "",
      });
    }

    // if (this.state.email !== "" && !this.state.email.length) {
    //   return this.setState({
    //     errMsgOfEmailBlanks: "이메일은 필수입니다."
    //   })
    // }
    // else {  // 입력칸이 공백이 아니게 된 순간 바로 에러메시지 삭제
    //   this.setState({
    //     errMsgOfEmailBlanks: ""
    //   })
    // }

    // // 에러메세지 - nickname
    // // 위의 email 입력칸을 채우는 순간 그 다음 입력칸인 별명에서 곧바로 에러메세지가 출력되는 것을 방지하기 위해 조건문에 email.length 조건 걸어둠.
    // if (!this.state.nickname.length) {
    //   return this.setState({
    //     errMsgOfNickNameBlanks: "별명을 입력해주세요."
    //   })
    // }
    // else {
    //   this.setState({
    //     errMsgOfNickNameBlanks: ""
    //   })
    // }

    // // 에러메세지 - password
    // if (this.state.nickname.length && this.state.password !== "" && !this.state.password.length) {
    //   return this.setState({
    //     errMsgOfPasswordBlanks: "비밀번호는 필수입니다."
    //   })
    // }
    // else {
    //   this.setState({
    //     errMsgOfPasswordBlanks: ""
    //   })
    // }

    // // 에러메세지 - mobile
    // if (this.state.password.length && this.state.mobile !== "" && !this.state.mobile.length) {
    //   return this.setState({
    //     errMsgOfMobileBlanks: "연락처를 입력해주세요."
    //   })
    // }
    // else {
    //   this.setState({
    //     errMsgOfMobileBlanks: ""
    //   })
    // }
  };
  // 위의 입력 이벤트로 인해 새로운 정보로 할당된 state값을 활용한다.
  // 회원가입한 신규 유저 정보를 데이터베이스에 저장하도록 셋팅한다.
  // 서버에 회원가입을 요청을 한 후, 로그인 페이지로 요청한다.
  //! 에러메세지 셋팅을 여기서 또 한 이유 : 모달을 활성화시킨 후 사용자의 입력행위가 없다면 에러메세지 출력할 필요가 없으니, 에러메세지는 당연히 출력이 안되어 있을 것.
  //! 따라서 아무 입력행위 없이 회원가입버튼을 누르면 모든 정보를 입력하라는 에러메세지를 출력하기 위함.
  // handleClickAddNewUserInfo = () => {
  //   const NewUserInfo = {
  //     loginPlatformId: 1, /// 수정하기 소셜하고도 구분해야하는 알고리즘 짜야함.
  //     email: this.state.email,
  //     nickname: this.state.nickname,
  //     password: this.state.password,
  //     // doubleCheckPw: this.state.doubleCheckPw,
  //     mobile: this.state.mobile,
  //     // file: this.state.file
  //   };


  //   // const NewProfilePhoto = {
  //   //   file: window.sessionStorage.getItem("profile")
  //   // }


  //   // 에러메세지의 state값을 업데이트하고 아래 렌더부분에서 렌더시킨다.
  //   // 에러메세지 - email
  //   if (!this.state.email.length) {
  //     this.setState({
  //       errMsgOfEmailBlanks: "이메일은 필수입니다.",
  //     });
  //   } else {
  //     this.setState({
  //       errMsgOfEmailBlanks: "",
  //     });
  //   }

  //   // 에러메세지 - nickname
  //   if (!this.state.nickname.length) {
  //     this.setState({
  //       errMsgOfNickNameBlanks: "별명을 입력해주세요.",
  //     });
  //   } else {
  //     this.setState({
  //       errMsgOfNickNameBlanks: "",
  //     });
  //   }

  //   // 에러메세지 - password
  //   if (!this.state.password.length) {
  //     this.setState({
  //       errMsgOfPasswordBlanks: "비밀번호는 필수입니다.",
  //     });
  //   } else {
  //     this.setState({
  //       errMsgOfPasswordBlanks: "",
  //     });
  //   }

  //   // 에러메세지 - doubleCheckPw
  //   if (!this.state.doubleCheckPw.length) {
  //     this.setState({
  //       errMsgOfdoubleCheckPwBlanks: "비밀번호 중복확인은 필수입니다.",
  //     })
  //   }
  //   else if (this.state.doubleCheckPw !== this.state.password) {
  //     this.setState({
  //       errMsgOfdoubleCheckPw: "비밀번호가 일치하지 않습니다."
  //     })
  //   }
  //   else {
  //     this.setState({
  //       errMsgOfdoubleCheckPwBlanks: "",
  //       errMsgOfdoubleCheckPw: ""
  //     })
  //   }

  //   // 에러메세지 - mobile
  //   if (!this.state.mobile.length) {
  //     this.setState({
  //       errMsgOfMobileBlanks: "연락처를 입력해주세요.",
  //     });
  //   } else {
  //     this.setState({
  //       errMsgOfMobileBlanks: "",
  //     });
  //   }

  //   // 모든 값들과 이메일형식이 충족이 되면 !

  //   if (
  //     this.state.email.length &&
  //     this.state.nickname.length &&
  //     this.state.password.length &&
  //     this.state.doubleCheckPw.length &&
  //     this.state.doubleCheckPw === this.state.password &&
  //     this.state.mobile.length
  //   ) {
  //     // console.log("NewProfilePhoto.file", NewProfilePhoto.file)

  //     // const config = {


  //     //   // headers: { "Content-type": "imageFile.type" }
  //     //   headers: { 'Content-Type': 'multipart/form-data' }
  //     //   // headers: { 'Content-Type': 'application/json' }
  //     // };


  //     // axios.post("https://api.mystar-story.com/user/signup", NewProfilePhoto, config)
  //     //   .then((respoense) => {
  //     //     console.log("사진이 업로드 되었습니다.", respoense.data)
  //     //   })
  //     //   .catch((error) => {
  //     //     console.log("사진 업로드 실패", error.response.data)
  //     //   })

  //     // this.handlePost();

  //     // const config = {


  //     //   // headers: { "Content-type": "imageFile.type" }
  //     //   headers: { 'Content-Type': 'multipart/form-data' }
  //     //   // headers: { 'Content-Type': 'application/json' }
  //     // };


  //     axios
  //       .post("https://api.mystar-story.com/user/signup", NewUserInfo)
  //       // .post("https://api.mystar-story.com/user/signup", this.state, config)
  //       .then((respoense) => {
  //         alert(respoense.data);
  //         this.props.redirectToSignIn(); // 회원가입 완료 후 로그인 모달창으로 돌아가!
  //       })
  //       .catch((error) => {
  //         // alert("hello world!")
  //         // console.log("회원가입 실패", error.response)
  //         this.setState({
  //           signUpFailedMsg: error.response.data,
  //         });
  //       });


  //     // 프로필 사진도 같이 요청하기
  //     // this.handlePost()
  //     this.requestProFile()
  //   }
  // };

  // 엔터키를 눌르면 회원가입 버튼 누르게 하는 기능  ---> 연락처 input에 적용시키자.
  signUpPress = (e) => {
    if (e.key === "Enter") {
      // this.handleClickAddNewUserInfo();
      this.handlePost();
    }
  };

  // componentWillUpdate() {
  //   this.errMsgInit()
  //   this.handleClickAddNewUserInfo
  // }

  componentDidMount() {

  }

  render() {
    console.log("BeforeLogin에서 내려 온 회원가입 프롭스", this.props);
    console.log("회원가입: 새로 할당된 state", this.state);
    console.log("file!!!!!!", this.state.file)
    // let profile_preview = null;
    let profile_preview = <img className="profile_img" src="https://t1.daumcdn.net/cfile/tistory/2513B53E55DB206927" alt="프로필 사진 허허 안나오네" />;
    if (this.state.file !== '') {
      profile_preview = <img className='profile_img' src={this.state.previewURL}></img>
    }


    return (
      <div>
        {this.props.isOpen === true ? (
          <div className="modal_SignUp">
            <div
              className="modal_SignUp_overlay"
              onClick={this.props.handleSignUpModal}
            ></div>
            <div className="modal_SignUp_content">
              {/* -------------------------- 타이틀 -------------------------*/}
              <h2>회원 가입</h2>

              {/* -------------------------- 프로필 사진 업로드 칸 -------------------------*/}


              <div className="signUp_box">
                {/* -------------------------- 연락처 입력 칸 -------------------------*/}

                <div className="local_new_user">
                  <form id="myForm">
                    <div className="userInfo_input_container">
                      <div className="user_title_signUp">NEW USER</div>
                      <div className="box_img">
                        <label>
                          <div className="add_profile_box_1">
                            <div className="add_profile_box_2">
                              <BiCamera
                                className="add_profile"
                              />
                            </div>
                          </div>
                          {/* 
                          {this.state.currentUserInfo.profile !== undefined ? (
                            this.state.profile !== "" ? (
                              <img
                                className="profile_img"
                                src={this.state.previewURL}
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



                          {/* <img
                            className="profile_img"
                            src="https://t1.daumcdn.net/cfile/tistory/2513B53E55DB206927" alt="프로필 사진"
                          /> */}
                          {profile_preview}
                          <input type="file"
                            accept="image/jpg,image/png,image/jpeg,image/gif"
                            id="myprofile"
                            name="myprofile"
                            onChange={this.handleprofileOnChange}
                          />
                        </label>


                        {/* </input> */}
                      </div>
                      {/* </form> */}

                      <div className="email_div">
                        {/* <span>이메일</span> */}
                        <input
                          type="email"
                          onChange={this.handleInputValue("email")}
                          placeholder="이메일을 입력하세요."
                        />
                        <div className="text_style_SignUp">
                          {this.state.errMsgOfEmailBlanks}
                        </div>
                      </div>

                      <div className="nickname_div">
                        {/* <span>별명</span> */}
                        <input
                          className="control_margin_top"
                          type="text"
                          placeholder="별명을 입력해주세요."
                          onChange={this.handleInputValue("nickname")}
                        />
                        <div className="text_style_SignUp">
                          {this.state.errMsgOfNickNameBlanks}
                        </div>
                      </div>

                      <div className="password_div">
                        {/* <span>비밀번호</span> */}
                        <input
                          className="control_margin_top"
                          type="password"
                          placeholder="비밀번호를 입력하세요."
                          onChange={this.handleInputValue("password")}
                        />
                        <div className="text_style_SignUp">
                          {this.state.errMsgOfPasswordBlanks}
                        </div>
                      </div>

                      <div className="password_div">
                        <input
                          className="control_margin_top"
                          type="password"
                          placeholder="비밀번호를 다시 입력해주세요."
                          onChange={this.handleInputValue("doubleCheckPw")}
                        />
                        <div className="text_style_SignUp">
                          {this.state.errMsgOfdoubleCheckPw}
                          {this.state.errMsgOfdoubleCheckPwBlanks}
                        </div>
                      </div>

                      <div className="mobile_div">
                        {/* <span>연락처</span> */}
                        <input
                          className="control_margin_top"
                          type="text"
                          placeholder="연락처를 입력하세요."
                          onChange={this.handleInputValue("mobile")}
                          onKeyPress={this.signUpPress}
                        />
                        <div className="text_style_SignUp">
                          {this.state.errMsgOfMobileBlanks}
                        </div>
                      </div>

                      <div>{this.state.signUpFailedMsg}</div>
                    </div>
                  </form>
                  {/* -------------------------- submit 버튼 칸 --------------------*/}

                  <div className="button_container_InSignUp">
                    <div>
                      {/* axios post 요청 보내기 */}
                      <Button
                        size="small"
                        color="gray"
                        middleWidth_main_btn
                        // onClick={this.handleClickAddNewUserInfo}
                        onClick={this.handlePost}

                      >
                        회원 가입
                      </Button>
                    </div>
                    <div className="rediect_To_Signin">
                      <span>계정이 있으신가요?</span>
                      {/* 로그인 모달로 돌아가게 할 것. */}
                      <span
                        className="redirect_btn"
                        onClick={this.props.redirectToSignIn}
                      >
                        {" "}
                        로그인
                      </span>
                    </div>
                  </div>
                </div>

                <div className="division_line"></div>

                <div className="container2_siginIn">
                  <div className="socialLogin">
                    <div id="social_login_title">SIGN UP with one click</div>

                    <div className="socialLogin_btn">
                      <Button
                        color="red"
                        outline
                        smallWidth
                        onClick={this.props.googleLogin}
                      >
                        Google
                      </Button>
                    </div>
                    <div className="socialLogin_btn">
                      <Button
                        color="gray"
                        outline
                        smallWidth
                        onClick={this.props.kakaoLogin}
                      >
                        Kakao
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default SignUp;
