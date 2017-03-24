import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';

const Wrapper = styled.div`
  position: fixed;
  background: transparent;
  padding: 0 10px 10px;
  bottom: 0;
`;

const Button = styled.div`
  width: 260px;
  height: 62px;
  background: #333333;
  color: #fff;
  cursor: pointer;
`;

const Footer = () => (
  <Wrapper>
    <Link to="/world">
      <Button>Homepage Mondo</Button>
    </Link>
  </Wrapper>
);

export default Footer;
