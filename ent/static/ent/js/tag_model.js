define(
  ['jquery', 'underscore', 'vendor/backbone'],
  function ($, _, Backbone) {
    return Backbone.Model.extend({
      default: {
        id: null,
        name: '',
        color: '#ffffff',
      },
    });
  },
);

