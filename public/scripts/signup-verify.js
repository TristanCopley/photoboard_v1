/*
function checkForm() {

    let data = {

        firstName: document.getElementById('signup-input-firstName').value,
        lastName: document.getElementById('signup-input-lastName').value,
        username: document.getElementById('signup-input-username').value,
        password: document.getElementById('signup-input-password').value,
        confirmPassword: document.getElementById('signup-input-confirm-password').value,
        classCode: document.getElementById('signup-input-class-code').value

    };

   if( !(document.getElementById('signup-input-firstName').value.length > 1) ) document.getElementById('signup-input-firstName').style.borderBottom = '1px solid red';
    if( !(document.getElementById('signup-input-lastName').value.length > 1) ) document.getElementById('signup-input-lastName').style.borderBottom = '1px solid red';
    if( !(document.getElementById('signup-input-username').value.length === 7) ) document.getElementById('signup-input-username').style.borderBottom = '1px solid red';
    if( !(document.getElementById('signup-input-password').value.length > 3) ) document.getElementById('signup-input-password').style.borderBottom = '1px solid red';
    if( (document.getElementById('signup-input-password').value !== document.getElementById('signup-input-confirm-password').value) || (document.getElementById('signup-input-confirm-password').value === '') ) {

        document.getElementById('signup-input-password').style.borderBottom = '1px solid red';
        document.getElementById('signup-input-confirm-password').style.borderBottom = '1px solid red';

    }
    if( document.getElementById('signup-input-class-code').value.length !== 7 ) document.getElementById('signup-input-class-code').style.borderBottom = '1px solid red';

    fetch("signup", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(res => {
        console.log("Request complete! response:", res);
    });

}
*/
// Ethan if you can figure out how to make the lines under the input forms highlight
// red when they are incorrect and stop a POST from being sent that would be cool