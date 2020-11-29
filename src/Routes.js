import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import Landing from "./Landing";
import Nav from "./menu/Nav"
import Gallery from "./menu/Gallery";
import Favorites from "./menu/Favorites";
import Mypage from "./menu/Mypage";
import SignOut from "./menu/SignOut";
// import SignIn from "./menu/SignIn";
// import SignUp from "./menu/SignUp";

// class SignOutRoutes extends React.Component {
//   render() {
//     return (

//       <BrowserRouter>
//         <Switch>
//           <Route exact path="/" component={Landing} />
//           <Route path="/signin" component={SignIn} />
//           <Route path="/signup" component={SignUp} />
//         </Switch>
//       </BrowserRouter>

//     )
//   }
// }

class SignInRoutes extends React.Component {
  render() {
    return (

      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/mypage" component={Mypage} />
          <Route path="/signout" component={SignOut} />
        </Switch>
      </BrowserRouter>

    )
  }
}

// export  SignOutRoutes;
export default SignInRoutes;