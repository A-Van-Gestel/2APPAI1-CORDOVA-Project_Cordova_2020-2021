let Sorting_methods = function () {
    // TODO: Add setting to select default sort method
    // ---------- Function Stuff ----------
        let array_index_0 = function(a, b) {
            return a[0].localeCompare(b[0]);
        }


        let array_index_1 = function(a, b) {
            return a[1].localeCompare(b[1]);
        }



    // ---------- Global Function returns (outside name : inside name) ----------
    return {
        array_index_0: array_index_0,
        array_index_1: array_index_1,
    };
}();