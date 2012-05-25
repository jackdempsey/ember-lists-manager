(function() {
  var root;
  root = typeof exports !== "undefined" && exports !== null ? exports : this;
  root.App = Em.Application.create();
  App.store = DS.Store.create({
    revision: 4,
    adapter: DS.RESTAdapter.create({
      bulkCommit: false
    })
  });
  App.List = DS.Model.extend({
    listItems: DS.hasMany('App.ListItem')
  });
  App.ListItem = DS.Model.extend({
    subject: DS.attr('string'),
    body: DS.attr('string'),
    list: DS.belongsTo('App.List')
  });
}).call(this);
