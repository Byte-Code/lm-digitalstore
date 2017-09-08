import glamorous from 'glamorous';

export const Wrapper = glamorous.div({
  overflowY: 'hidden'
});

export const Row = glamorous.div({
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'space-between',
  width: '100%'
});

export const Logo = glamorous.div({
  paddingTop: '66px',
  marginBottom: '27px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&>img': {
    width: '180px',
    height: '130px'
  }
});

export const GridWrapper = glamorous.div({
  padding: '16px 40px 40px'
});

export const DoubleVertical = glamorous.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
});

export const Banner = glamorous.div(({ url = '/' }) => ({
  background: `url(${url}) center no-repeat border-box padding-box`,
  width: '100%',
  height: '120px',
  fontSize: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 20px',
  marginTop: '30px',
  color: '#fff',
  cursor: 'pointer',
  fontFamily: 'LeroyMerlinSans Bold-Italic'
}));

export const TrailingImage = glamorous.img({
  width: '100%',
  height: '100px'
});

export const WorldTitle = glamorous.section({
  lineHeight: '88px',
  fontFamily: 'LeroyMerlinSans Italic',
  margin: '0 40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '&>h1': {
    fontSize: '36px',
    '&>span': {
      color: '#58c527'
    }
  }
});

export const iconStyle = { height: 65, width: 65 };
