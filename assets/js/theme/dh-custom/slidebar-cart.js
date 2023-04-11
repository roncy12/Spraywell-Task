import utils from '@bigcommerce/stencil-utils';
import swal from '../global/sweet-alert';
import Cart from '../cart';
export default class SidebarCart{
    constructor(context){
        this.dh_cart_msg = $("[data-mini-cart-status]");
        this.dh_cart_content = $("[data-mini-cart-content]");
        this.dh_cart_empty = $("[data-mini-cart-empty]");
        this.dh_cart_total = $("[data-mini-cart-totals]");    
        this.dh_cart_qty =  $("[data-dh-cart-tota]");    
        this.dh_loading = $("[data-cart-overlay]");      
        this.context = context;
        this.registerEvents();
        
    }

    registerEvents(){
        let preVal;
        $(document).on('click', 'li.navUser-item--cart', (event) => {            
            if(!$('.cart-sliding-block').hasClass('cart-slide-open')){
                $('.cart-sliding-block').addClass('cart-slide-open');                
                this.getCartQty();
            }
            
          });
          
          $(document).on('click', '.cart-slide-close', (event) => {            
            if($('.cart-sliding-block').hasClass('cart-slide-open')){
                $('.cart-sliding-block').removeClass('cart-slide-open');
            }
          });
        
          $(document).on('click', '.cart-mini-item-remove', (event) => {                  
              this.confirmRemoveItem(event.currentTarget);  
          });
          
          //cart update
          $(document).on('click','[data-sidecart-update]',event => {
            const $target = $(event.currentTarget);        
            event.preventDefault();        
            this.CartUpdate($target);
          });

          $('.inputqty', this.dh_cart_content).on('focus', function onQtyFocus() {
            preVal = this.value;            
          }).change(event => {
            const $target = $(event.currentTarget);
            event.preventDefault();           
            // update cart quantity
            // cartUpdateQtyTextChange($target, preVal);
          });

    }   


    getCart(){         
        this.dh_loading.show();
        const options = {
            template: {
                content: 'cart/custom-content',
                totals: 'cart/custom-total',            
                statusMessages: 'cart/status-messages',
            },
        };
        utils.api.cart.getContent(options, (err, response) => {    
            try{
                this.dh_cart_msg.html(response.statusMessages);
                this.dh_cart_content.html(response.content);
                this.dh_cart_total.html(response.totals);                                                
                this.dh_loading.hide();
                console.log(response);
            }catch(err){
                console.log(err);    
                this.dh_loading.hide();
            }            
        });
        
    }
    
    
    getCartQty(){    
        this.dh_loading.show();                
        this.dh_cart_msg.html(" ");
        this.dh_cart_content.html(" ");
        this.dh_cart_total.html(" ");        
        this.dh_cart_empty.text("");
        utils.api.cart.getCartQuantity({}, (err, response) => {           
            this.dh_cart_qty.text(" ");
            try{
                if(response > 0){                                            
                    this.getCart();
                    this.dh_cart_qty.text(response);    
                    this.dh_cart_empty.text(" ");                
                }else{                                         
                    this.dh_cart_qty.text(response);                
                    this.dh_loading.hide();                    
                    this.dh_cart_empty.text("You don't have any items in your cart yet.");
                    if(window.location.href.indexOf("cart.php") > -1){
                        window.location.reload();
                    }
                }        
                $('body').trigger('cart-quantity-update', response);    
            }catch(err){
                console.log(err);
            }        
        });
    }


    refreshCartOnCartPage(){                
        let cart = new Cart();                    
        cart.$modal = null;
        cart.$cartPageContent = $('[data-cart]');
        cart.$cartContent = $('[data-cart-content]');
        cart.$cartMessages = $('[data-cart-status]');
        cart.$cartTotals = $('[data-cart-totals]');
        cart.$overlay = $('[data-cart] .loadingOverlay');
        cart.context = this.context;
        cart.refreshContent();
    }
    
    CartUpdate(target){
        const itemId = target.data('cart-itemid');    
        const $el = $(`#qtys-${itemId}`);    
        const oldQty = parseInt($el.val(), 10);
        const maxQty = parseInt($el.data('quantityMax'), 10);
        const minQty = parseInt($el.data('quantityMin'), 10);
        const minError = $el.data('quantityMinError');
        const maxError = $el.data('quantityMaxError');
        const newQty = target.data('action') === 'inc' ? oldQty + 1 : oldQty - 1;        
        // Does not quality for min/max quantity
        if (newQty < minQty) {
            return swal.fire({
                text: minError,
                icon: 'error',
            });
        } else if (maxQty > 0 && newQty > maxQty) {
            return swal.fire({
                text: maxError,
                icon: 'error',
            });
        }
    
        // this.$overlay.show();
        // console.log(itemId);
        // console.log(newQty);    
        utils.api.cart.itemUpdate(itemId, newQty, (err, response) => {
            // this.$overlay.hide();
            // console.log(response.data.status);
            try{
                if (response.data.status === 'succeed') {
                    // if the quantity is changed "1" from "0", we have to remove the row.
                    const remove = (newQty === 0);                    
                    if(remove){
                        this.removeItem(itemId);
                    }else{                        
                        this.getCartQty();
                    }                    
                    if(window.location.href.indexOf("cart.php") > -1){                                       
                        this.refreshCartOnCartPage();                        
                    }
                } else {
                    $el.val(oldQty);
                    swal.fire({
                        text: response.data.errors.join('\n'),
                        icon: 'error',
                    });
                }
            }catch(err){
                console.log(err);
            }
            
        });
            
    }
    
    removeItem(itemId){
        this.dh_loading.show();
        utils.api.cart.itemRemove(itemId, (err, response) => {
            console.log(response);
            if (response.data.status === 'succeed') {
                this.getCartQty();                                                    
                // this.dh_loading.hide();
            } else {                
                if( response.data.errors[0].indexOf("because the item is no longer available. Please reload the page.") > -1 ||
                    response.data.errors[0].indexOf("as to exist prior this action.") > -1
                ){                    
                    this.getCartQty();              
                }else{
                    swal.fire({
                        text: response.data.errors.join('\n'),
                        icon: 'error',
                    });
                    this.dh_loading.hide();
                }
                
            }
            if(window.location.href.indexOf("cart.php") > -1){                                       
                this.refreshCartOnCartPage();                        
            }
        });                     
    }
    
    confirmRemoveItem(elemnt){    
        let itemId = $(elemnt).data('cart-itemid');
        let rmvMsg = $(elemnt).data('confirm-delete');        
        swal.fire({
            text: rmvMsg,
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "cancel",
        }).then((result) => {
            if (result.value) {
                this.removeItem(itemId);    
            }
        });        
    }


}
