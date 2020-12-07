import React, { Component } from "react";
import "../css/ViewPhoto.css";
import All from "./All";
import Comments from "./Comments";

class ViewPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  handleModalControl = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
    console.log(`isOpen: ${this.state.isOpen}`);
  };

  render() {
    return (
      <div className="ViewPhoto">
        <Comments
          isOpen={this.state.isOpen}
          handleModalControl={this.handleModalControl}
        />
        <All handleModalControl={this.handleModalControl} />
      </div>
    );
  }
}

export default ViewPhoto;
