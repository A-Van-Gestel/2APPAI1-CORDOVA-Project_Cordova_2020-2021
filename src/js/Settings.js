/**
 * @namespace Settings
 */
let Settings = function () {
    // TODO: Setting for default tab
    // TODO: Option to clear Favorites
    // TODO: Add sorting method to Dropdown name (example: *** - UZI; 1:00h - UZI)
    // TODO: Add localstorage export & import method
    // ---------- Global Variables & Stuff ----------
    /**
     * Contains the sorting methods for the dropdowns.
     * key : [function, "Sorting Name"]
     * @type {Object}
     */
    const sorting_methods = {
        id : [Sorting_methods.array_index_0_number, "By ID"],
        name : [Sorting_methods.array_index_1_string, "By name"],
        rank : [Sorting_methods.array_index_2_number, "By rank (low -> high)"],
        rank_reversed : [Sorting_methods.array_index_2_number_reversed, "By rank (high -> low)"],
        buildTime : [Sorting_methods.array_index_3_number, "By build time (low -> high)"],
        buildTime_reversed : [Sorting_methods.array_index_3_number_reversed, "By build time (high -> low)"],
    }

    /**
     * Contains the naming convention for the T-Dolls.
     * key : [boolean, "Sorting Name"]
     * @type {Object}
     */
    const tdoll_naming_methods = {
        codename : [false, "By codename"],
        i18next_name : [true, "By name (may contain Chinese)"]
    }

    /**
     * Contains the obtain visibilities for the T-Dolls.
     * key : [boolean, "Sorting Name"]
     * @type {Object}
     */
    const tdoll_obtain_visibilities = {
        hide : [false, "Hide obtain method"],
        show : [true, "Show obtain method (incomplete & buggy)"]
    }

    /**
     * Contains the update branches for the update checker.
     * key : [boolean, "Sorting Name"]
     * @type {Object}
     */
    const update_dev_builds_methods = {
        stable : [false, "Stable Branch"],
        dev : [true, "Development Branch"]
    }

    /**
     * Contains the message types shown on startup for the update checker.
     * key : [boolean, "Sorting Name"]
     * @type {Object}
     */
    const update_show_on_startup_methods = {
        none : ["false", "No message"],
        toast : ["toast", "Show a tiny toast"],
        modal : ["modal", "Show the update window"]
    }

    /**
     * Contains the update modal show states for the update checker.
     * key : [boolean, "Sorting Name"]
     * @type {Object}
     */
    const update_show_modal_always_methods = {
        hide : [false, "Only show if update found"],
        show : [true, "Always show even if no update found"]
    }

    /**
     * Local Storage: Default setting
     * ls_key : object['key'][0]
     * @type {Object}
     */
    let ls_methods = {
        ls_sorting_method: sorting_methods['name'][0],
        ls_tdoll_naming_method: tdoll_naming_methods['codename'][0],
        ls_tdoll_obtain_visibility: tdoll_obtain_visibilities['hide'][0],
        ls_update_dev_builds_method: update_dev_builds_methods['stable'][0],
        ls_update_show_on_startup_method: update_show_on_startup_methods['toast'][0],
        ls_update_show_modal_always_method: update_show_modal_always_methods['show'][0]
    }


    // Cache DOM for performance
    let $tabSettings = $('#tabSettings');
    let $settings_sorting_method = $tabSettings.find('#settings_sorting_method');
    let $settings_tdoll_naming_method = $tabSettings.find('#settings_tdoll_naming_method');
    let $settings_tdoll_obtain_visibility = $tabSettings.find('#settings_tdoll_obtain_visibility');
    let $settings_dev_builds = $tabSettings.find('#settings_dev_builds');
    let $settings_show_on_startup = $tabSettings.find('#settings_show_on_startup');
    let $settings_show_modal_always = $tabSettings.find('#settings_show_modal_always');





    // ---------- UI Stuff ----------
    // Get selected T-Doll data from dropdown
    $settings_sorting_method.on('change', function () {
        return _get_dropdown_valueFunction
        (
            sorting_methods,
            'ls_sorting_method',
            _setLocalStorage.sorting_method,
            GirlsFrontlineCoreAPI.set_settings.sorting_mode,
            $settings_sorting_method
        );
    });

    $settings_tdoll_naming_method.on('change', function () {
        return _get_dropdown_valueFunction
        (
            tdoll_naming_methods,
            'ls_tdoll_naming_method',
            _setLocalStorage.tdoll_naming_method,
            GirlsFrontlineCoreAPI.set_settings.tdoll_naming_method,
            $settings_tdoll_naming_method
        );
    });

    $settings_tdoll_obtain_visibility.on('change', function () {
        return _get_dropdown_valueFunction
        (
            tdoll_obtain_visibilities,
            'ls_tdoll_obtain_visibility',
            _setLocalStorage.tdoll_obtain_visibility,
            GirlsFrontlineCoreAPI.set_settings.tdoll_obtain_visibility,
            $settings_tdoll_obtain_visibility
        );
    });

    $settings_dev_builds.on('change', function () {
        return _get_dropdown_valueFunction
        (
            update_dev_builds_methods,
            'ls_update_dev_builds_method',
            _setLocalStorage.update_dev_builds_method,
            Update.set_settings.update_dev_builds_method,
            $settings_dev_builds
        );
    });

    $settings_show_on_startup.on('change', function () {
        return _get_dropdown_valueFunction
        (
            update_show_on_startup_methods,
            'ls_update_show_on_startup_method',
            _setLocalStorage.update_show_on_startup_method,
            Update.set_settings.update_show_on_startup_method,
            $settings_show_on_startup
        );
    });

    $settings_show_modal_always.on('change', function () {
        return _get_dropdown_valueFunction
        (
            update_show_modal_always_methods,
            'ls_update_show_modal_always_method',
            _setLocalStorage.update_show_modal_always_method,
            Update.set_settings.update_show_modal_always_method,
            $settings_show_modal_always
        );
    });


    // --- UI helper functions ---
    /**
     * Dynamic function to get selected value from dropdown
     * @param {Object} object_Methods - Contains all the Dropdown config stuff
     * @param {string} ls_method - LocalStorage setting in ls_methods
     * @param {Function} setLocalStorageFunction
     * @param {Function} set_settingsFunction
     * @param {jQuery} $selector
     * @private
     */
    let _get_dropdown_valueFunction = function (object_Methods, ls_method, setLocalStorageFunction, set_settingsFunction, $selector) {
        try {
            let mode = $selector.children("option:selected").val();
            // console.log("Dropdown: Value = ", $selector.children("option:selected").val());
            // console.log("Dropdown: Method = ", object_Methods[mode][0]);
            if (mode !== "") {
                ls_methods[ls_method] = object_Methods[mode][0];
                setLocalStorageFunction();
                set_settingsFunction(ls_methods[ls_method]);
            }
        }
        catch (error) {
            console.error(error)
        }
    }





    // ---------- Function Stuff ----------
    /**
     * Sets the settings dropdowns, reads the settings from LocalStorage & Sets the settings in other scripts.
     */
    let init = function () {
        // Add all the options to there dropdowns
        _set_dropdowns();

        // Read Settings from local storage
        _getLocalStorage();

        // Set settings in other scripts
        _set_settings();
    };


    /**
     * Sets the Settings Dropdowns
     * @private
     */
    let _set_dropdowns = function () {
        /**
         * Dynamic function to set dropdowns
         * @param {Object} object_Methods - Contains all the Dropdown config stuff
         * @param {jQuery} $selector
         * @param {string} message
         * @private
         */
        let _set_dropdownsFunction = function (object_Methods, $selector, message) {
            // --- Setting Methods Dropdown ---
            $selector.empty()            // Empty current dropdown list
                .append(`<option value='' disabled selected>${message}</option>`);

            for (let key in object_Methods) {          // Dynamically add Methods to the list
                let name = object_Methods[key][1];
                $selector.append("<option value='" + key + "'>" + name + "</option>");
            }
        }

        // --- Sorting Method Dropdown ---
        _set_dropdownsFunction
        (
            sorting_methods,
            $settings_sorting_method,
            'Choose a Sorting Method'
        )

        // --- T-Doll Naming Method Dropdown ---
        _set_dropdownsFunction
        (
            tdoll_naming_methods,
            $settings_tdoll_naming_method,
            'Choose Dropdown Naming Method'
        )

        // --- T-Doll Obtain Visibility Dropdown ---
        _set_dropdownsFunction
        (
            tdoll_obtain_visibilities,
            $settings_tdoll_obtain_visibility,
            'Choose Obtain Visibility'
        )

        // --- Update: dev builds Dropdown ---
        _set_dropdownsFunction
        (
            update_dev_builds_methods,
            $settings_dev_builds,
            'Choose startup message method'
        )

        // --- Update: Show on startup Method Dropdown ---
        _set_dropdownsFunction
        (
            update_show_on_startup_methods,
            $settings_show_on_startup,
            'Update startup message method'
        )

        // --- Update: Show Modal Always Dropdown ---
        _set_dropdownsFunction
        (
            update_show_modal_always_methods,
            $settings_show_modal_always,
            'Choose check update behavior'
        )

        // Form Selection ReInitialization
        $tabSettings.find('select').formSelect();
    }


    /**
     * Set settings in other scripts
     * Script.set_settings.setting(ls_methods['ls_key'])
     * @private
     */
    let _set_settings = function () {
        console.log("Settings: Settings Loading");
        GirlsFrontlineCoreAPI.set_settings.sorting_mode(ls_methods['ls_sorting_method'], true);
        GirlsFrontlineCoreAPI.set_settings.tdoll_naming_method(ls_methods['ls_tdoll_naming_method'], true);
        GirlsFrontlineCoreAPI.set_settings.tdoll_obtain_visibility(ls_methods['ls_tdoll_obtain_visibility'], true);
        GirlsFrontlineCoreAPI.init();

        Update.set_settings.update_dev_builds_method(ls_methods['ls_update_dev_builds_method'], true);
        Update.set_settings.update_show_on_startup_method(ls_methods['ls_update_show_on_startup_method']);
        Update.set_settings.update_show_modal_always_method(ls_methods['ls_update_show_modal_always_method']);
        Update.init();
        console.log("Settings: Settings Loaded");
    };



    // ---------- Local Storage stuff ----------
    /**
     * Function to write the settings to Local Storage
     * @private
     */
    let _setLocalStorage = function() {
        /**
         * Dynamic function to set LocalStorage items.
         * @param {Object} object_Methods - Contains all the Dropdown config stuff
         * @param {string} ls_method - LocalStorage setting in ls_methods
         * @param {string} setting_method
         * @private
         */
        let _setLocalStorageFunction = function (object_Methods, ls_method, setting_method) {
            for (let key in object_Methods) {
                let value = object_Methods[key][0]
                if (value === ls_methods[ls_method]) {
                    localStorage.setItem(setting_method, key);  // localStorage.setItem('key', 'value')
                }
            }
        }

        let sorting_method = function () {
            console.log("Saved Sorting Method settings to Local Storage");
            _setLocalStorageFunction
            (
                sorting_methods,
                'ls_sorting_method',
                'setting_sorting_method'
            )
        };

        let tdoll_naming_method = function () {
            console.log("Saved Dropdown Name Type settings to Local Storage");
            _setLocalStorageFunction
            (
                tdoll_naming_methods,
                'ls_tdoll_naming_method',
                'setting_tdoll_naming_method'
            )
        };

        let tdoll_obtain_visibility = function () {
            console.log("Saved T-Doll Obtain visibility settings to Local Storage");
            _setLocalStorageFunction
            (
                tdoll_obtain_visibilities,
                'ls_tdoll_obtain_visibility',
                'setting_tdoll_obtain_visibility'
            )
        };

        let update_dev_builds_method = function () {
            console.log("Saved Update Dev Builds method settings to Local Storage");
            _setLocalStorageFunction
            (
                update_dev_builds_methods,
                'ls_update_dev_builds_method',
                'setting_update_dev_builds_method'
            )
        };

        let update_show_on_startup_method = function () {
            console.log("Saved Update show on startup method settings to Local Storage");
            _setLocalStorageFunction
            (
                update_show_on_startup_methods,
                'ls_update_show_on_startup_method',
                'setting_update_show_on_startup_method'
            )
        };

        let update_show_modal_always_method = function () {
            console.log("Saved Update show modal always method settings to Local Storage");
            _setLocalStorageFunction
            (
                update_show_modal_always_methods,
                'ls_update_show_modal_always_method',
                'setting_update_show_modal_always_method'
            )
        };


        // ---------- Global Function returns (outside name : inside name) ----------
        return {
            sorting_method: sorting_method,
            tdoll_naming_method: tdoll_naming_method,
            tdoll_obtain_visibility: tdoll_obtain_visibility,
            update_dev_builds_method: update_dev_builds_method,
            update_show_on_startup_method: update_show_on_startup_method,
            update_show_modal_always_method: update_show_modal_always_method,
        };
    }();


    /**
     * Read Settings from local storage
     * @private
     */
    let _getLocalStorage = function () {
        /**
         * Dynamic function to get the items from LocalStorage.
         * @param {Object} object_Methods - Contains all the Dropdown config stuff
         * @param {string} ls_method - LocalStorage setting in ls_methods
         * @param {string} setting_method
         * @param {Function} setLocalStorageFunction
         * @param {jQuery} $selector
         * @private
         */
        let _getLocalStorageFunction = function (object_Methods, ls_method, setting_method, setLocalStorageFunction, $selector) {
            let ls_method_key = localStorage.getItem(setting_method);
            // console.log(ls_method + "_key = ", ls_method_key)
            if (ls_method_key !== null) {
                ls_methods[ls_method] = object_Methods[ls_method_key][0];
                $selector.val(ls_method_key);
                // console.log("Settings: Init: " + ls_method + " = ", ls_methods[ls_method]);
            } else {
                setLocalStorageFunction();
                $selector.val(localStorage.getItem(setting_method));
            }
        }

        // --- Sorting Method ---
         _getLocalStorageFunction
         (
             sorting_methods,
             'ls_sorting_method',
             'setting_sorting_method',
             _setLocalStorage.sorting_method,
             $settings_sorting_method
         )

        // --- Tdoll Naming Method ---
        _getLocalStorageFunction
        (
            tdoll_naming_methods,
            'ls_tdoll_naming_method',
            'setting_tdoll_naming_method',
            _setLocalStorage.tdoll_naming_method,
            $settings_tdoll_naming_method
        )

        // --- Tdoll Obtain Visibility ---
        _getLocalStorageFunction
        (
            tdoll_obtain_visibilities,
            'ls_tdoll_obtain_visibility',
            'setting_tdoll_obtain_visibility',
            _setLocalStorage.tdoll_obtain_visibility,
            $settings_tdoll_obtain_visibility
        )

        // --- Update: dev builds Dropdown ---
        _getLocalStorageFunction
        (
            update_dev_builds_methods,
            'ls_update_dev_builds_method',
            'setting_update_dev_builds_method',
            _setLocalStorage.update_dev_builds_method,
            $settings_dev_builds
        )

        // --- Update: Show on startup Method Dropdown ---
        _getLocalStorageFunction
        (
            update_show_on_startup_methods,
            'ls_update_show_on_startup_method',
            'setting_update_show_on_startup_method',
            _setLocalStorage.update_show_on_startup_method,
            $settings_show_on_startup
        )

        // --- Update: Show Modal Always Dropdown ---
        _getLocalStorageFunction
        (
            update_show_modal_always_methods,
            'ls_update_show_modal_always_method',
            'setting_update_show_modal_always_method',
            _setLocalStorage.update_show_modal_always_method,
            $settings_show_modal_always
        )
    }



    // ---------- Global Function returns (outside name : inside name) ----------
    return {
        init: init,
    };
}();