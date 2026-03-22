import { savefileService } from "../services/fileService.js";

export async function uploadController(req, res, next) {
  try {

    if (!req.file) {
      return res.status(400).json({ message: "Aucun fichier" });
    }

    const result = await savefileService({
      userId: req.session.userId,
      title: req.body.title,
      file_path: req.file.path,
      file_type: req.file.mimetype,
      description: req.body.description
    });

    res.json({
      ok: true,
      file: result
    });

  } catch (error) {
    next(error);
  }    
}