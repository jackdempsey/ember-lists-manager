root = exports ? this

# Application
root.App = Em.Application.create()

# DataStores

App.store = DS.Store.create
  revision: 4
  adapter: DS.localStorageAdapter.create()


# Models
App.List = DS.Model.extend
  listItems: DS.hasMany 'App.ListItem'

App.ListItem = DS.Model.extend
  subject: DS.attr 'string'
  body: DS.attr 'string'
  list: DS.belongsTo 'App.List'


# Views

# Controllers

