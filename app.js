(function() {
  var root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.App = Em.Application.create();

  App.store = DS.Store.create({
    revision: 4,
    adapter: DS.localStorageAdapter.create()
  });

  App.List = DS.Model.extend({
    subject: DS.attr('string'),
    listItems: DS.hasMany('App.ListItem')
  });

  App.ListItem = DS.Model.extend({
    subject: DS.attr('string'),
    body: DS.attr('string'),
    list: DS.belongsTo('App.List')
  });

  App.CreateListView = Ember.TextField.extend({
    insertNewline: function() {
      var value;
      value = this.get('value');
      if (value) {
        App.listsController.createList(value);
        return this.set('value', '');
      }
    }
  });

  App.listsController = Ember.ArrayProxy.create({
    content: [],
    createList: function(subject) {
      var list, lists;
      list = App.List.createRecord({
        subject: subject
      });
      lists = document.getElementById('lists-area');
      return this.pushObject(list);
    },
    pushObject: function(item) {
      return this._super(item);
    }
  });

}).call(this);
