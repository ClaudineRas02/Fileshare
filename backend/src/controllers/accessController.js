import { getFileService, incrementAccessService } from "../services/accessService.js";

export async function accessController(req, res, next) {
    try {
        const { token } = req.params
        const file = await getFileService(token)

        if(!file){
            return res.status(404).json({message:"Qr invalide, aucun fichier correspondant"})
        }
        const nb_access = await incrementAccessService(token)

        return res.json({
            ok:true,
            file,
            nb_access
        })

    } catch (error) {
        next(error)
    }
}
