function tealiumAnalytics(events) {
  if (typeof window === 'undefined') {
    return;
  }

  if (typeof window.utag !== 'object') {
    throw new Error('window.utag is not defined');
  }

  events.forEach((event) => {
    if (event.hitType === 'view') {
      window.utag.view(event.dataLayer);
    } else {
      window.utag.link(event.dataLayer);
    }
  });
}

module.exports = { tealiumAnalytics };
