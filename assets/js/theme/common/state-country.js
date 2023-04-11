import utils from '@bigcommerce/stencil-utils';
import _ from 'lodash';
import { insertStateHiddenField } from './utils/form-utils';
import { showAlertModal } from '../global/modal';
// import select2 from "select2/dist/js/select2";
import makeDropdown from '../dh-custom/custom';
/**
 * If there are no options from bcapp, a text field will be sent. This will create a select element to hold options after the remote request.
 * @returns {jQuery|HTMLElement}
 */
function makeStateRequired(stateElement, context) {
    const attrs = _.transform(stateElement.prop('attributes'), (result, item) => {
        const ret = result;
        ret[item.name] = item.value;
        return ret;
    });

    const replacementAttributes = {
        id: attrs.id,
        'data-label': attrs['data-label'],
        class: 'form-select',
        name: attrs.name,
        'data-field-type': attrs['data-field-type'],
    };

    stateElement.replaceWith($('<select></select>', replacementAttributes));

    const $newElement = $('[data-field-type="State"]');
    const $hiddenInput = $('[name*="FormFieldIsText"]');

    if ($hiddenInput.length !== 0) {
        $hiddenInput.remove();
    }

    if ($newElement.prev().find('small').length === 0) {
        // String is injected from localizer
        $newElement.prev().append(`<small>${context.required}</small>`);
    } else {
        $newElement.prev().find('small').show();
    }

    return $newElement;
}

/**
 * If a country with states is the default, a select will be sent,
 * In this case we need to be able to switch to an input field and hide the required field
 */
function makeStateOptional(stateElement) {
    const attrs = _.transform(stateElement.prop('attributes'), (result, item) => {
        const ret = result;
        ret[item.name] = item.value;

        return ret;
    });

    const replacementAttributes = {
        type: 'text',
        id: attrs.id,
        'data-label': attrs['data-label'],
        class: 'form-input',
        name: attrs.name,
        'data-field-type': attrs['data-field-type'],
    };

    stateElement.replaceWith($('<input />', replacementAttributes));

    const $newElement = $('[data-field-type="State"]');

    if ($newElement.length !== 0) {
        insertStateHiddenField($newElement);
        $newElement.prev().find('small').hide();
    }

    return $newElement;
}

/**
 * Adds the array of options from the remote request to the newly created select box.
 * @param {Object} statesArray
 * @param {jQuery} $selectElement
 * @param {Object} options
 */
