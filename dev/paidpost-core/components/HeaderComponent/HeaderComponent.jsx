import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import className from 'classnames';
import defaultScss from './HeaderComponent.scss';
import HeaderBackground from './HeaderBackground';
import HeaderScrollIcon from './HeaderScrollIcon';
import HeaderTitle from './HeaderTitle';
import HeaderCaption from './HeaderCaption';

class HeaderComponent extends Component {
  render() {
    //Give the header a black background if we're reducing the opacity of the regular background
    var backgroundStyle;

    if (this.props.backgroundOpacity){
      backgroundStyle={
        textBackgroundColor: '#000000'
      }
    }

    const HeaderTitleProps = {
      title: this.props.title,
      subhead: this.props.subhead,
      scss: this.props.scss
    };

    return (
      <header style={backgroundStyle} className={className(
        this.props.scss["post-header"],
        this.props.scss[this.props.headerType])}>
        <div className={className(this.props.scss["header-container"])}>
          <HeaderCaption styles={this.props.scss} captionText={this.props.captionText} />
          <HeaderScrollIcon styles={this.props.scss} {...this.props}/>
          <HeaderTitle {...HeaderTitleProps}/>
        </div>
        <HeaderBackground styles={this.props.scss} {...this.props}>
          { this.props.backgroundNode ? this.props.backgroundNode : '' }
        </HeaderBackground>
      </header>
    );
  }
}

const titleOrSubheadProps = React.PropTypes.oneOfType([
  React.PropTypes.string,
  React.PropTypes.object
]);

//List of proptypes; title text is required
HeaderComponent.propTypes = {
  headerType: React.PropTypes.oneOf([
    'header-full', 'header-partial', 'header-bottom'
  ]),

  scrollIcon: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.string
  ]),
  scrollIconColor: React.PropTypes.string,

  title: titleOrSubheadProps.isRequired,
  subhead: titleOrSubheadProps,

  textBackgroundColor: React.PropTypes.string,
  backgroundOpacity: React.PropTypes.number,

  backgroundNode: React.PropTypes.node,

  video: React.PropTypes.string,
  videoWebm:React.PropTypes.string,
  videoPoster: React.PropTypes.string,

  desktopImage:React.PropTypes.string,
  tabletImage: React.PropTypes.string,
  mobileImage: React.PropTypes.string,

  captionText:React.PropTypes.string,

  scss: React.PropTypes.object
};

HeaderComponent.defaultProps = {
  scss: defaultScss
};

export default HeaderComponent;
