exports.onRouteUpdate = () => {
  const hash = window.location.hash;
  const targetId = hash.slice(1);

  if (targetId.length > 0) {
    const target = document.getElementById(target);
    
    if (target != null) target.scrollIntoView(true);
  } else {
    const scroller = document.getElementById('scroller');
    if (scroller != null) scroller.scrollTo(0, 0);
  }
};
