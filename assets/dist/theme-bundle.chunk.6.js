(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./assets/js/theme/catalog.js":
/*!************************************!*\
  !*** ./assets/js/theme/catalog.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CatalogPage; });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/utils/url-utils */ "./assets/js/theme/common/utils/url-utils.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_2__);
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var CatalogPage = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(CatalogPage, _PageManager);
  function CatalogPage(context) {
    var _this;
    _this = _PageManager.call(this, context) || this;
    window.addEventListener('beforeunload', function () {
      if (document.activeElement.id === 'sort') {
        window.localStorage.setItem('sortByStatus', 'selected');
      }
    });
    return _this;
  }
  var _proto = CatalogPage.prototype;
  _proto.arrangeFocusOnSortBy = function arrangeFocusOnSortBy() {
    var $sortBySelector = $('[data-sort-by="product"] #sort');
    if (window.localStorage.getItem('sortByStatus')) {
      $sortBySelector.focus();
      window.localStorage.removeItem('sortByStatus');
    }
  };
  _proto.onSortBySubmit = function onSortBySubmit(event, currentTarget) {
    var url = url__WEBPACK_IMPORTED_MODULE_2___default.a.parse(window.location.href, true);
    var queryParams = $(currentTarget).serialize().split('=');
    url.query[queryParams[0]] = queryParams[1];
    delete url.query.page;
    event.preventDefault();
    window.location = url__WEBPACK_IMPORTED_MODULE_2___default.a.format({
      pathname: url.pathname,
      search: _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_1__["default"].buildQueryString(url.query)
    });
  };
  return CatalogPage;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/global/compare-products.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/global/compare-products.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./assets/js/theme/global/modal.js");

function decrementCounter(counter, item) {
  var index = counter.indexOf(item);
  if (index > -1) {
    counter.splice(index, 1);
  }
}
function incrementCounter(counter, item) {
  counter.push(item);
}
function updateCounterNav(counter, $link, urls) {
  if (counter.length !== 0) {
    if (!$link.is('visible')) {
      $link.addClass('show');
    }
    $link.attr('href', urls.compare + "/" + counter.join('/'));
    $link.find('span.countPill').html(counter.length);
  } else {
    $link.attr('href', "" + urls.compare);
    $link.find('span.countPill').html(counter.length);
    $link.removeClass('show');
  }
}
/* harmony default export */ __webpack_exports__["default"] = (function (_ref) {
  var noCompareMessage = _ref.noCompareMessage,
    compareLimitMessage = _ref.compareLimitMessage,
    urls = _ref.urls;
  var compareCounter = [];
  var $compareLink = $('a[data-compare-nav]');
  $('body').on('compareReset', function () {
    var $checked = $('body').find('input[name="products\[\]"]:checked');
    compareCounter = $checked.length ? $checked.map(function (index, element) {
      return element.value;
    }).get() : [];
    updateCounterNav(compareCounter, $compareLink, urls);
  });
  $('body').triggerHandler('compareReset');
  $('body').on('click', '[data-compare-id]', function (event) {
    var product = event.currentTarget.value;
    var $clickedCompareLink = $('a[data-compare-nav]');
    if (event.currentTarget.checked) {
      if (compareCounter.length > 3) {
        Object(_modal__WEBPACK_IMPORTED_MODULE_0__["showAlertModal"])(compareLimitMessage);
        return false;
      } else {
        incrementCounter(compareCounter, product);
      }
    } else {
      decrementCounter(compareCounter, product);
    }
    updateCounterNav(compareCounter, $clickedCompareLink, urls);
  });
  $('body').on('submit', '[data-product-compare]', function (event) {
    var $this = $(event.currentTarget);
    var productsToCompare = $this.find('input[name="products\[\]"]:checked');
    if (productsToCompare.length <= 1) {
      Object(_modal__WEBPACK_IMPORTED_MODULE_0__["showAlertModal"])(noCompareMessage);
      event.preventDefault();
    }
  });
  $('body').on('click', 'a[data-compare-nav]', function () {
    var $clickedCheckedInput = $('body').find('input[name="products\[\]"]:checked');
    if ($clickedCheckedInput.length <= 1) {
      Object(_modal__WEBPACK_IMPORTED_MODULE_0__["showAlertModal"])(noCompareMessage);
      return false;
    }
  });
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/search.js":
/*!***********************************!*\
  !*** ./assets/js/theme/search.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Search; });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _catalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./catalog */ "./assets/js/theme/catalog.js");
/* harmony import */ var _common_faceted_search__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/faceted-search */ "./assets/js/theme/common/faceted-search.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _global_compare_products__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./global/compare-products */ "./assets/js/theme/global/compare-products.js");
/* harmony import */ var _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/utils/url-utils */ "./assets/js/theme/common/utils/url-utils.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var jstree__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! jstree */ "./node_modules/jstree/dist/jstree.min.js");
/* harmony import */ var jstree__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(jstree__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _dh_custom_custom__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./dh-custom/custom */ "./assets/js/theme/dh-custom/custom.js");
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }











var leftArrowKey = 37;
var rightArrowKey = 39;
var Search = /*#__PURE__*/function (_CatalogPage) {
  _inheritsLoose(Search, _CatalogPage);
  function Search() {
    return _CatalogPage.apply(this, arguments) || this;
  }
  var _proto = Search.prototype;
  _proto.formatCategoryTreeForJSTree = function formatCategoryTreeForJSTree(node) {
    var _this = this;
    var nodeData = {
      text: node.data,
      id: node.metadata.id,
      state: {
        selected: node.selected
      }
    };
    if (node.state) {
      nodeData.state.opened = node.state === 'open';
      nodeData.children = true;
    }
    if (node.children) {
      nodeData.children = [];
      node.children.forEach(function (childNode) {
        nodeData.children.push(_this.formatCategoryTreeForJSTree(childNode));
      });
    }
    return nodeData;
  };
  _proto.showProducts = function showProducts(navigate) {
    if (navigate === void 0) {
      navigate = true;
    }
    this.$productListingContainer.removeClass('u-hidden');
    this.$facetedSearchContainer.removeClass('u-hidden');
    this.$contentResultsContainer.addClass('u-hidden');
    $('[data-content-results-toggle]').removeClass('navBar-action-color--active');
    $('[data-content-results-toggle]').addClass('navBar-action');
    $('[data-product-results-toggle]').removeClass('navBar-action');
    $('[data-product-results-toggle]').addClass('navBar-action-color--active');
    this.activateTab($('[data-product-results-toggle]'));
    if (!navigate) {
      return;
    }
    var searchData = $('#search-results-product-count span').data();
    var url = searchData.count > 0 ? searchData.url : _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].replaceParams(searchData.url, {
      page: 1
    });
    _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].goToUrl(url);
  };
  _proto.showContent = function showContent(navigate) {
    if (navigate === void 0) {
      navigate = true;
    }
    this.$contentResultsContainer.removeClass('u-hidden');
    this.$productListingContainer.addClass('u-hidden');
    this.$facetedSearchContainer.addClass('u-hidden');
    $('[data-product-results-toggle]').removeClass('navBar-action-color--active');
    $('[data-product-results-toggle]').addClass('navBar-action');
    $('[data-content-results-toggle]').removeClass('navBar-action');
    $('[data-content-results-toggle]').addClass('navBar-action-color--active');
    this.activateTab($('[data-content-results-toggle]'));
    if (!navigate) {
      return;
    }
    var searchData = $('#search-results-content-count span').data();
    var url = searchData.count > 0 ? searchData.url : _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].replaceParams(searchData.url, {
      page: 1
    });
    _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].goToUrl(url);
  };
  _proto.activateTab = function activateTab($tabToActivate) {
    var $tabsCollection = $('[data-search-page-tabs]').find('[role="tab"]');
    $tabsCollection.each(function (idx, tab) {
      var $tab = $(tab);
      if ($tab.is($tabToActivate)) {
        $tab.removeAttr('tabindex');
        $tab.attr('aria-selected', true);
        return;
      }
      $tab.attr('tabindex', '-1');
      $tab.attr('aria-selected', false);
    });
  };
  _proto.onTabChangeWithArrows = function onTabChangeWithArrows(event) {
    var eventKey = event.which;
    var isLeftOrRightArrowKeydown = eventKey === leftArrowKey || eventKey === rightArrowKey;
    if (!isLeftOrRightArrowKeydown) return;
    var $tabsCollection = $('[data-search-page-tabs]').find('[role="tab"]');
    var isActiveElementNotTab = $tabsCollection.index($(document.activeElement)) === -1;
    if (isActiveElementNotTab) return;
    var $activeTab = $("#" + document.activeElement.id);
    var activeTabIdx = $tabsCollection.index($activeTab);
    var lastTabIdx = $tabsCollection.length - 1;
    var nextTabIdx;
    switch (eventKey) {
      case leftArrowKey:
        nextTabIdx = activeTabIdx === 0 ? lastTabIdx : activeTabIdx - 1;
        break;
      case rightArrowKey:
        nextTabIdx = activeTabIdx === lastTabIdx ? 0 : activeTabIdx + 1;
        break;
      default:
        break;
    }
    $($tabsCollection.get(nextTabIdx)).focus().trigger('click');
  };
  _proto.onReady = function onReady() {
    var _this2 = this;
    Object(_global_compare_products__WEBPACK_IMPORTED_MODULE_4__["default"])(this.context);
    this.arrangeFocusOnSortBy();
    var $searchForm = $('[data-advanced-search-form]');
    var $categoryTreeContainer = $searchForm.find('[data-search-category-tree]');
    var url = url__WEBPACK_IMPORTED_MODULE_6___default.a.parse(window.location.href, true);
    var treeData = [];
    this.$productListingContainer = $('#product-listing-container');
    this.$facetedSearchContainer = $('#faceted-search-container');
    this.$contentResultsContainer = $('#search-results-content');

    // Init faceted search
    if ($('#facetedSearch').length > 0) {
      this.initFacetedSearch();
    } else {
      this.onSortBySubmit = this.onSortBySubmit.bind(this);
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["hooks"].on('sortBy-submitted', this.onSortBySubmit);
    }

    // Init collapsibles
    Object(_common_collapsible__WEBPACK_IMPORTED_MODULE_7__["default"])();
    $('[data-product-results-toggle]').on('click', function (event) {
      event.preventDefault();
      _this2.showProducts();
    });
    $('[data-content-results-toggle]').on('click', function (event) {
      event.preventDefault();
      _this2.showContent();
    });
    $('[data-search-page-tabs]').on('keyup', this.onTabChangeWithArrows);
    if (this.$productListingContainer.find('li.product').length === 0 || url.query.section === 'content') {
      this.showContent(false);
    } else {
      this.showProducts(false);
    }
    var validator = this.initValidation($searchForm).bindValidation($searchForm.find('#search_query_adv'));
    this.context.categoryTree.forEach(function (node) {
      treeData.push(_this2.formatCategoryTreeForJSTree(node));
    });
    this.categoryTreeData = treeData;
    this.createCategoryTree($categoryTreeContainer);
    $searchForm.on('submit', function (event) {
      var selectedCategoryIds = $categoryTreeContainer.jstree().get_selected();
      if (!validator.check()) {
        return event.preventDefault();
      }
      $searchForm.find('input[name="category\[\]"]').remove();
      for (var _iterator = _createForOfIteratorHelperLoose(selectedCategoryIds), _step; !(_step = _iterator()).done;) {
        var categoryId = _step.value;
        var input = $('<input>', {
          type: 'hidden',
          name: 'category[]',
          value: categoryId
        });
        $searchForm.append(input);
      }
    });
    var $searchResultsMessage = $("<p\n            class=\"aria-description--hidden\"\n            tabindex=\"-1\"\n            role=\"status\"\n            aria-live=\"polite\"\n            >" + this.context.searchResultsCount + "</p>").prependTo('body');
    setTimeout(function () {
      return $searchResultsMessage.focus();
    }, 100);
    $(document).on("select2:select", ".filter-wrap .form-select", function (e) {
      _this2.facetedSearch.onSortBySubmit(e, e.currentTarget);
    });
  };
  _proto.loadTreeNodes = function loadTreeNodes(node, cb) {
    var _this3 = this;
    $.ajax({
      url: '/remote/v1/category-tree',
      data: {
        selectedCategoryId: node.id,
        prefix: 'category'
      },
      headers: {
        'x-xsrf-token': window.BCData && window.BCData.csrf_token ? window.BCData.csrf_token : ''
      }
    }).done(function (data) {
      var formattedResults = [];
      data.forEach(function (dataNode) {
        formattedResults.push(_this3.formatCategoryTreeForJSTree(dataNode));
      });
      cb(formattedResults);
    });
  };
  _proto.createCategoryTree = function createCategoryTree($container) {
    var _this4 = this;
    var treeOptions = {
      core: {
        data: function data(node, cb) {
          // Root node
          if (node.id === '#') {
            cb(_this4.categoryTreeData);
          } else {
            // Lazy loaded children
            _this4.loadTreeNodes(node, cb);
          }
        },
        themes: {
          icons: true
        }
      },
      checkbox: {
        three_state: false
      },
      plugins: ['checkbox']
    };
    $container.jstree(treeOptions);
  };
  _proto.initFacetedSearch = function initFacetedSearch() {
    var _this5 = this;
    // eslint-disable-next-line object-curly-newline
    var _this$context = this.context,
      onMinPriceError = _this$context.onMinPriceError,
      onMaxPriceError = _this$context.onMaxPriceError,
      minPriceNotEntered = _this$context.minPriceNotEntered,
      maxPriceNotEntered = _this$context.maxPriceNotEntered,
      onInvalidPrice = _this$context.onInvalidPrice;
    var $productListingContainer = $('#product-listing-container');
    var $contentListingContainer = $('#search-results-content');
    var $facetedSearchContainer = $('#faceted-search-container');
    var $searchHeading = $('#search-results-heading');
    var $searchCount = $('#search-results-product-count');
    var $contentCount = $('#search-results-content-count');
    var productsPerPage = this.context.searchProductsPerPage;
    var requestOptions = {
      template: {
        productListing: 'search/product-listing',
        contentListing: 'search/content-listing',
        sidebar: 'search/sidebar',
        heading: 'search/heading',
        productCount: 'search/product-count',
        contentCount: 'search/content-count'
      },
      config: {
        product_results: {
          limit: productsPerPage
        }
      },
      showMore: 'search/show-more'
    };
    this.facetedSearch = new _common_faceted_search__WEBPACK_IMPORTED_MODULE_2__["default"](requestOptions, function (content) {
      $searchHeading.html(content.heading);
      var url = url__WEBPACK_IMPORTED_MODULE_6___default.a.parse(window.location.href, true);
      if (url.query.section === 'content') {
        $contentListingContainer.html(content.contentListing);
        $contentCount.html(content.contentCount);
        _this5.showContent(false);
      } else {
        $productListingContainer.html(content.productListing);
        $facetedSearchContainer.html(content.sidebar);
        $searchCount.html(content.productCount);
        _this5.showProducts(false);
      }
      $('body').triggerHandler('compareReset');
      _dh_custom_custom__WEBPACK_IMPORTED_MODULE_10__["default"].getProperProductCount();
      _dh_custom_custom__WEBPACK_IMPORTED_MODULE_10__["default"].getReviewsOnsearch("search");
      _dh_custom_custom__WEBPACK_IMPORTED_MODULE_10__["default"].makeSelect2Dropdowns(".form-select");
      $('html, body').animate({
        scrollTop: 0
      }, 100);
    }, {
      validationErrorMessages: {
        onMinPriceError: onMinPriceError,
        onMaxPriceError: onMaxPriceError,
        minPriceNotEntered: minPriceNotEntered,
        maxPriceNotEntered: maxPriceNotEntered,
        onInvalidPrice: onInvalidPrice
      }
    });
  };
  _proto.initValidation = function initValidation($form) {
    this.$form = $form;
    this.validator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_9__["default"])({
      submit: $form,
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__["announceInputErrorMessage"]
    });
    return this;
  };
  _proto.bindValidation = function bindValidation($element) {
    if (this.validator) {
      this.validator.add({
        selector: $element,
        validate: 'presence',
        errorMessage: $element.data('errorMessage')
      });
    }
    return this;
  };
  _proto.check = function check() {
    if (this.validator) {
      this.validator.performCheck();
      return this.validator.areAll('valid');
    }
    return false;
  };
  return Search;
}(_catalog__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2F0YWxvZy5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvZ2xvYmFsL2NvbXBhcmUtcHJvZHVjdHMuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL3NlYXJjaC5qcyJdLCJuYW1lcyI6WyJDYXRhbG9nUGFnZSIsImNvbnRleHQiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZG9jdW1lbnQiLCJhY3RpdmVFbGVtZW50IiwiaWQiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiYXJyYW5nZUZvY3VzT25Tb3J0QnkiLCIkc29ydEJ5U2VsZWN0b3IiLCIkIiwiZ2V0SXRlbSIsImZvY3VzIiwicmVtb3ZlSXRlbSIsIm9uU29ydEJ5U3VibWl0IiwiZXZlbnQiLCJjdXJyZW50VGFyZ2V0IiwidXJsIiwiVXJsIiwicGFyc2UiLCJsb2NhdGlvbiIsImhyZWYiLCJxdWVyeVBhcmFtcyIsInNlcmlhbGl6ZSIsInNwbGl0IiwicXVlcnkiLCJwYWdlIiwicHJldmVudERlZmF1bHQiLCJmb3JtYXQiLCJwYXRobmFtZSIsInNlYXJjaCIsInVybFV0aWxzIiwiYnVpbGRRdWVyeVN0cmluZyIsIlBhZ2VNYW5hZ2VyIiwiZGVjcmVtZW50Q291bnRlciIsImNvdW50ZXIiLCJpdGVtIiwiaW5kZXgiLCJpbmRleE9mIiwic3BsaWNlIiwiaW5jcmVtZW50Q291bnRlciIsInB1c2giLCJ1cGRhdGVDb3VudGVyTmF2IiwiJGxpbmsiLCJ1cmxzIiwibGVuZ3RoIiwiaXMiLCJhZGRDbGFzcyIsImF0dHIiLCJjb21wYXJlIiwiam9pbiIsImZpbmQiLCJodG1sIiwicmVtb3ZlQ2xhc3MiLCJub0NvbXBhcmVNZXNzYWdlIiwiY29tcGFyZUxpbWl0TWVzc2FnZSIsImNvbXBhcmVDb3VudGVyIiwiJGNvbXBhcmVMaW5rIiwib24iLCIkY2hlY2tlZCIsIm1hcCIsImVsZW1lbnQiLCJ2YWx1ZSIsImdldCIsInRyaWdnZXJIYW5kbGVyIiwicHJvZHVjdCIsIiRjbGlja2VkQ29tcGFyZUxpbmsiLCJjaGVja2VkIiwic2hvd0FsZXJ0TW9kYWwiLCIkdGhpcyIsInByb2R1Y3RzVG9Db21wYXJlIiwiJGNsaWNrZWRDaGVja2VkSW5wdXQiLCJsZWZ0QXJyb3dLZXkiLCJyaWdodEFycm93S2V5IiwiU2VhcmNoIiwiZm9ybWF0Q2F0ZWdvcnlUcmVlRm9ySlNUcmVlIiwibm9kZSIsIm5vZGVEYXRhIiwidGV4dCIsImRhdGEiLCJtZXRhZGF0YSIsInN0YXRlIiwic2VsZWN0ZWQiLCJvcGVuZWQiLCJjaGlsZHJlbiIsImZvckVhY2giLCJjaGlsZE5vZGUiLCJzaG93UHJvZHVjdHMiLCJuYXZpZ2F0ZSIsIiRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lciIsIiRmYWNldGVkU2VhcmNoQ29udGFpbmVyIiwiJGNvbnRlbnRSZXN1bHRzQ29udGFpbmVyIiwiYWN0aXZhdGVUYWIiLCJzZWFyY2hEYXRhIiwiY291bnQiLCJyZXBsYWNlUGFyYW1zIiwiZ29Ub1VybCIsInNob3dDb250ZW50IiwiJHRhYlRvQWN0aXZhdGUiLCIkdGFic0NvbGxlY3Rpb24iLCJlYWNoIiwiaWR4IiwidGFiIiwiJHRhYiIsInJlbW92ZUF0dHIiLCJvblRhYkNoYW5nZVdpdGhBcnJvd3MiLCJldmVudEtleSIsIndoaWNoIiwiaXNMZWZ0T3JSaWdodEFycm93S2V5ZG93biIsImlzQWN0aXZlRWxlbWVudE5vdFRhYiIsIiRhY3RpdmVUYWIiLCJhY3RpdmVUYWJJZHgiLCJsYXN0VGFiSWR4IiwibmV4dFRhYklkeCIsInRyaWdnZXIiLCJvblJlYWR5IiwiY29tcGFyZVByb2R1Y3RzIiwiJHNlYXJjaEZvcm0iLCIkY2F0ZWdvcnlUcmVlQ29udGFpbmVyIiwidHJlZURhdGEiLCJpbml0RmFjZXRlZFNlYXJjaCIsImJpbmQiLCJob29rcyIsImNvbGxhcHNpYmxlRmFjdG9yeSIsInNlY3Rpb24iLCJ2YWxpZGF0b3IiLCJpbml0VmFsaWRhdGlvbiIsImJpbmRWYWxpZGF0aW9uIiwiY2F0ZWdvcnlUcmVlIiwiY2F0ZWdvcnlUcmVlRGF0YSIsImNyZWF0ZUNhdGVnb3J5VHJlZSIsInNlbGVjdGVkQ2F0ZWdvcnlJZHMiLCJqc3RyZWUiLCJnZXRfc2VsZWN0ZWQiLCJjaGVjayIsInJlbW92ZSIsImNhdGVnb3J5SWQiLCJpbnB1dCIsInR5cGUiLCJuYW1lIiwiYXBwZW5kIiwiJHNlYXJjaFJlc3VsdHNNZXNzYWdlIiwic2VhcmNoUmVzdWx0c0NvdW50IiwicHJlcGVuZFRvIiwic2V0VGltZW91dCIsImUiLCJmYWNldGVkU2VhcmNoIiwibG9hZFRyZWVOb2RlcyIsImNiIiwiYWpheCIsInNlbGVjdGVkQ2F0ZWdvcnlJZCIsInByZWZpeCIsImhlYWRlcnMiLCJCQ0RhdGEiLCJjc3JmX3Rva2VuIiwiZG9uZSIsImZvcm1hdHRlZFJlc3VsdHMiLCJkYXRhTm9kZSIsIiRjb250YWluZXIiLCJ0cmVlT3B0aW9ucyIsImNvcmUiLCJ0aGVtZXMiLCJpY29ucyIsImNoZWNrYm94IiwidGhyZWVfc3RhdGUiLCJwbHVnaW5zIiwib25NaW5QcmljZUVycm9yIiwib25NYXhQcmljZUVycm9yIiwibWluUHJpY2VOb3RFbnRlcmVkIiwibWF4UHJpY2VOb3RFbnRlcmVkIiwib25JbnZhbGlkUHJpY2UiLCIkY29udGVudExpc3RpbmdDb250YWluZXIiLCIkc2VhcmNoSGVhZGluZyIsIiRzZWFyY2hDb3VudCIsIiRjb250ZW50Q291bnQiLCJwcm9kdWN0c1BlclBhZ2UiLCJzZWFyY2hQcm9kdWN0c1BlclBhZ2UiLCJyZXF1ZXN0T3B0aW9ucyIsInRlbXBsYXRlIiwicHJvZHVjdExpc3RpbmciLCJjb250ZW50TGlzdGluZyIsInNpZGViYXIiLCJoZWFkaW5nIiwicHJvZHVjdENvdW50IiwiY29udGVudENvdW50IiwiY29uZmlnIiwicHJvZHVjdF9yZXN1bHRzIiwibGltaXQiLCJzaG93TW9yZSIsIkZhY2V0ZWRTZWFyY2giLCJjb250ZW50IiwiY3VzdG9tanMiLCJnZXRQcm9wZXJQcm9kdWN0Q291bnQiLCJnZXRSZXZpZXdzT25zZWFyY2giLCJtYWtlU2VsZWN0MkRyb3Bkb3ducyIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJ2YWxpZGF0aW9uRXJyb3JNZXNzYWdlcyIsIiRmb3JtIiwibm9kIiwic3VibWl0IiwidGFwIiwiYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSIsIiRlbGVtZW50IiwiYWRkIiwic2VsZWN0b3IiLCJ2YWxpZGF0ZSIsImVycm9yTWVzc2FnZSIsInBlcmZvcm1DaGVjayIsImFyZUFsbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXlDO0FBQ087QUFDMUI7QUFBQSxJQUVEQSxXQUFXO0VBQUE7RUFDNUIscUJBQVlDLE9BQU8sRUFBRTtJQUFBO0lBQ2pCLGdDQUFNQSxPQUFPLENBQUM7SUFFZEMsTUFBTSxDQUFDQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsWUFBTTtNQUMxQyxJQUFJQyxRQUFRLENBQUNDLGFBQWEsQ0FBQ0MsRUFBRSxLQUFLLE1BQU0sRUFBRTtRQUN0Q0osTUFBTSxDQUFDSyxZQUFZLENBQUNDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsVUFBVSxDQUFDO01BQzNEO0lBQ0osQ0FBQyxDQUFDO0lBQUM7RUFDUDtFQUFDO0VBQUEsT0FFREMsb0JBQW9CLEdBQXBCLGdDQUF1QjtJQUNuQixJQUFNQyxlQUFlLEdBQUdDLENBQUMsQ0FBQyxnQ0FBZ0MsQ0FBQztJQUUzRCxJQUFJVCxNQUFNLENBQUNLLFlBQVksQ0FBQ0ssT0FBTyxDQUFDLGNBQWMsQ0FBQyxFQUFFO01BQzdDRixlQUFlLENBQUNHLEtBQUssRUFBRTtNQUN2QlgsTUFBTSxDQUFDSyxZQUFZLENBQUNPLFVBQVUsQ0FBQyxjQUFjLENBQUM7SUFDbEQ7RUFDSixDQUFDO0VBQUEsT0FFREMsY0FBYyxHQUFkLHdCQUFlQyxLQUFLLEVBQUVDLGFBQWEsRUFBRTtJQUNqQyxJQUFNQyxHQUFHLEdBQUdDLDBDQUFHLENBQUNDLEtBQUssQ0FBQ2xCLE1BQU0sQ0FBQ21CLFFBQVEsQ0FBQ0MsSUFBSSxFQUFFLElBQUks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QUFlNEUsUUFBUSxFQUFFO0lBQ3JCLElBQUksSUFBSSxDQUFDOUUsU0FBUyxFQUFFO01BQ2hCLElBQUksQ0FBQ0EsU0FBUyxDQUFDK0UsR0FBRyxDQUFDO1FBQ2ZDLFFBQVEsRUFBRUYsUUFBUTtRQUNsQkcsUUFBUSxFQUFFLFVBQVU7UUFDcEJDLFlBQVksRUFBRUosUUFBUSxDQUFDNUgsSUFBSSxDQUFDLGNBQWM7TUFDOUMsQ0FBQyxDQUFDO0lBQ047SUFFQSxPQUFPLElBQUk7RUFDZixDQUFDO0VBQUEsT0FFRHVELEtBQUssR0FBTCxpQkFBUTtJQUNKLElBQUksSUFBSSxDQUFDVCxTQUFTLEVBQUU7TUFDaEIsSUFBSSxDQUFDQSxTQUFTLENBQUNtRixZQUFZLEVBQUU7TUFDN0IsT0FBTyxJQUFJLENBQUNuRixTQUFTLENBQUNvRixNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ3pDO0lBRUEsT0FBTyxLQUFLO0VBQ2hCLENBQUM7RUFBQTtBQUFBLEVBNVYrQmxOLGdEQUFXIiwiZmlsZSI6InRoZW1lLWJ1bmRsZS5jaHVuay42LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhZ2VNYW5hZ2VyIGZyb20gJy4vcGFnZS1tYW5hZ2VyJztcclxuaW1wb3J0IHVybFV0aWxzIGZyb20gJy4vY29tbW9uL3V0aWxzL3VybC11dGlscyc7XHJcbmltcG9ydCBVcmwgZnJvbSAndXJsJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhdGFsb2dQYWdlIGV4dGVuZHMgUGFnZU1hbmFnZXIge1xyXG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xyXG4gICAgICAgIHN1cGVyKGNvbnRleHQpO1xyXG5cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5pZCA9PT0gJ3NvcnQnKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3NvcnRCeVN0YXR1cycsICdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXJyYW5nZUZvY3VzT25Tb3J0QnkoKSB7XHJcbiAgICAgICAgY29uc3QgJHNvcnRCeVNlbGVjdG9yID0gJCgnW2RhdGEtc29ydC1ieT1cInByb2R1Y3RcIl0gI3NvcnQnKTtcclxuXHJcbiAgICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc29ydEJ5U3RhdHVzJykpIHtcclxuICAgICAgICAgICAgJHNvcnRCeVNlbGVjdG9yLmZvY3VzKCk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc29ydEJ5U3RhdHVzJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uU29ydEJ5U3VibWl0KGV2ZW50LCBjdXJyZW50VGFyZ2V0KSB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gVXJsLnBhcnNlKHdpbmRvdy5sb2NhdGlvbi5ocmVmLCB0cnVlKTtcclxuICAgICAgICBjb25zdCBxdWVyeVBhcmFtcyA9ICQoY3VycmVudFRhcmdldCkuc2VyaWFsaXplKCkuc3BsaXQoJz0nKTtcclxuXHJcbiAgICAgICAgdXJsLnF1ZXJ5W3F1ZXJ5UGFyYW1zWzBdXSA9IHF1ZXJ5UGFyYW1zWzFdO1xyXG4gICAgICAgIGRlbGV0ZSB1cmwucXVlcnkucGFnZTtcclxuXHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSBVcmwuZm9ybWF0KHsgcGF0aG5hbWU6IHVybC5wYXRobmFtZSwgc2VhcmNoOiB1cmxVdGlscy5idWlsZFF1ZXJ5U3RyaW5nKHVybC5xdWVyeSkgfSk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgc2hvd0FsZXJ0TW9kYWwgfSBmcm9tICcuL21vZGFsJztcclxuXHJcbmZ1bmN0aW9uIGRlY3JlbWVudENvdW50ZXIoY291bnRlciwgaXRlbSkge1xyXG4gICAgY29uc3QgaW5kZXggPSBjb3VudGVyLmluZGV4T2YoaXRlbSk7XHJcblxyXG4gICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICBjb3VudGVyLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluY3JlbWVudENvdW50ZXIoY291bnRlciwgaXRlbSkge1xyXG4gICAgY291bnRlci5wdXNoKGl0ZW0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVDb3VudGVyTmF2KGNvdW50ZXIsICRsaW5rLCB1cmxzKSB7ICAgIFxyXG4gICAgaWYgKGNvdW50ZXIubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgaWYgKCEkbGluay5pcygndmlzaWJsZScpKSB7XHJcbiAgICAgICAgICAgICRsaW5rLmFkZENsYXNzKCdzaG93Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICRsaW5rLmF0dHIoJ2hyZWYnLCBgJHt1cmxzLmNvbXBhcmV9LyR7Y291bnRlci5qb2luKCcvJyl9YCk7XHJcbiAgICAgICAgJGxpbmsuZmluZCgnc3Bhbi5jb3VudFBpbGwnKS5odG1sKChjb3VudGVyLmxlbmd0aCkpOyAgICAgICAgXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICRsaW5rLmF0dHIoJ2hyZWYnLCBgJHt1cmxzLmNvbXBhcmV9YCk7XHJcbiAgICAgICAgJGxpbmsuZmluZCgnc3Bhbi5jb3VudFBpbGwnKS5odG1sKChjb3VudGVyLmxlbmd0aCkpOyAgICAgICAgXHJcbiAgICAgICAgJGxpbmsucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHsgbm9Db21wYXJlTWVzc2FnZSwgY29tcGFyZUxpbWl0TWVzc2FnZSwgdXJscyB9KSB7XHJcbiAgICBsZXQgY29tcGFyZUNvdW50ZXIgPSBbXTtcclxuXHJcbiAgICBjb25zdCAkY29tcGFyZUxpbmsgPSAkKCdhW2RhdGEtY29tcGFyZS1uYXZdJyk7XHJcblxyXG4gICAgJCgnYm9keScpLm9uKCdjb21wYXJlUmVzZXQnLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgJGNoZWNrZWQgPSAkKCdib2R5JykuZmluZCgnaW5wdXRbbmFtZT1cInByb2R1Y3RzXFxbXFxdXCJdOmNoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgY29tcGFyZUNvdW50ZXIgPSAkY2hlY2tlZC5sZW5ndGggPyAkY2hlY2tlZC5tYXAoKGluZGV4LCBlbGVtZW50KSA9PiBlbGVtZW50LnZhbHVlKS5nZXQoKSA6IFtdO1xyXG4gICAgICAgIHVwZGF0ZUNvdW50ZXJOYXYoY29tcGFyZUNvdW50ZXIsICRjb21wYXJlTGluaywgdXJscyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCdib2R5JykudHJpZ2dlckhhbmRsZXIoJ2NvbXBhcmVSZXNldCcpO1xyXG5cclxuICAgICQoJ2JvZHknKS5vbignY2xpY2snLCAnW2RhdGEtY29tcGFyZS1pZF0nLCBldmVudCA9PiB7XHJcbiAgICAgICAgY29uc3QgcHJvZHVjdCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWU7XHJcbiAgICAgICAgY29uc3QgJGNsaWNrZWRDb21wYXJlTGluayA9ICQoJ2FbZGF0YS1jb21wYXJlLW5hdl0nKTtcclxuXHJcbiAgICAgICAgaWYgKGV2ZW50LmN1cnJlbnRUYXJnZXQuY2hlY2tlZCkgeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihjb21wYXJlQ291bnRlci5sZW5ndGggPiAzKXsgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHNob3dBbGVydE1vZGFsKGNvbXBhcmVMaW1pdE1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaW5jcmVtZW50Q291bnRlcihjb21wYXJlQ291bnRlciwgcHJvZHVjdCk7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkZWNyZW1lbnRDb3VudGVyKGNvbXBhcmVDb3VudGVyLCBwcm9kdWN0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHVwZGF0ZUNvdW50ZXJOYXYoY29tcGFyZUNvdW50ZXIsICRjbGlja2VkQ29tcGFyZUxpbmssIHVybHMpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnYm9keScpLm9uKCdzdWJtaXQnLCAnW2RhdGEtcHJvZHVjdC1jb21wYXJlXScsIGV2ZW50ID0+IHtcclxuICAgICAgICBjb25zdCAkdGhpcyA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XHJcbiAgICAgICAgY29uc3QgcHJvZHVjdHNUb0NvbXBhcmUgPSAkdGhpcy5maW5kKCdpbnB1dFtuYW1lPVwicHJvZHVjdHNcXFtcXF1cIl06Y2hlY2tlZCcpO1xyXG5cclxuICAgICAgICBpZiAocHJvZHVjdHNUb0NvbXBhcmUubGVuZ3RoIDw9IDEpIHtcclxuICAgICAgICAgICAgc2hvd0FsZXJ0TW9kYWwobm9Db21wYXJlTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICdhW2RhdGEtY29tcGFyZS1uYXZdJywgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0ICRjbGlja2VkQ2hlY2tlZElucHV0ID0gJCgnYm9keScpLmZpbmQoJ2lucHV0W25hbWU9XCJwcm9kdWN0c1xcW1xcXVwiXTpjaGVja2VkJyk7XHJcblxyXG4gICAgICAgIGlmICgkY2xpY2tlZENoZWNrZWRJbnB1dC5sZW5ndGggPD0gMSkge1xyXG4gICAgICAgICAgICBzaG93QWxlcnRNb2RhbChub0NvbXBhcmVNZXNzYWdlKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbiIsImltcG9ydCB7IGhvb2tzIH0gZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xyXG5pbXBvcnQgQ2F0YWxvZ1BhZ2UgZnJvbSAnLi9jYXRhbG9nJztcclxuaW1wb3J0IEZhY2V0ZWRTZWFyY2ggZnJvbSAnLi9jb21tb24vZmFjZXRlZC1zZWFyY2gnO1xyXG5pbXBvcnQgeyBhbm5vdW5jZUlucHV0RXJyb3JNZXNzYWdlIH0gZnJvbSAnLi9jb21tb24vdXRpbHMvZm9ybS11dGlscyc7XHJcbmltcG9ydCBjb21wYXJlUHJvZHVjdHMgZnJvbSAnLi9nbG9iYWwvY29tcGFyZS1wcm9kdWN0cyc7XHJcbmltcG9ydCB1cmxVdGlscyBmcm9tICcuL2NvbW1vbi91dGlscy91cmwtdXRpbHMnO1xyXG5pbXBvcnQgVXJsIGZyb20gJ3VybCc7XHJcbmltcG9ydCBjb2xsYXBzaWJsZUZhY3RvcnkgZnJvbSAnLi9jb21tb24vY29sbGFwc2libGUnO1xyXG5pbXBvcnQgJ2pzdHJlZSc7XHJcbmltcG9ydCBub2QgZnJvbSAnLi9jb21tb24vbm9kJztcclxuaW1wb3J0IGN1c3RvbWpzIGZyb20gJy4vZGgtY3VzdG9tL2N1c3RvbSc7XHJcblxyXG5jb25zdCBsZWZ0QXJyb3dLZXkgPSAzNztcclxuY29uc3QgcmlnaHRBcnJvd0tleSA9IDM5O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VhcmNoIGV4dGVuZHMgQ2F0YWxvZ1BhZ2Uge1xyXG4gICAgZm9ybWF0Q2F0ZWdvcnlUcmVlRm9ySlNUcmVlKG5vZGUpIHtcclxuICAgICAgICBjb25zdCBub2RlRGF0YSA9IHtcclxuICAgICAgICAgICAgdGV4dDogbm9kZS5kYXRhLFxyXG4gICAgICAgICAgICBpZDogbm9kZS5tZXRhZGF0YS5pZCxcclxuICAgICAgICAgICAgc3RhdGU6IHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBub2RlLnNlbGVjdGVkLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmIChub2RlLnN0YXRlKSB7XHJcbiAgICAgICAgICAgIG5vZGVEYXRhLnN0YXRlLm9wZW5lZCA9IG5vZGUuc3RhdGUgPT09ICdvcGVuJztcclxuICAgICAgICAgICAgbm9kZURhdGEuY2hpbGRyZW4gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgbm9kZURhdGEuY2hpbGRyZW4gPSBbXTtcclxuICAgICAgICAgICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZE5vZGUpID0+IHtcclxuICAgICAgICAgICAgICAgIG5vZGVEYXRhLmNoaWxkcmVuLnB1c2godGhpcy5mb3JtYXRDYXRlZ29yeVRyZWVGb3JKU1RyZWUoY2hpbGROb2RlKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5vZGVEYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dQcm9kdWN0cyhuYXZpZ2F0ZSA9IHRydWUpIHtcclxuICAgICAgICB0aGlzLiRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lci5yZW1vdmVDbGFzcygndS1oaWRkZW4nKTtcclxuICAgICAgICB0aGlzLiRmYWNldGVkU2VhcmNoQ29udGFpbmVyLnJlbW92ZUNsYXNzKCd1LWhpZGRlbicpO1xyXG4gICAgICAgIHRoaXMuJGNvbnRlbnRSZXN1bHRzQ29udGFpbmVyLmFkZENsYXNzKCd1LWhpZGRlbicpO1xyXG5cclxuICAgICAgICAkKCdbZGF0YS1jb250ZW50LXJlc3VsdHMtdG9nZ2xlXScpLnJlbW92ZUNsYXNzKCduYXZCYXItYWN0aW9uLWNvbG9yLS1hY3RpdmUnKTtcclxuICAgICAgICAkKCdbZGF0YS1jb250ZW50LXJlc3VsdHMtdG9nZ2xlXScpLmFkZENsYXNzKCduYXZCYXItYWN0aW9uJyk7XHJcblxyXG4gICAgICAgICQoJ1tkYXRhLXByb2R1Y3QtcmVzdWx0cy10b2dnbGVdJykucmVtb3ZlQ2xhc3MoJ25hdkJhci1hY3Rpb24nKTtcclxuICAgICAgICAkKCdbZGF0YS1wcm9kdWN0LXJlc3VsdHMtdG9nZ2xlXScpLmFkZENsYXNzKCduYXZCYXItYWN0aW9uLWNvbG9yLS1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgdGhpcy5hY3RpdmF0ZVRhYigkKCdbZGF0YS1wcm9kdWN0LXJlc3VsdHMtdG9nZ2xlXScpKTtcclxuXHJcbiAgICAgICAgaWYgKCFuYXZpZ2F0ZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzZWFyY2hEYXRhID0gJCgnI3NlYXJjaC1yZXN1bHRzLXByb2R1Y3QtY291bnQgc3BhbicpLmRhdGEoKTtcclxuICAgICAgICBjb25zdCB1cmwgPSAoc2VhcmNoRGF0YS5jb3VudCA+IDApID8gc2VhcmNoRGF0YS51cmwgOiB1cmxVdGlscy5yZXBsYWNlUGFyYW1zKHNlYXJjaERhdGEudXJsLCB7XHJcbiAgICAgICAgICAgIHBhZ2U6IDEsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHVybFV0aWxzLmdvVG9VcmwodXJsKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93Q29udGVudChuYXZpZ2F0ZSA9IHRydWUpIHtcclxuICAgICAgICB0aGlzLiRjb250ZW50UmVzdWx0c0NvbnRhaW5lci5yZW1vdmVDbGFzcygndS1oaWRkZW4nKTtcclxuICAgICAgICB0aGlzLiRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lci5hZGRDbGFzcygndS1oaWRkZW4nKTtcclxuICAgICAgICB0aGlzLiRmYWNldGVkU2VhcmNoQ29udGFpbmVyLmFkZENsYXNzKCd1LWhpZGRlbicpO1xyXG5cclxuICAgICAgICAkKCdbZGF0YS1wcm9kdWN0LXJlc3VsdHMtdG9nZ2xlXScpLnJlbW92ZUNsYXNzKCduYXZCYXItYWN0aW9uLWNvbG9yLS1hY3RpdmUnKTtcclxuICAgICAgICAkKCdbZGF0YS1wcm9kdWN0LXJlc3VsdHMtdG9nZ2xlXScpLmFkZENsYXNzKCduYXZCYXItYWN0aW9uJyk7XHJcblxyXG4gICAgICAgICQoJ1tkYXRhLWNvbnRlbnQtcmVzdWx0cy10b2dnbGVdJykucmVtb3ZlQ2xhc3MoJ25hdkJhci1hY3Rpb24nKTtcclxuICAgICAgICAkKCdbZGF0YS1jb250ZW50LXJlc3VsdHMtdG9nZ2xlXScpLmFkZENsYXNzKCduYXZCYXItYWN0aW9uLWNvbG9yLS1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgdGhpcy5hY3RpdmF0ZVRhYigkKCdbZGF0YS1jb250ZW50LXJlc3VsdHMtdG9nZ2xlXScpKTtcclxuXHJcbiAgICAgICAgaWYgKCFuYXZpZ2F0ZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzZWFyY2hEYXRhID0gJCgnI3NlYXJjaC1yZXN1bHRzLWNvbnRlbnQtY291bnQgc3BhbicpLmRhdGEoKTtcclxuICAgICAgICBjb25zdCB1cmwgPSAoc2VhcmNoRGF0YS5jb3VudCA+IDApID8gc2VhcmNoRGF0YS51cmwgOiB1cmxVdGlscy5yZXBsYWNlUGFyYW1zKHNlYXJjaERhdGEudXJsLCB7XHJcbiAgICAgICAgICAgIHBhZ2U6IDEsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHVybFV0aWxzLmdvVG9VcmwodXJsKTtcclxuICAgIH1cclxuXHJcbiAgICBhY3RpdmF0ZVRhYigkdGFiVG9BY3RpdmF0ZSkge1xyXG4gICAgICAgIGNvbnN0ICR0YWJzQ29sbGVjdGlvbiA9ICQoJ1tkYXRhLXNlYXJjaC1wYWdlLXRhYnNdJykuZmluZCgnW3JvbGU9XCJ0YWJcIl0nKTtcclxuXHJcbiAgICAgICAgJHRhYnNDb2xsZWN0aW9uLmVhY2goKGlkeCwgdGFiKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0ICR0YWIgPSAkKHRhYik7XHJcblxyXG4gICAgICAgICAgICBpZiAoJHRhYi5pcygkdGFiVG9BY3RpdmF0ZSkpIHtcclxuICAgICAgICAgICAgICAgICR0YWIucmVtb3ZlQXR0cigndGFiaW5kZXgnKTtcclxuICAgICAgICAgICAgICAgICR0YWIuYXR0cignYXJpYS1zZWxlY3RlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkdGFiLmF0dHIoJ3RhYmluZGV4JywgJy0xJyk7XHJcbiAgICAgICAgICAgICR0YWIuYXR0cignYXJpYS1zZWxlY3RlZCcsIGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvblRhYkNoYW5nZVdpdGhBcnJvd3MoZXZlbnQpIHtcclxuICAgICAgICBjb25zdCBldmVudEtleSA9IGV2ZW50LndoaWNoO1xyXG4gICAgICAgIGNvbnN0IGlzTGVmdE9yUmlnaHRBcnJvd0tleWRvd24gPSBldmVudEtleSA9PT0gbGVmdEFycm93S2V5XHJcbiAgICAgICAgICAgIHx8IGV2ZW50S2V5ID09PSByaWdodEFycm93S2V5O1xyXG4gICAgICAgIGlmICghaXNMZWZ0T3JSaWdodEFycm93S2V5ZG93bikgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCAkdGFic0NvbGxlY3Rpb24gPSAkKCdbZGF0YS1zZWFyY2gtcGFnZS10YWJzXScpLmZpbmQoJ1tyb2xlPVwidGFiXCJdJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGlzQWN0aXZlRWxlbWVudE5vdFRhYiA9ICR0YWJzQ29sbGVjdGlvbi5pbmRleCgkKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpKSA9PT0gLTE7XHJcbiAgICAgICAgaWYgKGlzQWN0aXZlRWxlbWVudE5vdFRhYikgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCAkYWN0aXZlVGFiID0gJChgIyR7ZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5pZH1gKTtcclxuICAgICAgICBjb25zdCBhY3RpdmVUYWJJZHggPSAkdGFic0NvbGxlY3Rpb24uaW5kZXgoJGFjdGl2ZVRhYik7XHJcbiAgICAgICAgY29uc3QgbGFzdFRhYklkeCA9ICR0YWJzQ29sbGVjdGlvbi5sZW5ndGggLSAxO1xyXG5cclxuICAgICAgICBsZXQgbmV4dFRhYklkeDtcclxuICAgICAgICBzd2l0Y2ggKGV2ZW50S2V5KSB7XHJcbiAgICAgICAgY2FzZSBsZWZ0QXJyb3dLZXk6XHJcbiAgICAgICAgICAgIG5leHRUYWJJZHggPSBhY3RpdmVUYWJJZHggPT09IDAgPyBsYXN0VGFiSWR4IDogYWN0aXZlVGFiSWR4IC0gMTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSByaWdodEFycm93S2V5OlxyXG4gICAgICAgICAgICBuZXh0VGFiSWR4ID0gYWN0aXZlVGFiSWR4ID09PSBsYXN0VGFiSWR4ID8gMCA6IGFjdGl2ZVRhYklkeCArIDE7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6IGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJCgkdGFic0NvbGxlY3Rpb24uZ2V0KG5leHRUYWJJZHgpKS5mb2N1cygpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25SZWFkeSgpIHtcclxuICAgICAgICBjb21wYXJlUHJvZHVjdHModGhpcy5jb250ZXh0KTtcclxuICAgICAgICB0aGlzLmFycmFuZ2VGb2N1c09uU29ydEJ5KCk7XHJcblxyXG4gICAgICAgIGNvbnN0ICRzZWFyY2hGb3JtID0gJCgnW2RhdGEtYWR2YW5jZWQtc2VhcmNoLWZvcm1dJyk7XHJcbiAgICAgICAgY29uc3QgJGNhdGVnb3J5VHJlZUNvbnRhaW5lciA9ICRzZWFyY2hGb3JtLmZpbmQoJ1tkYXRhLXNlYXJjaC1jYXRlZ29yeS10cmVlXScpO1xyXG4gICAgICAgIGNvbnN0IHVybCA9IFVybC5wYXJzZSh3aW5kb3cubG9jYXRpb24uaHJlZiwgdHJ1ZSk7XHJcbiAgICAgICAgY29uc3QgdHJlZURhdGEgPSBbXTtcclxuICAgICAgICB0aGlzLiRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lciA9ICQoJyNwcm9kdWN0LWxpc3RpbmctY29udGFpbmVyJyk7XHJcbiAgICAgICAgdGhpcy4kZmFjZXRlZFNlYXJjaENvbnRhaW5lciA9ICQoJyNmYWNldGVkLXNlYXJjaC1jb250YWluZXInKTtcclxuICAgICAgICB0aGlzLiRjb250ZW50UmVzdWx0c0NvbnRhaW5lciA9ICQoJyNzZWFyY2gtcmVzdWx0cy1jb250ZW50Jyk7XHJcblxyXG4gICAgICAgIC8vIEluaXQgZmFjZXRlZCBzZWFyY2hcclxuICAgICAgICBpZiAoJCgnI2ZhY2V0ZWRTZWFyY2gnKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdEZhY2V0ZWRTZWFyY2goKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm9uU29ydEJ5U3VibWl0ID0gdGhpcy5vblNvcnRCeVN1Ym1pdC5iaW5kKHRoaXMpO1xyXG4gICAgICAgICAgICBob29rcy5vbignc29ydEJ5LXN1Ym1pdHRlZCcsIHRoaXMub25Tb3J0QnlTdWJtaXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSW5pdCBjb2xsYXBzaWJsZXNcclxuICAgICAgICBjb2xsYXBzaWJsZUZhY3RvcnkoKTtcclxuXHJcbiAgICAgICAgJCgnW2RhdGEtcHJvZHVjdC1yZXN1bHRzLXRvZ2dsZV0nKS5vbignY2xpY2snLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1Byb2R1Y3RzKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoJ1tkYXRhLWNvbnRlbnQtcmVzdWx0cy10b2dnbGVdJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dDb250ZW50KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoJ1tkYXRhLXNlYXJjaC1wYWdlLXRhYnNdJykub24oJ2tleXVwJywgdGhpcy5vblRhYkNoYW5nZVdpdGhBcnJvd3MpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy4kcHJvZHVjdExpc3RpbmdDb250YWluZXIuZmluZCgnbGkucHJvZHVjdCcpLmxlbmd0aCA9PT0gMCB8fCB1cmwucXVlcnkuc2VjdGlvbiA9PT0gJ2NvbnRlbnQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0NvbnRlbnQoZmFsc2UpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1Byb2R1Y3RzKGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHZhbGlkYXRvciA9IHRoaXMuaW5pdFZhbGlkYXRpb24oJHNlYXJjaEZvcm0pXHJcbiAgICAgICAgICAgIC5iaW5kVmFsaWRhdGlvbigkc2VhcmNoRm9ybS5maW5kKCcjc2VhcmNoX3F1ZXJ5X2FkdicpKTtcclxuXHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmNhdGVnb3J5VHJlZS5mb3JFYWNoKChub2RlKSA9PiB7XHJcbiAgICAgICAgICAgIHRyZWVEYXRhLnB1c2godGhpcy5mb3JtYXRDYXRlZ29yeVRyZWVGb3JKU1RyZWUobm9kZSkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmNhdGVnb3J5VHJlZURhdGEgPSB0cmVlRGF0YTtcclxuICAgICAgICB0aGlzLmNyZWF0ZUNhdGVnb3J5VHJlZSgkY2F0ZWdvcnlUcmVlQ29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgJHNlYXJjaEZvcm0ub24oJ3N1Ym1pdCcsIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRDYXRlZ29yeUlkcyA9ICRjYXRlZ29yeVRyZWVDb250YWluZXIuanN0cmVlKCkuZ2V0X3NlbGVjdGVkKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXZhbGlkYXRvci5jaGVjaygpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJHNlYXJjaEZvcm0uZmluZCgnaW5wdXRbbmFtZT1cImNhdGVnb3J5XFxbXFxdXCJdJykucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNhdGVnb3J5SWQgb2Ygc2VsZWN0ZWRDYXRlZ29yeUlkcykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5wdXQgPSAkKCc8aW5wdXQ+Jywge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdoaWRkZW4nLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdjYXRlZ29yeVtdJyxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogY2F0ZWdvcnlJZCxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICRzZWFyY2hGb3JtLmFwcGVuZChpbnB1dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgJHNlYXJjaFJlc3VsdHNNZXNzYWdlID0gJChgPHBcclxuICAgICAgICAgICAgY2xhc3M9XCJhcmlhLWRlc2NyaXB0aW9uLS1oaWRkZW5cIlxyXG4gICAgICAgICAgICB0YWJpbmRleD1cIi0xXCJcclxuICAgICAgICAgICAgcm9sZT1cInN0YXR1c1wiXHJcbiAgICAgICAgICAgIGFyaWEtbGl2ZT1cInBvbGl0ZVwiXHJcbiAgICAgICAgICAgID4ke3RoaXMuY29udGV4dC5zZWFyY2hSZXN1bHRzQ291bnR9PC9wPmApXHJcbiAgICAgICAgICAgIC5wcmVwZW5kVG8oJ2JvZHknKTtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiAkc2VhcmNoUmVzdWx0c01lc3NhZ2UuZm9jdXMoKSwgMTAwKTtcclxuXHJcbiAgICAgICAgJChkb2N1bWVudCkub24oXCJzZWxlY3QyOnNlbGVjdFwiLFwiLmZpbHRlci13cmFwIC5mb3JtLXNlbGVjdFwiLChlKT0+eyAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5mYWNldGVkU2VhcmNoLm9uU29ydEJ5U3VibWl0KGUsZS5jdXJyZW50VGFyZ2V0KTsgICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkVHJlZU5vZGVzKG5vZGUsIGNiKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiAnL3JlbW90ZS92MS9jYXRlZ29yeS10cmVlJyxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDYXRlZ29yeUlkOiBub2RlLmlkLFxyXG4gICAgICAgICAgICAgICAgcHJlZml4OiAnY2F0ZWdvcnknLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAneC14c3JmLXRva2VuJzogd2luZG93LkJDRGF0YSAmJiB3aW5kb3cuQkNEYXRhLmNzcmZfdG9rZW4gPyB3aW5kb3cuQkNEYXRhLmNzcmZfdG9rZW4gOiAnJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KS5kb25lKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWRSZXN1bHRzID0gW107XHJcblxyXG4gICAgICAgICAgICBkYXRhLmZvckVhY2goKGRhdGFOb2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZWRSZXN1bHRzLnB1c2godGhpcy5mb3JtYXRDYXRlZ29yeVRyZWVGb3JKU1RyZWUoZGF0YU5vZGUpKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjYihmb3JtYXR0ZWRSZXN1bHRzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVDYXRlZ29yeVRyZWUoJGNvbnRhaW5lcikge1xyXG4gICAgICAgIGNvbnN0IHRyZWVPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBjb3JlOiB7XHJcbiAgICAgICAgICAgICAgICBkYXRhOiAobm9kZSwgY2IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBSb290IG5vZGVcclxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5pZCA9PT0gJyMnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNiKHRoaXMuY2F0ZWdvcnlUcmVlRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTGF6eSBsb2FkZWQgY2hpbGRyZW5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkVHJlZU5vZGVzKG5vZGUsIGNiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdGhlbWVzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbnM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjaGVja2JveDoge1xyXG4gICAgICAgICAgICAgICAgdGhyZWVfc3RhdGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgICAgICAgICAnY2hlY2tib3gnLFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRjb250YWluZXIuanN0cmVlKHRyZWVPcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0RmFjZXRlZFNlYXJjaCgpIHtcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgb2JqZWN0LWN1cmx5LW5ld2xpbmVcclxuICAgICAgICBjb25zdCB7IG9uTWluUHJpY2VFcnJvciwgb25NYXhQcmljZUVycm9yLCBtaW5QcmljZU5vdEVudGVyZWQsIG1heFByaWNlTm90RW50ZXJlZCwgb25JbnZhbGlkUHJpY2UgfSA9IHRoaXMuY29udGV4dDtcclxuICAgICAgICBjb25zdCAkcHJvZHVjdExpc3RpbmdDb250YWluZXIgPSAkKCcjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lcicpO1xyXG4gICAgICAgIGNvbnN0ICRjb250ZW50TGlzdGluZ0NvbnRhaW5lciA9ICQoJyNzZWFyY2gtcmVzdWx0cy1jb250ZW50Jyk7XHJcbiAgICAgICAgY29uc3QgJGZhY2V0ZWRTZWFyY2hDb250YWluZXIgPSAkKCcjZmFjZXRlZC1zZWFyY2gtY29udGFpbmVyJyk7XHJcbiAgICAgICAgY29uc3QgJHNlYXJjaEhlYWRpbmcgPSAkKCcjc2VhcmNoLXJlc3VsdHMtaGVhZGluZycpO1xyXG4gICAgICAgIGNvbnN0ICRzZWFyY2hDb3VudCA9ICQoJyNzZWFyY2gtcmVzdWx0cy1wcm9kdWN0LWNvdW50Jyk7XHJcbiAgICAgICAgY29uc3QgJGNvbnRlbnRDb3VudCA9ICQoJyNzZWFyY2gtcmVzdWx0cy1jb250ZW50LWNvdW50Jyk7XHJcbiAgICAgICAgY29uc3QgcHJvZHVjdHNQZXJQYWdlID0gdGhpcy5jb250ZXh0LnNlYXJjaFByb2R1Y3RzUGVyUGFnZTtcclxuICAgICAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgdGVtcGxhdGU6IHtcclxuICAgICAgICAgICAgICAgIHByb2R1Y3RMaXN0aW5nOiAnc2VhcmNoL3Byb2R1Y3QtbGlzdGluZycsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50TGlzdGluZzogJ3NlYXJjaC9jb250ZW50LWxpc3RpbmcnLFxyXG4gICAgICAgICAgICAgICAgc2lkZWJhcjogJ3NlYXJjaC9zaWRlYmFyJyxcclxuICAgICAgICAgICAgICAgIGhlYWRpbmc6ICdzZWFyY2gvaGVhZGluZycsXHJcbiAgICAgICAgICAgICAgICBwcm9kdWN0Q291bnQ6ICdzZWFyY2gvcHJvZHVjdC1jb3VudCcsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50Q291bnQ6ICdzZWFyY2gvY29udGVudC1jb3VudCcsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNvbmZpZzoge1xyXG4gICAgICAgICAgICAgICAgcHJvZHVjdF9yZXN1bHRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGltaXQ6IHByb2R1Y3RzUGVyUGFnZSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNob3dNb3JlOiAnc2VhcmNoL3Nob3ctbW9yZScsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5mYWNldGVkU2VhcmNoID0gbmV3IEZhY2V0ZWRTZWFyY2gocmVxdWVzdE9wdGlvbnMsIChjb250ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICRzZWFyY2hIZWFkaW5nLmh0bWwoY29udGVudC5oZWFkaW5nKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IFVybC5wYXJzZSh3aW5kb3cubG9jYXRpb24uaHJlZiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGlmICh1cmwucXVlcnkuc2VjdGlvbiA9PT0gJ2NvbnRlbnQnKSB7XHJcbiAgICAgICAgICAgICAgICAkY29udGVudExpc3RpbmdDb250YWluZXIuaHRtbChjb250ZW50LmNvbnRlbnRMaXN0aW5nKTtcclxuICAgICAgICAgICAgICAgICRjb250ZW50Q291bnQuaHRtbChjb250ZW50LmNvbnRlbnRDb3VudCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dDb250ZW50KGZhbHNlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lci5odG1sKGNvbnRlbnQucHJvZHVjdExpc3RpbmcpO1xyXG4gICAgICAgICAgICAgICAgJGZhY2V0ZWRTZWFyY2hDb250YWluZXIuaHRtbChjb250ZW50LnNpZGViYXIpO1xyXG4gICAgICAgICAgICAgICAgJHNlYXJjaENvdW50Lmh0bWwoY29udGVudC5wcm9kdWN0Q291bnQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UHJvZHVjdHMoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkKCdib2R5JykudHJpZ2dlckhhbmRsZXIoJ2NvbXBhcmVSZXNldCcpO1xyXG5cclxuICAgICAgICAgICAgY3VzdG9tanMuZ2V0UHJvcGVyUHJvZHVjdENvdW50KCk7XHJcblxyXG4gICAgICAgICAgICBjdXN0b21qcy5nZXRSZXZpZXdzT25zZWFyY2goXCJzZWFyY2hcIik7XHJcblxyXG4gICAgICAgICAgICBjdXN0b21qcy5tYWtlU2VsZWN0MkRyb3Bkb3ducyhcIi5mb3JtLXNlbGVjdFwiKTsgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMCxcclxuICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIHZhbGlkYXRpb25FcnJvck1lc3NhZ2VzOiB7XHJcbiAgICAgICAgICAgICAgICBvbk1pblByaWNlRXJyb3IsXHJcbiAgICAgICAgICAgICAgICBvbk1heFByaWNlRXJyb3IsXHJcbiAgICAgICAgICAgICAgICBtaW5QcmljZU5vdEVudGVyZWQsXHJcbiAgICAgICAgICAgICAgICBtYXhQcmljZU5vdEVudGVyZWQsXHJcbiAgICAgICAgICAgICAgICBvbkludmFsaWRQcmljZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0VmFsaWRhdGlvbigkZm9ybSkge1xyXG4gICAgICAgIHRoaXMuJGZvcm0gPSAkZm9ybTtcclxuICAgICAgICB0aGlzLnZhbGlkYXRvciA9IG5vZCh7XHJcbiAgICAgICAgICAgIHN1Ym1pdDogJGZvcm0sXHJcbiAgICAgICAgICAgIHRhcDogYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZFZhbGlkYXRpb24oJGVsZW1lbnQpIHtcclxuICAgICAgICBpZiAodGhpcy52YWxpZGF0b3IpIHtcclxuICAgICAgICAgICAgdGhpcy52YWxpZGF0b3IuYWRkKHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAkZWxlbWVudCxcclxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAncHJlc2VuY2UnLFxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiAkZWxlbWVudC5kYXRhKCdlcnJvck1lc3NhZ2UnKSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBjaGVjaygpIHtcclxuICAgICAgICBpZiAodGhpcy52YWxpZGF0b3IpIHtcclxuICAgICAgICAgICAgdGhpcy52YWxpZGF0b3IucGVyZm9ybUNoZWNrKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRvci5hcmVBbGwoJ3ZhbGlkJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==