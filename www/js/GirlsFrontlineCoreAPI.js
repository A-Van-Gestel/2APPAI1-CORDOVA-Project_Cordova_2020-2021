let GirlsFrontlineCoreAPI = function () {
    let init = function () {
    };

    let example = function () {
        const g36 = gfcore.dolls.find(({codename}) => codename === 'G36');
        g36.level = 70;
        g36.dummyLink = 3;
        g36.favor = 50;
        console.log("Doll G36: ", g36.stats);
        var skins = g36.skins;
        skins.forEach(function (skin)
        {
            console.log(skin.name);
        });


        const equip = gfcore.equips.find(({buildTime}) => buildTime === 2100);
        console.log("Equipment BT = 2100: ", equip.stats);


        const DJMAXSEHRA = gfcore.fairies.find(({codename}) => codename === 'DJMAXSEHRA');
        DJMAXSEHRA.skillLevel = 7;
        console.log("Fairy DJMAXSEHRA: ", DJMAXSEHRA.skill);
    }

    return {
        init: init,
        example: example,
    };
}();