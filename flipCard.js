$(document).ready(function () {
    let time = 40;
    let countTime;
    let point = 0;
    function Loser() {
        countTime = setInterval(function () {
            time -= 1;
            // show time
            $('span.time').text(time);

            if (time == 0) {
                clearInterval(countTime);
                alert("Time's Up");
                window.location.reload(true);
            }
        }, 1000);

    }
    Loser();

    let cards = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 6, 5, 4, 3, 2, 1, 8, 7, 9);
    $('.card').each(function (index) {
        $(this).attr('data-card-value', cards[index]);
    });
    $('.card').click(function (e) {
        e.preventDefault();
        $(this).addClass('open');
        flipIn();

        if ($('.open').length == 2) {

            if ($('.open').first().data('cardValue') == $('.open').last().data('cardValue')) {
                $('.open').each(function () {
                    $('.open').animate({ opacity: 0 }, 2000).removeClass('unmatched');
                    point += 5;
                    $('span.point').text(point);
                });
                $('.open').each(() => {
                    $('.open').removeClass('open')
                })
                checkWin();
            } else {
                setTimeout(function () {
                    $('.open').each(function () {
                        flipOut();
                        $('.open').removeClass('open')
                    });
                }, 400);
            }

        }

    });

    function flipIn() {
        $('.open .font img').css({
            'transform': 'rotateY(0deg)'
        });
        $('.open .back img').css({
            'transform': 'rotateY(180deg)'
        });
    }
    function flipOut() {
        $('.open .font img').css({
            'transform': 'rotateY(180deg)'
        });
        $('.open .back img').css({
            'transform': 'rotateY(0deg)'
        });
    }
    function checkWin() {
        if ($('.unmatched').length === 0) {
            clearInterval(countTime);
            alert("You're Winner - Your's Score is: " + point);
            window.location.reload(true);
        }
    }

});