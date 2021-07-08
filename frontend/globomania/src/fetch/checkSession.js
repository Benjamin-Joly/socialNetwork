const checkSession = async (token) => {   
        const myHeader = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${token}`
          }
         const postOpt = {
             method:'GET',
             headers: myHeader
         }
         const response = await fetch('http://localhost:3000/valid', postOpt);
         const data = await response.json();
         if(data === true){
             return true;
         }else{
             return false;
         }
}

export default checkSession;