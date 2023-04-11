import superfish from "superfish/src/js/superfish";
import treeviewjs from "treemenu.js/treemenu";
import utils from '@bigcommerce/stencil-utils';
import _ from 'underscore';
import { toArray } from "lodash";
import swal from '../global/sweet-alert';
import SidebarCart from "./slidebar-cart";
import select2 from "select2/dist/js/select2";
import 'jquery.nicescroll/jquery.nicescroll';
import WishList from '../wishlist';
import FacetedSearch from '../common/faceted-search';
import modalFactory, { alertModal, showAlertModal } from '../global/modal';
import { normalizeFormData } from '../common/utils/api';

document.addEventListener('click', function (e) {
    if (e.currentTarget.activeElement.id != 'quickSearch') {
    //   document.querySelector('.quickSearchResults').innerHTML = '';
    }
});

let globalContext;
let slideIndex = 1;

function defaultFunctionality(context) {
    globalContext = context;
    /* SUPERFISH SCRIPT */
    setTimeout(() => {
        $('ul.navPages-list.sf-menu, ul.navUser-section.sf-menu').superfish({
            delay: 0
        });
    });

    $(".mega-menu-item").on("mouseenter",(event)=>{
        let div = $(event.currentTarget);
        div.find('.mega-menu-level-first .category-item').first().addClass("active");
    })


    // active class on hover
  const firstmenulevel = document.querySelectorAll('.mega-menu-level-first .category-item');
  firstmenulevel.forEach((menulist) => {
      menulist.addEventListener('mouseenter', function () {
          firstmenulevel.forEach((menulistsub) => {
              menulistsub.classList.remove('active');
          });
          if (menulist.querySelectorAll('ul').length) {
          this.classList.add('active');
          }
      });
  });

  // navigation active class
  const activeClass = (navigation) => {
      const navigationLists = document.querySelectorAll(navigation);
      navigationLists.forEach((nav) => {
          const winpathname = window.location.href;
          const navhref = nav.querySelector('a').getAttribute('href');
          if (winpathname === navhref) {
              nav.classList.add('activePage');
          }
      });
  };

  const parentActiveClass = (navigation) => {
      const navigationLists = document.querySelectorAll(navigation);
      navigationLists.forEach((nav) => {
          if (nav.querySelectorAll('li.activePage').length) {
              nav.parentNode.classList.add('activePage');
          }
      });
  };

  $(document).on('click','.view-all',function(){
        $(this).closest('.dropdown--quickSearch-custom').find('form').submit();
    });


     /* MOBILE MENU SCRIPT */
  $(".control-otherlinks").click(function () {
    $("body").toggleClass("mobile-menu-open");
  });
       
    /* Nice Scroll */
    jQuery(function () {        

        document.querySelectorAll(".navPages-list > .mega-menu-item").forEach((el)=>{
            
            jQuery(el).hover(function(event){                
                MegamenuNicescroll(event);
            });

            el.addEventListener("touchend",function(event){                
                MegamenuNicescroll(event);
            });
        })
        
    });

        



// faceted custom toggle

    $(document).on('click', '.facetedSearch-toggle-custom', function () {
        if ($(window).width() <= 1023) {
            $(this).parent().find('.facetedSearch-navList').slideToggle();
            $(this).toggleClass('active');
        }
    });


// FAQ accordian
$(document).on('click', '.career-toggle-title', function () {
    $(this).parent().find('.career-toggle-content').slideToggle(500);
    $(this).toggleClass('open');
});
// FAQ accordian End

   /* TREEVIEW SCRIPT */
   $(".navList-treeview")
   .not(".navList-treeview.treeview")
   .treeview({
     collapsed: true,
     animated: "medium",
     persist: "location",
     collapsedArrow: '<svg><use xlink:href="#icon-menu-arrow-grey"></use></svg>',
     expandedArrow: '<svg><use xlink:href="#icon-menu-arrow-grey"></use></svg>'
   });



  activeClass('.navPages-list li');
  activeClass('.mobile-menu-list li');
  activeClass('.navList-treeview li');
  parentActiveClass('.navList-treeview > li > ul');
  parentActiveClass('.navList-treeview > li > ul > li > ul');
  parentActiveClass('.navPages-list > li > ul');
  parentActiveClass('.navPages-list > li > ul > li > ul');
  parentActiveClass('.mobile-menu-list > li > ul');
  parentActiveClass('.mobile-menu-list > li > ul > li > ul');



  $('.navPages-list li.navPages-item').hover(function() {
        $(this).find('>ul').stop().slideDown(170);
  }, function() {
        $(this).find('>ul').stop().slideUp(170);
  });

  $("li.navUser-item--cart").click(function () {
    $("body").addClass("body-cart-slide-open");
  });

  $(".cart-slide-close").click(function () {
    $("body").removeClass("body-cart-slide-open");
  });




/* FOOTER TOGGLE SCRIPT */
$(document).on('click', '.footer-info-custom .footer-toggle-title', function () {
    if ($(window).width() <= 1023) {
        $(this).parent().find('.footer-toggle-content').slideToggle();
        $(this).toggleClass('active');
    }
});


  // Sidebar toggle
  $(document).on("click",".sidebarBlock .sidebarBlock-heading",function () {
        $(this).parent().find(".navList").slideToggle();
        $(this).toggleClass("active");
  });

  $(".navUser-item-quickSearch .navUser-action").click(function () {
        $(this).toggleClass("show");
        $("body").toggleClass("search-box-open");
  });

  $('html,body').click(function (e) {
    if (!$(e.target).parents('.dropdown--quickSearch-custom').length) {
      if ($("body.search-box-open").length) {
        $(".navUser-action--quickSearch").click();
        $('.dropdown--quickSearch-custom.is-open').removeClass('is-open');
      }
    }
  });


$(".home-populer-brands .custom-row, .home-populer-categories .custom-row").slick({
    infinite: true,
    dots: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: '<button class="slick-next slick-arrow" aria-label="Next" type="button"><svg><use xlink:href="#icon-slide-arrow-right"></use></svg></button>',
    prevArrow: '<button class="slick-prev slick-arrow" aria-label="Previous" type="button"><svg><use xlink:href="#icon-slide-arrow-left"></use></svg></button>',
    responsive: [
        {
            breakpoint: 1440,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 1220,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                centerMode: true,
                centerPadding: '80px',
                infinite: true
            }
        },
        {
            breakpoint: 1023,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                centerMode: true,
                centerPadding: '80px',
                infinite: true
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: true,
                centerMode: true,
                centerPadding: '110px',
                infinite: true
            }
        },
        {
            breakpoint: 666,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: true,
                centerMode: true,
                centerPadding: '74px',
                infinite: true
            }
        },
        {
            breakpoint: 568,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
                arrows: true,
                centerMode: true,
                centerPadding: '74px',
                infinite: true
            }
        },
        {
            breakpoint: 300,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
                arrows: true,
                centerMode: true,
                centerPadding: '74px',
                infinite: true
            }
        }
    ]
});

