import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';

import { titleFormatter } from '../utils/stringUtils';

const Wrapper = styled.div`
  width: 100%;
  background: #f7f7f7;
  display: flex;
  padding: 69px 125px 57px;
  &>div:first-child {
    margin-right: 100px;
  }
`;

const Column = styled.div`
  width: 50%;
  &>div:first-child {
    margin-bottom: 30px;
  }
`;

const Section = styled.div`
  &>p{
    font-size: 14px;
    color: #333333;
    margin-bottom: 17px;
  }
`;

const Title = styled.div`
  font-family: LeroyMerlinSans Italic;
  font-size: 16px;
  line-height: 20px;
  color: #339900;
  margin-bottom: 14px;
`;

const Divider = styled.div`
  border: 1px dashed #67cb33;
  width: 100%;
  margin-top: 18px;
`;

export default class ProductInfo extends Component {
  static propTypes = {
    marketingDescriptions: ImmutablePropTypes.map.isRequired
  }

  renderBenefits() {
    const { marketingDescriptions } = this.props;
    const benefits = marketingDescriptions.get('benefits');

    if (!benefits) {
      return null;
    }

    return (
      <Section>
        <Title>Vantaggi</Title>
        {benefits.map(b => <p key={b}>{b}</p>)}
        <Divider />
      </Section>
    );
  }

  renderBlocks() {
    const { marketingDescriptions } = this.props;
    const blocks = marketingDescriptions.get('chooseBlocks').reverse();

    return blocks.map(block => (
      <Section key={block.get('title')}>
        <Title>{titleFormatter(block.get('title'))}</Title>
        {block.get('customerChooses').map(c =>
          <p key={c.get('description')}>{c.get('description')}</p>)}
        {!block.equals(blocks.last()) && <Divider />}
      </Section>
    ));
  }

  render() {
    return (
      <Wrapper>
        <Column>{this.renderBenefits()}</Column>
        <Column>{this.renderBlocks()}</Column>
      </Wrapper>
    );
  }
}
