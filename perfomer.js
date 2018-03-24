;(function (global, factory, undefined) {
    
    global.performance ? factory(global, true) : factory(global);

})(typeof window !== "undefined" ? window : this, function(global, noApi){
        
    function _perfomer (opt) {
        this.perfomTime = global.performance.timing;
        this.startTime = global.performance.timing.navigationStart; 
        
        this._initial(opt)
    };

    _perfomer.prototype._initial = function (opt) {

    }

    _perfomer.prototype.whiteTime = function () {
        
        // var script = document.createElement("script");
        // script.src = "";

    }

    _perfomer.prototype.dnsTime = function () {
        var time = this.perfomTime.domainLookupEnd - this.perfomTime.domainLookupStart;
        return time ? false : time + "ms"; 
    }
    
    _perfomer.prototype.handleTime = function () {
        return (this.perfomTime.loadEventStart - this.startTime)  + "ms";
    }


    function _extend (obj_1, obj_2) {     
        _each(obj_2).forEach(function (key, i) {
            obj_1[key] = obj_2[key];
        })
    } 
    var _each = Object.keys || function (obj) {
        var keys = new Array();
        typeof obj === "object" && (function () {
            for (key in obj) {
                obj.hasOwnProperty(key) && keys.push(key);
            }
        })()
        return keys;
    }

    !('perfomer' in global) && (global.perfomer = _perfomer);
})