import React from "react";
import className from "classnames";

import PictureSourceTag from "./PictureSourceTag";

import scss from "./PictureTag.scss";

const PictureTag = (props, context) => {
  let sources, defaultSrc;

  if (typeof props.src === "string") {
    defaultSrc = props.src;
  } else if (typeof props.src === "object" && props.src !== null) {
    const mediaKeys = Object.keys(props.src);
    sources = mediaKeys.map(media => (
      <PictureSourceTag key={media} media={media} srcSet={props.src[media]}/>
    ));
    // Use the last srcset value as the default src for this <picture>
    defaultSrc = props.src[ mediaKeys[mediaKeys.length - 1] ];
  }

  return (
    <picture id={props.id} className={className(
      props.className,
      scss[context.layoutClassName]
    )}>
      {sources ? sources : ""}
      <img src={defaultSrc} alt={props.alt}/>
    </picture>
  )
};

PictureTag.contextTypes = {
  aspect: React.PropTypes.string,
  layout: React.PropTypes.string,
  layoutClassName: React.PropTypes.string
};

PictureTag.propTypes = {
  alt: React.PropTypes.string,
  className: React.PropTypes.string,
  id: React.PropTypes.string,
  src: React.PropTypes.oneOfType([
    React.PropTypes.string, // a single image src
    React.PropTypes.object  // a hash of {media: srcset} keys
  ]),
  title: React.PropTypes.string
};

export default PictureTag;
