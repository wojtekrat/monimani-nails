
var footerY = $('footer').offset().top;
var aboutY = $('#right').offset().top;
//Navbar
/* FUNKCJE WYKONAJĄ SIĘ DOPIERO GDY STRONA SIĘ ZAŁADUJE */
$(document).ready(function () {
    /* ZMIENNE ODNOSZĄCE SIĘ DO POZYCJI W HTML I KONKRETNYCH DANYCH NA ICH TEMAT, JAK NP. JAK DALEKO OD GÓRY ZNAJDUJE SIĘ NAVBAR */
    var nav = $("#navbar");
    var navh = $("#navbar").offset().top;
    var stickynav = "sticky";

    /* FUNKCJA SPRAWDZAJĄCA POZYCJĘ NAVBARA */
    function checkPos() {
        /* JEŚLI WARTOŚĆ PRZESUNIĘCIA BĘDZIE WIĘKSZA OD DOMYŚLNEJ POZYCJI NAVBARA, NADAJE MU KLASE "STICKY",
        KTÓRA USTALA MU POZYCJE FIXED U GÓRY EKRANU I ODBIERA MU TĘ KLASĘ GDY WARTOŚĆ TA JEST MNIEJSZA */
        if ($(this).scrollTop() > navh) {
            nav.addClass(stickynav);
        }
        else {
            nav.removeClass(stickynav);
        }
    };

    /* FUNKCJA PODŚWIETLAJĄCA POZYCJĘ W NAVBARZE, KTÓRA ODPOWIADA OBECNEJ POZYCJI NA STRONIE */
    function navHighlight(navi, sec) {
        var pos = $(sec).offset().top - 85;
        var tit = $(navi);
        var over = "oversection";
        if ($(this).scrollTop() > pos && $(this).scrollTop() < (pos + $(sec).height())) {
            tit.addClass(over);
        }
        else {
            tit.removeClass(over);
        }
    };
    /* FUNKCJA WYKONA SIĘ PRZY SCROLLOWANIU */
    $(window).scroll(function () {
        checkPos();
        navHighlight('#home', '#about-section');
        navHighlight('#offer', '#features-section');
        navHighlight('#gallery', '#gallery-section');
        navHighlight('#prices', '#menu-section');
        navHighlight('#contact', '#contact-wrapper');
    });
    /* WYWOŁANIE FUNKCJI, ABY PO ODŚWIEŻENIU NAVBAR BYŁ TAM GDZIE POWINIEN */
    checkPos();
    /* FUNKCJE PRZEWIJAJĄCE NASZ WIDOK DO KONKRETNEJ SEKCJI NA STRONIE Z PŁYNNĄ ANIMACJĄ */
    $("#home").click(function () {
        $('html, body').animate({
            scrollTop: $("#about-section").offset().top
        }, 500);
    });

    $("#offer").click(function () {
        $('html, body').animate({
            scrollTop: $("#features-section").offset().top - 70
        }, 500);
    });

    $("#gallery").click(function () {
        $('html, body').animate({
            scrollTop: $("#gallery-section").offset().top - 70
        }, 500);
    });

    $("#prices").click(function () {
        $('html, body').animate({
            scrollTop: $("#menu-section").offset().top - 70
        }, 500);
    });

    $("#contact").click(function () {
        $('html, body').animate({
            scrollTop: $("#reservation-section").offset().top - 70
        }, 500);
    });
});

// Home section
$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 60) {
            $('#f1').fadeOut("f1")
        } else {
            $('#f1').fadeIn("f1");
        }
    });
});
//About section
$("document").ready(function () {
    var animate = function () {
        var scrollY = $(window).scrollTop() + 650;
        console.log("scroll " + scrollY);
        if (scrollY > aboutY) {
            $('#about-header h2').animate({
                opacity: "1",
                bottom: "10px"
            }, 500);
            $('#about-content').delay(200).animate({
                opacity: "1",
                bottom: "10px"
            }, 500);
            $('#get-in-touch').delay(400).animate({
                opacity: "1",
                bottom: "10px"
            }, 500);
        }
    };
    animate();

    $(window).scroll(function () {
        animate();
    });
});



$("document").ready(function () {
    $('#go-to-top').click(function () {
        $('html, body').animate({
            scrollTop: $("#home-section").offset().top
        }, 1000);
    });
});

$(document).ready(function () {
  $('#datetimepicker1').datetimepicker();
});

//post section

var pageCounter = 1;
var post = document.querySelector(".post-content");
var next = document.querySelector(".next");
var prev = document.querySelector(".prev");
var posty = document.querySelector(".posty");
var image_number = 0;
var images = [
    "./img/img1.jpg",
    "./img/img2.jpg",
    "./img/img3.jpg",
];
onload = generatePost(1);

next.addEventListener("click", function() {
    pageCounter++;
    generatePost(pageCounter);
    mySlide('next');
    checkPage();
});

prev.addEventListener("click", function() {
    pageCounter--;
    generatePost(pageCounter);
    mySlide('prev');
    checkPage();
});

function generatePost(pageCounter) {
    var numero = pageCounter - 1;
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'https://raw.githubusercontent.com/wojtekrat/monimani/master/posty.json');
    ourRequest.onload = function() {
        var ourData = JSON.parse(ourRequest.responseText);
        clearContent();
        renderHTML(ourData[numero]);
    };
    ourRequest.send();
}

function checkPage() {
    switch (pageCounter) {
        case 1:
            prev.style.visibility = "hidden";
            break;

        case 2:
            prev.style.visibility = "visible";
            next.style.visibility = "visible";
            break;

        case 3:
            next.style.visibility = "hidden";
            break;
    }
}

function clearContent() {
    document.querySelector('.post-content').innerHTML = "";
}

function renderHTML(data) {
    var htmlString = "";

    htmlString += "<p>" + data.text + "</p>";

    post.insertAdjacentHTML('beforeend', htmlString);

}

function mySlide(param) {
    if (param === 'next') {
        image_number++;
        if (image_number === images.length) {
            image_number === image_number - 1
        }
    } else {
        image_number--;
        if (image_number < 0) { image_number = 0 }
    }
    document.getElementById('slide').src = images[image_number];
}

