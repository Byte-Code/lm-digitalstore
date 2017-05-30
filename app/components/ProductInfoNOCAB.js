import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import glamorous from 'glamorous';

const Wrapper = glamorous.div({
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  backgroundColor: '#efefef',
  padding: '69px 40px 57px',
  '&>p': {
    fontSize: '18px',
    lineHeight: '28px',
    fontFamily: 'LeroyMerlinSans Light',
    width: '50%',
    '&>span': {
      fontFamily: 'LeroyMerlinSans'
    }
  }
});

const Divider = glamorous.div({
  border: '1px dashed #67cb33',
  width: '100%',
  marginTop: '20px'
});

export default class ProductInfoNOCAB extends Component {
  static propTypes = {
    descriptions: ImmutablePropTypes.list.isRequired
  };

  renderDescriptions() {
    const { descriptions } = this.props;
    if (!descriptions || descriptions.isEmpty()) {
      return null;
    }
    return descriptions.get(0).map(item => (
      <p key={`${item.get('label')}${item.get('value')}`}>
        <span>{item.get('label') && `${item.get('label')}: `}</span>
        {item.get('value')}
      </p>
    ));
  }

  render() {
    return (
      <Wrapper>
        {this.renderDescriptions()}
        <Divider />
      </Wrapper>
    );
  }
}
