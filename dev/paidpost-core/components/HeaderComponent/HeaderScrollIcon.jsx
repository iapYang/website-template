import React from 'react';

import defaultScrollIcon from "!raw!./scroll-icon.svg";

export default props => {
  let element = null;
  let scrollIcon = defaultScrollIcon;

  if (props.scrollIcon) {
    // Should we use a custom scroll icon that's been passed in?
    if (typeof props.scrollIcon === "string") {
      scrollIcon = props.scrollIcon;
    }

    //Insert the scroll icon if we want it; customize the color if we want to
    element = (
      <div
        className={props.styles["scroll-icon"]}
        dangerouslySetInnerHTML={{__html: scrollIcon}}
      />
    );
  }

  return element;
};
