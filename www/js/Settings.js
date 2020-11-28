let Settings = function () {
    // ---------- Global Variables & Stuff ----------
    const sorting_methods = {
        id : Sorting_methods.array_index_0_number,
        name : Sorting_methods.array_index_1_string
    }

    // Local Storage: Sorting Method
    let ls_sorting_method = sorting_methods['name'];


    // Cache DOM for performance
    let $tabSettings = $('#tabSettings');
    let $settings_sorting_method = $tabSettings.find('#settings_sorting_method');





    // ---------- Button Stuff ----------
    // --- T-Doll Data tab ---
    // Get selected T-Doll data from dropdown
    $settings_sorting_method.on('change', function() {
        let mode = this.value;
        // console.log("Dropdown Sorting: Value = ", this.value);
        // console.log("Dropdown Sorting: Method = ", sorting_methods[mode]);
        if (mode !== "") {
            ls_sorting_method = sorting_methods[mode];
            _setLocalStorage();
            GirlsFrontlineCoreAPI.set_settings.sorting_mode(ls_sorting_method);
        }
    });





    // ---------- Function Stuff ----------
    let init = function () {
        // Read Settings from local storage
        _getLocalStorage();

        // Set settings in other scripts
        _set_settings();
    };


    // Set settings in other scripts
    let _set_settings = function () {
        console.log("Settings: Settings Set");
        GirlsFrontlineCoreAPI.set_settings.sorting_mode(ls_sorting_method);
    };



    // ---------- Local Storage stuff ----------
    // TODO: Separate into sub Functions
    // Write the Favorite T-Dolls Array to Local Storage
    let _setLocalStorage = function() {
        console.log("Saved settings to Local Storage");
        for (let key in sorting_methods) {
            let value = sorting_methods[key]
            if (value === ls_sorting_method) {
                localStorage.setItem('setting_sorting_method', key);  // localStorage.setItem('key', 'value')
            }
        }
    };


    // Read Settings from local storage
    let _getLocalStorage = function () {
        // --- Sorting Method ---
        let ls_sorting_method_key = localStorage.getItem('setting_sorting_method');
        if (ls_sorting_method_key !== null) {
            ls_sorting_method = sorting_methods[ls_sorting_method_key];
            $settings_sorting_method.val(ls_sorting_method_key);
            // console.log("Settings: Init: ls_sorting_method = ", ls_sorting_method);
        }
    }



    // ---------- Global Function returns (outside name : inside name) ----------
    return {
        init: init,
    };
}();