const  getUserDatas  = () => {
    const user = sessionStorage.getItem('user');
    if(user){
        const userDatas = user.split(' ');
        return userDatas;
    }
}

export default getUserDatas;