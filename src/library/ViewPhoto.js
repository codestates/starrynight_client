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
        {this.props.isAllOpen === true ? (
          <All handleModalOpen={this.handleModalOpen} />
        ) : null}
        {this.props.isFavoriteOpen === true ? (
          <Favorite handleModalOpen={this.handleModalOpen} />
        ) : null}
        {this.props.isGalleryOpen === true ? (
          <Gallery handleModalOpen={this.handleModalOpen} />
        ) : null}
      </div>
    );
  }
}

export default ViewPhoto;
