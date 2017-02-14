import React, { Component } from "react";
import className from "classnames";
import scss from "./scss/index.scss";

class LayoutContainer extends Component {
  getLayoutClassName() {
    let scssClass = `${this.props.type}`;

    if (this.props.type !== "full-bleed" && this.props.type !== "full-screen") {
      scssClass += `-${this.props.aspect}`;
    }

    return scssClass;
  }

  getChildContext() {
    return {
      aspect: this.props.aspect,
      layout: this.props.type,
      layoutClassName: this.getLayoutClassName()
    };
  }

  render() {
    const isChildLayoutContainer = typeof this.context.layoutClassName === "string";

    // Should use padding if:
    // - this.props.withPadding is true
    // - this.props.withPadding is "auto" and this is _not_ a child LayoutContainer
    // TODO: Review better approaches for automatic padding setup
    const shouldUsePadding = this.props.withPadding === true || (
      this.props.withPadding === "auto" && ! isChildLayoutContainer
    );

    // Should use margins if:
    // - this.props.withMargins is true
    // **** OR ****
    // - this.props.withMargins is "auto" AND
    //   (layout type is either center, float-left, or float-right) AND
    //   LayoutContainer is instanced within another LayoutContainer
    const shouldUseMargins = this.props.withMargins === true || (
      this.props.withMargins === "auto" &&
      isChildLayoutContainer
    );

    const rootProps = {
      id: this.props.id,
      className: className(
        scss[`LayoutContainer-${this.getLayoutClassName()}`],
        {[scss["with-vertical-padding"]]: shouldUsePadding},
        {[scss["with-vertical-margins"]]: shouldUseMargins},
        {[scss[`${this.context.layoutClassName}`]]: isChildLayoutContainer && scss[`${this.context.layoutClassName}`]},
        this.props.className
      ),
      style: this.props.style,
      ref: (c) => { this.el = c }
    };

    const content = (
      <div className={scss["content"]}>
        {this.props.children}
      </div>
    );

    // If LayoutContainer is instantiated within another LayoutContainer:
    // Root element is a <div> tag
    if (isChildLayoutContainer) {
      return (
        <div {...rootProps}>
          {content}
        </div>
      );
    }
    // Else if LayoutContainer is *not* instanced within another LayoutContainer:
    // Root element is a <section> tag
    else {
      return (
        <section {...rootProps}>
          {content}
        </section>
      );
    }
  }
}

LayoutContainer.contextTypes = LayoutContainer.childContextTypes = {
  aspect: React.PropTypes.string,
  layout: React.PropTypes.string,
  layoutClassName: React.PropTypes.string
};

LayoutContainer.defaultProps = {
  aspect: "wide",
  style: {},
  type: "full-bleed",
  withMargins: "auto",
  withPadding: "auto"
};

LayoutContainer.propTypes = {
  id: React.PropTypes.string,
  children: React.PropTypes.node.isRequired,
  className: React.PropTypes.string,

  aspect: React.PropTypes.oneOf([
    "wide",
    "square",
    "narrow"
  ]),

  style: React.PropTypes.object,

  type: React.PropTypes.oneOf([
    "center",
    "full-bleed",
    "full-screen",
    "float-left",
    "float-right"
  ]),

  withMargins: React.PropTypes.oneOf([
    true,
    false,
    "auto"
  ]),
  withPadding: React.PropTypes.oneOf([
    true,
    false,
    "auto"
  ]),
};

export default LayoutContainer;
