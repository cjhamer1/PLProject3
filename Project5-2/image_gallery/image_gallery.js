$(document).ready(function() {
    $("#image_list a").each(function() {
        var image = new Image();
        image.src = $(this).attr("href");
        image.caption = $(this).attr("title");
    });
    $("#image_list a").click(function(evt) {
        var url = $(this).attr("href");
        $("#image").attr("src", url);
        var caption = $(this).attr("title")
        $("#caption").text(caption);
        evt.preventDefault();
    });
    $("li:first-child a").focus();
});