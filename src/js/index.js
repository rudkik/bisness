import Swiper, {Navigation, Pagination, Autoplay, EffectFade, Thumbs} from 'swiper';

Swiper.use([Navigation, Pagination, Autoplay, EffectFade, Thumbs]);

(function ($) {

    $(document).ready(function () {

        $('a[href^="#"]').bind('click.smoothscroll',function (e) {
            e.preventDefault();

            var target = this.hash,
                $target = $(target);

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, 500, 'swing', function () {
                window.location.hash = target;
            });
        });


        const swiper = new Swiper('.swiper-container', {
            // Default parameters
            slidesPerView: 1,
            spaceBetween: 10,
            // Responsive breakpoints
            breakpoints: {
                // when window width is >= 320px
                320: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                // when window width is >= 480px
                480: {
                    slidesPerView: 3,
                    spaceBetween: 30
                },
                // when window width is >= 640px
                640: {
                    slidesPerView: 4,
                    spaceBetween: 40
                }
            }
        })
    });

})(jQuery);
