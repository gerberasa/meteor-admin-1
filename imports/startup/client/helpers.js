// Global template helpers

Template.registerHelper('equals', function(a, b) {
  return a === b;
});

Template.registerHelper('or', function(a, b) {
  return a || b;
});

Template.registerHelper('and', function(a, b) {
  return a && b;
});
