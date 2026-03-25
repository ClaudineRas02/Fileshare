import { getFileBytoken, incrementAccess } from "../models/accessModel.js";

export async function getFileService(token){
    return await getFileBytoken(token)
}

export async function incrementAccessService(token) {
    await incrementAccess(token)
}