import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';
import className from 'classnames';

class HeaderBackground extends Component {
  render() {
    var background;
    const breakpoint = {
      regular: '@media (min-width: 540px)',
      tablet: '@media (min-width: 540px) and (max-width: 853px)',
      compact: '@media (max-width: 539px)'
    };

    //Set the styles for the background
    const aphroStyles = StyleSheet.create({
      singleImage: {
        opacity: this.props.backgroundOpacity,
        backgroundImage: `url(${this.props.singleImage})`,
      },
      image: {
        opacity: this.props.backgroundOpacity,
        [breakpoint.regular]: {
          backgroundImage: `url(${this.props.desktopImage})`
        },
        [breakpoint.tablet]: {
          backgroundImage: `url(${this.props.tabletImage})`
        },
        [breakpoint.compact]: {
          backgroundImage: `url(${this.props.mobileImage})`
        }
      },
      video: {
        opacity: this.props.backgroundOpacity,
        backgroundImage: `url(${this.props.videoPoster})`,
        //Support custom background images for tablet and mobile if we have them
        [breakpoint.tablet]: {
          backgroundImage: `url(${this.props.tabletImage})`
        },
        [breakpoint.compact]: {
          backgroundImage: `url(${this.props.mobileImage})`
        }
      }
    });

    const hasSingleImage = this.props.singleImage && !(this.props.desktopImage || this.props.mobileImage || this.props.video);

    const hasMultipleImages = this.props.desktopImage || this.props.mobileImage && !this.props.video;

    const hasVideo = this.props.video;

    //Render the video if we have a video, with a poster if we have a poster
    if (hasVideo) {
      //Give it a video, and a poster if it exists
      background =
        <div className={className(
          this.props.styles['video-background'],
          css(aphroStyles.video)
        )}>
          <video autoPlay loop poster={this.props.videoPoster}>
            <source src={this.props.video} type="video/mp4"/>
            {this.props.videoWebm ? <source src={this.props.videoWebm} type="video/webm"/> : ""}
          </video>
        </div>
    }
    else {
      background =
        <div className={className(
          this.props.styles['background-image'],
          {[css(aphroStyles.singleImage)]: hasSingleImage},
          {[css(aphroStyles.image)]: hasMultipleImages}
        )}>
          { this.props.children }
        </div>
    }
    return background;
  }
}

export default HeaderBackground;
