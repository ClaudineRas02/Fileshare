import { savefileService } from "../services/fileService.js";
import { createQrcodeService } from "../services/qrService.js";
import { generateToken } from "../utils/token.js";
import { env } from "../config/env.js";
import QRCODE from "qrcode"

export async function uploadController(req, res, next) {
  try {

    if (!req.file) {
      return res.status(400).json({ message: "Aucun fichier" });
    }
    
    //1. sauvegarde metadonnées fichier dans BD
    const result = await savefileService({
      userId: req.session.userId,
      title: req.body.title,
      file_path: req.file.path,
      file_type: req.file.mimetype,
      description: req.body.description
    });

    //2. gen token
    const token = generateToken()

    //3. crée et sauv qrcode du fichier créé
    const qr = await createQrcodeService({
        fileId: result.id_file,
        token
    })

    //creation de codeqr visuelle-> url(pc et phone meme reseau)
    const url = `${env.appBaseUrl}/q/${token}`
    const qrcode = await QRCODE.toDataURL(url)


    res.json({
      ok: true,
      file: result,
      qr,
      qrcode
    });

  } catch (error) {
    next(error);
  }    
}