$(".reviws-block").slick({
    infinite: false,
    dots: false,
    mobileFirst: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    focusOnSelect: true,
    fade: true,
    arrows: true,
    nextArrow: '<button class="slick-next slick-arrow" aria-label="Next" type="button"><svg><use xlink:href="#icon-slide-arrow-right"></use></svg></button>',
    prevArrow: '<button class="slick-prev slick-arrow" aria-label="Previous" type="button"><svg><use xlink:href="#icon-slide-arrow-left"></use></svg></button>'
});



/* ============ TOGGLE SCRIPT ============ */
    $(".toggle-block .toggle-title").click(function(){
        $(this).next(".toggle-content").slideToggle();
        $(this).toggleClass('active');
    }).first().click();

/* ============ TOGGLE SCRIPT ============ */

$(document).ready(function () {
    $(".tooltip-slider .tooltip").click(function(){
        $(this).toggleClass('show');
    });
});

$(document).click((event)=>{
    let targetE = $(event.target);
    if(!targetE.hasClass('tooltip')){
        $(".tooltip-slider .tooltip").removeClass('show');
    }
});


/* ============== sticky menu =============== */
    let headerHeight = $('header').height();
    let scrollElement = false;
    let hHeader = $('.header').innerHeight();
    let hInner = hHeader - 10;
    $(window).scroll(function () {
        if ($('[sticky="true"]').length && $(window).width() > 1023) {
        if (hHeader < $(window).scrollTop() && !scrollElement) {
            if ($('.header').length) {
            $('.header').addClass('stuck');
            $('.body').addClass('body-stuck').css('margin-top', headerHeight + 'px');
            }
            scrollElement = true;
        } else if (hInner > $(window).scrollTop() && scrollElement) {
            $('.header').removeClass('stuck');
            $('.body').removeClass('body-stuck').css('margin-top', '0px');
            scrollElement = false;
        }
        }
    });


    createDotLink();
    showSlides(slideIndex);

    $(".prevs").on("click",()=>{
        plusSlides(-1);
    });

    $(".nexts").on("click",()=>{
        plusSlides(1);
    });

    /***************Slider Cart***************/
        let sbcart = new SidebarCart(context);
    /***************************************/


    /***************Selct2***************/
    //  $('.form-select').select2({
    //     minimumResultsForSearch: -1
    //  });
    makeSelect2Dropdowns('.form-select');

    /***************WishList***************/
    whistList();


} //defaultFunctionality end


