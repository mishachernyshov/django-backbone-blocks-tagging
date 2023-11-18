define(
  [
    'jquery',
    'underscore',
    'vendor/backbone',
    'ent/js/block_tags_view',
    'ent/js/block_tag_collection',
    'ent/js/tag_collection',
  ],
  function ($, _, Backbone, BlockTagsView, BlockTagsCollection, TagCollection) {
    let BlockListView = Backbone.View.extend({
      el: $('#block-list'),
      template: _.template($('#blocks-tmpl').html()),
      events: {
        'click .block': 'selectBlock',
      },

      initialize: function() {
        this.listenTo(this.collection, 'sync change', this.render);
        this.collection.fetch();
        this.tagCollection = new TagCollection();
        this.tagCollection.fetch();
        this.blockTagsCollection = null;
        this.blockTagsView = null;
      },

      selectBlock: function (event) {
        if (!this.blockTagsView) {
          this.blockTagsCollection = new BlockTagsCollection(null, {blockId: event.target.id.split('-')[1]});
          this.blockTagsView = new BlockTagsView({
            collection: this.blockTagsCollection,
            tagCollection: this.tagCollection,
          });
        } else {
          this.blockTagsCollection.reset(null, {blockId: event.target.id.split('-')[1]});
        }
        this.blockTagsCollection.fetch();
      },

      render: function () {
        let html = this.template({
          blocks: this.collection.toJSON(),
        });
        this.$el.html(html);
      },
    });

    return BlockListView;
  },
);
