import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: #efefef;
  padding: 69px 40px 57px;
  &>p {
    font-size: 18px;
    line-height: 28px;
    width: 425px;
    font-family: LeroyMerlinSans Light;
    width: 50%;
    &>span {
      font-family: LeroyMerlinSans;
    }
  }
`;

const Divider = styled.div`
  border: 1px dashed #67cb33;
  width: 100%;
  margin-top: 20px;
`;

export default class ProductInfoNOCAB extends Component {
  static propTypes = {
    descriptions: ImmutablePropTypes.list.isRequired
  }

  renderDescriptions() {
    const { descriptions } = this.props;
    if (!descriptions) {
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
