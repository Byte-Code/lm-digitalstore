import React from 'react';
import glamorous from 'glamorous';
import { Link } from 'react-router';

import HelpIcon from 'material-ui/svg-icons/action/help-outline';
import HomeIcon from 'material-ui/svg-icons/action/home';
import ArrowIcon from 'material-ui/svg-icons/navigation/arrow-back';
import TutorialButton from './TutorialButton';
import LinkBack from './LinkBack';

const Wrapper = glamorous.div({
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  bottom: 0,
  width: '100%',
  height: '140px',
  background: '#333333',
  '&>*': {
    width: '33.33%',
    borderRight: '1px solid #67cb33'
  },
  '&>*:last-child': {
    borderRight: 'none'
  }
});


const Button = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center',
  height: '100px',
  width: '100%',
  background: 'transparent',
  color: '#fff',
  cursor: 'pointer',
  position: 'relative'
});

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
        <p>Homepage</p>
      </Button>
    </Link>
    <TutorialButton>
      <Button>
        <HelpIcon color="#fff" style={{ height: 50, width: 50 }} />
        <p>Scopri il Digital Store</p>
      </Button>
    </TutorialButton>
  </Wrapper>
);

export default Footer;
