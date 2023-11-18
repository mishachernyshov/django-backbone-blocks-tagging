define(
  ['jquery', 'underscore', 'vendor/backbone', 'ent/js/block_tags_error_model'],
  function ($, _, Backbone, BlockTagsErrorModel) {
    return Backbone.View.extend({
      el: $('#tags-wrapper'),
      template: _.template($('#block-tags-tmpl').html()),
      events: {
        'click #save-block-tag-settings': 'saveBlockTagsSettings',
      },

      initialize: function (options) {
        this.errors = new BlockTagsErrorModel();
        this.listenTo(this.errors, 'change', this.render);
        this.tagCollection = options.tagCollection;
        this.listenTo(this.tagCollection, 'sync', this.syncNewTagOption);
        this.listenTo(this.tagCollection, 'error', this.handleNewTagCreationError);
        this.listenTo(this.collection, 'sync change', this.render);
        this.collection.fetch();
      },

      render: function () {
        console.log('Block tag render');
        let self = this;
        let html = this.template({
          blockId: this.collection.blockId,
          errors: this.errors.attributes,
        });
        this.$el.html(html);
        $('.block-tags-select').select2({
          multiple: true,
          tags: true,
          data: this.getTagsSelectionData(),
        })
          .on("select2:select", function(e) {
            const newOption = $(this).find('[data-select2-tag="true"]');

            if (newOption.length && $.inArray(newOption.val(), $(this).val()) !== -1) {
              self.tagCollection.create({name: newOption.text(), color: '#ffffff'});
            } else {
              self.collection.add({
                id: parseInt(e.params.data.id),
                name: e.params.data.text,
              });
              self.errors.set({tagCreation: ''});
            }
          })
          .on('select2:unselect', function (e) {
            self.collection.remove([{id: parseInt(e.params.data.id)}]);
          });
      },

      syncNewTagOption: function (model) {
        this.collection.add({
          id: model.attributes.id,
          name: model.attributes.name,
        });
        self.errors.set({tagCreation: ''});
      },

      handleNewTagCreationError: function (collection, xhr, options) {
        if (xhr.responseJSON.name) {
          this.errors.set({tagCreation: xhr.responseJSON.name.join(' ')});
        }
      },

      saveBlockTagsSettings: function () {
        Backbone.sync(
          'create',
          this.collection,
          {
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({tag_ids: this.collection.models.map(model => model.attributes.id)})
          },
        );
      },

      getTagsSelectionData: function () {
        const blockTagIds = this.collection.toJSON().map(tagData => tagData.id);
        return this.tagCollection.toJSON().map(function (tagData) {
          return Object.assign(
            {},
            tagData,
            {
              id: tagData['id'],
              text: tagData['name'],
              selected: blockTagIds.includes(tagData['id'])
            },
          );
        });
      },
    });
  },
);
