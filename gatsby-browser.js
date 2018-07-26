exports.onRouteUpdate = () => {
  const scroller = document.getElementById('scroller');
  if (scroller != null) scroller.scrollTo(0, 0);
};
