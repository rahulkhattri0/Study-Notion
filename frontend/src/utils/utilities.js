export const tokenPermit = () =>{
    let token = localStorage.getItem("token")
    if(token===null){
        return null
    }
    else{
        token = JSON.parse(localStorage.getItem("token")) 
        if(Date.now() > token.expires){
            localStorage.removeItem("token")
            return null
        }
        else {
            return token.token
        }
    }
}