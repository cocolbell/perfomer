;(function (global, factory, undefined) {
    
    global.performance ? factory(global, true) : factory(global);

})(typeof window !== "undefined" ? window : this, function(global, noApi){
    
    /**
     * @constructor
     * @param {Object} opt 
     */
    function _perfomer (opt) {
        this.perfomTime = global.performance.timing;
        this.startTime = global.performance.timing.navigationStart; 

        this._initial(opt);
    };

    _perfomer.prototype._initial = function (opt) {
        var _default = {

        };
        opt && (this.def = _extend(_default, opt));
    }

    /**
     * @description 获取白屏时间
     */
    _perfomer.prototype.getWhiteTime = function () {
        
        // var script = document.createElement("script");
        // script.src = "";
        return (this.perfomTime.domLoading - this.startTime) + "ms";
    }

    /**
     * @description 获取DNS查询时间
     */
    _perfomer.prototype.getDnsTime = function () {
        var time = this.perfomTime.domainLookupEnd - this.perfomTime.domainLookupStart;
        return time ? false : time + "ms"; 
    }
    
    /**
     * @description 获取可操作时间
     */
    _perfomer.prototype.getHandleTime = function () {
        return (this.perfomTime.domInteractive  - this.startTime) + "ms";
    }

    /**
     * @description 获取整个页面的加载时间
     */
    _perfomer.prototype.getLoadTime = function () {
        return (this.perfomTime.loadEventStart - this.startTime) + "ms"
    }

    /**
     * @description 获取一个包含所有时间的对象
     * @param {Boolean} isJson  
     */
    _perfomer.prototype.getData = function (isJson) {
        var _this = this;
        var _generateData = function () {
            return {
                whiteTime : _this.getWhiteTime(),
                dnsTime : _this.getDnsTime(),
                handleTime : _this.getHandleTime(),
                loadTime : _this.getLoadTime()
            }
        }
        
        return isJson ? (function(){
            return JSON.stringify(_generateData());
        })() : (function(){
            return _generateData();
        })()
    }

    _perfomer.prototype.send = function (url, opt) {
        var _this = this;
        opt && (function(){
            if(!(opt.callback && typeof opt.callback == 'function')) {
                throw 'opt.callback is not a fucntion' 
                return;
            }
        }())
        var _default = {
            method : "POST",
            data : _this.getData(true),
            callback : function (res) {
                console.log("perfomer send success");
            },
        };
        _extend(_default, opt);
        var xhr = _xhr();
        xhr.open(_default.method, url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log(xhr.responseText);
                _default.callback(xhr.responseText)
            } else {
                console.warn("perfomer send error");
            }
        }
        xhr.send(_default.data);
    }

    /**
     * @description 自定义浅拷贝函数，覆盖相同属性
     * @param {Object} 目标对象
     * @param {Object} 被拷贝对象
     * @returns {Object} 目标对象
     */
    var _extend = function (obj_1, obj_2) {     
        if(obj_1 && obj_2)
        _each(obj_2).forEach(function (key, i) {
            obj_1[key] = obj_2[key];
        })
        return obj_1;
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
    var _xhr = function () {
        if (typeof XMLHttpRequest != "undefined") {
            return new XMLHttpRequest();
        } else if (typeof ActiveXObject != "undefined") {
            if (typeof arguments.callee.activeXString != "string") {
                var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"];
                for (var i = 0, len = versions.length; i < len; i++) {
                    try {
                        var xhr = new ActiveXObject(versions[i]);
                        arguments.callee.activeXString = versions[i];
                        return xhr;
                    } catch (e) {
                        //跳过
                    }
                }
            }
            return new ActiveXObject(arguments.callee.activeXString);
        } else {
            console.warn("您的浏览器并不支持此插件")
        }
    }

    !('perfomer' in global) && (global.perfomer = _perfomer);
})
