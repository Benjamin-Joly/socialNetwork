const loginReq = async (mail, pw) => {
    const postOpt = {
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            email:mail.value,
            password:pw.value
        })
    }
    const response = await fetch('http://localhost:3000/login', postOpt);
    console.log(response);
    const data = await response.json();
    return data;
};

export default loginReq;

