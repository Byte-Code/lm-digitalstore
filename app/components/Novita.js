import React from 'react';
import glamorous from 'glamorous';

const Wrapper = glamorous.div({
  height: 60,
  position: 'relative',
  zIndex: 2
});

const TopLabel = glamorous.div({
  width: 0,
  height: 0,
  borderStyle: 'solid',
  borderWidth: '60px 60px 0 0',
  borderColor: '#6699cc transparent transparent transparent',
  position: 'absolute',
  top: 0,
  left: 0
});

const Text = glamorous.span({
  position: 'absolute',
  width: 85,
  height: 38,
  top: -5,
  left: -26,
  lineHeight: '65px',
  textAlign: 'center',
  color: '#ffffff',
  textTransform: 'uppercase',
  fontSize: 12,
  fontFamily: 'LeroyMerlinSansBold, sans-serif',
  transform: 'rotate(316deg)',
  writingMode: 'lr-tb'
});

export default function Icon() {
  return (
    <Wrapper id="novita_badge">
      <TopLabel />
      <Text>NOVITÀ</Text>
    </Wrapper>
  );
}
