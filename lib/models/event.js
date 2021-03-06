(function() {
  var Attributes, Event, Participant, Promise, RestfulModel, _,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  RestfulModel = require('./restful-model');

  Attributes = require('./attributes');

  Participant = require('./participant');

  Promise = require('bluebird');

  _ = require('underscore');

  module.exports = Event = (function(superClass) {
    extend(Event, superClass);

    function Event() {
      return Event.__super__.constructor.apply(this, arguments);
    }

    Event.collectionName = 'events';

    Event.attributes = _.extend({}, RestfulModel.attributes, {
      'calendarId': Attributes.String({
        modelKey: 'calendarId',
        jsonKey: 'calendar_id'
      }),
      'busy': Attributes.Boolean({
        modelKey: 'busy'
      }),
      'title': Attributes.String({
        modelKey: 'title'
      }),
      'description': Attributes.String({
        modelKey: 'description'
      }),
      'location': Attributes.String({
        modelKey: 'location'
      }),
      'when': Attributes.Object({
        modelKey: 'when'
      }),
      'start': Attributes.Number({
        modelKey: 'start',
        jsonKey: '_start'
      }),
      'end': Attributes.Number({
        modelKey: 'end',
        jsonKey: '_end'
      }),
      'participants': Attributes.Collection({
        modelKey: 'participants',
        itemClass: Participant
      })
    });

    Event.prototype.save = function(callback) {
      if (callback == null) {
        callback = null;
      }
      return this.connection.request({
        method: this.id ? 'PUT' : 'POST',
        body: this.toJSON(),
        path: this.id ? "/n/" + this.namespaceId + "/events/" + this.id : "/n/" + this.namespaceId + "/events"
      }).then((function(_this) {
        return function(json) {
          _this.fromJSON(json);
          if (callback) {
            callback(null, _this);
          }
          return Promise.resolve(_this);
        };
      })(this))["catch"](function(err) {
        if (callback) {
          callback(err);
        }
        return Promise.reject(err);
      });
    };

    Event.prototype.fromJSON = function(json) {
      Event.__super__.fromJSON.call(this, json);
      if (this.when != null) {
        this.start = this.when.start_time || new Date(this.when.start_date).getTime() / 1000.0 || this.when.time;
        this.end = this.when.end_time || new Date(this.when.end_date).getTime() / 1000.0 + (60 * 60 * 24 - 1) || this.when.time;
        delete this.when.object;
      }
      return this;
    };

    return Event;

  })(RestfulModel);

}).call(this);
