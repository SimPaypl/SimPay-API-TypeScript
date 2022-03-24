"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbProviderID = exports.DbProvider = void 0;
var DbProvider;
(function (DbProvider) {
    DbProvider["PLAY"] = "play";
    DbProvider["PLUS"] = "plus";
    DbProvider["ORANGE"] = "orange";
    DbProvider["T_MOBILE"] = "t-mobile";
})(DbProvider = exports.DbProvider || (exports.DbProvider = {}));
var DbProviderID;
(function (DbProviderID) {
    DbProviderID[DbProviderID["ORANGE"] = 1] = "ORANGE";
    DbProviderID[DbProviderID["PLUS"] = 2] = "PLUS";
    DbProviderID[DbProviderID["PLAY"] = 3] = "PLAY";
    DbProviderID[DbProviderID["T_MOBILE"] = 4] = "T_MOBILE";
})(DbProviderID = exports.DbProviderID || (exports.DbProviderID = {}));
