import React from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import Landing from "./Landing";
import Main from "./Main";


function App() {
  return (
    <>
      <div className="Landing">
        {/* <withRouter> */}
        <Landing />
        {/* 라우팅 셋팅과 동시에 렌더가 되는 효과때문에 랜딩페이지의 라우팅은 여기서 설정. */}
        {/* <Switch>
            <Route path="/" component={Landing} />
          </Switch>
        </withRouter> */}
      </div>
      <div className="Main">
        <Main />
      </div>
    </>
  );
}

export default App;
