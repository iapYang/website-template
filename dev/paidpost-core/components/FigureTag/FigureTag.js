import React from "react";
import className from "classnames";
import FigcaptionTag from "./FigcaptionTag";

import scss from "./FigureTag.scss";

const FigureTag = (props, context) => (
  <figure id={props.id} className={className(
    scss.FigureTag,
    scss[context.layoutClassName],
    props.className
  )}>
    {/* Child Elements */}
    {props.children}
    {/* Optional <figcaption> */}
    {props.caption || props.credit ?
      <FigcaptionTag
        caption={props.caption}
        credit={props.credit}
      />
      : ""
    }
  </figure>
);

FigureTag.contextTypes = {
  aspect: React.PropTypes.string,
  layout: React.PropTypes.string,
  layoutClassName: React.PropTypes.string
};

FigureTag.propTypes = {
  id: React.PropTypes.string,
  caption: React.PropTypes.string,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  credit: React.PropTypes.string
};

export default FigureTag;
