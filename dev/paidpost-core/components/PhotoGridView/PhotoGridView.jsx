import React, { Component } from "react";
import classNames from "classnames";
import FigureTag from "../FigureTag";

import scss from "./PhotoGridView.scss";

class PhotoGridView extends Component {
  // Prevent LayoutContainer context from being passed to ImageView children
  // TODO: Find out how much this messes up ImageView
  getChildContext() {
    return {
      aspect: "square",
      layout: "center",
      layoutClassName: "center-square"
    };
  }

  render() {
    // How many child views did we get?
    const childCount = React.Children.count(this.props.children);
    // Throw an error if the SCSS file doesn't contain a class with that number of items
    if (typeof scss[`PhotoGridView-${childCount}`] === "undefined") {
      throw `PhotoGridView doesn't support ${childCount}-item layouts`;
    }

    // Collect caption and credit props
    // TODO: implement this more robustly / correctly when some images omit caption/credit
    let captions = [], credits = [], oddChildren = [], evenChildren = [], middleChildren = [];
    React.Children.forEach(this.props.children, (child, index) => {
      if (captions.indexOf(child.props.caption) === -1 && typeof child.props.caption === "string" && child.props.caption !== "") {
        captions.push(child.props.caption);
      }
      if (credits.indexOf(child.props.credit) === -1 && typeof child.props.caption === "string" && child.props.caption !== "") {
        credits.push(child.props.credit);
      }

      if (index % 2 === 0) {
        evenChildren.push(child);
      } else {
        oddChildren.push(child);
      }

      if (index > 0 && index < childCount) {
        middleChildren.push(child);
      }
    });

    // Set content output
    let content = (
      <div className={scss["content"]}>
        {this.props.children}
      </div>
    );

    // Wrap children differently for 4-item grid layouts
    if (childCount === 4) {
      if (this.props.alternate === true) {
        content = (
          <div className={scss["content"]}>
            {evenChildren[0]}
            <div className={scss["middle"]}>{[evenChildren[1], oddChildren[0]]}</div>
            {oddChildren[1]}
          </div>
        );
      } else {
        if (this.props.column === false) {
          content = (
            <div className={scss["content"]}>
              <div key="0">{evenChildren}</div>
              <div key="1">{oddChildren}</div>
            </div>
          );
        } else {
          content = (
            <div className={scss["content"]}>
              <div key="0">{[evenChildren[0], oddChildren[0]]}</div>
              <div key="1">{[evenChildren[1], oddChildren[1]]}</div>
            </div>
          );
        }
      }
    } else if (childCount === 3 && this.props.alternate === true) {
      content = (
        <div className={scss["content"]}>
          {evenChildren[0]}
          <div className={scss["middle"]}>{[oddChildren[0], evenChildren[1]]}</div>
        </div>
      );
    }

    const className = classNames(
      scss[`PhotoGridView-${childCount}`],
      {[scss["alternate"]]: this.props.alternate},
      {[scss["flip"]]: this.props.flip},
      {[scss["column"]]: this.props.column},
      scss[this.context.layoutClassName],
      this.props.className
    );

    return (
      <FigureTag className={className}
        caption={captions.join(" ")}
        credit={credits.join(", ")}
      >
        {content}
      </FigureTag>
    );
  }
}

PhotoGridView.childContextTypes = {
  aspect: React.PropTypes.string,
  layout: React.PropTypes.string,
  layoutClassName: React.PropTypes.string
};

PhotoGridView.contextTypes = {
  aspect: React.PropTypes.string,
  layout: React.PropTypes.string,
  layoutClassName: React.PropTypes.string
};

PhotoGridView.propTypes = {
  children: React.PropTypes.node.isRequired,
  alternate: React.PropTypes.bool.isRequired,
  flip: React.PropTypes.bool.isRequired,
  column:  React.PropTypes.bool.isRequired
};

PhotoGridView.defaultProps = {
  alternate: false,
  flip: false,
  column: false
};

export default PhotoGridView;
