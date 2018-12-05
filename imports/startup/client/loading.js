// page load watcher
Tracker.autorun(() => {
  const pageLoaded = Session.get('pageLoaded');
  if(pageLoaded === true){
    Tracker.afterFlush(function(){
      document.body.classList.add('page-loaded');
    });
  }
  if(pageLoaded === false){
    document.body.classList.remove('page-loaded');
  }
});
