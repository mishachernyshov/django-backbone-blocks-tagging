define(
  ['jquery', 'underscore', 'vendor/backbone', 'ent/js/block_model'],
  function ($, _, Backbone, BlockModel) {
    let BlockCollection = Backbone.Collection.extend({
      url: '/ent/block/',
      model: BlockModel,
    });

    return BlockCollection;
  },
);
