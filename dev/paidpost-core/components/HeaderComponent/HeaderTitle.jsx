import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import className from 'classnames';

const breakpoint = {
  regular: '@media (min-width: 540px)',
  tablet: '@media (min-width: 540px) and (max-width: 853px)',
  compact: '@media (max-width: 539px)'
};

class HeaderTitle extends Component {
  getTitleOrSubheadText(propKey) {
    // If the prop is a string
    if (typeof this.props[propKey] === "string") {
      return this.props[propKey];
    }
    // If the prop is an object with key "text" that is a string
    else if (typeof this.props[propKey] === "object" && typeof this.props[propKey].text === "string") {
      return this.props[propKey].text;
    }
    // The prop is not set (covers the optional subhead case)
    else {
      return null;
    }
  }

  render() {
    let textContent = {
      title: this.getTitleOrSubheadText("title"),
      subhead: this.getTitleOrSubheadText("subhead")
    };

    // const titleStyles = this.props;
    // const subheadStyles = this.props.subheadFontStyles; 
    //Set up the styles for the text box
    // const aphroStyles = StyleSheet.create({
    //   textContainer:{
    //     backgroundColor: this.props.textBackgroundColor
    //   },
    //   title: {
    //     fontFamily: titleStyles.fontFamily,
    //     color: titleStyles.color,
    //     [breakpoint.regular]: {
    //       fontSize: titleStyles.fontSizeRegular, lineHeight: titleStyles.lineHeightRegular
    //     },
    //     [breakpoint.tablet]: {
    //       fontSize: titleStyles.fontSizeTablet, lineHeight: titleStyles.lineHeightTablet
    //     },
    //     [breakpoint.compact]: {
    //       fontSize: titleStyles.fontSizeCompact, lineHeight: titleStyles.lineHeightCompact
    //     }
    //   },
    //   subhead: {
    //     fontFamily: subheadStyles.fontFamily,
    //     color: subheadStyles.color,
    //     [breakpoint.regular]: {
    //       fontSize: subheadStyles.fontSizeRegular, lineHeight: subheadStyles.lineHeightRegular
    //     },
    //     [breakpoint.tablet]: {
    //       fontSize: subheadStyles.fontSizeTablet, lineHeight: subheadStyles.lineHeightTablet
    //     },
    //     [breakpoint.compact]: {
    //       fontSize: subheadStyles.fontSizeCompact, lineHeight: subheadStyles.lineHeightCompact
    //     }
    //   }
    // });
    return (
      <div className={className(
        this.props.scss['header-text']
        /*css(aphroStyles.textContainer)*/
      )}>
      {textContent.title ? <h1 /*className={className(css(aphroStyles.title))}*/>{textContent.title}</h1> : ""}
      {textContent.subhead ? <h2 /*className={className(css(aphroStyles.subhead))}*/>{textContent.subhead}</h2> : ""}
      </div>
    );
  }
}

const fontPropStylesShape = React.PropTypes.shape({
  fontFamily: React.PropTypes.string,
  fontSizeRegular: React.PropTypes.number,
  lineHeightRegular: React.PropTypes.number,
  fontSizeTablet: React.PropTypes.number,
  lineHeightTablet: React.PropTypes.number,
  fontSizeCompact: React.PropTypes.number,
  lineHeightCompact: React.PropTypes.number,
  color: React.PropTypes.string
});

const getTitleOrSubheadType = function(textIsRequired = false) {
  let type = React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.shape({
      text: textIsRequired ? React.PropTypes.string.isRequired : React.PropTypes.string,
      fontPropStyles: fontPropStylesShape
    })
  ]);

  if (textIsRequired) {
    return type.isRequired;
  } else {
    return type;
  }
};

HeaderTitle.propTypes = {
  title: getTitleOrSubheadType(true),
  subhead: getTitleOrSubheadType(),
  scss: React.PropTypes.object
};

export default HeaderTitle;