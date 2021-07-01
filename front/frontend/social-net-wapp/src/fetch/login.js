const loginReq = async (user) => {
    const { email, password } = user;
    const postOpt = {
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            email:email,
            password:password
        })
    }
    const response = await fetch('http://localhost:3000/login', postOpt);
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

export default loginReq;

