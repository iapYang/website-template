import React from 'react';

import scss from "./_vhs-homepage-cover.scss";

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
  }

  createVHSConfig = props => {
    return Object.assign({
      container: props.id,
      poster: props.poster,
      name: `PaidPost | ${PaidPost.clientName} | ${PaidPost.projectName} | ${this.props.id}`,
      type: "PaidPost",
      cover: {
        mode: "homepage",
        headline: props.headline
      },
      duration: 1,
      ads: false,
      api: false,
      width: "100%",
      height: "100%",
      mode: "html5"
    }, props);
  };

  componentWillMount() {
    this.setup = this.createVHSConfig(this.props);
  }

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    let videoElement = document.createElement("div");
    videoElement.id = this.props.id;
    videoElement.className = scss.vhs;
    this.el.appendChild(videoElement);

    System.import("vhs").then(VHS => {
      this.player = VHS.player(this.setup);
    });
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  render() {
    return (
      <div ref={c => this.el = c} />
    );
  }
}

VideoPlayer.propTypes = {
  id: React.PropTypes.string.isRequired
};

export default VideoPlayer;
