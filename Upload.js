import path from "path";
import * as crypto from "crypto";
import sharp from "sharp";
import fs from "fs";

class UploadUtils {
    static toMegabytes(bytes) {
        return bytes / (1024 * 1024);
    }

    static fileSizeLimit = 4; // 4 MB (default)

    static allowedFormats = [];

    static setAllowedFormats(formats) {
        UploadUtils.allowedFormats = formats;
    }

    static generateUniqueFileName(originalFileName) {
        const timestamp = Date.now();
        const randomString = crypto.randomBytes(16).toString('hex');
        const extension = path.extname(originalFileName);
        return `${timestamp}_${randomString}${extension}`;
    }

    static async convertToWebp(imagePath) {
        try {
            const webpPath = imagePath.replace(/\.\w+$/, '.webp');
            await sharp(imagePath).toFile(webpPath);
            return true;
        } catch (error) {
            console.error("Error converting to webp:", error);
            return false;
        }
    }
    static async uploadFile(req, fileSizeLimit = UploadUtils.fileSizeLimit, convertToWebp = false) {
        try {
            const { image } = req.files;

            const fileSizeInMB = UploadUtils.toMegabytes(image.size);
            if (fileSizeInMB > fileSizeLimit) {
                throw new Error("File size exceeds the allowed limit.");
            }

            const uniqueFileName = UploadUtils.generateUniqueFileName(image.name);
            const imagePath = path.join('uploads', uniqueFileName);

            await image.mv(imagePath);

            let fileUrl;
            if (convertToWebp) {
                const webpImagePath = imagePath.replace(/\.\w+$/, '.webp');
                await UploadUtils.convertToWebp(imagePath);
                fs.unlinkSync(imagePath); // Eski orijinal dosyayı sil
                fileUrl = path.join('uploads', path.basename(webpImagePath)); // Webp dosya URL'si
            } else {
                fileUrl = path.join('uploads', path.basename(imagePath)); // Orijinal dosya URL'si
            }

            // Sunucu URL'sini oluştur
            const serverUrl = req.protocol + '://' + req.get('host'); // Sunucu URL'si (HTTP veya HTTPS)

            // Dosya URL'sini oluştur
            const protocol = convertToWebp ? 'webp' : req.protocol.slice(0, -1);
            fileUrl = path.join(serverUrl, fileUrl).replace(/\\/g, '/'); // Eğer çalışma ortamı Windows ise, ters bölü işaretlerini düzelt

            return { success: true, fileUrl: fileUrl };
        } catch (error) {
            return { error: { message: "Error handling file upload", error: error } };
        }
    }


}

export default UploadUtils;
