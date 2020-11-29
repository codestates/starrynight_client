import React from "react"
import { NavLink } from "react-router-dom"

class SignIn extends React.Component {
  render() {
    return (
      <div>
        로그인!
      </div>
    )
  }
}

export default SignIn;

// <div className="modal hidden">
// <div className="modal_overlay"></div>
// <div className="modal_content">
//   <h1>너의 시간을 겟~⭐️</h1>
//   <div className="container">
//     <div className="signUp_div">
//       <NavLink to="/signup" className="signUp_link">
//         아직 회원이 아니신가요?
//       </NavLink>
//     </div>
//     <img
//       id="sign_in_img"
//       src="https://t1.daumcdn.net/cfile/tistory/992C413B5D2ACF7C1D"
//     ></img>
//     {/*-------------- e-mail pw 입력칸 ----------------- */}
//     <form onSubmit={(e) => e.preventDefault()}>
//       <div className="container1">
//         <div className="email_div">
//           <span className="email_span">e-mail</span>
//           <input
//             type="email"
//             onChange={this.hadleInputValue("email")}
//           ></input>
//         </div>
//         <div className="PW_div">
//           <span>PW</span>
//           <input
//             type="password"
//             onChange={this.hadleInputValue("password")}
//           ></input>
//         </div>
//       </div>
//       <div className="findAccount_span">
//         <span>
//           <NavLink to="/findaccount" className="findAccount_link">
//             e-mail | PW 찾기
//           </NavLink>
//         </span>
//       </div>
//       <div>
//         {/* <NavLink to="/todo"> */}
//         <button
//           className="loginButton"
//           type="submit"
//           onClick={this.handleSignIn}
//         >
//           로그인
//         </button>
//         {/* </NavLink> */}
//         <div>
//           <button
//             className="loginButton" type="submit"
//             onClick={this.gitHubLogin}
//           >
//             Github 로그인
//           </button>
//         </div>
//         {/* <div className="alert-box">{this.state.errorMessage}</div> */}
//       </div>
//     </form>
//   </div>
// </div>
// </div>