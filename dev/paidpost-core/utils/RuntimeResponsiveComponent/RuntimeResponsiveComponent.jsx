import React, {Component} from 'react';

// REVIEW FOR ADDITIONAL CONSIDERATIONS
// http://www.newmediacampaigns.com/blog/refactoring-react-components-to-es6-classes
class RuntimeResponsiveComponent extends Component {
  constructor(props) {
    super(props);

    // Bind this.sizeClassChangeEvent to current instance
    if (typeof this.sizeClassChangeEvent === "function") {
      this.sizeClassChangeEvent = this.sizeClassChangeEvent.bind(this);
    }
  }

  componentDidMount() {
    require.ensure(["JKSizeClassEventHandler"], function(require) {
      console.log("Loaded JKSizeClassEventHandler");
      const JKSizeClassEventHandler = require("JKSizeClassEventHandler");

      if (typeof window.scEventHandler === "object") {
        this.scEventHandler = window.scEventHandler
      } else {
        this.scEventHandler = new JKSizeClassEventHandler();
      }

      // Check if any sizeclass event callbacks are defined
      const resizeCallbacks = [
        this.onMobilePortrait,
        this.onTabletPortrait,
        this.onTabletLandscape,
        this.onDesktop
      ];

      const shouldInitEventHandling = resizeCallbacks.reduce(function (left, right) {
        return left || typeof right === "function";
      }, false);

      if (shouldInitEventHandling) {
        // Connect sizeClassChangeEvent to scEventHandler Event Handler
        this.scEventHandler.on("sizeClassChange", this.sizeClassChangeEvent);
        this.sizeClassChangeEvent();
        console.log('sizeClassChange Added');
      }
    }.bind(this));
  }

  //Event Handler
  sizeClassChangeEvent() {
    switch (this.scEventHandler.state.sizeClass()) {
      case "mobile-portrait":
        this.onMobilePortrait();
        break;
      case "tablet-portrait":
        this.onTabletPortrait();
        break;
      case "tablet-landscape":
        this.onTabletLandscape();
        break;
      case "desktop":
        this.onDesktop();
        break;
    }
  }
}

export default RuntimeResponsiveComponent;