/**
 * On per page filter you select option
 * each time it will render new content so
 * it always be default per page option
 * this function helps to fix this issue
 **/

function getProperProductCount(){
    let srchstr = window.location.search.substr(1);
    let url = srchstr.split("&")??0;
    const srchParam = {}
    if(url.length > 0){
        for(let x in url){
            let makePart = url[x].split("=");
            srchParam[makePart[0]] = makePart[1];
        }

        let elemnt;
        let currentKey;
        let allkeys = Object.keys(srchParam);
        //we want this function perform only when parama hava limit per page or sort by parama
        let isLimitNSort = false;

        for(let i in allkeys){
            if(allkeys[i] == 'limit'){
                elemnt = $("[data-sort-by]").find("#limit");
                isLimitNSort = true;
                currentKey = 'limit';
            }
            if(allkeys[i] == 'sort'){
                elemnt = $("[data-sort-by]").find("#sort");
                isLimitNSort = true;
                currentKey = 'sort';
            }

            if(isLimitNSort){
                elemnt.children().each(function(i,elmt){
                    if($(elmt).is("selected")){
                        $(elmt).attr('selected',false);
                    }

                    if($(elmt).prop('value') == srchParam[currentKey]){
                        $(elmt).prop('selected',true);
                    }
                 });
            }

        }

    }
}

/*************** Tooltipe slider***************/
function createDotLink(){
    let slides = document.getElementsByClassName("tooltip-slide");
    if(slides.length > 0){
        let dotbox = document.getElementById("dotBox");
        for(let i=1; i <=slides.length;i++){
            let dotspan = document.createElement("span");
            let attrib = document.createAttribute("onlick");

            dotspan.classList.add("dot");
            dotspan.setAttribute("onclick","currentSlide("+i+")");

            dotbox.append(dotspan);
            dotbox.style.display="none";
        }
    }
}

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("tooltip-slide");
    if(slides.length > 0){
        let dots = document.getElementsByClassName("dot");
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex-1].style.display = "flex";
        dots[slideIndex-1].className += " active";
    }
}


$(document).on('click', '.soft-wash-heading-tag a[href^="#"]', function (event) {
	event.preventDefault();
    let scrollParam = $($.attr(this, 'href')).offset();
	$('html, body').animate({
		scrollTop: scrollParam.top + "px"
	}, 1000);
});

