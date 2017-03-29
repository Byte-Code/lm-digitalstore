import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';

import HelpIcon from 'material-ui/svg-icons/action/help-outline';
import HomeIcon from 'material-ui/svg-icons/action/home';
import ArrowIcon from 'material-ui/svg-icons/navigation/arrow-back';
import LinkBack from './LinkBack';

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  bottom: 0;
  width: 100%;
  height: 140px;
  background: #333333;
  &>a {
    width: 33.33%;
    border-right: 1px solid #67cb33;
  }
  &>a:last-child {
    border-right: none;
  }
`;

const Button = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100px;
  width: 100%;
  background: transparent;
  color: #fff;
  cursor: pointer;
`;

const Footer = () => (
  <Wrapper>
    <LinkBack>
      <Button>
        <ArrowIcon color="#fff" style={{ height: 50, width: 50 }} />
        <p>Indietro</p>
      </Button>
    </LinkBack>
    <Link to="/world">
      <Button>
        <HomeIcon color="#fff" style={{ height: 50, width: 50 }} />
        <p>Homepage Mondo</p>
      </Button>
    </Link>
    <Link>
      <Button>
        <HelpIcon color="#fff" style={{ height: 50, width: 50 }} />
        <p>Scopri il Digital Store</p>
      </Button>
    </Link>
  </Wrapper>
);

export default Footer;
