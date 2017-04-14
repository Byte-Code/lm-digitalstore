import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 60px;
  position: relative;
  z-index: 2;
`;

const TopLabel = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 60px 60px 0 0;
  border-color: #6699cc transparent transparent transparent;
  position: absolute;
  top: 0;
  left: 0;
`;

const Text = styled.span`
 position: absolute;
 width: 85px;
 height: 38px;
 top: -5px;
 left: -26px;
 line-height: 65px;
 text-align: center;
 color: #ffffff;
 text-transform: uppercase;
 font-size: 12px;
 font-family: "LeroyMerlinSansBold", sans-serif;
 -webkit-transform: rotate(316deg); //fai 315deg
 -moz-transform: rotate(316deg);
 -o-transform: rotate(316deg);
 writing-mode: lr-tb;
`;

export default function Icon() {
  return (
    <Wrapper>
      <TopLabel />
      <Text>NOVITÀ</Text>
    </Wrapper>
  );
}
