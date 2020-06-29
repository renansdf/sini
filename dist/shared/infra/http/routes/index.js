"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = require("express");
var users_routes_1 = __importDefault(require("@modules/users/infra/http/routes/users.routes"));
var sessions_routes_1 = __importDefault(require("@modules/users/infra/http/routes/sessions.routes"));
var passport_routes_1 = __importDefault(require("@modules/passports/infra/http/routes/passport.routes"));
var ensureAuthenticated_1 = __importDefault(require("@modules/users/infra/http/middlewares/ensureAuthenticated"));
var routes = express_1.Router();
routes.use('/users', users_routes_1.default);
routes.use('/sessions', sessions_routes_1.default);
routes.use('/passports', ensureAuthenticated_1.default, passport_routes_1.default);
exports.default = routes;
