import Swiper, {Navigation, Pagination, Autoplay, EffectFade, Thumbs} from 'swiper';

Swiper.use([Navigation, Pagination, Autoplay, EffectFade, Thumbs]);

(function ($) {

    $(document).ready(function () {

        $('.tab').click(function(){
            $(this).addClass("active").siblings().removeClass('active');
            $('.tab-block-' + $(this).data('section')).addClass('active').siblings().removeClass('active');
        });

    });

})(jQuery);
