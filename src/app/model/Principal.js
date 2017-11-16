"use strict";
/**
 * Created by Eike on 26.06.2017.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var User = (function () {
    function User(name, roles) {
        this.name = name;
        this.roles = roles;
    }
    User.prototype.getName = function () {
        return this.name;
    };
    User.prototype.getRoles = function () {
        return this.roles;
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=ActiveUser.js.map