import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import className from 'classnames';

import nyt5Normalize from "../../utils/normalize/nyt5.scss";

import scss from "./PaidPostArticle.scss";

class PaidPostArticle extends Component {
  render() {
    const googleFontsUrl = `https://fonts.googleapis.com/css?family=${this.props.fontFamily.replace(/\s/g, "+")}:300,400,700`;

    return (
      <div className={className(
        {[this.props.className]: this.props.className !== ""},
        {[nyt5Normalize.nyt5Normalize]: this.props.normalize === true},
        scss[`PaidPostArticle-${this.props.fontFamily.replace(/\s/g, "")}`],
        {[scss["debug"]]: this.props.debug === true}
      )}>
        {this.props.fontFamily !== "system" ? <link href={googleFontsUrl} rel="stylesheet"/> : ""}
        {this.props.children}
      </div>
    );
  }
}

PaidPostArticle.propTypes = {
  className: React.PropTypes.string,
  fontFamily: React.PropTypes.oneOf([
    "Open Sans",
    "Lato",
    "Roboto",
    "Source Sans Pro",
    "system"
  ]),
  normalize: React.PropTypes.bool,
  debug: React.PropTypes.bool
};

PaidPostArticle.defaultProps = {
  fontFamily: "Source Sans Pro",
  normalize: true,
  debug: false
};

export default PaidPostArticle;
