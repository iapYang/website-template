import React from 'react';
import className from 'classnames';

import scss from './BodyCopy.scss';

const BodyCopy = props => (
  <div
    className={className(
      scss.BodyCopy,
      props.className
    )}
    style={props.style}
  >
    {props.children}
  </div>
);

BodyCopy.propTypes = {
  children: React.PropTypes.node,
  style: React.PropTypes.object
};

export default BodyCopy;