function responsiveView() {
    $('.header').removeClass('stuck');
    $('.body').removeClass('body-stuck').css('margin-top', '0px');
}

function whistList() {
    $(document).on('click', '.wishlistbtn', function (e) {
         e.preventDefault();
         let targetElmnt = $(e.currentTarget);

         if(targetElmnt.attr('data-href').indexOf("login") > -1 ){
            window.location.href = targetElmnt.attr('data-href');
         }else{
            if (!targetElmnt.find('[data-commonwishlist]').length) {
                let wishform = `<form action="${targetElmnt.attr('data-href')}" method="POST" data-commonwishlist class="form form-wishlist form-action"   data-wishlist-add">
                                    <input type="hidden" name="variation_id" value="">
                                    <input type="hidden" name="authenticity_token" value="${BCData.csrf_token}">
                                    <input type="submit" style="display:none"  formaction="${targetElmnt.attr('data-add-href')}" value="submit">
                                </form>`;
                targetElmnt.parent().append(wishform);
                $(document).find('[data-commonwishlist] input').click();
             }
         }

    });
}



let windowWidth = $(window).width();

$(window).resize(function () {
    if ($(window).width() != windowWidth) {
        // Update the window width for next time
        windowWidth = $(window).width();
        responsiveView();
      }
    //   MegamenuNicescroll();
});



function getProductReviews(context){
    let reviewSlider = $("#handleReviewRes");
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    let url = `https://stamped.io/api/widget/reviews?minRating&storeUrl=${globalContext.stamped_storeHash}&apiKey=${globalContext.stamped_pubkey}`

    fetch(url, requestOptions)
      .then(response => response.json())
      .then((result) => {

         let res = result.data;
        let latestReviews = {};
        for(let i in res){

            let prodid = res[i].productId;
            let reviewDiv = document.createElement("div");
                reviewDiv.classList.add("review-body");

            let reviewBody = document.createElement("div");
                reviewBody.classList.add("review-summary");

            let reviewAuthor = document.createElement("div");
                reviewAuthor.classList.add("review-author");

            let reviewBadge = document.createElement("span");
            reviewBadge.setAttribute('class', 'stamped-starratings stamped-review-header-starratings review-star');
            reviewBadge.setAttribute('data-rating',`${res[i].reviewRating}`);

            for(let j=1; j<=5;j++){
                let createStar = document.createElement("i");
                createStar.classList.add("stamped-fa");
                if(j <= res[i].reviewRating){
                    createStar.classList.add("stamped-fa-star");
                }else{
                    createStar.classList.add("stamped-fa-star-o");
                }
                reviewBadge.append(createStar);
            }

            reviewBody.innerText = res[i].reviewMessage;
            reviewAuthor.innerText = "by " + res[i].author;

            reviewDiv.append(reviewBadge);
            reviewDiv.append(reviewBody);
            reviewDiv.append(reviewAuthor);

            /*
                get differance of today - review date
                eg. on product with product id 120
                has two reviews with rating 5, one is on 21th or other on 25th
                25th is latest here so we take it.
             */
            const date1 = new Date(res[i].dateCreated);
            const date2 = new Date();
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if(latestReviews[prodid]){
                if(diffDays < latestReviews[prodid][0]){
                    latestReviews[prodid] = [diffDays,reviewDiv];
                }
            }else{
                latestReviews[prodid] = [diffDays,reviewDiv];
            }

        }

        let counter = 1;
        for(let k in latestReviews){
            if(counter > 5 ){
                break;
            }
            reviewSlider.append( latestReviews[k][1] );
            counter++;
        }

        /*delete context.stamped_apitoken;
        delete context.stamped_pubkey;
        delete context.stamped_storeHash;*/
      })
      .catch(error => console.log('error', error));
}

