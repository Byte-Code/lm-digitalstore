import glamorous from 'glamorous';

const Filter = glamorous.div(({ isActive = false }) => ({
  minWidth: '150px',
  maxWidth: '300px',
  padding: '0 20px',
  height: '42px',
  borderRadius: '20px',
  backgroundColor: isActive ? '#67cb33' : '#efefef',
  color: isActive ? '#efefef' : '#333333',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  '&>p': {
    lineHeight: '20px',
    fontSize: '16px',
    textAlign: 'center'
  }
}));

export default Filter;
