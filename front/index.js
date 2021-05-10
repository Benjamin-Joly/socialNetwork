const signupInputs = Array.from(document.querySelectorAll('.signup__input'));
const loginInputs = Array.from(document.querySelectorAll('.login__input'));
const signupBtn = document.getElementById('signup-btn');
const loginBtn = document.getElementById('login-btn');

/*
signupInputs.forEach((input) => {
    input.addEventListener('change', (e) => {
        console.log(input.value);
    })
});
*/

signupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    signupInputs.forEach((input) => {
            console.log(input.value);
    });
    signupReq();
})


const signupReq = async () => {
    const [firstName, lastName, email, position, password] = signupInputs;

    const postOpt = {
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            firstName:firstName.value,
            lastName:lastName.value,
            email:email.value,
            position:position.value,
            password:password.value
        })
    }
    const response = await fetch('http://localhost:3000/signup', postOpt);
    if(!response){
        console.log('no response');
    }
    const data = await response;
    if(!data){
        console.log('no data loaded');
    }
};


loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginInputs.forEach((input) => {
            console.log(input.value);
    });
    loginReq();
})

const loginReq = async () => {
    const [email, password] = loginInputs;
    const postOpt = {
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            email:email.value,
            password:password.value
        })
    }
    const response = await fetch('http://localhost:3000/login', postOpt);
    if(!response){
        console.log('no response :(');
    }
    const data = await response;
    if(!data){
        console.log('no data sent');
    }
}
