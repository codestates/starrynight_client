import React from "react";
import axios from "axios";

// css
import "../css/Mypage.scss"



class Mypage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // 순전히 화면에 변경 전의 정보를 렌더하는 역할
      currentUserInfo: {
        email: "",
        password: "",
        nickname: "",
        mobile: "",
        oauth: "",
        profile: "",
      },

      // 변경될 유저 정보, 깃북수정요청 전까지는 올바른 변수명으로 전달하기 위해 이렇게 놔두자.
      // onChange로 셋팅하고 이걸 axios로 보내
      password: "",
      nickname: "",
      mobile: "",
      oauth: "",
      profile: "",

      isModifyBtnOfPw: false,
      isModifyBtnOfNickname: false,
      isModifyBtnOfMobile: false
    }
  }

  // 토큰 보내고 GET요청 -> 해당 유저의 정보를 받아옴. 현재 화면에 렌더만 할 것임.
  getUserInfo = () => {
    axios.get("https://api.mystar-story.com/user/mypage", {
      withCredentials: true
    })
      .then((response) => {
        console.log("마이페이지 리스폰스 뭘받아와?", response)
        this.setState({
          ...this.state,
          currentUserInfo: {
            email: response.data.email,
            password: response.data.password,
            nickname: response.data.nickname,
            mobile: response.data.mobile,
            oauth: response.data.oauth,
            profile: response.data.profile
          }
        })
      })
      .catch((error) => {
        console.log(error.response.data)
      })
  }


  // 각 input창에 들어오는 입력값들을 새로운 state 값으로 저장
  handleChangeUserInfo = (key) => (text) => {
    this.setState({
      [key]: text.target.value
    })
  }

  /* ------------------ 수정버튼 클릭하면 수정할 수 있는 input칸 만들어놓기 ------------------- */
  handleModifyBtnOfPwClick = () => {
    this.setState({
      isModifyBtnOfPw: !this.state.isModifyBtnOfPw // 불린값 반전시키기. 아래 수정칸 활성화여부에 이용될 것임.
    })
  }
  // 수정요청 보내기
  requestModifyPw = () => {
    axios.patch("https://mystar-story.com/user/modify/password", this.state.password, {
      withCredentials: true
    })
      .then((response) => {
        alert(response.data)
      })
  }

  handleModifyBtnOfNicknameClick = () => {
    this.setState({
      isModifyBtnOfNickname: !this.state.isModifyBtnOfNickname
    })
  }
  requestModifyNickname = () => {
    axios.patch("https://mystar-story.com/user/modify/nickname", this.state.nickname, {
      withCredentials: true
    })
      .then((response) => {
        alert(`별명이 ${response.data.user}로 변경되었습니다.`)
      })
      .catch((error) => {
        alert(error.response.data)
      })
  }

  handleModifyBtnOfMobileClick = () => {
    this.setState({
      isModifyBtnOfMobile: !this.state.isModifyBtnOfMobile
    })
  }
  requestModifyMobile = () => {
    axios.patch("https://mystar-story.com/user/modify/nickname", this.state.mobile, {
      withCredentials: true
    })
      .then((response) => {
        alert(response.data.user)
      })
  }




  componentDidMount() {
    this.getUserInfo()
  }

  render() {
    console.log("변경될 비밀번호", this.state.password)
    console.log("변경될 별명", this.state.nickname)
    console.log("변경될 연락처", this.state.mobile)
    console.log("마이페이지 프롭", this.props)
    console.log("마이페이지 state", this.state)

    return (
      <div>
        {this.props.isOpen === true ?
          <div className="modal_Mypage">
            <div className="modal_Mypage_overlay" onClick={this.props.handleModal}></div>
            <div className="modal_Mypage_content">

              {/* -------------------------- 프로필 사진 업로드 칸 -------------------------*/}

              <div> 작업!!!!! </div>

              {/* -------------------------- 연락처 입력 칸 -------------------------*/}

              <div className="userInfo_input_container_inMypage">
                <div>사이즈 테스트 중</div>

                <div className="email_div_inMypage">
                  <span>이메일</span>
                  <div>{this.state.currentUserInfo.email}</div>
                </div>

                <div className="pw_div_inMypage">
                  <span>비밀번호</span>
                  <div>{this.state.currentUserInfo.password}</div>
                  {this.state.isModifyBtnOfPw === false ?
                    <div />
                    :
                    <input onChange={this.handleChangeUserInfo("password")} />
                  }
                  {this.state.isModifyBtnOfPw ?
                    <button onClick={this.requestModifyPw}>aa</button>
                    :
                    <button onClick={this.handleModifyBtnOfPwClick}>수정</button>
                  }
                </div>

                <div className="nickname_div_inMypage">
                  <span>별명</span>
                  <div>{this.state.currentUserInfo.nickname}</div>
                  {this.state.isModifyBtnOfNickname === false ?
                    <div />
                    :
                    <input onChange={this.handleChangeUserInfo("nickname")} />
                  }
                  {this.state.isModifyBtnOfNickname ?
                    <button onClick={this.requestModifyNickname}>aa</button>
                    :
                    <button onClick={this.handleModifyBtnOfNicknameClick}>수정</button>
                  }
                </div>

                <div className="mobile_div_inMypage">
                  <span>연락처</span>
                  <div>{this.state.currentUserInfo.mobile}</div>
                  {this.state.isModifyBtnOfMobile === false ?
                    <div />
                    :
                    <input onChange={this.handleChangeUserInfo("mobile")} />
                  }
                  {this.state.isModifyBtnOfMobile ?
                    <button onClick={this.requestModifyMobile}>aa</button>
                    :
                    <button onClick={this.handleModifyBtnOfMobileClick}>수정</button>
                  }
                </div>

              </div>

              {/* -------------- 소셜로그인 연동해제 부분 ------------------------ */}

              <div>  작업!!!!!!!  </div>

              {/* -------------------------- 회원 탈퇴 버튼 칸 --------------------*/}
              <div>
                <div className="button_container_InSignUp">
                  <div>
                    {/* axios post 요청 보내기 */}
                    <span onClick={this.props.DoubleCheckRemoveUsersClick} >
                      회원 탈퇴
                      </span>
                  </div>

                </div>
              </div>

            </div>
          </div>
          : null
        }
      </div>
    )
  }
}

export default Mypage;