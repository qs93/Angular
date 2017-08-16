"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
require("rxjs/Rx");
var HttpsHelpers = (function () {
    function HttpsHelpers(_http) {
        this._http = _http;
    }
    HttpsHelpers.prototype.getaction_test = function (path) {
        return this._http.get(path)
            .map(function (res) {
            return res.json();
        })
            .catch(this._handleError);
    };
    HttpsHelpers.prototype._handleError = function (error) {
        return Observable_1.Observable.throw(error.text() || 'Server error');
    };
    return HttpsHelpers;
}());
exports.HttpsHelpers = HttpsHelpers;
//# sourceMappingURL=HttpsHelpers.js.map