(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ "./assets/js/theme/auth.js":
/*!*********************************!*\
  !*** ./assets/js/theme/auth.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Auth; });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_state_country__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/state-country */ "./assets/js/theme/common/state-country.js");
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _common_form_validation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/form-validation */ "./assets/js/theme/common/form-validation.js");
/* harmony import */ var _common_models_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/models/forms */ "./assets/js/theme/common/models/forms.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var Auth = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Auth, _PageManager);
  function Auth(context) {
    var _this;
    _this = _PageManager.call(this, context) || this;
    _this.validationDictionary = Object(_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_6__["createTranslationDictionary"])(context);
    _this.formCreateSelector = 'form[data-create-account-form]';
    _this.recaptcha = $('.g-recaptcha iframe[src]');
    return _this;
  }
  var _proto = Auth.prototype;
  _proto.registerLoginValidation = function registerLoginValidation($loginForm) {
    var _this2 = this;
    var loginModel = _common_models_forms__WEBPACK_IMPORTED_MODULE_4__["default"];
    this.loginValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_2__["default"])({
      submit: '.login-form input[type="submit"]',
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__["announceInputErrorMessage"]
    });
    this.loginValidator.add([{
      selector: '.login-form input[name="login_email"]',
      validate: function validate(cb, val) {
        var result = loginModel.email(val);
        cb(result);
      },
      errorMessage: this.context.useValidEmail
    }, {
      selector: '.login-form input[name="login_pass"]',
      validate: function validate(cb, val) {
        var result = loginModel.password(val);
        cb(result);
      },
      errorMessage: this.context.enterPass
    }]);
    $loginForm.on('submit', function (event) {
      _this2.loginValidator.performCheck();
      if (_this2.loginValidator.areAll('valid')) {
        return;
      }
      event.preventDefault();
    });
  };
  _proto.registerForgotPasswordValidation = function registerForgotPasswordValidation($forgotPasswordForm) {
    var _this3 = this;
    this.forgotPasswordValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_2__["default"])({
      submit: '.forgot-password-form input[type="submit"]',
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__["announceInputErrorMessage"]
    });
    this.forgotPasswordValidator.add([{
      selector: '.forgot-password-form input[name="email"]',
      validate: function validate(cb, val) {
        var result = _common_models_forms__WEBPACK_IMPORTED_MODULE_4__["default"].email(val);
        cb(result);
      },
      errorMessage: this.context.useValidEmail
    }]);
    $forgotPasswordForm.on('submit', function (event) {
      _this3.forgotPasswordValidator.performCheck();
      if (_this3.forgotPasswordValidator.areAll('valid')) {
        return;
      }
      event.preventDefault();
    });
  };
  _proto.registerNewPasswordValidation = function registerNewPasswordValidation() {
    var _this$validationDicti = this.validationDictionary,
      enterPassword = _this$validationDicti.password,
      matchPassword = _this$validationDicti.password_match,
      invalidPassword = _this$validationDicti.invalid_password;
    var newPasswordForm = '.new-password-form';
    var newPasswordValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_2__["default"])({
      submit: $(newPasswordForm + " input[type=\"submit\"]"),
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__["announceInputErrorMessage"]
    });
    var passwordSelector = $(newPasswordForm + " input[name=\"password\"]");
    var password2Selector = $(newPasswordForm + " input[name=\"password_confirm\"]");
    var errorTextMessages = Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__["createPasswordValidationErrorTextObject"])(enterPassword, enterPassword, matchPassword, invalidPassword);
    _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__["Validators"].setPasswordValidation(newPasswordValidator, passwordSelector, password2Selector, this.passwordRequirements, errorTextMessages);
  };
  _proto.registerCreateAccountValidator = function registerCreateAccountValidator($createAccountForm) {
    var _this4 = this;
    var validationModel = Object(_common_form_validation__WEBPACK_IMPORTED_MODULE_3__["default"])($createAccountForm, this.context);
    var createAccountValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_2__["default"])({
      submit: this.formCreateSelector + " input[type='submit']",
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__["announceInputErrorMessage"]
    });
    var $stateElement = $('[data-field-type="State"]');
    var emailSelector = this.formCreateSelector + " [data-field-type='EmailAddress']";
    var $emailElement = $(emailSelector);
    var passwordSelector = this.formCreateSelector + " [data-field-type='Password']";
    var $passwordElement = $(passwordSelector);
    var password2Selector = this.formCreateSelector + " [data-field-type='ConfirmPassword']";
    var $password2Element = $(password2Selector);
    createAccountValidator.add(validationModel);
    if ($stateElement) {
      var $last;

      // Requests the states for a country with AJAX
      Object(_common_state_country__WEBPACK_IMPORTED_MODULE_1__["default"])($stateElement, this.context, function (err, field) {
        if (err) {
          throw new Error(err);
        }
        var $field = $(field);
        if (createAccountValidator.getStatus($stateElement) !== 'undefined') {
          createAccountValidator.remove($stateElement);
        }
        if ($last) {
          createAccountValidator.remove($last);
        }
        if ($field.is('select')) {
          $last = field;
          _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__["Validators"].setStateCountryValidation(createAccountValidator, field, _this4.validationDictionary.field_not_blank);
        } else {
          _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__["Validators"].cleanUpStateValidation(field);
        }
      });
    }
    if ($emailElement) {
      createAccountValidator.remove(emailSelector);
      _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__["Validators"].setEmailValidation(createAccountValidator, emailSelector, this.validationDictionary.valid_email);
    }
    if ($passwordElement && $password2Element) {
      var _this$validationDicti2 = this.validationDictionary,
        enterPassword = _this$validationDicti2.password,
        matchPassword = _this$validationDicti2.password_match,
        invalidPassword = _this$validationDicti2.invalid_password;
      createAccountValidator.remove(passwordSelector);
      createAccountValidator.remove(password2Selector);
      _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__["Validators"].setPasswordValidation(createAccountValidator, passwordSelector, password2Selector, this.passwordRequirements, Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__["createPasswordValidationErrorTextObject"])(enterPassword, enterPassword, matchPassword, invalidPassword));
    }
    $createAccountForm.on('submit', function (event) {
      createAccountValidator.performCheck();
      if (createAccountValidator.areAll('valid')) {
        return;
      }
      event.preventDefault();
    });
  }

  /**
   * Request is made in this function to the remote endpoint and pulls back the states for country.
   */;
  _proto.onReady = function onReady() {
    if (!this.recaptcha.attr('title')) {
      this.recaptcha.attr('title', this.context.recaptchaTitle);
    }
    var $createAccountForm = Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__["classifyForm"])(this.formCreateSelector);
    var $loginForm = Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__["classifyForm"])('.login-form');
    var $forgotPasswordForm = Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__["classifyForm"])('.forgot-password-form');
    var $newPasswordForm = Object(_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__["classifyForm"])('.new-password-form'); // reset password

    // Injected via auth.html
    this.passwordRequirements = this.context.passwordRequirements;
    if ($loginForm.length) {
      this.registerLoginValidation($loginForm);
    }
    if ($newPasswordForm.length) {
      this.registerNewPasswordValidation();
    }
    if ($forgotPasswordForm.length) {
      this.registerForgotPasswordValidation($forgotPasswordForm);
    }
    if ($createAccountForm.length) {
      this.registerCreateAccountValidator($createAccountForm);
    }
  };
  return Auth;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/form-validation.js":
