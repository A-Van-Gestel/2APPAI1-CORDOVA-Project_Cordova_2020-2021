let MaterialDateTimePicker = function () {
    // ---------- Global Variables & Stuff ----------
    let myDate = new Date(1970,1,1,0,0,0,0); // our baseline Date (00:00:00)


    // Cache DOM for performance
    let $tdoll_BuildTime = $('#tdoll_BuildTime');





    // ---------- Function Stuff ----------
    let init = function () {
        // console.log("baseline Date = ", _dateTimetoSeconds(myDate))
        // console.log("baseline Date: HH:MM:SS", dateTimetoString(myDate))

        getInputDate()
        GirlsFrontlineCoreAPI.get_dolls_by_buildTime(_dateTimetoSeconds(myDate));
        if (device.platform === "browser") {
            $tdoll_BuildTime.addClass("timepicker")
                .parent().addClass("timepicker-color-gfl");
            $('.timepicker').timepicker({
                defaultTime: '00:20',
                twelveHour: false,
                onOpenStart: null,
                onCloseStart: null
            });
        }
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
                GirlsFrontlineCoreAPI.reset_html_doll_data(undefined,true);
            }
        })
    }


    let getInputDate = function () {
        let buildTime_input = $tdoll_BuildTime.val()
        // console.log("buildTime_input", buildTime_input)
        let [hours, minutes, seconds] = buildTime_input.split(':');
        myDate.setHours(parseInt(hours))
        myDate.setMinutes(parseInt(minutes))
        myDate.setSeconds(parseInt(seconds))
        // console.log("myDate: HH:MM:SS", dateTimetoString(myDate))
        // console.log("myDate.getTime()", _dateTimetoSeconds(myDate))
    }


    let _setInputDate = function (date_input = myDate) {
        myDate = date_input
        $tdoll_BuildTime.val(dateTimetoString(myDate))
    }


    let dateTimetoString = function (date_input) {
        return date_input.getHours().toString().padStart(2, '0') + ":" + date_input.getMinutes().toString().padStart(2, '0') + ":" + date_input.getSeconds().toString().padStart(2, '0');
    }


    let _dateTimetoSeconds = function (date_input) {
        return (date_input.getTime() - 2674800000) / 1000;
    }

    let materializecss_TimePicker = function () {
        let time = $tdoll_BuildTime.val();
        $tdoll_BuildTime.val(time + ":00")
        getInputDate()
        GirlsFrontlineCoreAPI.get_dolls_by_buildTime(_dateTimetoSeconds(myDate));
        GirlsFrontlineCoreAPI.reset_html_doll_data(undefined,true);
    }





    // ---------- Global Function returns (outside name : inside name) ----------
    return {
        init: init,
        getInputDate: getInputDate,
        showTimePicker: showTimePicker,
        dateTimetoString: dateTimetoString,
        materializecss_TimePicker: materializecss_TimePicker,
    };
}()
