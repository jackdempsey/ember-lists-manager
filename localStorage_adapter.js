var get = Ember.get, set = Ember.set, getPath = Ember.getPath;

DS.localStorageAdapter = DS.Adapter.extend({
  createRecord: function(store, type, model) {
    var records = this.local.get(type);
    var id = records.length + 1;
    model.set('id', id)

    var data = get(model, 'data');
    records[id] = data;

    this.local.set(type, records);
    store.didCreateRecord(model, data);
  },
  updateRecord: function(store, type, model) {
    var id = get(model, 'id');
    var data = get(model, 'data');

    var records = this.local.get(type);
    records[id] = data;

    this.local.set(type, records);
    store.didUpdateRecord(model, data);
  },

  find: function(store, type, id) {
    var records = this.local.get(type);
    store.load(type, records[id]);
  },

  findAll: function(store, type) {
    var records = this.local.get(type);

    if (records) {
      store.loadMany(type, records)
    }
  },


  local: {
    set: function(key, value) {
      console.log("in SET");
      localStorage.setItem(key, JSON.stringify(value));
    },
    get: function(key) {
      console.log("in GET");
      var value = localStorage.getItem(key);
      value = JSON.parse(value) || [];
      return value;
    }
  }
});
