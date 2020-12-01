import React, { Component } from "react";
import "./css/App1.css";
import main from "./image/main.png";
import Main from "./Main";

class App1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
  }

  render() {
    return (
      <div className="App">
        <img src={main} className="Main" alt="Main" />
        <Main />
        {/* <img src={Main} className="Main" alt="Main" /> */}
        {/* <header className="App-header">App1.js</header> */}
      </div>
    );
  }
}

export default App1;