function getReviewsOnsearch(OSection){

    const OSection_id = {
        "quick-search": $(".quickSearchResults"),
        "category": $('#product-listing-container'),
        "brand": $('#product-listing-container'),
        "search": $('#product-listing-container'),
    }

    const searchSection = OSection_id[OSection];
    let ids = [];
    let productIds = []
    searchSection.find(".stamped-product-reviews-badge").each((i,el)=>{
        let id = $(el).data('id');
        if(ids.indexOf(id) == -1){
            ids.push(id);
            productIds.push({"productId": `${id}`});
        }
    });

    try{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "productIds":productIds,
            "apiKey": `${globalContext.stamped_pubkey}`,
            "storeUrl": `${globalContext.stamped_storeHash}`
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://stamped.io/api/widget/badges?isIncludeBreakdown=true&isincludehtml=true", requestOptions)
        .then(response => response.json())
        .then(result =>{
            for(let i in result){
                if(result[i].rating > 0){
                    searchSection.find(`[data-id="${result[i].productId}"]`).html(result[i].badge);
                }else{
                  let zeroReviews = `<span class="stamped-badge" data-rating="${result[i].rating}" style="display:block" data-lang="" aria-label="Rated 0.0 out of 5 stars">
                                        <span class="stamped-starrating stamped-badge-starrating" aria-hidden="true">
                                            <i class="stamped-fa stamped-fa-star-o" aria-hidden="true"></i>
                                            <i class="stamped-fa stamped-fa-star-o" aria-hidden="true"></i>
                                            <i class="stamped-fa stamped-fa-star-o" aria-hidden="true"></i>
                                            <i class="stamped-fa stamped-fa-star-o" aria-hidden="true"></i>
                                            <i class="stamped-fa stamped-fa-star-o" aria-hidden="true"></i>
                                        </span>
                                    </span>`;
                  searchSection.find(`[data-id="${result[i].productId}"]`).html(zeroReviews);
                }
            }
            // $(el).html(result[0].badge)
        })
        .catch(error => console.log('error', error));

    }catch(err){
        console.log(err);
    }
}

function getReviewOnOptionChanged(prodid,scop){
    if(prodid){
        try{
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "productIds":[{"productId": `${prodid}`}],
                "apiKey": `${globalContext.stamped_pubkey}`,
                "storeUrl": `${globalContext.stamped_storeHash}`
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://stamped.io/api/widget/badges?isIncludeBreakdown=true&isincludehtml=true", requestOptions)
            .then(response => response.json())
            .then(result =>{
                $(".price-block-wrap .right-block .stamped-product-reviews-badge",scop).html(result[0].badge);
            })
            .catch(error => console.log('error', error));

        }catch(err){
            console.log(err);
        }
    }
}


function MegamenuNicescroll(curMenu){          
    let activeMegaMenu = jQuery(curMenu.currentTarget).find(".mega-menu-level-first");           

    activeMegaMenu.niceScroll({
        cursorwidth:8,
        cursoropacitymin:1,
        cursorcolor:'#ffffff',
        cursorborder:'1px solid #000000',
        cursorborderradius:4,
        autohidemode:'leave'
    });

    let firstMenu = jQuery(curMenu.currentTarget).find(".mega-menu-level-first > li").eq(0).find(".mega-menu-second-wrap-inner");
    if(firstMenu.height() > 100){
        firstMenu.niceScroll({
            cursorwidth:8,
            cursoropacitymin:1,
            cursorcolor:'#eeeeee',
            cursorborder:'1px solid #d3d3d3',
            cursorborderradius:4,
            autohidemode:'leave'
        });    
        firstMenu.getNiceScroll().resize();        
    }   

    /* when screen size change then nicescroll change accordingly to it screen content */
    activeMegaMenu.getNiceScroll().resize();

    jQuery(curMenu.currentTarget).find(".mega-menu-level-first > .category-item").hover(function(e){            
        
        jQuery(e.currentTarget).find(".mega-menu-second-wrap-inner").niceScroll({
                    cursorwidth:8,
                    cursoropacitymin:1,
                    cursorcolor:'#eeeeee',
                    cursorborder:'1px solid #d3d3d3',
                    cursorborderradius:4,
                    autohidemode:'leave'
        });    
        jQuery(e.currentTarget).find(".mega-menu-second-wrap-inner").getNiceScroll().resize();        
    });

    $(window).resize(function () {
        firstMenu.getNiceScroll().resize();
    });
}


