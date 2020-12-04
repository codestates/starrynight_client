import React from "react";

//  components
import Gallery from "./Gallery";
import Favorites from "./Favorites";
import Mypage from "./Mypage";
import SignOut from "./SignOut";
import DoubleCheckRemoveUsers from "./remove_account/DoubleCheckRemoveUsers";
import CompletedRemoveUser from "./remove_account/CompletedRemoveUser";
import SocialLogInDisconnected from "./remove_account/SocialLogInDisconnected";



class AfterLogin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isGalleryModalOpen: false,
      isFavoritesModalOpen: false,
      isMypageModalOpen: false,
      isSignOutModalOpen: false,
      isDoubleCheckRemoveUsersModalOpen: false,
      isCompletedRemoveUserModalOpen: false,
      isSocialLogInDisconnectedOpen: false,
    }
  }

  /* --------------------- 모달창 이벤트 --------------------- */
  // 각각의 모달창 중복 작동 방지를 위해 이벤트를 각각 생성
  // isModalOpen이 false로 변하면 아래 render부분에서 삼항연산자를 통해 false시 null효과를 받게되고 창은 꺼지게 할 것임.

  handleGalleryModal = () => {
    this.setState({
      isGalleryModalOpen: !this.state.isGalleryModalOpen
    })
  }

  handleFavoritesModal = () => {
    this.setState({
      isFavoritesModalOpen: !this.state.isFavoritesModalOpen
    })
  }

  handleMypageModal = () => {
    this.setState({
      isMypageModalOpen: !this.state.isMypageModalOpen
    })
    //! 모달창 띄웠을 때 body의 스크롤 방지
    //? 원래 모달오픈이 true이면 hidden으로 스크롤 방지가 되어야하는데 여기선 그 반대가 되야 작동 및 해제가 된다. 
    //? 왜 그런걸까............?..........ㅜㅜ........
    if (this.state.isMypageModalOpen === false) {
      document.body.style.overflow = "hidden";
    }
    if (this.state.isMypageModalOpen === true) {
      // 모달이 켜져있을 때 스크롤방지기능 작동했던 것을 다시 해제
      document.body.style.overflow = "unset";
    }
  }


  // handleSignOutModal = () => {
  //   this.setState({
  //     isSignOutModalOpen: !this.state.isSignOutModalOpen
  //   })
  // }

  handleDoubleCheckRemoveUsersModal = () => {
    this.setState({
      isDoubleCheckRemoveUsersModalOpen: !this.state.isDoubleCheckRemoveUsersModalOpen
    })
  }
  // Mypage로 props로 전달이 될 것. 
  // 회원 탈퇴버튼에 이벤트를 걸 예정이며,
  // 버튼 클릭과 동시에 여기(AfterLogin) 컴포넌트에서 Mypage를 false로 만들어 끄게 할 것이며
  // 그와 동시에 회원탈퇴 모달이 true로 바뀌어 작동할 수 있게끔 셋팅해주는 이벤트 핸들러.
  //! (주의) 한 개의 화면에 한 개의 모달을 띄우기 위해서는
  //! Mypage컴포넌트와 회원탈퇴 컴포넌트를 부모-자식 관계로 두면 꼬여버리니, 형제관계로 만들어 state끌어올리기 식으로 구현!
  //? 연동해체모달과 탈퇴완료 모달도 마찬가지.
  DoubleCheckRemoveUsersClick = () => {   // 회원탈퇴를 누르면
    this.setState({
      isMypageModalOpen: false    // 마이페이지 모달 끄고
    })
    this.handleDoubleCheckRemoveUsersModal()  // 정말 탈퇴할건지 재확인 모달 켜.
  }

  // 일반 회원 탈퇴 완료(더블체크컴포넌트와 형제관계 Yes! 부모관계 No!!!)
  handleCompletedRemoveUser = () => {
    this.setState({
      isCompletedRemoveUserModalOpen: !this.state.isCompletedRemoveUserModalOpen
    })
  }
  CompletedRemoveUserClick = () => {
    this.setState({
      isDoubleCheckRemoveUsersModalOpen: false
    })
    this.handleCompletedRemoveUser()
  }

  // 소셜로그인 성공시 구현 마무리 하기
  handleSocialLogInDisconnected = () => {
    this.setState({
      isSocialLogInDisconnectedOpen: !this.state.isSocialLogInDisconnectedOpen
    })
  }


  render() {
    console.log("마이페이지 불린값", this.state.isMypageModalOpen)
    console.log("afterLogin Hamburger pros", this.props)
    return (
      <div>
        {this.props.isHamburgerOn ?

          <div className="menuList_After_Login">
            <div className="modal_menuList_After_Login_overlay" onClick={this.props.handleHamburgerclick} />
            <div className="nav_link">
              {/* 로그인 경우 */}
              <div className="list" onClick={this.handleGalleryModal}>
                갤러리
              </div>
              <Gallery isOpen={this.state.isGalleryModalOpen} handleModal={this.handleGalleryModal} />

              <div className="list" onClick={this.handleFavoritesModal}>
                즐겨찾기
              </div>
              <Favorites isOpen={this.state.isFavoritesModalOpen} handleModal={this.handleFavoritesModal} />


              <div className="list" onClick={this.handleMypageModal}>
                마이페이지
              </div>


              <div className="list"
                // onClick={this.handleSignOutModal}
                onClick={this.props.hamburgerModalOFFWithSignOut}
              >
                로그아웃
              </div>
            </div>
            {/*
   회원탈퇴의 경우 마이페이지에서 자식컴포넌트로 생성하는 것보다는 마이페이지와 형제 관계를 형성한 후 
   마이페이지 컴포넌트에 위치한 "회원탈퇴" 버튼에 
   회원탈퇴 모달을 띄우기 위한 회원탈퇴 state=true변환이 아니라!
  "마이페이지 => false로 만드는 클릭이벤트만 props으로 내려 버튼에 건다!!"(발상의 전환) --> 
  --> 버튼을 클릭 시 발생하는 이벤트는 다시 state 끌어올리기로 인해 afterlogin 컴포넌트에서의 Mypage의 state값이 다시 false로 변환이되어
  Mypage 컴포넌트는 꺼지고 곧바로 회원탈퇴 모달이 켜지도록(handleDoubleCheckRemoveUsersModal) 이벤트핸들러를 혼합한다. 
  
 */}

            <Mypage
              isOpen={this.state.isMypageModalOpen}
              handleModal={this.handleMypageModal}
              DoubleCheckRemoveUsersClick={this.DoubleCheckRemoveUsersClick}
            />


            <DoubleCheckRemoveUsers
              isOpen={this.state.isDoubleCheckRemoveUsersModalOpen}
              handleModal={this.handleDoubleCheckRemoveUsersModal}
              CompletedRemoveUserClick={this.CompletedRemoveUserClick}
            />
            <CompletedRemoveUser
              isOpen={this.state.isCompletedRemoveUserModalOpen}
              handleModal={this.handleCompletedRemoveUser}
            />


          </div>
          : null}
      </div>

    )
  }
}

export default AfterLogin;