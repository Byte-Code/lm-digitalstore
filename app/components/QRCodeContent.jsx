import React from 'react';
import PropTypes from 'prop-types';
import glamorous, { Div } from 'glamorous';
import QRCode from 'qrcode.react';
import LogoLM from '../assets/logo.png';

export const QRCodeContent = ({url}) => {
  return (
     <Div>
       <Content>
         <LogoWrapper src={LogoLM} alt={"logoQR"} />
         <QRCode value={url} size={200} fgColor={'#67cb33'} />
       </Content>
     </Div>
  )
};

QRCodeContent.propTypes = {
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

const Content = glamorous.div({
  display: 'flex',
  alignItems: 'center',
  marginLeft: '25%'
});
