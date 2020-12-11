import React, { Component } from "react";
import "../css/ViewPhoto.css";
import All from "./All";
import Comments from "./Comments";

class ViewPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCommentsOpen: false,
      isCommentId: 0,
    };
  }

  handleModalOpen = (e) => {
    console.log(e.target.name);
    this.setState({
      isCommentId: e.target.name,
    });
    this.setState({
      isCommentsOpen: !this.state.isCommentsOpen,
    });
    // console.log(`isOpen: ${this.state.isCommentsOpen}`);
  };

  handleModalClose = () => {
    this.setState({
      isCommentsOpen: !this.state.isCommentsOpen,
    });
    // console.log(`isOpen: ${this.state.isCommentsOpen}`);
  };

  render() {
    return (
      <div className="ViewPhoto">
        <Comments
          isCommentsOpen={this.state.isCommentsOpen}
          isCommentId={this.state.isCommentId}
          handleModalOpen={this.handleModalOpen}
          handleModalClose={this.handleModalClose}
        />
        <All handleModalOpen={this.handleModalOpen} />
      </div>
    );
  }
}

export default ViewPhoto;
