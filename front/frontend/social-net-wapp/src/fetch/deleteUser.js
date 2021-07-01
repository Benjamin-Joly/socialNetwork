const deleteUser = async (array) => {
    const token = sessionStorage.session;
    const myHeader = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
     const deleteOpt = {
        method:'DELETE',
        headers: myHeader,
        body: JSON.stringify({
            'user' : array
        })
     }
     const response = await fetch('http://localhost:3000/admin/users', deleteOpt);
     const data = await response.text();
     return data;
};

export default deleteUser;