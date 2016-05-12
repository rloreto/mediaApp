(function() {
  // your page initialization code here
  // the DOM will be available here
  $.getJSON("/api/medias", function(medias) {
    var source   = $("#list-of-medias").html();
    var template = Handlebars.compile(source);
    var html = template(medias);
    $('#root').append(html);
  });
})();
