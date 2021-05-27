const checkAuthor = async () => {
    const token = sessionStorage.getItem('session');
    if(!token || token === 'undefined'){
        console.log('invalid session');
        sessionStorage.clear();
    }else{
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
         const data = await response.text();
         const auth = data.split('__')[1];
         console.log(auth);
         if(auth === false){
             return true;
         }else{
            return false;
         }
    }
}

export default checkAuthor;