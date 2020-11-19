let GirlsFrontlineCoreAPI = function () {
    // ---------- Global Variables & Stuff ----------
    const doll_types = ['hg', 'smg', 'rf', 'ar', 'mg', 'sg']
    const doll_stat_types = {
        ['armor'] : 'ARMOR',
        ['armorPiercing'] : 'AP',
        ['criticalPercent'] : 'CRIT',
        ['dodge'] : 'EVA',
        ['hit'] : 'ACC',
        ['hp'] : 'HP',
        ['pow'] : 'DMG',
        ['rate'] : 'ROF',
        ['speed'] : 'MOBILITY'
    }

    // Local Storage: Favorite dolls list
    let favorite_doll_ids = [];

    // Cache last selected Type
    let selected_type = "";
    let selected_type_favorited = "";

    // Cache DOM for performance
    let $tabTDollData = $('#tabTDollData');
    let $tabBuildTime = $('#tabBuildTime');
    let $tabFavorite = $('#tabFavorite');
    let $tdoll_selection = $tabTDollData.find('#tdoll_selection');
    let $btns_doll_type = $tabTDollData.find('#btns_doll_type');
    let $btnFloat_favorite = $tabTDollData.find('#btnFloat_favorite');
    let $tdoll_selection_favorite = $tabFavorite.find('#tdoll_selection_favorite');
    let $btns_favorite = $tabFavorite.find('#btns_favorite');
    let $btnFloat_Unfavorite = $tabFavorite.find('#btnFloat_Unfavorite');
    let $tdoll_BuildTime = $tabBuildTime.find('#tdoll_BuildTime');
    let $tdoll_selection_BuildTime = $tabBuildTime.find('#tdoll_selection_BuildTime');
    let $btnFloat_favorite_buildTime = $tabBuildTime.find('#btnFloat_favorite_buildTime');
    let $Doll_Data = $tabTDollData.find('#Doll_Data');
    let $Doll_Data_favorite = $tabFavorite.find('#Doll_Data_favorite');
    let $Doll_Data_BuildTime = $tabBuildTime.find('#Doll_Data_BuildTime');





    // ---------- Button Stuff ----------
    // --- T-Doll Data tab ---
    // Get selected T-Doll data from dropdown
    $tdoll_selection.on('change', function() {
        let id = this.value;
        // console.log("Dropdown: Value = ", this.value);
        if (id !== "") {
            _render_html_doll_data(parseInt(id))
        }
    })


    // T-Doll type button array selection (for dropdown)
    $btns_doll_type.children().on('click', function() {
        let $btn_pressed = $(this);        // Cache pressed button
        let doll_type = $btn_pressed.data('type');
        // console.log('Button: type = ', doll_type);
        $btn_pressed.siblings().addBack().removeClass("active");
        $btn_pressed.addClass("active");

        get_dolls_by_type(doll_type.toLowerCase());
        reset_html_doll_data();
    })


    // Get selected T-Doll data from dropdown and add to Favorites
    $btnFloat_favorite.on('click', function() {
        let id = $tdoll_selection.val();
        // console.log("Favorite Button: adding ID = ", id)
        if (id !== null) {
            _addFavoriteDoll(parseInt(id));
        }
        else {
            console.error("Favorite Button: " + id + " is NaN!");
            M.toast({html: 'No T-Doll selected to Favorite!', displayLength: 2000, classes: 'red accent-4'})
        }
    })


    // Get selected T-Doll data from dropdown and add to Favorites
    $btnFloat_favorite_buildTime.on('click', function() {
        let id = $tdoll_selection_BuildTime.val();
        // console.log("Favorite Button: adding ID = ", id)
        if (id !== null) {
            _addFavoriteDoll(parseInt(id));
        }
        else {
            console.error("Favorite Button: " + id + " is NaN!");
            M.toast({html: 'No T-Doll selected to Favorite!', displayLength: 2000, classes: 'red accent-4'})
        }
    })


    // --- Favorite Tab ---
    // Get selected T-Doll data from favorites dropdown
    $tdoll_selection_favorite.on('change', function() {
        let id = this.value;
        // console.log("Dropdown: Value = ", this.value);
        if (id !== "") {
            _render_html_doll_data(parseInt(id),true)
        }
    })


    // T-Doll type button array favorites selection (for dropdown)
    $btns_favorite.children().on('click', function() {
        let $btn_pressed = $(this);        // Cache pressed button
        let doll_type = $btn_pressed.data('type');
        // console.log('Button: type = ', doll_type);
        $btn_pressed.siblings().addBack().removeClass("active");
        $btn_pressed.addClass("active");

        get_dolls_by_type(doll_type.toLowerCase(), true);
        reset_html_doll_data(true);
    })


    // Get selected T-Doll data from dropdown and add to Favorites
    $btnFloat_Unfavorite.on('click', function() {
        let id = $tdoll_selection_favorite.val();
        // console.log("UnFavorite Button: removing ID = ", id);
        if (id !== null) {
            _deleteFavoriteDoll(parseInt(id));
        }
        else {
            console.error("UnFavorite Button: " + id + " is NaN!");
            M.toast({html: 'No T-Doll selected to Unfavorite!', displayLength: 2000, classes: 'red accent-4'})
        }
    })


    // --- Build Time tab ---
    // Open TimePicker on clicking the Build Time text field
    $tdoll_BuildTime.on('click', function() {
        MaterialDateTimePicker.showTimePicker()
    })


    // Get selected T-Doll data from dropdown
    $tdoll_selection_BuildTime.on('change', function() {
        let id = this.value;
        // console.log("Dropdown: Value = ", this.value);
        if (id !== "") {
            _render_html_doll_data(parseInt(id), undefined, true)
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

        reset_html_doll_data();
        reset_html_doll_data(true,undefined);
        reset_html_doll_data(undefined,true);
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
        // console.log("Build Time = " + input_buildTime);
        try {
            let dolls_by_buildTime = []
            gfcore.dolls.forEach(function (tdoll) {
                    if (tdoll.buildTime === input_buildTime && tdoll.id < 20000 && tdoll.rank !== 7) {
                        // console.log(tdoll.buildTime + " - " + tdoll.codename)
                        dolls_by_buildTime.push([tdoll.id, tdoll.codename]);
                    }
                }
            );

            // console.log("dolls_by_buildTime = ", dolls_by_buildTime)
            if (dolls_by_buildTime.length === 0) {
                M.toast({html: 'No T-Dolls found with selected Build Time.', displayLength: 2000, classes: 'grey_gfl'});
            }
            _set_doll_selection_dropdown(dolls_by_buildTime, undefined, true);
        }
        catch (err) {
            console.error("get_dolls_by_buildTime: Failed:", err)
        }
    }

    // TODO: favorite & buildTime booleans to Selector
    // Sets the T-Doll Dropdown content
    let _set_doll_selection_dropdown = function (input_doll_list, favorite = false, buildTime = false) {
        let selector = undefined;

        if (favorite === true) {
            selector = $tdoll_selection_favorite;
        }
        else if (buildTime === true) {
            selector = $tdoll_selection_BuildTime;
        }
        else {
            selector = $tdoll_selection;
        }

        selector.empty()                  // Empty current dropdown list
            .append("<option value='' disabled selected>Choose a T-Doll</option>");
        input_doll_list.forEach(function (doll) {       // Dynamically add Dolls to the list
            selector.append("<option value='" + doll[0] + "'>" + doll[1] + "</option>");
        })
        // Form Selection ReInitialization
        $('select').formSelect();
    }

    // Rank conversion (nr --> stars)
    let _parse_rank = function (rank) {
        if (rank === 7) {
            return "&#10029;"    // Special
        } else {
            return "&#9733;".repeat(rank);
        }
    }


    // Digimind conversion to table
    let _parse_digimind = function (mindupdate) {
        // Check if mindupdate is 'undefined', if so set to No
        if (mindupdate === undefined) {
            return "No";
        } else {
            // console.log("Digimind = ", digimind_upgrade)
            return `
             <table>
              <tr>
                <td><b>Mod 1: </b>
                    <br>Cores: ${mindupdate[0].core}
                    <br>Fragments: ${mindupdate[0].mempiece}</td>
                <td><b>Mod 2: </b>
                    <br>Cores: ${mindupdate[1].core}
                    <br>Fragments: ${mindupdate[1].mempiece}</td>
                <td><b>Mod 3: </b>
                    <br>Cores: ${mindupdate[2].core}
                    <br>Fragments: ${mindupdate[2].mempiece}</td>
              </tr>
            </table>
        `;
        }
    }


    // Convert buildTime (seconds) to String (HH:MM:SS)
    let _parse_buildtime = function (buildTime) {
        // Convert seconds to Date
        let BuildTimeOBJ = new Date((buildTime - 3600) * 1000);        // -3600 seconds (1 hour) to count for timezone differences in calculations
        return MaterialDateTimePicker.dateTimetoString(BuildTimeOBJ);
    }


    let _parse_armor = function (armor) {
        // Check if Armor is 'undefined', if so set to 0
        if (armor === undefined) {
            return 0;
        } else {
            return armor;
        }
    }


    // Convert to an indexed array containing the correct tags for each tile
    let _parse_formation_buff_tiles = function (effect) {
        let tiles_table = ["", "", "", "", "", "", "", "", ""];
        let tile_doll_center = effect.effectCenter;
        let tiles_doll_buffs = effect.effectPos;

        tiles_doll_buffs.forEach(function (tile) {
            tiles_table[tile - 1] = "buff"      // -1 so array starts at 0
        })
        tiles_table[tile_doll_center -1] = "standing"
        // console.log("tiles_table", tiles_table);
        return tiles_table;
    }


    // Convert Buffs to <p> tags
    let _parse_formation_buffs = function (gridEffect) {
        let tiles_effect_table = ''
        let tiles_doll_effect = gridEffect;
        for (let key in tiles_doll_effect) {
            tiles_effect_table += `<p style="margin: 0"><b>${doll_stat_types[key]}: </b>+${tiles_doll_effect[key]}%</p>`
        }
        return tiles_effect_table;
    }


    // TODO: favorite & buildTime booleans to Selector
    // Sets the T-Doll HTML Data on screen
    let _render_html_doll_data = function (input_id, favorite = false, buildTime = false) {
        let doll = gfcore.dolls.find(({id}) => id === input_id);
        // console.log(doll.codename + "_Data = ", doll);

        // Parse tiles for css classes
        let tiles_table = _parse_formation_buff_tiles(doll.effect);

        // Data to HTML
        let doll_data = `
            <b>Name: </b>${doll.codename}<br>
            <b>ID: </b>${doll.id}<br>
            <b>Type: </b>${doll.type.toUpperCase()}<br>
            <b>Rank: </b>${_parse_rank(doll.rank)}<br>
            <b>BuildTime: </b>${_parse_buildtime(doll.buildTime)}<br>
            <b>Skins: </b>${doll.skins.length}<br>
            <b>Digimind: </b>${_parse_digimind(doll.mindupdate)}

            <h5>Stats</h5>
             <table>
              <tr>
                <td><b>${doll_stat_types['hp']}: </b>${doll.stats.hp}</td>
                <td><b>${doll_stat_types['pow']}: </b>${doll.stats.pow}</td>
                <td><b>${doll_stat_types['hit']}: </b>${doll.stats.hit}</td>
              </tr>
              <tr>
                <td><b>${doll_stat_types['dodge']}: </b>${doll.stats.dodge}</td>
                <td><b>${doll_stat_types['speed']}: </b>${doll.stats.speed}</td>
                <td><b>${doll_stat_types['rate']}: </b>${doll.stats.rate}</td>
              </tr>
              <tr>
                <td><b>${doll_stat_types['armorPiercing']}: </b>${doll.stats.armorPiercing}</td>
                <td><b>${doll_stat_types['criticalPercent']}: </b>${doll.stats.criticalPercent}</td>
                <td><b>${doll_stat_types['armor']}: </b>${_parse_armor(doll.stats.armor)}</td>
              </tr>
            </table>

            <h5>Formation Buff</h5>
            <div class="row">
                <div class="col s6">
                    <table class="tile_grid_table">
                        <tbody>
                            <tr>
                                <td class="${tiles_table[6]}"></td> <!-- Tile 7 -->
                                <td class="${tiles_table[7]}"></td> <!-- Tile 8-->
                                <td class="${tiles_table[8]}"></td> <!-- Tile 9 -->
                            </tr>
                            <tr>
                                <td class="${tiles_table[3]}"></td> <!-- Tile 4 -->
                                <td class="${tiles_table[4]}"></td> <!-- Tile 5 -->
                                <td class="${tiles_table[5]}"></td> <!-- Tile 6 -->
                            </tr>
                            <tr>
                                <td class="${tiles_table[0]}"></td> <!-- Tile 1 -->
                                <td class="${tiles_table[1]}"></td> <!-- Tile 2 -->
                                <td class="${tiles_table[2]}"></td> <!-- Tile 3 -->
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="col s6">
                    <p style="margin: 0"><b>Buffs: </b>${doll.effect.effectType.toUpperCase()}</p>
                    ${_parse_formation_buffs(doll.effect.gridEffect)}
                </div>
            </div>
        `;

            if (favorite === true) {
                $Doll_Data_favorite.html(doll_data);
            }
            else if (buildTime === true) {
                $Doll_Data_BuildTime.html(doll_data);
            }
            else {
                $Doll_Data.html(doll_data);
            }
    }


    // TODO: favorite & buildTime booleans to Selector
    let reset_html_doll_data = function (favorite = false, buildTime = false) {
        // Data to HTML
        let doll_data = `
            <b>Name: </b>No Data<br>
            <b>ID: </b>No Data<br>
            <b>Type: </b>No Data<br>
            <b>Rank: </b>No Data<br>
            <b>BuildTime: </b>No Data<br>
            <b>Skins: </b>No Data<br>
            <b>Digimind: </b>No Data
            
            <h5>Stats</h5>
             <table style="width:100%">
              <tr>
                <td><b>${doll_stat_types['hp']}: </b>0</td>
                <td><b>${doll_stat_types['pow']}: </b>0</td>
                <td><b>${doll_stat_types['hit']}: </b>0</td>
              </tr>
              <tr>
                <td><b>${doll_stat_types['dodge']}: </b>0</td>
                <td><b>${doll_stat_types['speed']}: </b>0</td>
                <td><b>${doll_stat_types['rate']}: </b>0</td>
              </tr>
              <tr>
                <td><b>${doll_stat_types['armorPiercing']}: </b>0</td>
                <td><b>${doll_stat_types['criticalPercent']}: </b>0</td>
                <td><b>${doll_stat_types['armor']}: </b>0</td>
              </tr>
            </table>
            
            <h5>Formation Buff</h5>
            <div class="row">
                <div class="col s6">
                    <table class="tile_grid_table">
                        <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div class="col s6">
                    <p style="margin: 0"><b>Buffs: </b>No Data</p>
                    <p style="margin: 0"><b>Effect: </b>No Data</p>
                </div>
            </div>
        `;

        if (favorite === true) {
            $Doll_Data_favorite.html(doll_data);
        }
        else if (buildTime === true) {
            $Doll_Data_BuildTime.html(doll_data);
        }
        else {
            $Doll_Data.html(doll_data);
        }
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
        get_dolls_by_type: get_dolls_by_type,
        get_dolls_by_buildTime: get_dolls_by_buildTime,
        reset_html_doll_data: reset_html_doll_data,
    };
}();