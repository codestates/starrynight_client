function SocialLogInDisconnected() {
  return (
    <>
      <div className="modal_SocialLogInDisconnected">
        <div className="modal_SocialLogInDisconnected_overlay"></div>
        <div className="modal_SocialLogInDisconnected_content">
          {/* -------------------------- 타이틀 -------------------------*/}
          <h2>연동 해제 완료</h2>
          {/* -------------------------- 안내 문구 -------------------------*/}
          <div className="message_container">

            <div>완전한 회원 탈퇴를 위해서는 가입하신 SNS에서</div>
            <div>별도로 계정연동 해제를 해주셔야 합니다.</div>
            <br />
            <div>다시 저희와 함께 밤 하늘을 올려다 볼 그날까지</div>
            <div>고객님을 기다리겠습니다.</div>
            <div>이용해주셔서 감사합니다 😊</div>

          </div>
          {/* -------------------------- 돌아가기 버튼 칸 -------------------------*/}
          <button>돌아가기</button>
        </div>
      </div>
    </>
  )
}

export default SocialLogInDisconnected;