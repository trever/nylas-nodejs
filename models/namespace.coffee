RestfulModel = require './restful-model'
RestfulModelCollection = require './restful-model-collection'
Thread = require './thread'
Contact = require './contact'
Message = require './message'
Draft = require './draft'
File = require './file'
Calendar = require './calendar'
Event = require './event'
Tag = require './tag'

Attributes = require './attributes'
_ = require 'underscore'

module.exports =
class Namespace extends RestfulModel

  @collectionName: 'n'

  @attributes: _.extend {}, RestfulModel.attributes,
    'name': Attributes.String
      modelKey: 'name'

    'provider': Attributes.String
      modelKey: 'provider'

    'emailAddress': Attributes.String
      queryable: true
      modelKey: 'emailAddress'
      jsonKey: 'email_address'

  constructor: ->
    super
    @threads = new RestfulModelCollection(Thread, @connection, @id)
    @contacts = new RestfulModelCollection(Contact, @connection, @id)
    @messages = new RestfulModelCollection(Message, @connection, @id)
    @drafts = new RestfulModelCollection(Draft, @connection, @id)
    @files = new RestfulModelCollection(File, @connection, @id)
    @calendars = new RestfulModelCollection(Calendar, @connection, @id)
    @events = new RestfulModelCollection(Event, @connection, @id)
    @tags = new RestfulModelCollection(Tag, @connection, @id)
    @

  me: ->
    Contact = require './contact'
    return new Contact
      namespaceId: @id
      name: @name
      email: @emailAddress
