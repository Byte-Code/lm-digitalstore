import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import glamorous from 'glamorous';
import { List } from 'immutable';
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle-outline';

import { titleFormatter } from '../utils/utils';
import Card from './Card';

const Wrapper = glamorous.div({
  display: 'flex',
  flexDirection: 'column'
});

const Row = glamorous.div(({ backgroundColor, paddingTop }) => ({
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  backgroundColor,
  paddingTop,
  paddingLeft: '125px',
  paddingRight: '125px',
  paddingBottom: '57px'
}));

const Column = glamorous.div({
  width: 'calc((100% - 100px) /2)'
});

const Section = glamorous.div(({ fontSize, lineHeight }) => ({
  marginBottom: '20px',
  '&>p': {
    fontSize,
    lineHeight,
    fontFamily: 'LeroyMerlinSans Light',
    '&>span': {
      fontFamily: 'LeroyMerlinSans'
    }
  }
}));

const CardTitle = glamorous.div({
  display: 'flex',
  cursor: 'pointer',
  alignItems: 'center',
  padding: '19px 125px',
  background: '#f7f7f7',
  '&>h3': {
    marginLeft: '20px',
    fontSize: '16px',
    lineHeight: '50px'
  }
});

export const Title = glamorous.div(({ fontSize }) => ({
  fontFamily: 'LeroyMerlinSans Italic',
  fontSize,
  lineHeight: '20px',
  color: '#339900',
  marginBottom: '14px'
}));

const Divider = glamorous.div({
  border: '1px dashed #67cb33',
  width: '100%',
  marginTop: '20px'
});

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
  };

  renderBlocks() {
    const { marketingDescriptions } = this.props;
    if (!marketingDescriptions) {
      return null;
    }
    // TODO why can this be undefined?
    const blocks = marketingDescriptions.get('chooseBlocks') || List();

    return blocks.map(block =>
      <Column key={block.get('title')}>
        <Section fontSize="18px" lineHeight="28px">
          <Title fontSize="20px">{titleFormatter(block.get('title'))}</Title>
          {block.get('customerChooses')
          && block.get('customerChooses')
            .map(c => <p key={c.get('description')}>{c.get('description')}</p>)}
        </Section>
        <Divider />
      </Column>
    );
  }

  renderDescriptions(index) {
    const { descriptions } = this.props;
    const currentBatch = descriptions.get(index);
    if (!currentBatch) {
      return null;
    }

    return currentBatch.map(desc =>
      <Section fontSize="14px" lineHeight="20px" key={desc.get('code')}>
        <Title fontSize="16px">{titleFormatter(desc.get('title'))}</Title>
        {desc.get('description').map(item =>
          <p key={`${item.get('label')}${item.get('value')}`}>
            <span>{item.get('label') && `${item.get('label')}: `}</span>
            {item.get('value')}
          </p>
        )}
        {descriptions.get(index).last() !== desc && <Divider />}
      </Section>
    );
  }

  render() {
    return (
      <Wrapper>
        <Row paddingTop="69px" backgroundColor="#efefef">
          {this.renderBlocks()}
        </Row>
        <Card TitleComponent={CardTitleComponent}>
          <Row Card="31px" backgroundColor="#f7f7f7">
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