/*!***************************************************!*\
  !*** ./assets/js/theme/common/form-validation.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _utils_translations_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");


/**
 * Validate that the given date for the day/month/year select inputs is within potential range
 * @param $formField
 * @param validation
 * @returns {{selector: string, triggeredBy: string, validate: Function, errorMessage: string}}
 */
function buildDateValidation($formField, validation) {
  // No date range restriction, skip
  if (validation.min_date && validation.max_date) {
    var invalidMessage = "Your chosen date must fall between " + validation.min_date + " and " + validation.max_date + ".";
    var formElementId = $formField.attr('id');
    var minSplit = validation.min_date.split('-');
    var maxSplit = validation.max_date.split('-');
    var minDate = new Date(minSplit[0], minSplit[1] - 1, minSplit[2]);
    var maxDate = new Date(maxSplit[0], maxSplit[1] - 1, maxSplit[2]);
    return {
      selector: "#" + formElementId + " select[data-label=\"year\"]",
      triggeredBy: "#" + formElementId + " select:not([data-label=\"year\"])",
      validate: function validate(cb, val) {
        var day = Number($formField.find('select[data-label="day"]').val());
        var month = Number($formField.find('select[data-label="month"]').val()) - 1;
        var year = Number(val);
        var chosenDate = new Date(year, month, day);
        cb(chosenDate >= minDate && chosenDate <= maxDate);
      },
      errorMessage: invalidMessage
    };
  }
}

/**
 * We validate checkboxes separately from single input fields, as they must have at least one checked option
 * from many different inputs
 * @param $formField
 * @param validation
 * @param errorText provides error validation message
 */
function buildRequiredCheckboxValidation(validation, $formField, errorText) {
  var formFieldId = $formField.attr('id');
  var primarySelector = "#" + formFieldId + " input:first-of-type";
  var secondarySelector = "#" + formFieldId + " input";
  return {
    selector: primarySelector,
    triggeredBy: secondarySelector,
    validate: function validate(cb) {
      var result = false;
      $(secondarySelector).each(function (index, checkbox) {
        if (checkbox.checked) {
          result = true;
          return false;
        }
      });
      cb(result);
    },
    errorMessage: errorText
  };
}
function buildRequiredValidation(validation, selector, errorText) {
  return {
    selector: selector,
    validate: function validate(cb, val) {
      cb(val.length > 0);
    },
    errorMessage: errorText
  };
}
function buildNumberRangeValidation(validation, formFieldSelector) {
  var invalidMessage = "The value for " + validation.label + " must be between " + validation.min + " and " + validation.max + ".";
  var min = Number(validation.min);
  var max = Number(validation.max);
  return {
    selector: formFieldSelector + " input[name=\"" + validation.name + "\"]",
    validate: function validate(cb, val) {
      var numberVal = Number(val);
      cb(numberVal >= min && numberVal <= max);
    },
    errorMessage: invalidMessage
  };
}
function buildValidation($validateableElement, errorMessage) {
  var validation = $validateableElement.data('validation');
  var fieldValidations = [];
  var formFieldSelector = "#" + $validateableElement.attr('id');
  if (validation.type === 'datechooser') {
    var dateValidation = buildDateValidation($validateableElement, validation);
    if (dateValidation) {
      fieldValidations.push(dateValidation);
    }
  } else if (validation.required && (validation.type === 'checkboxselect' || validation.type === 'radioselect')) {
    fieldValidations.push(buildRequiredCheckboxValidation(validation, $validateableElement, errorMessage));
  } else {
    $validateableElement.find('input, select, textarea').each(function (index, element) {
      var $inputElement = $(element);
      var tagName = $inputElement.get(0).tagName;
      var inputName = $inputElement.attr('name');
      var elementSelector = formFieldSelector + " " + tagName + "[name=\"" + inputName + "\"]";
      if (validation.type === 'numberonly') {
        fieldValidations.push(buildNumberRangeValidation(validation, formFieldSelector));
      }
      if (validation.required) {
        fieldValidations.push(buildRequiredValidation(validation, elementSelector, errorMessage));
      }
    });
  }
  return fieldValidations;
}

/**
 * Builds the validation model for dynamic forms
 * @param $form
 * @param context provides access for error messages on required fields validation
 * @returns {Array}
 */
