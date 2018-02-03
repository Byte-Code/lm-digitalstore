import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

export default function ShippingInfoBox({ shippingCost, title, logo }) {
  const { amount } = shippingCost;
  return (
    <Wrapper>
      <IconContainer>
        <span className={logo} />
      </IconContainer>
      <Title>{title}</Title>
      <Divider />
      <Price>{`Prezzo: ${amount} €`}</Price>
    </Wrapper>
  );
}

ShippingInfoBox.propTypes = {
  title: PropTypes.string,
  logo: PropTypes.string,
  shippingCost: PropTypes.shape({
    amount: PropTypes.number,
    currency: PropTypes.string,
    updatable: PropTypes.string
  }).isRequired
};

ShippingInfoBox.defaultProps = {
  title: 'CONSEGNA STANDARD',
  logo: 'truck'
};

const Wrapper = glamorous.div({
  display: 'flex',
  width: '320px',
  height: '350px',
  backgroundColor: '#f7f7f7',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '10%'
});

const IconContainer = glamorous.div({
  marginTop: '40px',
  '& > p': {
    width: '44.8px',
    height: '25.9px'
  }
});

const Title = glamorous.p({
  width: '277px',
  height: '29px',
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center',
  color: '#333333',
  marginTop: '5%'
});

const Price = glamorous.p({
  fontSize: '20px',
  color: '#333333',
  fontWeight: 'bold',
  marginTop: '10%'
});

const Divider = glamorous.hr({
  height: '20px',
  width: '90%',
  border: '1px dotted black',
  borderStyle: 'none none dotted'
});