function addOptions(statesArray, $selectElement, options) {
    const container = [];
    const usStates = {
        'ALABAMA':'AL',
        'ALASKA' :'AK',
        'AMERICAN SAMOA' :'AS',
        'ARIZONA' :'AZ',
        'ARKANSAS' :'AR',
        'ARMED FORCES AMERICAS':'AA',
        'ARMED FORCES EUROPE':'AE',
        'ARMED FORCES PACIFIC':'AP',
        'CALIFORNIA' :'CA',
        'COLORADO' :'CO',
        'CONNECTICUT' :'CT',
        'DELAWARE' :'DE',
        'DISTRICT OF COLUMBIA' :'DC',
        'FEDERATED STATES OF MICRONESIA' :'FM',
        'FLORIDA' :'FL',
        'GEORGIA' :'GA',
        'GUAM' :'GU',
        'HAWAII' :'HI',
        'IDAHO' :'ID',
        'ILLINOIS' :'IL',
        'INDIANA' :'IN',
        'IOWA' :'IA',
        'KANSAS' :'KS',
        'KENTUCKY' :'KY',
        'LOUISIANA' :'LA',
        'MAINE' :'ME',
        'MARSHALL ISLANDS' :'MH',
        'MARYLAND' :'MD',
        'MASSACHUSETTS' :'MA',
        'MICHIGAN' :'MI',
        'MINNESOTA' :'MN',
        'MISSISSIPPI' :'MS',
        'MISSOURI' :'MO',
        'MONTANA' :'MT',
        'NEBRASKA' :'NE',
        'NEVADA' :'NV',
        'NEW HAMPSHIRE' :'NH',
        'NEW JERSEY' :'NJ',
        'NEW MEXICO' :'NM',
        'NEW YORK' :'NY',
        'NORTH CAROLINA' :'NC',
        'NORTH DAKOTA' :'ND',
        'NORTHERN MARIANA ISLANDS' :'MP',
        'OHIO' :'OH',
        'OKLAHOMA' :'OK',
        'OREGON' :'OR',
        'PALAU' :'PW',
        'PENNSYLVANIA' :'PA',
        'PUERTO RICO' :'PR',
        'RHODE ISLAND' :'RI',
        'SOUTH CAROLINA' :'SC',
        'SOUTH DAKOTA' :'SD',
        'TENNESSEE' :'TN',
        'TEXAS' :'TX',
        'UTAH' :'UT',
        'VERMONT' :'VT',
        'VIRGIN ISLANDS' :'VI',
        'VIRGINIA' :'VA',
        'WASHINGTON' :'WA',
        'WEST VIRGINIA' :'WV',
        'WISCONSIN' :'WI',
        'WYOMING' :'WY' 
    };

    container.push(`<option value="">${statesArray.prefix}</option>`);

    if (!_.isEmpty($selectElement)) {
        _.each(statesArray.states, (stateObj) => {
            if (options.useIdForStates) {
                if(stateObj.name.toUpperCase() == 'ARMED FORCES AFRICA' || stateObj.name.toUpperCase() == 'ARMED FORCES CANADA' || stateObj.name.toUpperCase() == 'ARMED FORCES MIDDLE EAST'){

                }else{
                container.push(`<option value="${stateObj.id}">${usStates[stateObj.name.toUpperCase()]?usStates[stateObj.name.toUpperCase()]:stateObj.name}</option>`);
                }
            } else { 
                if(stateObj.name.toUpperCase() == 'ARMED FORCES AFRICA' || stateObj.name.toUpperCase() == 'ARMED FORCES CANADA' || stateObj.name.toUpperCase() == 'ARMED FORCES MIDDLE EAST'){

                }else{               
                container.push(`<option value="${stateObj.name}">${usStates[stateObj.name.toUpperCase()]?usStates[stateObj.name.toUpperCase()]:stateObj.name}</option>`);
                }
            }
        });

        $selectElement.html(container.join(' '));
        makeDropdown.makeSelect2Dropdowns($selectElement);
        $selectElement.siblings('.select2-container').removeClass('select-disabled');
    }
}

/**
 *
 * @param {jQuery} stateElement
 * @param {Object} context
 * @param {Object} options
 * @param {Function} callback
 */
export default function (stateElement, context = {}, options, callback) {
    /**
     * Backwards compatible for three parameters instead of four
     *
     * Available options:
     *
     * useIdForStates {Bool} - Generates states dropdown using id for values instead of strings
     */
    if (typeof options === 'function') {
        /* eslint-disable no-param-reassign */
        callback = options;
        options = {};
        /* eslint-enable no-param-reassign */
    }

    $('select[data-field-type="Country"]').on('change', event => {
        const countryName = $(event.currentTarget).val();

        if (countryName === '') {
            return;
        }

        const $select2StateDropdown = $('[data-field-type="State"]').siblings('.select2-container');
        $select2StateDropdown.addClass('select-disabled');

        utils.api.country.getByName(countryName, (err, response) => {
            if (err) {
                showAlertModal(context.state_error);
                return callback(err);
            }

            const $currentInput = $('[data-field-type="State"]');

            if (!_.isEmpty(response.data.states)) {
                // The element may have been replaced with a select, reselect it
                const $selectElement = makeStateRequired($currentInput, context);

                addOptions(response.data, $selectElement, options);                
                $select2StateDropdown.show();
                callback(null, $selectElement);                
            } else {
                const newElement = makeStateOptional($currentInput, context);
                $select2StateDropdown.hide();
                callback(null, newElement);                
            }
        });
    });

    $('select[data-field-type="Country"]').change();
}
