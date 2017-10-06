import React from 'react';
import PropTypes from 'prop-types';
import glamorous, { Div } from 'glamorous';
import QRCode from 'qrcode.react';
import LogoLM from '../assets/logo.png';

export const QrCode = ({url}) => {
  return (
     <Div>
       <Title>Inquadra il QR-Code</Title>
       <Subtitle>
         Ti si aprirà il link alla scheda prodotto direttamente sul tuo smartphone.
       </Subtitle>
       <Content>
         <LogoWrapper src={LogoLM} alt={"logoQR"} />
         <QRCode value={url} size={200} fgColor={'#67cb33'} />
       </Content>
     </Div>
  )
};

QrCode.propTypes = {
  url: PropTypes.string.isRequired
};

const LogoWrapper = glamorous.img(({src, alt}) => ({
  src,
  alt,
  width: '60px',
  height: '50px',
  display: 'flex',
  overflow: 'auto',
  position: 'relative',
  marginBottom: '3%',
  left: '28%',
  background: 'white'
}));

const Title = glamorous.h1({
  fontSize: '48px',
  textAlign: 'center',
  marginBottom: '13px'
});

const Subtitle = glamorous.p({
  fontSize: '14px',
  fontFamily: 'LeroyMerlinSans Light-Italic',
  textAlign: 'center',
  marginBottom: '57px'
});

const Content = glamorous.div({
  display: 'flex',
  alignItems: 'center',
  marginLeft: '25%'
});
