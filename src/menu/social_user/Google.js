import React from "react";

// css
import "../../css/Google.scss"

function Google(props) {

  // console.log("구글 커런트유저인포 프롭", props.currentUserInfo)
  console.log("구글 커런트유저인포 profile 프롭", typeof props.currentUserInfo.profile)
  // const { profile } = props.currentUserInfo


  return (

    <div className="modal_Google">
      <div className="modal_Google_overlay" onClick={props.handleMypageModal}></div>
      <div className="modal_Google_content">

        {/* -------------------------- 프로필 사진 업로드 칸 -------------------------*/}


        <div className="profile_img_box">
          <img
            className="profile_img"
            src={props.currentUserInfo.profile} alt="프로필 사진" />
        </div>
        <h1>{props.currentUserInfo.nickname}</h1>

        {/* -------------------------- 연락처 입력 칸 -------------------------*/}

        <div className="userInfo_input_container_inGoogle">


          <div className="email_div_inGoogle">
            <div>이메일</div>

            <div>구글 계정 사용자</div>

          </div>

          <div className="nickname_div_inGoogle">
            <span>별명</span>
            <div>{props.currentUserInfo.nickname}</div>


          </div>

          <div className="mobile_div_inGoogle">
            <span>연락처</span>
            <div>{props.currentUserInfo.mobile}</div>

          </div>

        </div>

        {/* -------------- 소셜로그인 연동해제 부분 ------------------------ */}


        <div>
          <h2>계정연동</h2>
          <div className="social_info">
            <div>구글</div>
            <div>연동중</div>
          </div>
          <div className="button_container_InSignUp">
            <div>
              {/* axios post 요청 보내기 */}
              {/* 연동해제 메소드 만들기 */}
              {/* <button onClick={props.DoubleCheckRemoveUsersClick} > */}
              <button>
                연동 해제
            </button>
            </div>

          </div>
        </div>

      </div>
    </div>

  )
}


export default Google;