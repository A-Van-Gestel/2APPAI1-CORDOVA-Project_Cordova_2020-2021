let GirlsFrontlineCoreAPI = function () {
    // ---------- Global Variables & Stuff ----------
    const doll_types = ['hg', 'smg', 'rf', 'ar', 'mg', 'sg']
    // console.log("Types: ", doll_types)
    // TODO: Remove unneeded code (loaded_dynamically)
    let loaded_dynamically = false;

    // Stores the last selected Type
    let selected_type = "";
    let selected_type_favorited = "";

    // Favorite dolls list
    let favorite_doll_ids = [];





    // ---------- Button Stuff ----------
    // --- T-Doll Data tab ---
    // Get selected T-Doll data from dropdown
    $('#tdoll_selection').on('change', function() {
        let id = this.value;
        // console.log("Dropdown: Value = ", this.value);
        if (id !== "") {
            _set_html_doll_data(parseInt(id))
        }
    })


    // T-Doll type button array selection (for dropdown)
    $('#btns_doll_type').children().on('click', function() {
        let doll_type = $(this).data('type');
        // console.log('Button: type = ', doll_type);
        $(this).siblings().addBack().removeClass("active");
        $(this).addClass("active");

        get_dolls_by_type(doll_type.toLowerCase());
        reset_html_doll_data();
    })

    // Get selected T-Doll data from dropdown and add to Favorites
    $('#btnFloat_favorite').on('click', function() {
        let id = $('#tdoll_selection').val();
        // console.log("Favorite Button: adding ID = ", id)
        if (id !== null) {
            _addFavoriteDoll(parseInt(id));
        }
        else {
            console.error("Favorite Button: " + id + " is NaN!");
        }
    })


    // --- Favorite Tab ---
    // Get selected T-Doll data from favorites dropdown
    $('#tdoll_selection_favorite').on('change', function() {
        let id = this.value;
        // console.log("Dropdown: Value = ", this.value);
        if (id !== "") {
            _set_html_doll_data(parseInt(id),true)
        }
    })


    // T-Doll type button array favorites selection (for dropdown)
    $('#btns_favorite').children().on('click', function() {
        let doll_type = $(this).data('type');
        // console.log('Button: type = ', doll_type);
        $(this).siblings().addBack().removeClass("active");
        $(this).addClass("active");

        get_dolls_by_type(doll_type.toLowerCase(), true);
        reset_html_doll_data(true);
    })


    // Get selected T-Doll data from dropdown and add to Favorites
    $('#btnFloat_Unfavorite').on('click', function() {
        let id = $('#tdoll_selection_favorite').val();
        // console.log("UnFavorite Button: removing ID = ", id);
        if (id !== null) {
            _deleteFavoriteDoll(parseInt(id));
        }
        else {
            console.error("UnFavorite Button: " + id + " is NaN!");
        }
    })


    // --- Build Time tab ---
    // Open TimePicker on clicking the Build Time text field
    $('#tdoll_BuildTime').on('click', function() {
        MaterialDateTimePicker.showTimePicker()
    })


    // Get selected T-Doll data from dropdown
    $('#tdoll_selection_BuildTime').on('change', function() {
        let id = this.value;
        // console.log("Dropdown: Value = ", this.value);
        if (id !== "") {
            _set_html_doll_data(parseInt(id), undefined, true)
        }
    })



    // ---------- Function Stuff ----------
    // initialise the systems using the API
    let init = function () {
        // Read Favorite dolls from local storage
        let favorite_doll_ids_str = localStorage.getItem('favorite_doll_ids');
        if (favorite_doll_ids_str !== null) {
            favorite_doll_ids = [];   // Empty array
            favorite_doll_ids = JSON.parse(favorite_doll_ids_str);
        }


        get_dolls_by_type();      // Get T-Doll by Type & Set the T-Doll Dropdown
        get_dolls_by_type(undefined,true);      // Get T-Doll by Type and Favorite & Set the T-Doll Favorites Dropdown
    };


    // TODO: Remove unneeded Function (get_loaded_dynamically)
    // Runs the function to load the API and returns if the script loaded correctly
    let get_loaded_dynamically = function () {
        _init_script()
        return loaded_dynamically;
    }


    // TODO: Remove unneeded Function (_init_script)
    // Dynamically loads the GirlsFrontline-Core API using jQuery
    // After loading, initialise the systems using the API
    let _init_script = function () {
        $.getScript( "https://unpkg.com/girlsfrontline-core/umd/gfcore.min.js")
            // If loaded correctly
            .done(function(script, textStatus, jqxhr) {
                console.log( "GirlsFrontlineCore-API loaded successfully: ", jqxhr.status + " - " + textStatus);
                loaded_dynamically = true;
                console.log("Loaded - done: loaded_dynamically = ", loaded_dynamically)
                $('#GFLC_API_Loaded').html(`<b>GFL-Core API: </b>Loaded`);
                NetworkState.close_modal();
                _init();
            })
            // If failed to load
            .fail(function(jqxhr, settings, exception) {
                console.error("GirlsFrontlineCore-Api failed to load: ", jqxhr.status + " - " + exception);
                loaded_dynamically =  false;
                console.log("Loaded - fail: loaded_dynamically = ", loaded_dynamically)
                $('#GFLC_API_Loaded').html(`<b>GFL-Core API: </b> ${exception}`);
            })
    };


    // Get a list of all T-Dolls of a certain Type
    let get_dolls_by_type = function (input_type = 'hg', favorite = false) {
        // console.log("Input: Type = " + input_type + ",", "Favorite =  " + favorite);
        try {
            if (doll_types.includes(input_type)) {
                let dolls_by_type = []
                gfcore.dolls.forEach(function (tdoll) {
                    switch (favorite) {
                        case true:
                            selected_type_favorited = input_type;
                            if (tdoll.type === input_type && favorite_doll_ids.includes(tdoll.id)) {
                                // console.log(tdoll.type + " - " + tdoll.codename, tdoll)
                                dolls_by_type.push([tdoll.id, tdoll.codename]);
                            }
                            break;
                        default:
                            selected_type = input_type;
                            if (tdoll.type === input_type) {
                                // console.log(tdoll.type + " - " + tdoll.codename, tdoll)
                                dolls_by_type.push([tdoll.id, tdoll.codename]);
                            }
                    }
                });

                // console.log("T-Doll of type = " + input_type, dolls_by_type);
                _set_doll_selection_dropdown(dolls_by_type, favorite);
            }
        }
        catch (err) {
            console.error("get_dolls_by_type: Failed:", err)
        }
    }


    // Get a List of all T-Dolls with a certain Build Time
    let get_dolls_by_buildTime = function (input_buildTime) {
        console.log("Build Time = " + input_buildTime);
        try {
            let dolls_by_buildTime = []
            gfcore.dolls.forEach(function (tdoll) {
                    if (tdoll.buildTime === input_buildTime) {
                        // console.log(tdoll.buildTime + " - " + tdoll.codename)
                        dolls_by_buildTime.push([tdoll.id, tdoll.codename]);
                    }
                }
            );

            console.log("dolls_by_buildTime = ", dolls_by_buildTime)
            console.log("dolls_by_buildTime.length = " + dolls_by_buildTime.length)
            if (dolls_by_buildTime.length > 0) {
                _set_doll_selection_dropdown(dolls_by_buildTime, undefined, true);
            }
        }
        catch (err) {
            console.error("get_dolls_by_buildTime: Failed:", err)
        }
    }


    // Sets the T-Doll Dropdown content
    let _set_doll_selection_dropdown = function (input_doll_list, favorite = false, buildTime = false) {
        let selector = "";

        if (favorite === true) {
            selector = "#tdoll_selection_favorite"
        }
        else if (buildTime === true) {
            selector = "#tdoll_selection_BuildTime"
        }
        else {
            selector = "#tdoll_selection";
        }

        $(selector).empty()                  // Empty current dropdown list
            .append("<option value='' disabled selected>Choose a T-Doll</option>");
        input_doll_list.forEach(function (doll) {       // Dynamically add Dolls to the list
            $(selector).append("<option value='" + doll[0] + "'>" + doll[1] + "</option>");
        })
        // Form Selection ReInitialization
        $('select').formSelect();
    }


    // Sets the T-Doll HTML Data on screen
    let _set_html_doll_data = function (input_id, favorite = false, buildTime = false) {
        // console.log("Input_ID = ", input_id)
        let doll = gfcore.dolls.find(({id}) => id === input_id);
        // console.log("Doll_Data = ", doll);

        // Convert seconds to Time
        BuildTimeOBJ = new Date(doll.buildTime * 1000);
        hours = BuildTimeOBJ.getUTCHours()
        minutes = BuildTimeOBJ.getUTCMinutes()
        seconds = BuildTimeOBJ.getSeconds()
        BuildTimeString = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');

        // Data to HTML
        let doll_data = `
            <b>Name: </b>${doll.codename}<br>
            <b>ID: </b>${doll.id}<br>
            <b>Type: </b>${doll.type.toUpperCase()}<br>
            <b>Rank: </b>${"&#9734;".repeat(doll.rank)}<br>
            <b>BuildTime: </b>${BuildTimeString}<br>
            <b>Skins: </b>${doll.skins.length}
        `;

            if (favorite === true) {
                $('#Doll_Data_favorite').html(doll_data);
            }
            else if (buildTime === true) {
                $('#Doll_Data_BuildTime').html(doll_data);
            }
            else {
                $('#Doll_Data').html(doll_data);
            }
    }


    let reset_html_doll_data = function (favorite = false, buildTime = false) {
        // Data to HTML
        let doll_data = `
            <b>Name: </b>No Data<br>
            <b>ID: </b>No Data<br>
            <b>Type: </b>No Data<br>
            <b>Rank: </b>No Data<br>
            <b>BuildTime: </b>No Data<br>
            <b>Skins: </b>No Data
        `;

        if (favorite === true) {
            $('#Doll_Data_favorite').html(doll_data);
        }
        else if (buildTime === true) {
            $('#Doll_Data_BuildTime').html(doll_data);
        }
        else {
            $('#Doll_Data').html(doll_data);
        }
    }


    // TODO: Remove unneeded function (Example)
    // Example Script
    let example = function () {
        const g36 = gfcore.dolls.find(({codename}) => codename === 'G36');
        g36.level = 70;
        g36.dummyLink = 3;
        g36.favor = 50;
        console.log("Doll G36: ", g36.stats);
        var skins = g36.skins;
        skins.forEach(function (skin) {
            console.log(skin.name);
        });


        const equip = gfcore.equips.find(({buildTime}) => buildTime === 2100);
        console.log("Equipment BT = 2100: ", equip.stats);


        const DJMAXSEHRA = gfcore.fairies.find(({codename}) => codename === 'DJMAXSEHRA');
        DJMAXSEHRA.skillLevel = 7;
        console.log("Fairy DJMAXSEHRA: ", DJMAXSEHRA.skill);

        gfcore.dolls.forEach(function (tdoll)
        {
            console.log(tdoll.type + " - " + tdoll.codename, tdoll);
        });
    }



    // ---------- Local Storage stuff ----------
    // Write the Favorite T-Dolls Array to Local Storage
    let _setLocalStorage = function() {
        console.log("Save Favorited T-Dolls to Local Storage");
        // console.log('favorite_doll_ids[]', favorite_doll_ids);
        localStorage.setItem('favorite_doll_ids', JSON.stringify(favorite_doll_ids));  // localStorage.setItem('key', 'value')
    };


    let _addFavoriteDoll = function(id){
        // console.log('Added favorite T-Doll with ID = ' + id);
        if (!favorite_doll_ids.includes(id)) {
            favorite_doll_ids.push(id);  // Add the ID to the end of Array
            _setLocalStorage();
            get_dolls_by_type(selected_type_favorited, true)
            M.toast({html: 'T-Doll Favorited', displayLength: 2000, classes: 'grey_gfl'})
        }
        else {
            // console.error("Not Added favorite T-Doll with ID = " + id + " because of duplicate.")
            M.toast({html: 'T-Doll already Favorited', displayLength: 2000, classes: 'grey_gfl'})
        }
    };


    let _deleteFavoriteDoll = function(id){
        // console.log("Remove favorite T-Doll with ID = ", id);
        if(confirm('Remove this T-Doll?')) {
            for(let i = 0; i < favorite_doll_ids.length; i++){
                if ( favorite_doll_ids[i] === id) {
                    favorite_doll_ids.splice(i, 1);    // Delete the element with Index 'I" from the Array
                }
            }
            _setLocalStorage();
            get_dolls_by_type(selected_type_favorited, true)
            reset_html_doll_data(true)
            M.toast({html: 'T-Doll removed from Favorites', displayLength: 2000, classes: 'grey_gfl'})
        }
    };



    // ---------- Global Function returns (outside name : inside name) ----------
    return {
        init: init,
        get_loaded_dynamically: get_loaded_dynamically,
        example: example,
        get_dolls_by_type: get_dolls_by_type,
        get_dolls_by_buildTime: get_dolls_by_buildTime,
        reset_html_doll_data: reset_html_doll_data,
    };
}();