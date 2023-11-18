require(
  ['jquery', 'underscore', 'vendor/backbone', 'ent/js/block_collection', 'ent/js/block_list_view', 'vendor/select2'],
  function($, _, Backbone, BlockCollection, BlockListView, Select2) {
    function setupBackbone() {
      const oldSync = Backbone.sync;
      Backbone.sync = function(method, model, options){
        options = options || {};
        options.beforeSend = function(xhr){
          xhr.setRequestHeader('X-CSRFToken', $('[name=csrfmiddlewaretoken]').val());
        };
        return oldSync(method, model, options);
      };
    }

    setupBackbone();

    let blockCollection = new BlockCollection();
    let blockListView = new BlockListView({collection: blockCollection});
  },
);
