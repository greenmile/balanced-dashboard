Balanced.EmbeddedIframeView = Balanced.View.extend({
  templateName: 'embedded_iframe',

  didInsertElement: function() {
    // Reset the lefthand nagivation to match the height of #content
    $("#marketplace-nav").height(($("#content").height() + 60) + "px");

    $('iframe.auto-height').iframeAutoHeight({
      debug: true,
      minHeight: 400,
      callback: function() {
        // Resize the lefthand nagivation to match the height of #content
        $("#marketplace-nav").height(($("#content").height() + 60) + "px");
      }
    });

    var _this = this;
    $("#embedded-dashboard-content").load(function() {
      // Fire this in case the server redirected
      _this.updateHashFromIframeLocation(this.contentWindow.location.pathname);

      // Add a handler to links so we can change the page BEFORE the page loads
      $("#embedded-dashboard-content").contents().find("a").click(function(event) {
        var addressValue = $(this).attr("href");
        _this.updateHashFromIframeLocation(addressValue);
      });
    });
  },

  updateHashFromIframeLocation: function(iframePath) {
    var transitionToDest = iframePath;
    if(transitionToDest.indexOf('?') !== -1) {
      transitionToDest = transitionToDest.substring(0, transitionToDest.indexOf('?'));
    }

    if(transitionToDest !== '#') {
      window.location.hash = "#" + transitionToDest;
    }
  }
});