import { BrowserRouter } from "react-router-dom";
import Main from "./Main";
import Gallery from "./menu/Gallery";
import Favorite from "./menu/Favorite";
import Mypage from "./menu/Mypage";
import SignOut from "./menu/SignOut";
import SignIn from "./menu/SignIn";
import SignUp from "./menu/SignUp";

function Route() {
  return (
    <BrowserRouter>
      <Route path={"/"} component={Main} />
      <Route path={"/gallery"} component={Gallery} />
      <Route path={"/favorite"} component={Favorite} />
      <Route path={"/mypage"} component={Mypage} />
      <Route path={"/signout"} component={SignOut} />  {/* 재설계: 라우팅을 메인으로 돌아가게, isLogin도 false로 */}
      <Route path={"/signin"} component={SignIn} />
      <Route path={"/signup"} component={SignUp} />
    </BrowserRouter>
  )
}

export default Route;