function makeSelect2Dropdowns(selector = false){
    // Make the select2 dropdowns for dropdowns other than the sort by dropdowns
    $(selector ? selector : '.form-select:not(".category-sort-select")').each(function (e) {
      const $that = $(this);
      $(this).select2({
        selectOnClose: false,
        dropdownParent: $('[data-product-attribute="set-select"]').length > 0
          ? $('[data-product-attribute="set-select"]')
          : ($that.closest('.form-field').length > 0 ? $that.closest('.form-field') : $that.closest('.estimator-form-input'))
      });
      let timeout = 0;
      $($that).on('select2:open', () => {
        if ($that.attr('data-field-type') === "Country" || $that.attr('data-field-type') === "State") {
          const searchElInput = $that.siblings('.select2-container:not(.select2)').find('.select2-search.select2-search--dropdown .select2-search__field');
          $that.siblings('.select2-container:not(.select2)').find('.select2-search.select2-search--dropdown').addClass('show-dropdown');
          if ($that.attr('data-field-type') === "Country") {
            searchElInput.attr('placeholder', 'Search for a country');
          } else if ($that.attr('data-field-type') === "State") {
            searchElInput.attr('placeholder', 'Search for a state');
          }
          timeout && clearTimeout(timeout);
          timeout = setTimeout(() => {
            $that.siblings('.select2-container:not(.select2)').find('.select2-search.select2-search--dropdown .select2-search__field')[0].focus();
          }, 100);
        }
      })
    });
  
    // Make the select2 dropdowns for the sort by dropdowns with callback for the same
    !selector && $('.form-select .category-sort-select').each(function (e) {
      const $that = $(this);
      $(this).select2({
        selectOnClose: false,
        dropdownParent: $('[data-product-attribute="set-select"]').length > 0 ? $('[data-product-attribute="set-select"]') : $that.closest('.form-field')
      });
    // Call the below function only if without this function your sort by dropdown does not change the products     
    //  $that.on('select2:select', (event) => { alert("custom call");FacetedSearch.customSortByTrigger(event, event.target);});
    });
  }

  const manageCardAddToCart = () => {
    const $targetEls = $('.card');
    if ($targetEls.length > 0) {
      // Append product preview modal for the add to cart events to use it
      const previewModalHTML = `
        <div id="previewModal" class="modal modal--large" data-reveal="">
          <button class="modal-close" type="button" title="Close">
          <span class="close-icon" aria-hidden="true"><i class="icon"><svg><use xlink:href="#icon-close"></use></svg></i></span>
        </button>
          <div class="modal-content"></div>
          <div class="loadingOverlay" style="display: none;"></div>
        </div>
      `;
      $(previewModalHTML).appendTo('body');
      // Open quickview on such product cards that have the product options
      $(document).on('click', '.card .card-second-quickview-trigger', function(e){
        e.preventDefault();
        $(this).siblings('.quickview').trigger('click');
      });
      // Add product to cart and then show the success popup
      $(document).on('click', '.card .card-addtocart-button', function (e) {
        e.preventDefault();
        $(this).addClass('loading');
        // Add item to cart
        const form = document.createElement("form");
        form.innerHTML = `
          <input type="hidden" name="action" value="add"/>
          <input type="hidden" name="product_id" value="${$(this).attr('data-product-id')}"/>
          <input type="hidden" name="qty[]" value="1"/>
        `;
        console.log(normalizeFormData(new FormData(form)));
        utils.api.cart.itemAdd(normalizeFormData(new FormData(form)), (err, response) => {
          const errorMessage = err || response.data.error;
          $(this).removeClass('loading');
  
          // Guard statement
          if (errorMessage) {
            // Strip the HTML from the error message
            const tmp = document.createElement('DIV');
            tmp.innerHTML = errorMessage;
  
            return errorMessage;
          }
  
          const previewModal = modalFactory('#previewModal')[0];
          // Open preview modal and update content
          if (previewModal) {
            previewModal.open();
  
            if (window.ApplePaySession) {
              previewModal.$modal.addClass('apple-pay-supported');
            }
              const options = {
                template: 'cart/preview',
                params: {
                  suggest: response.data.cart_item.id,
                },
                config: {
                  cart: {
                    suggestions: {
                      limit: 4,
                    },
                  },
                },
              };
              utils.api.cart.getContent(options, (err, response) => {
                if (err) {
                    return;
                }
  
                previewModal.updateContent(response);
  
                // Update cart counter
                const $body = $('body');
                const $cartQuantity = $('[data-cart-quantity]', previewModal.$content);
                const $cartCounter = $('.navUser-action .cart-count');
                const quantity = $cartQuantity.data('cartQuantity') || 0;
                const $promotionBanner = $('[data-promotion-banner]');
                const $backToShopppingBtn = $('.previewCartCheckout > [data-reveal-close]');
                const $modalCloseBtn = $('#previewModal > .modal-close');
                const bannerUpdateHandler = () => {
                  const $productContainer = $('#main-content > .container');
  
                  $productContainer.append('<div class="loadingOverlay pdp-update"></div>');
                  $('.loadingOverlay.pdp-update', $productContainer).show();
                  window.location.reload();
                };
  
                $cartCounter.addClass('cart-count--positive');
                $body.trigger('cart-quantity-update', quantity);
  
                if ($promotionBanner.length && $backToShopppingBtn.length) {
                  $backToShopppingBtn.on('click', bannerUpdateHandler);
                  $modalCloseBtn.on('click', bannerUpdateHandler);
                }
              });
  
          } else {
            // if no modal, redirect to the cart page
            window.location.href = response.data.cart_item.cart_url || this.context.urls.cart;
          }
        });
      });
    }
  }

  $(document).ready(function() {    
    let timer = setInterval(()=>{
        let el = $(".card .card-addtocart-button");
        if(el.length > 0){
            clearInterval(timer);            
            manageCardAddToCart();
        }        
    },1000);    
  });


  $(document).ready(function(){
    $(".slick_menu").slick({
        slidesToShow: 6,
        slidesToScroll: 6,
        vertical:false,
        arrows:true,
        infinite: false,
        prevArrow:`<button class="slick-prev slick-arrow" aria-label="Previous" type="button" style=""><svg><use xlink:href="#icon-slide-arrow-left"></use></svg></button>`,
        nextArrow:`<button class="slick-next slick-arrow" aria-label="Next" type="button" style=""><svg><use xlink:href="#icon-slide-arrow-right"></use></svg></button>`,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
                slidesToScroll: 3,
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 2,
            slidesToScroll: 2,
            }
          },
          {
            breakpoint: 441,
            settings: {
              slidesToShow: 1,
            slidesToScroll: 1,
            }
          }
        ]
    });



    $('li.navPages-item.mega-menu-item.paint-sprayers').hover(function(){
        $(this).find('.mega-menu-wrap').get(0).slick.setPosition();
        $(".slick_menu").trigger('resize');
     }, function () {

    });

    $(window).resize(function() {
        if ($(window).width() >= 1024) {
            $("html body").removeClass('mobile-menu-open');
        }else{}
    }).resize();
   
  })

export default {
    defaultFunctionality,
    getProperProductCount,
    getReviewsOnsearch,
    getReviewOnOptionChanged,
    makeSelect2Dropdowns,
}
