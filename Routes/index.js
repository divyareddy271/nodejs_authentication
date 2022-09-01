const express = require("express");
const routes = express.Router();
const signin_controller = require("../controllers/signin_controller")
const signup_controller = require("../controllers/signup_controller")
console.log("Router loaded");
routes.get("/sign-up",signup_controller.signup);
routes.post("/sign-up/register",signup_controller.register)
routes.get("/sign-in",signin_controller.signin);
routes.post("/sign-in/create-session",signin_controller.createsession);
routes.get("/",signup_controller.home);



module.exports = routes;