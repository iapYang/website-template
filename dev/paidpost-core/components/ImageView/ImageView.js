import React from "react";
import className from "classnames";
import FigureTag from "../FigureTag";
import PictureTag from "../PictureTag";

import scss from "./ImageView.scss";

const ImageView = (props, context) => {
  const picture = (
    <PictureTag
      src={props.src}
      alt={props.caption + props.credit ? ` (Credit: ${props.credit})` : ""}
    />
  );

  return (
    <FigureTag
      id={props.id}
      className={className(
        scss.ImageView,
        scss[context.layoutClassName],
        props.className
      )}
      caption={props.caption}
      credit={props.credit}
    >
      {picture}
    </FigureTag>
  );
};

ImageView.contextTypes = {
  aspect: React.PropTypes.string,
  layout: React.PropTypes.string,
  layoutClassName: React.PropTypes.string
};

ImageView.propTypes = {
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  caption: React.PropTypes.string,
  credit: React.PropTypes.string,
  src: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object
  ]).isRequired
};

export default ImageView;
