import React, { Component } from "react";
const axios = require("axios").default;
import "../css/ViewPhoto.css";
import All from "./All";
import Comments from "./Comments";

class ViewPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCommentsOpen: false,
      isCommentId: 0,
      imgData: "",
    };
  }

  handleModalOpen = (e) => {
    console.log(e.target.name);
    this.setState({
      isCommentId: e.target.name,
      isCommentsOpen: !this.state.isCommentsOpen,
    });
    // console.log(`isOpen: ${this.state.isCommentsOpen}`);
    let url = `https://api.mystar-story.com/${this.state.isCommentId}`;
    axios.get(url).then((data) => {
      this.setState({
        imgData: data.data,
      });
      console.log(this.state.imgData);
    });
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
          imgData={this.state.imgData}
          handleModalOpen={this.handleModalOpen}
          handleModalClose={this.handleModalClose}
        />
        <All handleModalOpen={this.handleModalOpen} />
      </div>
    );
  }
}

export default ViewPhoto;
