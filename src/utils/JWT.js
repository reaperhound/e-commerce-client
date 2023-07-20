import jwt from "jwt-decode"

export function setUserToLocal(token){
    const decoded = jwt(token);
    // console.log(decoded);
    localStorage.setItem('user', JSON.stringify(decoded) )
}

export function getUserFromLocal(){
    const user = localStorage.getItem('user');
    if(!user){
        return false
    }
    return user
}