let Settings = function () {
    // TODO: Setting for default tab
    // TODO: Option to clear Favorites
    // ---------- Global Variables & Stuff ----------
    // key : [function, "Sorting Name"]
    const sorting_methods = {
        id : [Sorting_methods.array_index_0_number, "By ID"],
        name : [Sorting_methods.array_index_1_string, "By name"],
        rank : [Sorting_methods.array_index_2_number, "By rank (low -> high)"],
        rank_reversed : [Sorting_methods.array_index_2_number_reversed, "By rank (high -> low)"],
        buildTime : [Sorting_methods.array_index_3_number, "By build time (low -> high)"],
        buildTime_reversed : [Sorting_methods.array_index_3_number_reversed, "By build time (high -> low)"],
    }

    const tdoll_naming_methods = {
        codename : [false, "By codename"],
        i18next_name : [true, "By name (may contain Chinese)"]
    }

    // Local Storage: Sorting Method
    let ls_sorting_method = sorting_methods['name'][0];
    let ls_tdoll_naming_method = tdoll_naming_methods['codename'][0];


    // Cache DOM for performance
    let $tabSettings = $('#tabSettings');
    let $settings_sorting_method = $tabSettings.find('#settings_sorting_method');
    let $settings_tdoll_naming_method = $tabSettings.find('#settings_tdoll_naming_method');





    // ---------- Button Stuff ----------
    // --- T-Doll Data tab ---
    // Get selected T-Doll data from dropdown
    $settings_sorting_method.on('change', function() {
        let mode = this.value;
        // console.log("Dropdown Sorting: Value = ", this.value);
        // console.log("Dropdown Sorting: Method = ", sorting_methods[mode][0]);
        if (mode !== "") {
            ls_sorting_method = sorting_methods[mode][0];
            _setLocalStorage.sorting_method();
            GirlsFrontlineCoreAPI.set_settings.sorting_mode(ls_sorting_method);
        }
    });

    $settings_tdoll_naming_method.on('change', function() {
        let mode = this.value;
        // console.log("Dropdown Naming: Value = ", this.value);
        // console.log("Dropdown naming: Method = ", tdoll_naming_methods[mode][0]);
        if (mode !== "") {
            ls_tdoll_naming_method = tdoll_naming_methods[mode][0];
            _setLocalStorage.tdoll_naming_method();
            GirlsFrontlineCoreAPI.set_settings.tdoll_naming_method(ls_tdoll_naming_method);
        }
    });





    // ---------- Function Stuff ----------
    let init = function () {
        // Add all the options to there dropdowns
        _set_dropdowns();

        // Read Settings from local storage
        _getLocalStorage();

        // Set settings in other scripts
        _set_settings();
    };


    let _set_dropdowns = function () {
        // --- Sorting Method Dropdown ---
        $settings_sorting_method.empty()            // Empty current dropdown list
            .append("<option value='' disabled selected>Choose a Sorting Method</option>");

        for (let key in sorting_methods) {          // Dynamically add Sorting Methods to the list
            let name = sorting_methods[key][1];
            $settings_sorting_method.append("<option value='" + key + "'>" + name + "</option>");
            }


        // --- Dropdown Name Dropdown ---
        $settings_tdoll_naming_method.empty()            // Empty current dropdown list
            .append("<option value='' disabled selected>Choose Dropdown Naming Method</option>");

        for (let key in tdoll_naming_methods) {          // Dynamically add Naming methods to the list
            let name = tdoll_naming_methods[key][1];
            $settings_tdoll_naming_method.append("<option value='" + key + "'>" + name + "</option>");
        }

        // Form Selection ReInitialization
        $('select').formSelect();
    }


    // Set settings in other scripts
    let _set_settings = function () {
        console.log("Settings: Settings Set");
        GirlsFrontlineCoreAPI.set_settings.sorting_mode(ls_sorting_method);
        GirlsFrontlineCoreAPI.set_settings.tdoll_naming_method(ls_tdoll_naming_method);
    };



    // ---------- Local Storage stuff ----------
    // Function to write the settings to Local Storage
    let _setLocalStorage = function() {
        let sorting_method = function () {
            console.log("Saved Sorting Method settings to Local Storage");
            for (let key in sorting_methods) {
                let value = sorting_methods[key][0]
                if (value === ls_sorting_method) {
                    localStorage.setItem('setting_sorting_method', key);  // localStorage.setItem('key', 'value')
                }
            }
        };

        let tdoll_naming_method = function () {
            console.log("Saved Dropdown Name Type settings to Local Storage");
            for (let key in tdoll_naming_methods) {
                let value = tdoll_naming_methods[key][0]
                if (value === ls_tdoll_naming_method) {
                    localStorage.setItem('setting_tdoll_naming_method', key);  // localStorage.setItem('key', 'value')
                }
            }
        };


        // ---------- Global Function returns (outside name : inside name) ----------
        return {
            sorting_method: sorting_method,
            tdoll_naming_method: tdoll_naming_method,
        };
    }();


    // Read Settings from local storage
    let _getLocalStorage = function () {
        // --- Sorting Method ---
        let ls_sorting_method_key = localStorage.getItem('setting_sorting_method');
        if (ls_sorting_method_key !== null) {
            ls_sorting_method = sorting_methods[ls_sorting_method_key][0];
            $settings_sorting_method.val(ls_sorting_method_key);
            // console.log("Settings: Init: ls_sorting_method = ", ls_sorting_method);
        } else {
            _setLocalStorage.sorting_method();
            $settings_sorting_method.val(localStorage.getItem('setting_sorting_method'));
        }

        // --- Sorting Method ---
        let ls_tdoll_naming_method_key = localStorage.getItem('setting_tdoll_naming_method');
        if (ls_tdoll_naming_method_key !== null) {
            ls_tdoll_naming_method = tdoll_naming_methods[ls_tdoll_naming_method_key][0];
            $settings_tdoll_naming_method.val(ls_tdoll_naming_method_key);
            // console.log("Settings: Init: ls_tdoll_naming_method = ", ls_tdoll_naming_method);
        } else {
            _setLocalStorage.tdoll_naming_method();
            $settings_tdoll_naming_method.val(localStorage.getItem('setting_tdoll_naming_method'));
        }
    }



    // ---------- Global Function returns (outside name : inside name) ----------
    return {
        init: init,
    };
}();