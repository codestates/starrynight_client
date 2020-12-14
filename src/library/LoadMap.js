import React, { Component } from "react";
import Map from "./Map";
const axios = require("axios").default;

class LoadMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLocation: "",
    };
  }

  componentDidMount() {
    let url = `https://api.mystar-story.com/${this.props.isCommentId}`;
    axios.get(url).then((data) => {
      this.setState({
        isLocation: data.data.location,
      });
      console.log("location: ", this.state.isLocation);
    });
  }

  render() {
    return (
      <div>
        <Map place={this.state.isLocation} />
      </div>
    );
  }
}

export default LoadMap;
