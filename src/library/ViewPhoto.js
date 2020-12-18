import React, { Component } from "react";
const axios = require("axios").default;
import "../css/ViewPhoto.css";
import All from "./All";
import Favorite from "./Favorite";
import Gallery from "./Gallery";
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
    console.log("e.target.name: ", e.target.name);
    this.setState({
      isCommentsOpen: true,
      isCommentId: e.target.name,
    });
    console.log("모달 열림? : ", this.state.isCommentsOpen);
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
        {this.state.isCommentsOpen && (
          <Comments
            isCommentId={this.state.isCommentId}
            handleModalClose={this.handleModalClose}
            imgData={this.state.imgData}
          />
        )}
        {this.props.isFavoriteOpen && (
          <Favorite handleModalOpen={this.handleModalOpen} />
        )}
        {this.props.isGalleryOpen && (
          <Gallery handleModalOpen={this.handleModalOpen} />
        )}
        {this.props.isAllOpen && <All handleModalOpen={this.handleModalOpen} />}
      </div>
    );
  }
}

export default ViewPhoto;
