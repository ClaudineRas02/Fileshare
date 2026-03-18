import { login } from '../services/authService.js'
export async function loginController(req,res,next){
    try {
        const user = login(req.body)
        req.session.userId = user.id

        res.json(
            {
                ok: true,
                message: 'Connexion réussie',
                user:user.id
             });

    } catch (error) {
        next(error)
    }





    if(!user){
        
    }
}

export function logoutController(req,resn,next){

}

export async function meController(req,res,next) {
    
}