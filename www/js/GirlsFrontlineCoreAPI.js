// TODO: Remove unneeded code (loaded_dynamically)
// TODO: Remove unneeded function (Example)

let GirlsFrontlineCoreAPI = function () {
    const doll_types = ['hg', 'smg', 'rf', 'ar', 'mg', 'sg']
    // console.log("Types: ", doll_types)
    let loaded_dynamically = false;

    $('#tdoll_selection').on('change', function() {
        let id = this.value;
        console.log("Dropdown: Value = ", this.value);
        if (id !== "") {
            _set_html_doll_data(parseInt(id))
        }
    })

    $('#btns_doll_type').children().on('click', function() {
        let doll_type = $(this).data('type');
        console.log('Button: type = ', doll_type);
        $(this).siblings().addBack().removeClass("active");
        $(this).addClass("active");

        get_dolls_by_type(doll_type.toLowerCase())
    })



    let _init = function () {
        get_dolls_by_type();
    };

    let get_loaded_dynamically = function () {
        _init_script()
        return loaded_dynamically;
    }

    let _init_script = function () {
        $.getScript( "https://unpkg.com/girlsfrontline-core/umd/gfcore.min.js")
            .done(function(script, textStatus, jqxhr) {
                console.log( "GirlsFrontlineCore-API loaded successfully: ", jqxhr.status + " - " + textStatus);
                loaded_dynamically = true;
                console.log("Loaded - done: loaded_dynamically = ", loaded_dynamically)
                $('#GFLC_API_Loaded').html(`<b>GFL-Core API: </b>Loaded`);
                NetworkState.close_modal();
                _init();
            })
            .fail(function(jqxhr, settings, exception) {
                console.error("GirlsFrontlineCore-Api failed to load: ", jqxhr.status + " - " + exception);
                loaded_dynamically =  false;
                console.log("Loaded - fail: loaded_dynamically = ", loaded_dynamically)
                $('#GFLC_API_Loaded').html(`<b>GFL-Core API: </b> ${exception}`);
            })
    };


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


    let get_dolls_by_type = function (input_type = 'hg') {
        console.log("Input: Type = ", input_type)
        try {
            if (doll_types.includes(input_type)) {
                let dolls_by_type = []
                gfcore.dolls.forEach(function (tdoll) {
                    if (tdoll.type === input_type) {
                        // console.log(tdoll.type + " - " + tdoll.codename, tdoll)
                        dolls_by_type.push([tdoll.id, tdoll.codename]);
                    }
                });

                console.log("T-Doll of type = " + input_type, dolls_by_type);
                _set_doll_selection_dropdown(dolls_by_type);
            }
        }
        catch (err) {
            console.error("get_dolls_by_type: Failed")
        }
    }

    let _set_doll_selection_dropdown = function (input_doll_list) {
        $('#tdoll_selection').empty()                  // Empty current dropdown list
            .append("<option value='' disabled selected>Choose a T-Doll</option>");
        input_doll_list.forEach(function (doll) {       // Dynamically add Dolls to the list
            $('#tdoll_selection').append("<option value='" + doll[0] + "'>" + doll[1] + "</option>");
        })
        // Form Selection ReInitialization
        $('select').formSelect();
    }

    let _set_html_doll_data = function (input_id) {
        console.log("Input_ID = ", input_id)
        let doll = gfcore.dolls.find(({id}) => id === input_id);
        console.log("Doll_Data = ", doll);
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
            <b>Skins: </b>${doll.skins.length}<br>
        `;
        $('#Doll_Data').html(doll_data);
    }



    return {
        // init: init,
        // init_script: init_script,
        get_loaded_dynamically: get_loaded_dynamically,
        example: example,
        get_dolls_by_type: get_dolls_by_type,
    };
}();