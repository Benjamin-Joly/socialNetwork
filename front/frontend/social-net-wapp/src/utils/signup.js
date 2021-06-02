const signupReq = async (user) => {
    const { fName, lName, position, email, password } = user;
    const postOpt = {
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            firstName:fName,
            lastName:lName,
            position:position,
            email:email,
            password:password
        })
    }
    const response = await fetch('http://localhost:3000/signup', postOpt);
    const data = await response.json();
    if(data.valid === true){
        return data;
    }else{
        const noCanDo = {
            message : data.message,
            valid : data.valid
        }
        return noCanDo;
    }
};

export default signupReq;