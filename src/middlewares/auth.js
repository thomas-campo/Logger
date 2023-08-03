export const privacity = (privaticyType) =>{
    return (req,res,next)=>{
        const {user} = req.session;
        switch(privaticyType){
            case "PRIVATE":
                if(user) next();
                else res.redirect('/login');
                break;
            case "NO_AUTHENTICATED":
                if(!user) next();
                else res.redirect('/products');
                break;
        }
    }
}