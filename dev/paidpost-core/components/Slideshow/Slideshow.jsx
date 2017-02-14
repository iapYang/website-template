import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';
import className from 'classnames';

import scss from './Slideshow.scss';

const defaultEventCategory = "Slideshow";

class Slideshow extends Component {
  getEventCategoryName() {
    if (this.props.eventCategory !== defaultEventCategory) {
      // Prepend our return value with defaultEventCategory
      return `${defaultEventCategory} - ${this.props.eventCategory}`;
    } else {
      return this.props.eventCategory;
    }
  }

  getLayoutClassName() {
    let scssClass = `${this.context.layout}`;

    if (this.context.layout !== "full-bleed" && this.context.layout !== "full-screen") {
      scssClass += `-${this.context.aspect}`;
    }

    return scssClass;
  }

  getChildContext() {
    return {
      aspect: this.context.aspect,
      layout: 'center',
      layoutClassName: 'center-wide'
    }
  }

  componentDidMount() {
    this.runtimePromise = System.import("./_SlideshowRuntime")
      .then(runtime => {
        runtime.didMount.call(this);
      })
    ;

    // Load event tracking
    System.import("../../utils/track").then(track => {
      this.track = track.default.bind(this);
    });
  }

  componentWillUnmount() {
    this.runtimePromise.then(runtime => {
      runtime.willUnmount.call(this);
    });
  }

  render() {
    const propAphroStyles = StyleSheet.create({
      "root": {
        backgroundColor: this.props.backgroundColor
      }
    });

    const opacity = this.props.hasOpacity ? "0" : "1";

    //Creating a <style> tag to customizing slick DOM elements
    const styleContents = (
      (this.props.dotColor ? `.${css(propAphroStyles.root)} .slick-dots li.slick-active button { background-color: ${this.props.dotColor}; border-color: ${this.props.dotColor} }` : "") +
      (this.props.dotColor ? `.${css(propAphroStyles.root)} .slick-dots li button { border-color: ${this.props.dotColor} }` : "") +
      (this.props.arrowColor ? `.${css(propAphroStyles.root)} .slick-arrow .arrow { stroke: ${this.props.arrowColor};}` : "") +
      `.${css(propAphroStyles.root)} .slick-slide:not(.slick-active) { opacity: ${opacity} }`
    );

    const styleTag = (
      <style dangerouslySetInnerHTML={{__html: styleContents }} />
    );

    const children = React.Children.map(
      this.props.children,
      function (child) {
        return <div key={child}>{child}</div>
      }
    );

    return (
      <div className={className(
        scss["Slideshow"],
        scss[this.context.layoutClassName]
      )}>
        {styleTag}
        <div ref={c => this._container = c} className={className(
          scss["slideshow-container"],
          css(propAphroStyles.root)
        )}>
          {children}
        </div>
      </div>
    );
  }
}

Slideshow.contextTypes = Slideshow.childContextTypes = {
  aspect: React.PropTypes.string,
  layout: React.PropTypes.string,
  layoutClassName: React.PropTypes.string
};

Slideshow.propTypes = {
  dotColor: React.PropTypes.string,
  arrowColor: React.PropTypes.string,
  className: React.PropTypes.string,
  backgroundColor: React.PropTypes.string,
  hasOpacity: React.PropTypes.bool,
  slickSettings: React.PropTypes.object
};

Slideshow.defaultProps = {
  eventCategory: defaultEventCategory,
  hasOpacity: false,
  backgroundColor: "transparent",
  arrowColor: "#ffffff",
  slickSettings: {
    "dots": true,
    "infinite": true,
    "centerMode": true,
    "centerPadding": "11.7%",
    "slidesToShow": 1,
    "responsive": [{
      "breakpoint": 539,
      "settings": {
        // Note: don't disable centerMode; see Slideshow.scss for more details
        "centerPadding": "0px"
      }
    }]
  }
};

export default Slideshow;
