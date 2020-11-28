let Sorting_methods = function () {
    // TODO: Add setting to select default sort method
    // ---------- Function Stuff ----------
        // By ID
        let array_index_0_number = function(a, b) {
            return a[0] - b[0];
        }


        // By name
        let array_index_1_string = function(a, b) {
            return a[1].localeCompare(b[1]);
        }



    // ---------- Global Function returns (outside name : inside name) ----------
    return {
        array_index_0_number: array_index_0_number,
        array_index_1_string: array_index_1_string,
    };
}();