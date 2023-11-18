define(
  ['jquery', 'underscore', 'vendor/backbone'],
  function ($, _, Backbone) {
    return Backbone.Collection.extend({
      url: function () {
        return `/ent/block/${this.blockId}/tags/`;
      },

      initialize: function (models, options) {
        this.blockId = options.blockId;
      },

      reset: function (models, options) {
        this.blockId = options.blockId;
      },

      parse: function (response) {
        return response.map(function (tagData) {
          return {id: tagData.id};
        });
      },
    });
  },
);
