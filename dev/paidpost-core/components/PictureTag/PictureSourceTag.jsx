import React from 'react';

const PictureSourceTag = (props) => (
  <source media={props.media} srcSet={props.srcSet} />
);

PictureSourceTag.propTypes = {
  media: React.PropTypes.string,
  srcSet: React.PropTypes.string
};

export default PictureSourceTag;
