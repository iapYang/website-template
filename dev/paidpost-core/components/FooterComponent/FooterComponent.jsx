import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import className from 'classnames';
import styles from './FooterComponent.scss';

class FooterComponent extends Component {
	render() {

    const desktopWidth = this.props.tabletImage ? '@media (min-width: 854px)' : '@media (min-width: 540px)';

    const aphroStyles = StyleSheet.create({
      singleImage: {
        backgroundImage: `url(${this.props.singleImage})`,
        opacity: this.props.backgroundOpacity
      },
      images: {
        [desktopWidth]: {
            backgroundImage: `url(${this.props.desktopImage})`
        },
        '@media (min-width: 540px) and (max-width: 853px)': {
            backgroundImage: `url(${this.props.tabletImage})`
        },
        '@media (max-width: 539px)': {
            backgroundImage: `url(${this.props.mobileImage})`
        },
        opacity: this.props.backgroundOpacity
      }
    });

    const background = {
      backgroundImage: `url(${this.props.logoImage})`
    };
    const useSingleImage = this.props.singleImage && !(this.props.desktopImage || this.props.mobileImage);

    return (
    	<footer className={className(this.props.className)}>
        <a className={className(styles["post-footer"])} href={this.props.link} target="_blank">
          <div className={className(
              styles["footer-container"],
              styles[this.props.ctaPosition]
            )}>
            <div className={className(styles["footer-text"])}>
              {this.props.title}
            </div>
            <div className={className(styles["cta-button"])}>
              {this.props.ctatext}
            </div>
            <div className={className(
              styles["logo-container"],
              styles[this.props.logoSize],
              styles[this.props.logoOrientation]
            )} style={background}></div>
          </div>

          <div className={className(
              this.props.styles ? this.props.styles['background-image'] : styles['background-image'],
               {[css(aphroStyles.singleImage)] : useSingleImage },
               {[css(aphroStyles.images)] : !useSingleImage}
          )}></div>
        </a>
      </footer>
    );
	}
}

FooterComponent.propTypes = {
  className: React.PropTypes.string,
  title: React.PropTypes.string,
  singleImage: React.PropTypes.string,
  desktopImage: React.PropTypes.string,
  tabletImage: React.PropTypes.string,
  mobileImage: React.PropTypes.string,
  ctatext: React.PropTypes.string,
  ctaPosition: React.PropTypes.string,
  logo: React.PropTypes.string,
  link: React.PropTypes.string,
  backgroundColor: React.PropTypes.string
};

FooterComponent.defaultProps = {
  className: 'FooterComponent',
  title: 'FooterComponent',
  ctatext: 'Learn More',
  backgroundOpacity: '1.0',
  ctaPosition: 'left',
  link: '#'
};

export default FooterComponent;
