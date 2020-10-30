let MaterialDateTimePicker = function () {
    // ---------- Global Variables & Stuff ----------
    let myDate = new Date(1970,1,1,0,0,0,0); // our baseline Date (00:00:00)





    // ---------- Button Stuff ----------







    // ---------- Function Stuff ----------
    let init = function () {
        console.log("baseline Date = ", _dateTimetoSeconds(myDate))
        console.log("baseline Date: HH:MM:SS", _dateTimetoString(myDate))

        _getInputDate()
        GirlsFrontlineCoreAPI.get_dolls_by_buildTime(_dateTimetoSeconds(myDate));
    }


    let showTimePicker = function () {
        cordova.plugins.DateTimePicker.show({
            mode: "time",
            titleText: "Build Time",
            date: myDate,
            success: function (newDate) {
                // Handle new time.
                _setInputDate(newDate);
                GirlsFrontlineCoreAPI.get_dolls_by_buildTime(_dateTimetoSeconds(newDate));
            }
        })
    }


    let _getInputDate = function () {
        let buildTime_input = $('#tdoll_BuildTime').val()
        console.log("buildTime_input", buildTime_input)
        let [hours, minutes, seconds] = buildTime_input.split(':');
        myDate.setHours(parseInt(hours))
        myDate.setMinutes(parseInt(minutes))
        myDate.setSeconds(parseInt(seconds))
        console.log("myDate: HH:MM:SS", _dateTimetoString(myDate))
        console.log("myDate.getTime()", _dateTimetoSeconds(myDate))
    }


    let _setInputDate = function (date_input) {
        myDate = date_input
        $('#tdoll_BuildTime').val(_dateTimetoString(myDate))
    }


    let _dateTimetoString = function (date_input) {
        return date_input.getHours().toString().padStart(2, '0') + ":" + date_input.getMinutes().toString().padStart(2, '0') + ":" + date_input.getSeconds().toString().padStart(2, '0');
    }


    let _dateTimetoSeconds = function (date_input) {
        return (date_input.getTime() - 2674800000) / 1000;
    }





    // ---------- Global Function returns (outside name : inside name) ----------
    return {
        init: init,
        showTimePicker: showTimePicker,
    };
}()
