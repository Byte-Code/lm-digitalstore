import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from 'styled-components';
import { List } from 'immutable';
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle-outline';

import { titleFormatter } from '../utils/utils';
import Card from './Card';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: ${props => props.bgColor}
  padding-top: ${props => props.pTop};
  padding-left: 125px;
  padding-right: 125px;
  padding-bottom: 57px;
`;

const Column = styled.div`
  width: calc((100% - 100px) /2);
`;

const Section = styled.div`
  margin-bottom: 20px;
  &>p{
    font-size: ${props => props.fSize};
    font-family: LeroyMerlinSans Light;
    &>span{
      font-family: LeroyMerlinSans;
    }
  }
`;

const CardTitle = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  padding: 19px 125px;
  background: #f7f7f7;
  &>h3{
    margin-left: 20px;
    font-size: 16px;
    line-height: 32px;
  }
`;

export const Title = styled.div`
  font-family: LeroyMerlinSans Italic;
  font-size: ${props => props.fSize};
  line-height: 20px;
  color: #339900;
  margin-bottom: 14px;
`;

const Divider = styled.div`
  border: 1px dashed #67cb33;
  width: 100%;
  margin-top: 20px;
`;

function CardTitleComponent({ expanded }) {
  const Icon = expanded ? RemoveIcon : AddIcon;
  return (
    <CardTitle>
      <Icon color="#333333" />
      <h3>Maggiori informazioni</h3>
    </CardTitle>
  );
}

CardTitleComponent.propTypes = {
  expanded: PropTypes.bool.isRequired
};

export default class ProductInfoCAB extends Component {
  static propTypes = {
    marketingDescriptions: ImmutablePropTypes.map.isRequired,
    descriptions: ImmutablePropTypes.seq.isRequired
  }

  renderBlocks() {
    const { marketingDescriptions } = this.props;
    if (!marketingDescriptions) {
      return null;
    }
    // TODO why can this be undefined?
    const blocks = marketingDescriptions.get('chooseBlocks') || List();

    return blocks.map(block => (
      <Column key={block.get('title')}>
        <Section fSize="18px">
          <Title fSize="20px">{titleFormatter(block.get('title'))}</Title>
          {block.get('customerChooses').map(c =>
            <p key={c.get('description')}>{c.get('description')}</p>)}
        </Section>
        <Divider />
      </Column>
    ));
  }

  renderDescriptions(index) {
    const { descriptions } = this.props;
    const currentBatch = descriptions.get(index);
    if (!currentBatch) {
      return null;
    }

    return currentBatch.map(desc => (
      <Section fSize="14px" key={desc.get('code')}>
        <Title fSize="16px">{titleFormatter(desc.get('title'))}</Title>
        {desc.get('description').map(item => (
          <p key={`${item.get('label')}${item.get('value')}`}>
            <span>{item.get('label') && `${item.get('label')}: `}</span>
            {item.get('value')}
          </p>
        ))}
        {(descriptions.get(index).last() !== desc) && <Divider />}
      </Section>
    ));
  }

  render() {
    return (
      <Wrapper>
        <Row pTop="69px" bgColor="#efefef">
          {this.renderBlocks()}
        </Row>
        <Card TitleComponent={CardTitleComponent}>
          <Row pTop="31px" bgColor="#f7f7f7">
            <Column>
              {this.renderDescriptions(0)}
            </Column>
            <Column>
              {this.renderDescriptions(1)}
            </Column>
          </Row>
        </Card>
      </Wrapper>
    );
  }
}
