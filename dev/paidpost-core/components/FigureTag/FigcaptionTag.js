import React from "react";

const FigcaptionTag = props => (
  <figcaption id={props.id} className={props.className}>
    {props.caption ? <span>{props.caption}</span> : ""}
    {props.credit ? <cite>{props.credit}</cite> : ""}
  </figcaption>
);

FigcaptionTag.propTypes = {
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  caption: React.PropTypes.string,
  credit: React.PropTypes.string
};

export default FigcaptionTag;
