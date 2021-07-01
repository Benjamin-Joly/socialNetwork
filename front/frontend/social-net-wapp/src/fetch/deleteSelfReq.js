const deleteSelfReq = async () => {
    const token = sessionStorage.session;
    const myHeader = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
     const deleteOpt = {
        method:'DELETE',
        headers: myHeader
     }
     const response = await fetch('http://localhost:3000/user/self', deleteOpt);
     const data = await response.json();
     return data;
};

export default deleteSelfReq;