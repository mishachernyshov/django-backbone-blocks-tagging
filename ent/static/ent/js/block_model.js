define(
  ['jquery', 'underscore', 'vendor/backbone'],
  function ($, _, Backbone) {
    let BlockModel = Backbone.Model.extend({
      defaults: {
        'id': null,
        'name': null,
        'tags': [],
      }
    });

    return BlockModel;
  },
);
