import React from 'react';
import className from 'classnames';
import scss from './PullQuote.scss';

const PullQuote = (props, context) => {

  return (
    <div style={props.style} className={className({
      [scss["PullQuote"]]: true,
      [scss[`${props.variant}`]]: true,
      [scss[context.layoutClassName]]: true,
      [props.className]: true
    })}>
      <blockquote className={className({
        [scss["hanging-quotation"]]: props.hangingQuotation === true
      })} style={props.quoteStyle}>{ props.caption }</blockquote>
      <cite style={props.creditStyle}>{ props.credit }</cite>
    </div>
  );
};

PullQuote.contextTypes = {
    aspect: React.PropTypes.string,
    layout: React.PropTypes.string,
    layoutClassName: React.PropTypes.string
}

PullQuote.propTypes = {
  id: React.PropTypes.string,
  caption: React.PropTypes.node.isRequired,
  credit: React.PropTypes.string,
  className: React.PropTypes.string,
  quoteStyle: React.PropTypes.object,
  creditStyle: React.PropTypes.object,
  variant: React.PropTypes.oneOf([
    'left', 'center'
  ]),
  style: React.PropTypes.object,
  hangingQuotation: React.PropTypes.bool
};

PullQuote.defaultProps = {
  caption: "You have to live with the notion of, if I don't write this, no one's going to write it. If I die, this idea dies with me.",
  credit: "Lin-Manuel Miranda",
  quoteStyle: {},
  creditStyle: {},
  variant: 'left',
  style: {},
  hangingQuotation: true
};

export default PullQuote;
