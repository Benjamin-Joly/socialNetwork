import loginReq from '../utils/login';

const signupReq = async (firstName, lastName, position, email, password) => {
    const postOpt = {
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            firstName:firstName.value,
            lastName:lastName.value,
            position:position.value,
            email:email.value,
            password:password.value
        })
    }
    const response = await fetch('http://localhost:3000/signup', postOpt);
    const data = await response.text();
    return data;
};

export default signupReq;