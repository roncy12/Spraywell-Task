import 'foundation-sites/js/foundation/foundation';
import 'foundation-sites/js/foundation/foundation.dropdown';
import utils from '@bigcommerce/stencil-utils';
import ProductDetails from '../common/product-details';
import { defaultModal, ModalEvents } from './modal';
import 'slick-carousel';
import { setCarouselState, onSlickCarouselChange, onUserCarouselChange } from '../common/carousel';
import customJS from '../dh-custom/custom';

export default function (context) {
    const modal = defaultModal();

    $('body').on('click', '.quickview', event => {
        event.preventDefault();

        const productId = $(event.currentTarget).data('productId');

        modal.open({ size: 'large' });

        utils.api.product.getById(productId, { template: 'products/quick-view' }, (err, response) => {
            if (err) return;

            modal.updateContent(response);

            modal.$content.find('.productView').addClass('productView--quickView');

            const $carousel = modal.$content.find('[data-slick]');
            if ($carousel.length) {
                $carousel.on('init breakpoint swipe', setCarouselState);
                $carousel.on('click', '.slick-arrow, .slick-dots', setCarouselState);

                $carousel.on('init afterChange', (e, carouselObj) => onSlickCarouselChange(e, carouselObj, context));
                $carousel.on('click', '.slick-arrow, .slick-dots', $carousel, e => onUserCarouselChange(e, context));
                $carousel.on('swipe', (e, carouselObj) => onUserCarouselChange(e, context, carouselObj.$slider));

                if (modal.$modal.hasClass('open')) {
                    $carousel.slick();
                } else {
                    modal.$modal.one(ModalEvents.opened, () => {
                        if ($.contains(document, $carousel[0])) $carousel.slick();
                    });
                }
            }
                let pd = new ProductDetails(modal.$content.find('.quickView'), context);
                modal.$content.find('.productView .productView--quickView').ready(()=>{
                    let reviewbadge = $(".price-block-wrap .right-block .stamped-product-reviews-badge",modal.$content.find('.quickView'));
                    customJS.getReviewOnOptionChanged(reviewbadge.data("id"),modal.$content.find('.quickView'));
                    // $("[data-product-option-change]").find("select").select2();
                })
                
            return pd;
        });
    });
}
