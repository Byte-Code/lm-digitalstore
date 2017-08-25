import { luckyOrangeID } from '../CommandLineOptions';

const id = 'luckyScript';
const LuckScript =
  `
    window.__lo_site_id = ${luckyOrangeID || 89950};
    (function() {
      var wa = document.createElement('script'); wa.type = 'text/javascript'; wa.async = true;
      wa.src = 'https://d10lpsik1i8c69.cloudfront.net/w.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(wa, s);
    })();
  `;

const events = {
  PRODUCT_CLICK: 'product click'
};

const pushCustomTag = ({ customTag = '', star = false, overwrite = false }) => {
  if (window._loq) { // eslint-disable-line no-underscore-dangle
    window._loq.push(['tag', customTag, star, overwrite]); // eslint-disable-line no-underscore-dangle
  } else {
    console.error(`Can 't push ${customTag} - window._loq not defined`);
  }
};

const manageScript = () => {
  if (!window._loq) { // eslint-disable-line no-underscore-dangle
    addScript();
  } else {
    restartSession();
  }
};

const addScript = () => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.id = id;
  script.text = LuckScript;
  document.body.appendChild(script);
};

const restartSession = () => {
  if (window.LO) {
    window.LO.new_page();
    setTimeout(() => window.LO.connect(), 2000);
  }
};


module.exports = {
  pushCustomTag,
  manageScript,
  events
};
