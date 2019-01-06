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
        snackbar('Unable to share page')
    }
})

function snackbar(e) {
    var x = document.getElementById("snackbar");
    x.innerHTML = e
    x.className = "show";
    setTimeout(function() {
        x.className = x.className.replace("show", "");
    }, 5000);
}

$(document).on('click touchstart', '.sendMail', function(e) {
    $('.sendMail').html('<div class="loader"><div class="loader__ellipsis">&nbsp;</div></div>');
    var name = $('#formName').val();
    var email = $('#formEmail').val();
    var subject = $('#formSubject').val();
    var message = $('#formMessage').val();
    if (name == '') {
        snackbar('Ooops! Please enter name');
        $('.sendMail').html('send');
    } else if (email == '') {
        snackbar('Ooops! Please enter email');
        $('.sendMail').html('send');
    } else if (subject == '') {
        snackbar('Ooops! Please enter subject');
        $('.sendMail').html('send');
    } else if (message == '') {
        snackbar('Ooops! Please enter message');
        $('.sendMail').html('send');
    } else if (email.indexOf('@') == -1) {
        snackbar('Ooops! Please enter a valid email.');
        $('.sendMail').html('send');
    } else {
        var obj = {
            name: name,
            email: email,
            subject: subject,
            message: message
        };
        $.ajax({
            url: "/mail",
            type: 'POST',
            data: JSON.stringify(obj),
            contentType: "application/json",
            success: function(data) {
                if (data == 'working') {
                    snackbar('Mail sent successfully ' + name);
                    $('.sendMail').html('send');
                } else {
                    snackbar('Error! Please reach through gaseema.n@gmail.com');
                    $('.sendMail').html('send');
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log("Status: " + textStatus);
                console.log("Error: " + errorThrown);
                console.log(XMLHttpRequest);
                $('.sendMail').html('send');
            }
        });
    }
})
