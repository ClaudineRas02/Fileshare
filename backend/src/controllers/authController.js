import { login } from "../services/authService.js";

export async function loginController(req, res, next) {
  try {
    const user = await login(req.body);
    req.session.userId = user.id;

    res.json({
      ok: true,
      message: "Connexion réussie",
      user: user.id
    });
  } catch (error) {
    next(error);
  }
}

export function logoutController(req, res) {
  req.session.destroy(() => {
    res.json(
      {
        message:"utilisateur déconnecté"
      }
    )
  })
}

export async function meController(req,res) {
    if(!req.session.userId){
      return res.status(401).json({
        message:"Utilisateur non connecté"
      })
    }

    return res.status(200).json({
      ok:true,
      id: req.session.userId
    })
    
}
