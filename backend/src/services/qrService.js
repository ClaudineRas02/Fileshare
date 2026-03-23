import { createQrcode } from "../models/qrModel.js";

export async function createQrcodeService(qrInfo) {
    return await createQrcode(qrInfo)
}