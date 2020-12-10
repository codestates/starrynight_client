import React, { Component } from "react";
import "../css/ViewPhoto.css";
import All from "./All";
import Comments from "./Comments";

class ViewPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCommentsOpen: false,
    };
  }

  handleModalControl = () => {
    this.setState({
      isCommentsOpen: !this.state.isCommentsOpen,
    });
    console.log(`isOpen: ${this.state.isCommentsOpen}`);
  };

  render() {
    return (
      <div className="ViewPhoto">
        <Comments
          isCommentsOpen={this.state.isCommentsOpen}
          handleModalControl={this.handleModalControl}
        />
        <All handleModalControl={this.handleModalControl} />
      </div>
    );
  }
}

export default ViewPhoto;
