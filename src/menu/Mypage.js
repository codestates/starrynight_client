import React from "react";
import axios from "axios";

// css
import "../css/Mypage.scss"



class Mypage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      nickname: "",
      mobile: "",
      oauth: "",
      profile: ""
    }
  }

  getUserInfo = () => {
    axios.get("https://api.mystar-story.com/user/mypage", {
      withCredentials: true
    })
      .then((response) => {
        console.log("마이페이지 리스폰스 뭘받아와?", response)
        this.setState({
          email: response.data.email,
          password: response.data.password,
          nickname: response.data.nickname,
          mobile: response.data.mobile,
          oauth: response.data.oauth,
          profile: response.data.profile
        })
      })
      .catch((error) => {
        console.log(error.response.data)
      })
  }

  componentDidMount() {
    this.getUserInfo()
  }

  render() {

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
              <form>
                <div className="userInfo_input_container_inMypage">
                  <div>사이즈 테스트 중</div>
                  <div className="email_div_inMypage">
                    <span>이메일</span>
                    <input />
                  </div>
                  <div className="pw_div_inMypage">
                    <span>비밀번호</span>
                    <input />
                  </div>
                  <div className="nickname_div_inMypage">
                    <span>별명</span>
                    <input />
                  </div>
                  <div className="mobile_div_inMypage">
                    <span>연락처</span>
                    <input />
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


              </form>
            </div>
          </div>
          : null
        }
      </div>
    )
  }
}

export default Mypage;