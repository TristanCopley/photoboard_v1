function checkForm() {
   if( !(document.getElementById('signup-input-firstName').value.length > 1) ) document.getElementById('signup-input-firstName').style.borderBottom = '1px solid red';
    if( !(document.getElementById('signup-input-lastName').value.length > 1) ) document.getElementById('signup-input-firstName').style.borderBottom = '1px solid red';
    if( !(document.getElementById('signup-input-username').value.length === 7) ) document.getElementById('signup-input-firstName').style.borderBottom = '1px solid red';
    if( !(document.getElementById('signup-input-password').value.length > 3) ) document.getElementById('signup-input-firstName').style.borderBottom = '1px solid red';


 /*   if(!(req.body.firstName.length > 1 &&
        req.body.lastName.length > 1 &&
        req.body.username.length === 7 &&
        req.body.password.length > 3 &&
        req.body.confirmPassword === req.body.password)
    ) return res.render('login-signup/signup', { title: 'Join Photoboard', signup_error: 'One or more invalid forms.' });
*/
}