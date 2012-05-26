root = exports ? this

# Application
root.App = Em.Application.create()

# DataStores

App.store = DS.Store.create
  revision: 4
  adapter: DS.localStorageAdapter.create()


# Models
App.List = DS.Model.extend
  subject: DS.attr 'string'
  listItems: DS.hasMany 'App.ListItem'
  #listChanged: (->
    #console.log "list changed!"
  #).observes "subject"

App.ListItem = DS.Model.extend
  subject: DS.attr 'string'
  body: DS.attr 'string'
  list: DS.belongsTo 'App.List'


# Views
App.CreateListView = Ember.TextField.extend
  insertNewline: ->
    value = @get 'value'
    if value
      App.listsController.createList value
      @set 'value', ''

# Controllers
App.listsController = Ember.ArrayProxy.create
  content: []
  createList: (subject) ->
    list = App.List.createRecord subject: subject
    lists = document.getElementById('lists-area')
    @pushObject list

  pushObject: (item) ->
    @._super item
