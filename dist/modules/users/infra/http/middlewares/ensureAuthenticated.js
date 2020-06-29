"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var AppError_1 = __importDefault(require("@shared/errors/AppError"));
var jsonwebtoken_1 = require("jsonwebtoken");
var authConfig_1 = __importDefault(require("@config/authConfig"));
function ensureAuthenticated(request, resonse, next) {
    var authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError_1.default('JWT token is missing');
    }
    var _a = authHeader.split(' '), token = _a[1];
    try {
        var decoded = jsonwebtoken_1.verify(token, authConfig_1.default.jwt.secret);
        var sub = decoded.sub;
        request.user = {
            id: sub,
        };
        return next();
    }
    catch (_b) {
        throw new AppError_1.default('JWT token is invalid, please log in again.', 401);
    }
}
exports.default = ensureAuthenticated;
