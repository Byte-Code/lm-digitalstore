export default function tealiumAnalytics(events) {
  if (typeof window === 'undefined') {
    return;
  }

  if (typeof window.utag !== 'object') {
    console.error('window.utag does not exists');
    return;
  }

  events.forEach((event) => {
    if (event.hitType === 'view') {
      window.utag.view(event.dataLayer);
    } else {
      window.utag.link(event.dataLayer);
    }
  });
}
