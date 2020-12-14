import React from "react";

// css
import "../../css/Mypage.scss"

function Google(props) {

  // console.log("구글 커런트유저인포 프롭", props.currentUserInfo)
  console.log("구글 커런트유저인포 profile 프롭", typeof props.currentUserInfo.profile)
  // const { profile } = props.currentUserInfo


  return (

    <div className="modal_Mypage">
      <div className="modal_Mypage_overlay" onClick={props.handleMypageModal}></div>
      <div className="modal_Mypage_content">

        {/* -------------------------- 프로필 사진 업로드 칸 -------------------------*/}

        <div> 구글!!!!! </div>
        <div>
          <img
            className="profile_img"
            src={props.currentUserInfo.profile} alt="프로필 사진" />
        </div>

        {/* -------------------------- 연락처 입력 칸 -------------------------*/}

        <div className="userInfo_input_container_inMypage">
          <div>사이즈 테스트 중</div>

          <div className="email_div_inMypage">
            <span>이메일</span>

            <div>구글계정 ㄴㅁㅇㄹㅁㄴㅇㄹ</div>

          </div>

          <div className="nickname_div_inMypage">
            <span>별명</span>
            <div>{props.currentUserInfo.nickname}</div>


          </div>

          <div className="mobile_div_inMypage">
            <span>연락처</span>
            <div>{props.currentUserInfo.mobile}</div>

          </div>

        </div>

        {/* -------------- 소셜로그인 연동해제 부분 ------------------------ */}

        <div>  작업!!!!!!!  </div>

        {/* -------------------------- 회원 탈퇴 버튼 칸 --------------------*/}
        <div>
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