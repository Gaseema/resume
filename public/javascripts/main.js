$(function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});

$(document).on('click touchstart', '.shareResume', function() {
    var url = window.location.href
    if (navigator.share) {
        navigator.share({
                title: "Gaseema's Resume",
                text: 'Software Developer',
                url: url,
            })
            .then(function() {
                console.log('Unable to share')
            })
            .catch((error) => console.log('Error sharing', error));
    } else {
        snackbar()
    }
})

function snackbar() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function() {
        x.className = x.className.replace("show", "");
    }, 3000);
}
