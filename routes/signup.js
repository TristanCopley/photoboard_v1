let express = require('express');
const bcrypt = require("bcrypt");
let router = express.Router();
let users = require('../mockDB.js'); // Where db should be

/* GET users listing. */
router.get('/', function(req, res) {

  res.render('login-signup/signup', {

    title: 'Join Photoboard'

  });

});

router.post('/', async (req, res) => {

  let invalidFormError = '';
  let firstNameColor = 'lightgrey';
  let lastNameColor = 'lightgrey';
  let emailColor = 'lightgrey';
  let passwordColor = 'lightgrey';
  let confirmPasswordColor = 'lightgrey';
  let classCodeColor = 'lightgrey';

  if (req.body.firstName.length < 1) { invalidFormError = 'First name is not filled out.';
    firstNameColor = 'red';}

  if (req.body.lastName.length < 1) {
    lastNameColor = 'red';
    if (invalidFormError !== '') {
      invalidFormError = 'Multiple invalid forms.'
    } else {
      invalidFormError = 'Last name is not filled out.'
    } }

  if (req.body.email < 6) {
    emailColor = 'red';
    if (invalidFormError !== '') {
      invalidFormError = 'Multiple invalid forms.'
    } else {
      invalidFormError = 'Your email is not filled out.'
    } } else {
    if (!(req.body.email.includes('@') && req.body.email.includes('.'))) {
      emailColor = 'red';
      if (invalidFormError !== '') {
        invalidFormError = 'Multiple invalid forms.'
      } else {
        invalidFormError = 'Email is invalid' } } }

  if (req.body.password.length < 5) {
    passwordColor = 'red';
    if (invalidFormError !== '') {
      invalidFormError = 'Multiple invalid forms.'
    } else {
      invalidFormError = 'Your password is too short.'
    } }

  if (req.body.confirmPassword !== req.body.password || req.body.confirmPassword < 5) {
    confirmPasswordColor = 'red';
    if (invalidFormError !== '') {
      invalidFormError = 'Multiple invalid forms.'
    } else {
      invalidFormError = 'Your passwords do not match'
    } }

  if (req.body.classCode.length !== 5) {
    classCodeColor = 'red';
    if (invalidFormError !== '') {
      invalidFormError = 'Multiple invalid forms.'
    } else {
      invalidFormError = 'That class does not exist.'
    } }

  if( invalidFormError !== '') return res.render('login-signup/signup', {

    title: 'Join Photoboard',
    signup_error: invalidFormError,

    populateFirstName: req.body.firstName,
    populateLastName: req.body.lastName,
    populateEmail: req.body.email,
    populatePassword: req.body.password,
    populateConfirmPassword: req.body.confirmPassword,
    populateClassCode: req.body.classCode,

    firstNameColor: firstNameColor,
    lastNameColor: lastNameColor,
    emailColor: emailColor,
    passwordColor: passwordColor,
    confirmPasswordColor: confirmPasswordColor,
    classCodeColor: classCodeColor

    });

  try {

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    let user = {

      email: req.body.email,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      classes: req.body.classCode

    };

    console.log(user) // Used for testing purposes

    users.push(user)

    return res.redirect('/');

  } catch {

    return res.render('login-signup/signup', {

      title: 'Join Photoboard',
      signup_error: 'An error occurred while creating account. Please try again.'

    });

  }

});

module.exports = router;

// Unused file so far // Some of this code was refactored from a previous project so code might be out of place potentially until we write more
