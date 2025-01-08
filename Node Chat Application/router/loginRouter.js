// external imports
const express = require("express");
const router = express.Router();

// internal imports
const { getLogin, login, logout } = require("../controller/loginController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const {
  doLoginValidators,
  doLoginValidationHandler,
} = require("../middlewares/login/loginValidator");
const { redirectLoggedIn } = require("../middlewares/common/checkLogin");

// set page title
const set_title = "Login";

// login page
router.get("/", decorateHtmlResponse(set_title), redirectLoggedIn, getLogin);
router.post(
  "/",
  decorateHtmlResponse(set_title),
  doLoginValidators,
  doLoginValidationHandler,
  login
);

// logout route
router.delete("/", logout);

module.exports = router;
