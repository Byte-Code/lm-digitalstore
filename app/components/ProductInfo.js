import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';

import { titleFormatter } from '../utils/stringUtils';
import Card from './Card';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  background-color: ${props => props.bgColor}
  padding-top: ${props => props.pTop};
  padding-left: 125px;
  padding-right: 125px;
  padding-bottom: 57px;
  &>div:first-child {
    margin-right: 100px;
  }
`;

const Column = styled.div`
  width: calc((100% - 100px) /2);
  &>div:first-child {
    margin-bottom: 30px;
  }
`;

const Section = styled.div`
  &>p{
    font-size: 14px;
    margin-bottom: 17px;
    font-family: LeroyMerlinSans Light;
    &>span{
      font-family: LeroyMerlinSans;
    }
  }
`;

const CardTitle = styled.div`
  display: flex;
  align-items: center;
  padding: 19px 125px;
  background: #f7f7f7;
  &>h3{
    margin-left: 20px;
    font-size: 16px;
    line-height: 32px;
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

function CardTitleComponent() {
  return (
    <CardTitle>
      <AddIcon color="#333333" />
      <h3>Maggiori informazioni</h3>
    </CardTitle>
  );
}

export default class ProductInfo extends Component {
  static propTypes = {
    marketingDescriptions: ImmutablePropTypes.map.isRequired,
    descriptions: ImmutablePropTypes.list.isRequired
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

  renderDescriptions(code) {
    const { descriptions } = this.props;
    const category = descriptions.find(d => d.get('code') === code);
    const categoryTitle = category.get('title');
    const categoryItems = category.get('description');

    // should I map all of them?
    return (
      <Section>
        <Title>{titleFormatter(categoryTitle)}</Title>
        {categoryItems.map(item => (
          <p key={`${item.get('label')}${item.get('value')}`}>
            <span>{item.get('label') && `${item.get('label')}: `}</span>
            {item.get('value')}
          </p>
        ))}
        {category.get('code') === 'DIMENSIONI' && <Divider />}
      </Section>
    );
  }

  render() {
    return (
      <Wrapper>
        <Row pTop="69px" bgColor="#efefef">
          <Column>{this.renderBenefits()}</Column>
          <Column>{this.renderBlocks()}</Column>
        </Row>
        <Card TitleComponent={CardTitleComponent}>
          <Row pTop="31px" bgColor="#f7f7f7">
            <Column>{this.renderDescriptions('MATERIALE')}</Column>
            <Column>
              {this.renderDescriptions('DIMENSIONI')}
              {this.renderDescriptions('UTILE_DA_SAPERE')}
            </Column>
          </Row>
        </Card>
      </Wrapper>
    );
  }
}
