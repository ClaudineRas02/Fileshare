import { saveFile } from "../models/fileModel.js";

export async function savefileService(fileInfo) {
    return await saveFile(fileInfo)
}