/* harmony default export */ __webpack_exports__["default"] = (function ($form, context) {
  var validationsToPerform = [];
  var _createTranslationDic = Object(_utils_translations_utils__WEBPACK_IMPORTED_MODULE_0__["createTranslationDictionary"])(context),
    requiredFieldValidationText = _createTranslationDic.field_not_blank;
  $form.find('[data-validation]').each(function (index, input) {
    var getLabel = function getLabel($el) {
      return $el.first().data('validation').label;
    };
    var requiredValidationMessage = getLabel($(input)) + requiredFieldValidationText;
    validationsToPerform = validationsToPerform.concat(buildValidation($(input), requiredValidationMessage));
  });
  return validationsToPerform;
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvYXV0aC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL2Zvcm0tdmFsaWRhdGlvbi5qcyJdLCJuYW1lcyI6WyJBdXRoIiwiY29udGV4dCIsInZhbGlkYXRpb25EaWN0aW9uYXJ5IiwiY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IiwiZm9ybUNyZWF0ZVNlbGVjdG9yIiwicmVjYXB0Y2hhIiwiJCIsInJlZ2lzdGVyTG9naW5WYWxpZGF0aW9uIiwiJGxvZ2luRm9ybSIsImxvZ2luTW9kZWwiLCJmb3JtcyIsImxvZ2luVmFsaWRhdG9yIiwibm9kIiwic3VibWl0IiwidGFwIiwiYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSIsImFkZCIsInNlbGVjdG9yIiwidmFsaWRhdGUiLCJjYiIsInZhbCIsInJlc3VsdCIsImVtYWlsIiwiZXJyb3JNZXNzYWdlIiwidXNlVmFsaWRFbWFpbCIsInBhc3N3b3JkIiwiZW50ZXJQYXNzIiwib24iLCJldmVudCIsInBlcmZvcm1DaGVjayIsImFyZUFsbCIsInByZXZlbnREZWZhdWx0IiwicmVnaXN0ZXJGb3Jnb3RQYXNzd29yZFZhbGlkYXRpb24iLCIkZm9yZ290UGFzc3dvcmRGb3JtIiwiZm9yZ290UGFzc3dvcmRWYWxpZGF0b3IiLCJyZWdpc3Rlck5ld1Bhc3N3b3JkVmFsaWRhdGlvbiIsImVudGVyUGFzc3dvcmQiLCJtYXRjaFBhc3N3b3JkIiwicGFzc3dvcmRfbWF0Y2giLCJpbnZhbGlkUGFzc3dvcmQiLCJpbnZhbGlkX3Bhc3N3b3JkIiwibmV3UGFzc3dvcmRGb3JtIiwibmV3UGFzc3dvcmRWYWxpZGF0b3IiLCJwYXNzd29yZFNlbGVjdG9yIiwicGFzc3dvcmQyU2VsZWN0b3IiLCJlcnJvclRleHRNZXNzYWdlcyIsImNyZWF0ZVBhc3N3b3JkVmFsaWRhdGlvbkVycm9yVGV4dE9iamVjdCIsIlZhbGlkYXRvcnMiLCJzZXRQYXNzd29yZFZhbGlkYXRpb24iLCJwYXNzd29yZFJlcXVpcmVtZW50cyIsInJlZ2lzdGVyQ3JlYXRlQWNjb3VudFZhbGlkYXRvciIsIiRjcmVhdGVBY2NvdW50Rm9ybSIsInZhbGlkYXRpb25Nb2RlbCIsInZhbGlkYXRpb24iLCJjcmVhdGVBY2NvdW50VmFsaWRhdG9yIiwiJHN0YXRlRWxlbWVudCIsImVtYWlsU2VsZWN0b3IiLCIkZW1haWxFbGVtZW50IiwiJHBhc3N3b3JkRWxlbWVudCIsIiRwYXNzd29yZDJFbGVtZW50IiwiJGxhc3QiLCJzdGF0ZUNvdW50cnkiLCJlcnIiLCJmaWVsZCIsIkVycm9yIiwiJGZpZWxkIiwiZ2V0U3RhdHVzIiwicmVtb3ZlIiwiaXMiLCJzZXRTdGF0ZUNvdW50cnlWYWxpZGF0aW9uIiwiZmllbGRfbm90X2JsYW5rIiwiY2xlYW5VcFN0YXRlVmFsaWRhdGlvbiIsInNldEVtYWlsVmFsaWRhdGlvbiIsInZhbGlkX2VtYWlsIiwib25SZWFkeSIsImF0dHIiLCJyZWNhcHRjaGFUaXRsZSIsImNsYXNzaWZ5Rm9ybSIsIiRuZXdQYXNzd29yZEZvcm0iLCJsZW5ndGgiLCJQYWdlTWFuYWdlciIsImJ1aWxkRGF0ZVZhbGlkYXRpb24iLCIkZm9ybUZpZWxkIiwibWluX2RhdGUiLCJtYXhfZGF0ZSIsImludmFsaWRNZXNzYWdlIiwiZm9ybUVsZW1lbnRJZCIsIm1pblNwbGl0Iiwic3BsaXQiLCJtYXhTcGxpdCIsIm1pbkRhdGUiLCJEYXRlIiwibWF4RGF0ZSIsInRyaWdnZXJlZEJ5IiwiZGF5IiwiTnVtYmVyIiwiZmluZCIsIm1vbnRoIiwieWVhciIsImNob3NlbkRhdGUiLCJidWlsZFJlcXVpcmVkQ2hlY2tib3hWYWxpZGF0aW9uIiwiZXJyb3JUZXh0IiwiZm9ybUZpZWxkSWQiLCJwcmltYXJ5U2VsZWN0b3IiLCJzZWNvbmRhcnlTZWxlY3RvciIsImVhY2giLCJpbmRleCIsImNoZWNrYm94IiwiY2hlY2tlZCIsImJ1aWxkUmVxdWlyZWRWYWxpZGF0aW9uIiwiYnVpbGROdW1iZXJSYW5nZVZhbGlkYXRpb24iLCJmb3JtRmllbGRTZWxlY3RvciIsImxhYmVsIiwibWluIiwibWF4IiwibmFtZSIsIm51bWJlclZhbCIsImJ1aWxkVmFsaWRhdGlvbiIsIiR2YWxpZGF0ZWFibGVFbGVtZW50IiwiZGF0YSIsImZpZWxkVmFsaWRhdGlvbnMiLCJ0eXBlIiwiZGF0ZVZhbGlkYXRpb24iLCJwdXNoIiwicmVxdWlyZWQiLCJlbGVtZW50IiwiJGlucHV0RWxlbWVudCIsInRhZ05hbWUiLCJnZXQiLCJpbnB1dE5hbWUiLCJlbGVtZW50U2VsZWN0b3IiLCIkZm9ybSIsInZhbGlkYXRpb25zVG9QZXJmb3JtIiwicmVxdWlyZWRGaWVsZFZhbGlkYXRpb25UZXh0IiwiaW5wdXQiLCJnZXRMYWJlbCIsIiRlbCIsImZpcnN0IiwicmVxdWlyZWRWYWxpZGF0aW9uTWVzc2FnZSIsImNvbmNhdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXlDO0FBQ1M7QUFDbkI7QUFDbUI7QUFDUjtBQU1QO0FBQzZDO0FBQUEsSUFFM0RBLElBQUk7RUFBQTtFQUNyQixjQUFZQyxPQUFPLEVBQUU7SUFBQTtJQUNqQixnQ0FBTUEsT0FBTyxDQUFDO0lBQ2QsTUFBS0Msb0JBQW9CLEdBQUdDLG9HQUEyQixDQUFDRixPQUFPLENBQUM7SUFDaEUsTUFBS0csa0JBQWtCLEdBQUcsZ0NBQWdDO0lBQzFELE1BQUtDLFNBQVMsR0FBR0MsQ0FBQyxDQUFDLDBCQUEwQixDQUFDO0lBQUM7RUFDbkQ7RUFBQztFQUFBLE9BRURDLHVCQUF1QixHQUF2QixpQ0FBd0JDLFVBQVUsRUFBRTtJQUFBO0lBQ2hDLElBQU1DLFVBQVUsR0FBR0MsNERBQUs7SUFFeEIsSUFBSSxDQUFDQyxjQUFjLEdBQUdDLDJEQUFHLENBQUM7TUFDdEJDLE1BQU0sRUFBRSxrQ0FBa0M7TUFDMUNDLEdBQUcsRUFBRUMsa0ZBQXlCQTtJQUNsQyxDQUFDLENBQUM7SUFFRixJQUFJLENBQUNKLGNBQWMsQ0FBQ0ssR0FBRyxDQUFDLENBQ3BCO01BQ0lDLFFBQVEsRUFBRSx1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QUNPLE1BQU0sQ0FBQ3RCLGVBQWUsQ0FBQy9HLENBQUMsQ0FBQ2dJLEtBQUssQ0FBQyxFQUFFSSx5QkFBeUIsQ0FBQyxDQUFDO0VBQzVHLENBQUMsQ0FBQztFQUVGLE9BQU9OLG9CQUFvQjtBQUMvQixDIiwiZmlsZSI6InRoZW1lLWJ1bmRsZS5jaHVuay43LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhZ2VNYW5hZ2VyIGZyb20gJy4vcGFnZS1tYW5hZ2VyJztcclxuaW1wb3J0IHN0YXRlQ291bnRyeSBmcm9tICcuL2NvbW1vbi9zdGF0ZS1jb3VudHJ5JztcclxuaW1wb3J0IG5vZCBmcm9tICcuL2NvbW1vbi9ub2QnO1xyXG5pbXBvcnQgdmFsaWRhdGlvbiBmcm9tICcuL2NvbW1vbi9mb3JtLXZhbGlkYXRpb24nO1xyXG5pbXBvcnQgZm9ybXMgZnJvbSAnLi9jb21tb24vbW9kZWxzL2Zvcm1zJztcclxuaW1wb3J0IHtcclxuICAgIGNsYXNzaWZ5Rm9ybSxcclxuICAgIFZhbGlkYXRvcnMsXHJcbiAgICBjcmVhdGVQYXNzd29yZFZhbGlkYXRpb25FcnJvclRleHRPYmplY3QsXHJcbiAgICBhbm5vdW5jZUlucHV0RXJyb3JNZXNzYWdlLFxyXG59IGZyb20gJy4vY29tbW9uL3V0aWxzL2Zvcm0tdXRpbHMnO1xyXG5pbXBvcnQgeyBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgfSBmcm9tICcuL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXV0aCBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcclxuICAgICAgICBzdXBlcihjb250ZXh0KTtcclxuICAgICAgICB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5ID0gY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5KGNvbnRleHQpO1xyXG4gICAgICAgIHRoaXMuZm9ybUNyZWF0ZVNlbGVjdG9yID0gJ2Zvcm1bZGF0YS1jcmVhdGUtYWNjb3VudC1mb3JtXSc7XHJcbiAgICAgICAgdGhpcy5yZWNhcHRjaGEgPSAkKCcuZy1yZWNhcHRjaGEgaWZyYW1lW3NyY10nKTtcclxuICAgIH1cclxuXHJcbiAgICByZWdpc3RlckxvZ2luVmFsaWRhdGlvbigkbG9naW5Gb3JtKSB7XHJcbiAgICAgICAgY29uc3QgbG9naW5Nb2RlbCA9IGZvcm1zO1xyXG5cclxuICAgICAgICB0aGlzLmxvZ2luVmFsaWRhdG9yID0gbm9kKHtcclxuICAgICAgICAgICAgc3VibWl0OiAnLmxvZ2luLWZvcm0gaW5wdXRbdHlwZT1cInN1Ym1pdFwiXScsXHJcbiAgICAgICAgICAgIHRhcDogYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2dpblZhbGlkYXRvci5hZGQoW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJy5sb2dpbi1mb3JtIGlucHV0W25hbWU9XCJsb2dpbl9lbWFpbFwiXScsXHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBsb2dpbk1vZGVsLmVtYWlsKHZhbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQudXNlVmFsaWRFbWFpbCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICcubG9naW4tZm9ybSBpbnB1dFtuYW1lPVwibG9naW5fcGFzc1wiXScsXHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBsb2dpbk1vZGVsLnBhc3N3b3JkKHZhbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQuZW50ZXJQYXNzLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF0pO1xyXG5cclxuICAgICAgICAkbG9naW5Gb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubG9naW5WYWxpZGF0b3IucGVyZm9ybUNoZWNrKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5sb2dpblZhbGlkYXRvci5hcmVBbGwoJ3ZhbGlkJykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZWdpc3RlckZvcmdvdFBhc3N3b3JkVmFsaWRhdGlvbigkZm9yZ290UGFzc3dvcmRGb3JtKSB7XHJcbiAgICAgICAgdGhpcy5mb3Jnb3RQYXNzd29yZFZhbGlkYXRvciA9IG5vZCh7XHJcbiAgICAgICAgICAgIHN1Ym1pdDogJy5mb3Jnb3QtcGFzc3dvcmQtZm9ybSBpbnB1dFt0eXBlPVwic3VibWl0XCJdJyxcclxuICAgICAgICAgICAgdGFwOiBhbm5vdW5jZUlucHV0RXJyb3JNZXNzYWdlLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmZvcmdvdFBhc3N3b3JkVmFsaWRhdG9yLmFkZChbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnLmZvcmdvdC1wYXNzd29yZC1mb3JtIGlucHV0W25hbWU9XCJlbWFpbFwiXScsXHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBmb3Jtcy5lbWFpbCh2YWwpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LnVzZVZhbGlkRW1haWwsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgXSk7XHJcblxyXG4gICAgICAgICRmb3Jnb3RQYXNzd29yZEZvcm0ub24oJ3N1Ym1pdCcsIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgdGhpcy5mb3Jnb3RQYXNzd29yZFZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZvcmdvdFBhc3N3b3JkVmFsaWRhdG9yLmFyZUFsbCgndmFsaWQnKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyTmV3UGFzc3dvcmRWYWxpZGF0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IHsgcGFzc3dvcmQ6IGVudGVyUGFzc3dvcmQsIHBhc3N3b3JkX21hdGNoOiBtYXRjaFBhc3N3b3JkLCBpbnZhbGlkX3Bhc3N3b3JkOiBpbnZhbGlkUGFzc3dvcmQgfSA9IHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnk7XHJcbiAgICAgICAgY29uc3QgbmV3UGFzc3dvcmRGb3JtID0gJy5uZXctcGFzc3dvcmQtZm9ybSc7XHJcbiAgICAgICAgY29uc3QgbmV3UGFzc3dvcmRWYWxpZGF0b3IgPSBub2Qoe1xyXG4gICAgICAgICAgICBzdWJtaXQ6ICQoYCR7bmV3UGFzc3dvcmRGb3JtfSBpbnB1dFt0eXBlPVwic3VibWl0XCJdYCksXHJcbiAgICAgICAgICAgIHRhcDogYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBwYXNzd29yZFNlbGVjdG9yID0gJChgJHtuZXdQYXNzd29yZEZvcm19IGlucHV0W25hbWU9XCJwYXNzd29yZFwiXWApO1xyXG4gICAgICAgIGNvbnN0IHBhc3N3b3JkMlNlbGVjdG9yID0gJChgJHtuZXdQYXNzd29yZEZvcm19IGlucHV0W25hbWU9XCJwYXNzd29yZF9jb25maXJtXCJdYCk7XHJcbiAgICAgICAgY29uc3QgZXJyb3JUZXh0TWVzc2FnZXMgPSBjcmVhdGVQYXNzd29yZFZhbGlkYXRpb25FcnJvclRleHRPYmplY3QoZW50ZXJQYXNzd29yZCwgZW50ZXJQYXNzd29yZCwgbWF0Y2hQYXNzd29yZCwgaW52YWxpZFBhc3N3b3JkKTtcclxuICAgICAgICBWYWxpZGF0b3JzLnNldFBhc3N3b3JkVmFsaWRhdGlvbihcclxuICAgICAgICAgICAgbmV3UGFzc3dvcmRWYWxpZGF0b3IsXHJcbiAgICAgICAgICAgIHBhc3N3b3JkU2VsZWN0b3IsXHJcbiAgICAgICAgICAgIHBhc3N3b3JkMlNlbGVjdG9yLFxyXG4gICAgICAgICAgICB0aGlzLnBhc3N3b3JkUmVxdWlyZW1lbnRzLFxyXG4gICAgICAgICAgICBlcnJvclRleHRNZXNzYWdlcyxcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyQ3JlYXRlQWNjb3VudFZhbGlkYXRvcigkY3JlYXRlQWNjb3VudEZvcm0pIHtcclxuICAgICAgICBjb25zdCB2YWxpZGF0aW9uTW9kZWwgPSB2YWxpZGF0aW9uKCRjcmVhdGVBY2NvdW50Rm9ybSwgdGhpcy5jb250ZXh0KTtcclxuICAgICAgICBjb25zdCBjcmVhdGVBY2NvdW50VmFsaWRhdG9yID0gbm9kKHtcclxuICAgICAgICAgICAgc3VibWl0OiBgJHt0aGlzLmZvcm1DcmVhdGVTZWxlY3Rvcn0gaW5wdXRbdHlwZT0nc3VibWl0J11gLFxyXG4gICAgICAgICAgICB0YXA6IGFubm91bmNlSW5wdXRFcnJvck1lc3NhZ2UsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgJHN0YXRlRWxlbWVudCA9ICQoJ1tkYXRhLWZpZWxkLXR5cGU9XCJTdGF0ZVwiXScpO1xyXG4gICAgICAgIGNvbnN0IGVtYWlsU2VsZWN0b3IgPSBgJHt0aGlzLmZvcm1DcmVhdGVTZWxlY3Rvcn0gW2RhdGEtZmllbGQtdHlwZT0nRW1haWxBZGRyZXNzJ11gO1xyXG4gICAgICAgIGNvbnN0ICRlbWFpbEVsZW1lbnQgPSAkKGVtYWlsU2VsZWN0b3IpO1xyXG4gICAgICAgIGNvbnN0IHBhc3N3b3JkU2VsZWN0b3IgPSBgJHt0aGlzLmZvcm1DcmVhdGVTZWxlY3Rvcn0gW2RhdGEtZmllbGQtdHlwZT0nUGFzc3dvcmQnXWA7XHJcbiAgICAgICAgY29uc3QgJHBhc3N3b3JkRWxlbWVudCA9ICQocGFzc3dvcmRTZWxlY3Rvcik7XHJcbiAgICAgICAgY29uc3QgcGFzc3dvcmQyU2VsZWN0b3IgPSBgJHt0aGlzLmZvcm1DcmVhdGVTZWxlY3Rvcn0gW2RhdGEtZmllbGQtdHlwZT0nQ29uZmlybVBhc3N3b3JkJ11gO1xyXG4gICAgICAgIGNvbnN0ICRwYXNzd29yZDJFbGVtZW50ID0gJChwYXNzd29yZDJTZWxlY3Rvcik7XHJcblxyXG4gICAgICAgIGNyZWF0ZUFjY291bnRWYWxpZGF0b3IuYWRkKHZhbGlkYXRpb25Nb2RlbCk7XHJcblxyXG4gICAgICAgIGlmICgkc3RhdGVFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGxldCAkbGFzdDtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlcXVlc3RzIHRoZSBzdGF0ZXMgZm9yIGEgY291bnRyeSB3aXRoIEFKQVhcclxuICAgICAgICAgICAgc3RhdGVDb3VudHJ5KCRzdGF0ZUVsZW1lbnQsIHRoaXMuY29udGV4dCwgKGVyciwgZmllbGQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCAkZmllbGQgPSAkKGZpZWxkKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY3JlYXRlQWNjb3VudFZhbGlkYXRvci5nZXRTdGF0dXMoJHN0YXRlRWxlbWVudCkgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlQWNjb3VudFZhbGlkYXRvci5yZW1vdmUoJHN0YXRlRWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCRsYXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlQWNjb3VudFZhbGlkYXRvci5yZW1vdmUoJGxhc3QpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkZmllbGQuaXMoJ3NlbGVjdCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJGxhc3QgPSBmaWVsZDtcclxuICAgICAgICAgICAgICAgICAgICBWYWxpZGF0b3JzLnNldFN0YXRlQ291bnRyeVZhbGlkYXRpb24oY3JlYXRlQWNjb3VudFZhbGlkYXRvciwgZmllbGQsIHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnkuZmllbGRfbm90X2JsYW5rKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5jbGVhblVwU3RhdGVWYWxpZGF0aW9uKGZpZWxkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoJGVtYWlsRWxlbWVudCkge1xyXG4gICAgICAgICAgICBjcmVhdGVBY2NvdW50VmFsaWRhdG9yLnJlbW92ZShlbWFpbFNlbGVjdG9yKTtcclxuICAgICAgICAgICAgVmFsaWRhdG9ycy5zZXRFbWFpbFZhbGlkYXRpb24oY3JlYXRlQWNjb3VudFZhbGlkYXRvciwgZW1haWxTZWxlY3RvciwgdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeS52YWxpZF9lbWFpbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoJHBhc3N3b3JkRWxlbWVudCAmJiAkcGFzc3dvcmQyRWxlbWVudCkge1xyXG4gICAgICAgICAgICBjb25zdCB7IHBhc3N3b3JkOiBlbnRlclBhc3N3b3JkLCBwYXNzd29yZF9tYXRjaDogbWF0Y2hQYXNzd29yZCwgaW52YWxpZF9wYXNzd29yZDogaW52YWxpZFBhc3N3b3JkIH0gPSB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5O1xyXG5cclxuICAgICAgICAgICAgY3JlYXRlQWNjb3VudFZhbGlkYXRvci5yZW1vdmUocGFzc3dvcmRTZWxlY3Rvcik7XHJcbiAgICAgICAgICAgIGNyZWF0ZUFjY291bnRWYWxpZGF0b3IucmVtb3ZlKHBhc3N3b3JkMlNlbGVjdG9yKTtcclxuICAgICAgICAgICAgVmFsaWRhdG9ycy5zZXRQYXNzd29yZFZhbGlkYXRpb24oXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVBY2NvdW50VmFsaWRhdG9yLFxyXG4gICAgICAgICAgICAgICAgcGFzc3dvcmRTZWxlY3RvcixcclxuICAgICAgICAgICAgICAgIHBhc3N3b3JkMlNlbGVjdG9yLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXNzd29yZFJlcXVpcmVtZW50cyxcclxuICAgICAgICAgICAgICAgIGNyZWF0ZVBhc3N3b3JkVmFsaWRhdGlvbkVycm9yVGV4dE9iamVjdChlbnRlclBhc3N3b3JkLCBlbnRlclBhc3N3b3JkLCBtYXRjaFBhc3N3b3JkLCBpbnZhbGlkUGFzc3dvcmQpLFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJGNyZWF0ZUFjY291bnRGb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGNyZWF0ZUFjY291bnRWYWxpZGF0b3IucGVyZm9ybUNoZWNrKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY3JlYXRlQWNjb3VudFZhbGlkYXRvci5hcmVBbGwoJ3ZhbGlkJykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlcXVlc3QgaXMgbWFkZSBpbiB0aGlzIGZ1bmN0aW9uIHRvIHRoZSByZW1vdGUgZW5kcG9pbnQgYW5kIHB1bGxzIGJhY2sgdGhlIHN0YXRlcyBmb3IgY291bnRyeS5cclxuICAgICAqL1xyXG4gICAgb25SZWFkeSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMucmVjYXB0Y2hhLmF0dHIoJ3RpdGxlJykpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWNhcHRjaGEuYXR0cigndGl0bGUnLCB0aGlzLmNvbnRleHQucmVjYXB0Y2hhVGl0bGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgJGNyZWF0ZUFjY291bnRGb3JtID0gY2xhc3NpZnlGb3JtKHRoaXMuZm9ybUNyZWF0ZVNlbGVjdG9yKTtcclxuICAgICAgICBjb25zdCAkbG9naW5Gb3JtID0gY2xhc3NpZnlGb3JtKCcubG9naW4tZm9ybScpO1xyXG4gICAgICAgIGNvbnN0ICRmb3Jnb3RQYXNzd29yZEZvcm0gPSBjbGFzc2lmeUZvcm0oJy5mb3Jnb3QtcGFzc3dvcmQtZm9ybScpO1xyXG4gICAgICAgIGNvbnN0ICRuZXdQYXNzd29yZEZvcm0gPSBjbGFzc2lmeUZvcm0oJy5uZXctcGFzc3dvcmQtZm9ybScpOyAvLyByZXNldCBwYXNzd29yZFxyXG5cclxuICAgICAgICAvLyBJbmplY3RlZCB2aWEgYXV0aC5odG1sXHJcbiAgICAgICAgdGhpcy5wYXNzd29yZFJlcXVpcmVtZW50cyA9IHRoaXMuY29udGV4dC5wYXNzd29yZFJlcXVpcmVtZW50cztcclxuXHJcbiAgICAgICAgaWYgKCRsb2dpbkZvcm0ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJMb2dpblZhbGlkYXRpb24oJGxvZ2luRm9ybSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoJG5ld1Bhc3N3b3JkRm9ybS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWdpc3Rlck5ld1Bhc3N3b3JkVmFsaWRhdGlvbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCRmb3Jnb3RQYXNzd29yZEZvcm0ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJGb3Jnb3RQYXNzd29yZFZhbGlkYXRpb24oJGZvcmdvdFBhc3N3b3JkRm9ybSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoJGNyZWF0ZUFjY291bnRGb3JtLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyQ3JlYXRlQWNjb3VudFZhbGlkYXRvcigkY3JlYXRlQWNjb3VudEZvcm0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgfSBmcm9tICcuL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscyc7XHJcblxyXG4vKipcclxuICogVmFsaWRhdGUgdGhhdCB0aGUgZ2l2ZW4gZGF0ZSBmb3IgdGhlIGRheS9tb250aC95ZWFyIHNlbGVjdCBpbnB1dHMgaXMgd2l0aGluIHBvdGVudGlhbCByYW5nZVxyXG4gKiBAcGFyYW0gJGZvcm1GaWVsZFxyXG4gKiBAcGFyYW0gdmFsaWRhdGlvblxyXG4gKiBAcmV0dXJucyB7e3NlbGVjdG9yOiBzdHJpbmcsIHRyaWdnZXJlZEJ5OiBzdHJpbmcsIHZhbGlkYXRlOiBGdW5jdGlvbiwgZXJyb3JNZXNzYWdlOiBzdHJpbmd9fVxyXG4gKi9cclxuZnVuY3Rpb24gYnVpbGREYXRlVmFsaWRhdGlvbigkZm9ybUZpZWxkLCB2YWxpZGF0aW9uKSB7XHJcbiAgICAvLyBObyBkYXRlIHJhbmdlIHJlc3RyaWN0aW9uLCBza2lwXHJcbiAgICBpZiAodmFsaWRhdGlvbi5taW5fZGF0ZSAmJiB2YWxpZGF0aW9uLm1heF9kYXRlKSB7XHJcbiAgICAgICAgY29uc3QgaW52YWxpZE1lc3NhZ2UgPSBgWW91ciBjaG9zZW4gZGF0ZSBtdXN0IGZhbGwgYmV0d2VlbiAke3ZhbGlkYXRpb24ubWluX2RhdGV9IGFuZCAke3ZhbGlkYXRpb24ubWF4X2RhdGV9LmA7XHJcbiAgICAgICAgY29uc3QgZm9ybUVsZW1lbnRJZCA9ICRmb3JtRmllbGQuYXR0cignaWQnKTtcclxuICAgICAgICBjb25zdCBtaW5TcGxpdCA9IHZhbGlkYXRpb24ubWluX2RhdGUuc3BsaXQoJy0nKTtcclxuICAgICAgICBjb25zdCBtYXhTcGxpdCA9IHZhbGlkYXRpb24ubWF4X2RhdGUuc3BsaXQoJy0nKTtcclxuICAgICAgICBjb25zdCBtaW5EYXRlID0gbmV3IERhdGUobWluU3BsaXRbMF0sIG1pblNwbGl0WzFdIC0gMSwgbWluU3BsaXRbMl0pO1xyXG4gICAgICAgIGNvbnN0IG1heERhdGUgPSBuZXcgRGF0ZShtYXhTcGxpdFswXSwgbWF4U3BsaXRbMV0gLSAxLCBtYXhTcGxpdFsyXSk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNlbGVjdG9yOiBgIyR7Zm9ybUVsZW1lbnRJZH0gc2VsZWN0W2RhdGEtbGFiZWw9XCJ5ZWFyXCJdYCxcclxuICAgICAgICAgICAgdHJpZ2dlcmVkQnk6IGAjJHtmb3JtRWxlbWVudElkfSBzZWxlY3Q6bm90KFtkYXRhLWxhYmVsPVwieWVhclwiXSlgLFxyXG4gICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRheSA9IE51bWJlcigkZm9ybUZpZWxkLmZpbmQoJ3NlbGVjdFtkYXRhLWxhYmVsPVwiZGF5XCJdJykudmFsKCkpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbW9udGggPSBOdW1iZXIoJGZvcm1GaWVsZC5maW5kKCdzZWxlY3RbZGF0YS1sYWJlbD1cIm1vbnRoXCJdJykudmFsKCkpIC0gMTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHllYXIgPSBOdW1iZXIodmFsKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNob3NlbkRhdGUgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgZGF5KTtcclxuXHJcbiAgICAgICAgICAgICAgICBjYihjaG9zZW5EYXRlID49IG1pbkRhdGUgJiYgY2hvc2VuRGF0ZSA8PSBtYXhEYXRlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBpbnZhbGlkTWVzc2FnZSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogV2UgdmFsaWRhdGUgY2hlY2tib3hlcyBzZXBhcmF0ZWx5IGZyb20gc2luZ2xlIGlucHV0IGZpZWxkcywgYXMgdGhleSBtdXN0IGhhdmUgYXQgbGVhc3Qgb25lIGNoZWNrZWQgb3B0aW9uXHJcbiAqIGZyb20gbWFueSBkaWZmZXJlbnQgaW5wdXRzXHJcbiAqIEBwYXJhbSAkZm9ybUZpZWxkXHJcbiAqIEBwYXJhbSB2YWxpZGF0aW9uXHJcbiAqIEBwYXJhbSBlcnJvclRleHQgcHJvdmlkZXMgZXJyb3IgdmFsaWRhdGlvbiBtZXNzYWdlXHJcbiAqL1xyXG5mdW5jdGlvbiBidWlsZFJlcXVpcmVkQ2hlY2tib3hWYWxpZGF0aW9uKHZhbGlkYXRpb24sICRmb3JtRmllbGQsIGVycm9yVGV4dCkge1xyXG4gICAgY29uc3QgZm9ybUZpZWxkSWQgPSAkZm9ybUZpZWxkLmF0dHIoJ2lkJyk7XHJcbiAgICBjb25zdCBwcmltYXJ5U2VsZWN0b3IgPSBgIyR7Zm9ybUZpZWxkSWR9IGlucHV0OmZpcnN0LW9mLXR5cGVgO1xyXG4gICAgY29uc3Qgc2Vjb25kYXJ5U2VsZWN0b3IgPSBgIyR7Zm9ybUZpZWxkSWR9IGlucHV0YDtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHNlbGVjdG9yOiBwcmltYXJ5U2VsZWN0b3IsXHJcbiAgICAgICAgdHJpZ2dlcmVkQnk6IHNlY29uZGFyeVNlbGVjdG9yLFxyXG4gICAgICAgIHZhbGlkYXRlOiAoY2IpID0+IHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgJChzZWNvbmRhcnlTZWxlY3RvcikuZWFjaCgoaW5kZXgsIGNoZWNrYm94KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tib3guY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjYihyZXN1bHQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3JNZXNzYWdlOiBlcnJvclRleHQsXHJcbiAgICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBidWlsZFJlcXVpcmVkVmFsaWRhdGlvbih2YWxpZGF0aW9uLCBzZWxlY3RvciwgZXJyb3JUZXh0KSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHNlbGVjdG9yLFxyXG4gICAgICAgIHZhbGlkYXRlKGNiLCB2YWwpIHtcclxuICAgICAgICAgICAgY2IodmFsLmxlbmd0aCA+IDApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3JNZXNzYWdlOiBlcnJvclRleHQsXHJcbiAgICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBidWlsZE51bWJlclJhbmdlVmFsaWRhdGlvbih2YWxpZGF0aW9uLCBmb3JtRmllbGRTZWxlY3Rvcikge1xyXG4gICAgY29uc3QgaW52YWxpZE1lc3NhZ2UgPSBgVGhlIHZhbHVlIGZvciAke3ZhbGlkYXRpb24ubGFiZWx9IG11c3QgYmUgYmV0d2VlbiAke3ZhbGlkYXRpb24ubWlufSBhbmQgJHt2YWxpZGF0aW9uLm1heH0uYDtcclxuICAgIGNvbnN0IG1pbiA9IE51bWJlcih2YWxpZGF0aW9uLm1pbik7XHJcbiAgICBjb25zdCBtYXggPSBOdW1iZXIodmFsaWRhdGlvbi5tYXgpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc2VsZWN0b3I6IGAke2Zvcm1GaWVsZFNlbGVjdG9yfSBpbnB1dFtuYW1lPVwiJHt2YWxpZGF0aW9uLm5hbWV9XCJdYCxcclxuICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbnVtYmVyVmFsID0gTnVtYmVyKHZhbCk7XHJcblxyXG4gICAgICAgICAgICBjYihudW1iZXJWYWwgPj0gbWluICYmIG51bWJlclZhbCA8PSBtYXgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3JNZXNzYWdlOiBpbnZhbGlkTWVzc2FnZSxcclxuICAgIH07XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBidWlsZFZhbGlkYXRpb24oJHZhbGlkYXRlYWJsZUVsZW1lbnQsIGVycm9yTWVzc2FnZSkge1xyXG4gICAgY29uc3QgdmFsaWRhdGlvbiA9ICR2YWxpZGF0ZWFibGVFbGVtZW50LmRhdGEoJ3ZhbGlkYXRpb24nKTtcclxuICAgIGNvbnN0IGZpZWxkVmFsaWRhdGlvbnMgPSBbXTtcclxuICAgIGNvbnN0IGZvcm1GaWVsZFNlbGVjdG9yID0gYCMkeyR2YWxpZGF0ZWFibGVFbGVtZW50LmF0dHIoJ2lkJyl9YDtcclxuXHJcbiAgICBpZiAodmFsaWRhdGlvbi50eXBlID09PSAnZGF0ZWNob29zZXInKSB7XHJcbiAgICAgICAgY29uc3QgZGF0ZVZhbGlkYXRpb24gPSBidWlsZERhdGVWYWxpZGF0aW9uKCR2YWxpZGF0ZWFibGVFbGVtZW50LCB2YWxpZGF0aW9uKTtcclxuXHJcbiAgICAgICAgaWYgKGRhdGVWYWxpZGF0aW9uKSB7XHJcbiAgICAgICAgICAgIGZpZWxkVmFsaWRhdGlvbnMucHVzaChkYXRlVmFsaWRhdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh2YWxpZGF0aW9uLnJlcXVpcmVkICYmICh2YWxpZGF0aW9uLnR5cGUgPT09ICdjaGVja2JveHNlbGVjdCcgfHwgdmFsaWRhdGlvbi50eXBlID09PSAncmFkaW9zZWxlY3QnKSkge1xyXG4gICAgICAgIGZpZWxkVmFsaWRhdGlvbnMucHVzaChidWlsZFJlcXVpcmVkQ2hlY2tib3hWYWxpZGF0aW9uKHZhbGlkYXRpb24sICR2YWxpZGF0ZWFibGVFbGVtZW50LCBlcnJvck1lc3NhZ2UpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJHZhbGlkYXRlYWJsZUVsZW1lbnQuZmluZCgnaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEnKS5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCAkaW5wdXRFbGVtZW50ID0gJChlbGVtZW50KTtcclxuICAgICAgICAgICAgY29uc3QgdGFnTmFtZSA9ICRpbnB1dEVsZW1lbnQuZ2V0KDApLnRhZ05hbWU7XHJcbiAgICAgICAgICAgIGNvbnN0IGlucHV0TmFtZSA9ICRpbnB1dEVsZW1lbnQuYXR0cignbmFtZScpO1xyXG4gICAgICAgICAgICBjb25zdCBlbGVtZW50U2VsZWN0b3IgPSBgJHtmb3JtRmllbGRTZWxlY3Rvcn0gJHt0YWdOYW1lfVtuYW1lPVwiJHtpbnB1dE5hbWV9XCJdYDtcclxuXHJcbiAgICAgICAgICAgIGlmICh2YWxpZGF0aW9uLnR5cGUgPT09ICdudW1iZXJvbmx5Jykge1xyXG4gICAgICAgICAgICAgICAgZmllbGRWYWxpZGF0aW9ucy5wdXNoKGJ1aWxkTnVtYmVyUmFuZ2VWYWxpZGF0aW9uKHZhbGlkYXRpb24sIGZvcm1GaWVsZFNlbGVjdG9yKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHZhbGlkYXRpb24ucmVxdWlyZWQpIHtcclxuICAgICAgICAgICAgICAgIGZpZWxkVmFsaWRhdGlvbnMucHVzaChidWlsZFJlcXVpcmVkVmFsaWRhdGlvbih2YWxpZGF0aW9uLCBlbGVtZW50U2VsZWN0b3IsIGVycm9yTWVzc2FnZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZpZWxkVmFsaWRhdGlvbnM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBCdWlsZHMgdGhlIHZhbGlkYXRpb24gbW9kZWwgZm9yIGR5bmFtaWMgZm9ybXNcclxuICogQHBhcmFtICRmb3JtXHJcbiAqIEBwYXJhbSBjb250ZXh0IHByb3ZpZGVzIGFjY2VzcyBmb3IgZXJyb3IgbWVzc2FnZXMgb24gcmVxdWlyZWQgZmllbGRzIHZhbGlkYXRpb25cclxuICogQHJldHVybnMge0FycmF5fVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCRmb3JtLCBjb250ZXh0KSB7XHJcbiAgICBsZXQgdmFsaWRhdGlvbnNUb1BlcmZvcm0gPSBbXTtcclxuICAgIGNvbnN0IHsgZmllbGRfbm90X2JsYW5rOiByZXF1aXJlZEZpZWxkVmFsaWRhdGlvblRleHQgfSA9IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeShjb250ZXh0KTtcclxuXHJcbiAgICAkZm9ybS5maW5kKCdbZGF0YS12YWxpZGF0aW9uXScpLmVhY2goKGluZGV4LCBpbnB1dCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGdldExhYmVsID0gJGVsID0+ICRlbC5maXJzdCgpLmRhdGEoJ3ZhbGlkYXRpb24nKS5sYWJlbDtcclxuICAgICAgICBjb25zdCByZXF1aXJlZFZhbGlkYXRpb25NZXNzYWdlID0gZ2V0TGFiZWwoJChpbnB1dCkpICsgcmVxdWlyZWRGaWVsZFZhbGlkYXRpb25UZXh0O1xyXG5cclxuICAgICAgICB2YWxpZGF0aW9uc1RvUGVyZm9ybSA9IHZhbGlkYXRpb25zVG9QZXJmb3JtLmNvbmNhdChidWlsZFZhbGlkYXRpb24oJChpbnB1dCksIHJlcXVpcmVkVmFsaWRhdGlvbk1lc3NhZ2UpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB2YWxpZGF0aW9uc1RvUGVyZm9ybTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9