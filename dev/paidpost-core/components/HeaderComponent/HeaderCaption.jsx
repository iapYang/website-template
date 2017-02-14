import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import className from 'classnames';

class HeaderCaption extends Component {
  render() {
    var caption = null;
    if(this.props.captionText){
      //Insert the scroll icon if we want it; customize the color if we want to
      caption= <div className={className(this.props.styles["header-caption"])}>{this.props.captionText}</div>
    }
    return caption;
  }
};

export default HeaderCaption;