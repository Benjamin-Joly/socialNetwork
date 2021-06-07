const getUsers = async () => {
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
         const response = await fetch('http://localhost:3000/users', postOpt);
         const data = await response.json();
         console.log(data);
         return data;
    }
}
//err
export default getUsers;