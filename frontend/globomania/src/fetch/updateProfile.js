const updateProfile = async (firstName, lastName, userId, position) => {
    const token = sessionStorage.session;
    const myHeader = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
     const deleteOpt = {
        method:'PUT',
        headers: myHeader,
        body: JSON.stringify({
            'firstName' : firstName,
            'lastName' : lastName,
            'userId' : userId,
            'position': position
        })
     }
     const response = await fetch(`http://localhost:3000/user/self`, deleteOpt);
     const data = await response.json();
     return data;
}
export default updateProfile;