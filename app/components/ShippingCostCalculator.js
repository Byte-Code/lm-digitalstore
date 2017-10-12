import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import { apiClient } from '../../mocks/apiMock';

import SpinBox from './SpinBox';
import ShippingInfoBox from './ShippingInfoBox';

export default class ShippingCostCalculator extends Component {
  constructor(props) {
    super(props);
    this.spinValue = 0;
    this.onCalculateClick = this.onCalculateClick.bind(this);
    this.fetchShippingCost = this.fetchShippingCost.bind(this);
    this.renderCalculateShippingCost = this.renderCalculateShippingCost.bind(this);
    this.resetShippingCost = this.resetShippingCost.bind(this);
    this.state = { shippingCost: [] };
  }

  onCalculateClick() {
    const value = parseInt(document.getElementById('SpinBoxNumber').value);
    this.spinValue = value;
    this.fetchShippingCost({ code: this.props.code, quantity: value });
  }

  fetchShippingCost({ code, quantity }) {
    apiClient.fetchShippingPrice(code, quantity)
      .then(result => this.setState({ shippingCost: result }))
      .catch(err => console.log(err));
  }

  resetShippingCost() {
    this.setState({ shippingCost: [] });
  }

  renderCalculateShippingCost() {
    return (
      <CalculateSection>
        <SpinSection>
          <SpinTitle>{labels.spinLabel}</SpinTitle>
          <SpinBox />
        </SpinSection>
        <FlatButton
          label={labels.buttonLabel}
          fullWidth
          backgroundColor={'#67cb33'}
          labelStyle={{ color: 'white', fontSize: '28px' }}
          style={{ height: '115px', marginTop: '72%' }}
          onClick={this.onCalculateClick}
        />
      </CalculateSection>
    );
  }

  renderShippingCost() {
    const shippingCost = this.state.shippingCost.availableShipmentCosts[0];
    return (
      <ShippingCostSection>
        <CostHeader>
          {`${this.spinValue} unità`}
          <ChangeQuantity onClick={this.resetShippingCost} >{labels.change}</ChangeQuantity>
        </CostHeader>
        <ExploreTitle>{labels.explore}</ExploreTitle>
        <ShippingInfoBox shippingCost={shippingCost} />
        <CostFooter>{labels.footer}</CostFooter>
        <FlatButton
          label={labels.backButtonLabel}
          fullWidth
          backgroundColor={'#67cb33'}
          labelStyle={{ color: 'white', fontSize: '28px' }}
          style={{ height: '115px', marginTop: '387px' }}
          onClick={this.props.backFn}
        />
      </ShippingCostSection>
    );
  }

  render() {
    const { name, code } = this.props;
    const { shippingCost } = this.state;
    return (
      <Wrapper>
        <Title>{labels.title}</Title>
        <SubTitle>{`${name} - Ref. ${code}`}</SubTitle>
        {
          shippingCost.length === 0
          ? this.renderCalculateShippingCost()
          : this.renderShippingCost()
        }
      </Wrapper>
    );
  }
}

ShippingCostCalculator.propTypes = {
  name: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  backFn: PropTypes.func.isRequired
};

const Wrapper = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '1420px',
  '& > p': {
    color: 'white'
  }
});

const Title = glamorous.p({
  fontSize: '48px',
  marginBottom: '3%'
});

const SubTitle = glamorous.p({
  fontSize: '16px',
  marginBottom: '20%'
});

const SpinTitle = glamorous.p({
  fontSize: '16px',
  fontStyle: 'italic',
  fontWeight: '300',
  width: '360px',
  textAlign: 'center',
  marginBottom: '3%',
  marginTop: '12%',
  color: 'white'
});

const CalculateSection = glamorous.div({
  width: '100%',
  opacity: 1
});

const SpinSection = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});

const ShippingCostSection = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});

const CostHeader = glamorous.div({
  display: 'flex',
  width: '780px',
  height: '150px',
  backgroundColor: '#4a4a4a',
  color: 'white',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '40px',
  flexDirection: 'column'
});

const ChangeQuantity = glamorous.p({
  fontSize: '18px',
  textDecoration: 'underline',
  marginTop: '2%'
});

const ExploreTitle = glamorous.p({
  width: '320px',
  height: '20px',
  fontFamily: 'LeroyMerlinSans',
  fontSize: '16px',
  fontWeight: '300',
  fontStyle: 'italic',
  textAlign: 'center',
  color: '#ffffff',
  marginTop: '10%'
});

const CostFooter = glamorous.p({
  width: '470px',
  height: '65px',
  fontSize: '16px',
  fontWeight: 300,
  fontStyle: 'italic',
  textAlign: 'center',
  color: '#e4e4e4',
  marginTop: '5%'
});

const labels = {
  title: 'Calcola il costo di consegna',
  spinLabel: 'Inserisci la quantità desiderata per calcolare il costo del trasporto',
  buttonLabel: 'Calcola la consegna',
  backButtonLabel: 'Torna alla pagina prodotto',
  explore: 'Esplora le tipologie di consegna',
  footer: 'Ti ricordiamo che il prezzo è indicativo e potrebbe cambiarea seconda della quantità e dell\' indirizzo di consegna.',
  change: 'Modifica dati'
};
