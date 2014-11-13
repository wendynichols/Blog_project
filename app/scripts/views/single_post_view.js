(function () {
  App.Views.SinglePost = Parse.View.extend({


    events: {
      'submit #addComment' : 'addComment'
    },

    template: _.template($('#singlePost').html()),

    initialize: function (options) {

      this.options = options;

      this.render();
      $(".container").html(this.$el);

    },

    render: function () {
      var self = this;

      $(".container").empty();

      this.$el.html(this.template(this.options.post.toJSON()));

    },

     render: function () {

      this.$el.empty();

      this.$el.html(this.template(this.options.post.toJSON()));

      var commentTemplate = _.template($('#commentTemp').html());
      var comments_query = new Parse.Query(App.Models.Comment);
      comments_query.equalTo('parent', this.options.post);

      this.$el.append('<h2>Comments</h2><ul class="comments"></ul>');

      comments_query.find({
        success: function (results) {

          _.each(results, function(comment) {
            $('ul.comments').append(commentTemplate(comment.toJSON()));
          })

        }
      })

    },

    addComment: function (e) {
      e.preventDefault();

      var comment = new App.Models.Comment({

        commentText: $('#commentText').val(),
        parent: this.options.post

      });

      comment.save(null, {
        success: function () {
          App.router.navigate('', {trigger: true});
        }
      });

    }

  });

}());
