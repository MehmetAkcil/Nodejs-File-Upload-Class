# UploadUtils Project

Bu proje, dosya yükleme ve dönüştürme işlemleri için bir yardımcı sınıf olan UploadUtils'u içerir.

## Kurulum

Proje bağımlılıklarını yüklemek için aşağıdaki adımları takip edin:

```bash
npm install
```

## Kullanım

UploadUtils sınıfı, dosya yükleme ve dönüştürme işlemleri için kullanılabilir.

```
import UploadUtils from './UploadUtils';

// Yükleme işlemi için izin verilen dosya formatlarını ayarlayın (opsiyonel)
const allowedFormats = ['.jpg', '.jpeg', '.png'];
UploadUtils.setAllowedFormats(allowedFormats);

// Dosya yükleme işlemi
const fileUploadResult = await UploadUtils.uploadFile(req, 4, true);

if (fileUploadResult.success) {
  console.log('Dosya başarıyla yüklendi.');
  console.log('Dosya URL\'si:', fileUploadResult.fileUrl);
} else {
  console.error('Dosya yükleme hatası:', fileUploadResult.error.message);
}

```

-   `setAllowedFormats(formats)`: İzin verilen dosya formatlarını belirlemek için kullanılır. Eğer bu yöntem çağrılmazsa, tüm dosya formatları kabul edilir.
-   `uploadFile(req, fileSizeLimit, convertToWebp)`: Dosya yükleme ve dönüştürme işlemlerini gerçekleştirir.
    -   `req`: Express isteği
    -   `fileSizeLimit`: İzin verilen dosya boyutu limiti (varsayılan: 4 MB)
    -   `convertToWebp`: Dosyayı `webp` formatına dönüştürmek için kullanılır (varsayılan: false)


## Örnek Proje

Bu projenin tamamı [GitHub](https://github.com/example/upload-utils) üzerinde bulunabilir.

## Katkılar

Her türlü katkıya açığız. Lütfen GitHub üzerinden "Pull Request" göndererek katkıda bulunun.

## Lisans


Yukarıdaki `README.md` dosyasında proje kurulumu, kullanımı ve diğer önemli bilgiler açıklanmıştır. Lütfen `LICENSE` dosyasını da oluşturup, proje lisansını belirlemeyi unutmayın.

Örnek proje için "example/upload-utils" olarak belirtilen URL, kendi GitHub deposunuzun URL'si ile değiştirilmelidir. Bu sayede diğer kullanıcılar, gerçek projenizi doğrudan GitHub üzerinden görebilir ve kullanabilirler.
