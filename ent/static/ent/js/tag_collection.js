define(
  ['jquery', 'underscore', 'vendor/backbone', 'ent/js/tag_model'],
  function ($, _, Backbone, TagModel) {
    return Backbone.Collection.extend({
      url: '/ent/tag/',
      model: TagModel,
    });
  },
);
