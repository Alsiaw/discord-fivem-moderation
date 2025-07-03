# 🤖 Alsia Discord Bot

**Alsia**, FiveM sunucuları için geliştirilmiş kapsamlı bir Discord yönetim botudur. Gelişmiş moderasyon sistemi, whitelist yönetimi, oyuncu istatistikleri ve otomatik ceza sistemi ile sunucunuzu profesyonel şekilde yönetmenizi sağlar.

## 🌟 Özellikler

- 🛡️ **Gelişmiş Moderasyon Sistemi** - Ban, mute, uyarı ve ceza yönetimi
- 📋 **Whitelist Yönetimi** - Oyuncu onay/red sistemi
- 📊 **İstatistik Sistemi** - Detaylı oyuncu ve sunucu istatistikleri
- 🔧 **Hex Yönetimi** - Steam hex kontrolü ve blacklist sistemi
- 👥 **Oluşum Sistemi** - Grup ve organizasyon yönetimi
- ⚡ **Otomatik Ceza Sistemi** - Zaman bazlı ceza azaltma
- 🎵 **Spotify Entegrasyonu** - Oyuncu müzik durumu
- 📝 **Kayıt Sistemi** - Detaylı oyuncu kayıt takibi

## 📋 Komut Listesi

### 🔸 Slash Komutlar (/)

| Komut | Açıklama |
|-------|----------|
| `/ban (oyuncu) (sebep)` | Oyuncuyu sunucudan yasaklar |
| `/unban (ID) (sebep)` | Oyuncunun yasağını kaldırır |
| `/forceban (ID) (sebep)` | Zorla yasaklama işlemi |
| `/ban-sorgu (ID)` | Ban bilgilerini sorgular |
| `/perma (oyuncu) (verdiren) (sebep) (kanıt)` | Kalıcı yasaklama |
| `/rolver (oyuncu) (rol)` | Oyuncuya rol verir |
| `/rolal (oyuncu) (rol)` | Oyuncudan rol alır |
| `/seviye (oyuncu/id)` | Oyuncu seviyesini gösterir |
| `/blacklist (ID) (hex) (sebep)` | Blacklist'e ekler |
| `/blacklist-iptal (hex)` | Blacklist'ten çıkarır |
| `/hex-bul (ID)` | Oyuncunun hex adresini bulur |
| `/hex-oyuncular (hex)` | Hex'e ait oyuncuları listeler |
| `/kayıtlar (ID)` | Oyuncu kayıtlarını gösterir |
| `/oluşum-kur (isim) (renk) (boss)` | Yeni oluşum kurar |
| `/etiket-sorgu (#36)` | Etiket bilgilerini sorgular |
| `/sicil-sorgu (etiket-ıd)` | Sicil kayıtlarını gösterir |
| `/spotify (oyuncu/id)` | Spotify durumunu gösterir |
| `/uyarı (oyuncu) (verdiren) (sebep) (kanıt)` | Oyuncuya uyarı verir |
| `/uyarı-iptal (oyuncu)` | Uyarıyı iptal eder |
| `/wlceza (oyuncu) (verdiren) (sebep) (kanıt)` | Whitelist cezası verir |
| `/wlceza-iptal (oyuncu)` | WL cezasını iptal eder |
| `/rolbilgi (rol)` | Rol hakkında bilgi verir |
| `/isim (oyuncu) (isim)` | Oyuncu ismini değiştirir |
| `/isimler (oyuncu)` | Oyuncunun geçmiş isimlerini gösterir |
| `/sil (miktar)` | Belirtilen miktarda mesaj siler |
| `/git (yetkili)` | Yetkili yanına ışınlanır |
| `/afk (sebep)` | AFK moduna geçer |
| `/topkayıt` | En çok kayıt yapanları gösterir |
| `/kanal (seçim)` | Kanal işlemleri |
| `/istatistik (oyuncu)` | Detaylı oyuncu istatistikleri |
| `/ship` | Rastgele eşleştirme |
| `/sd (oyuncu)` | Oyuncu hakkında kısa bilgi |
| `/perm-log (oyuncu)` | Perm geçmişini gösterir |
| `/ip` | Sunucu IP bilgisi |
| `/ts3` | TeamSpeak 3 bilgileri |
| `/sunucu (aktif/bakım)` | Sunucu durumunu değiştirir |
| `/sunucu-veri` | Sunucu verilerini gösterir |
| `/ticket-isim (isim)` | Ticket ismini değiştirir |
| `/ticket-işlem (seçenek) (oyuncu)` | Ticket işlemleri |
| `/ticket-sil` | Ticket'ı siler |
| `/top (seçenek)` | Sıralama listelerini gösterir |
| `/top-kayıt` | Kayıt sıralaması |
| `/toplu-perm-al (rol)` | Toplu perm alma |
| `/tweet (yazı)` | Tweet gönderir |

### 🔸 Prefix Komutlar (.)

| Komut | Açıklama |
|-------|----------|
| `.snipe` | Silinen son mesajı gösterir |

### 🔸 Sağ Tık Komutlar

| Komut | Açıklama |
|-------|----------|
| **Whitelist Onay** | Oyuncuyu whitelist'e onaylar |
| **Whitelist Red** | Whitelist başvurusunu reddeder |
| **Yasaklama** | Hızlı yasaklama işlemi |
| **Hex Ekle** | Oyuncuya hex ekler |
| **İstatistik** | Oyuncu istatistiklerini gösterir |

## 🚀 Kurulum

### Gereksinimler

- [Node.js](https://nodejs.org/) (v16 veya üzeri)
- [MongoDB](https://www.mongodb.com/) veritabanı
- Discord Bot Token
- FiveM Sunucusu (opsiyonel)

### Adım Adım Kurulum

1. **Projeyi İndirin**
   ```bash
   git clone https://github.com/kullaniciadi/alsia-bot.git
   cd alsia-bot
   ```

2. **Bağımlılıkları Yükleyin**
   ```bash
   npm install
   ```

3. **Yapılandırma Dosyalarını Düzenleyin**
   - `config.json` dosyasını düzenleyin
   - `ayarlar.json` dosyasını sunucunuza göre yapılandırın

4. **Botu Başlatın**
   ```bash
   node alsia.js
   ```
   veya
   ```bash
   npm start
   ```

## ⚙️ Yapılandırma

### config.json
```json
{
  "token": "BOT_TOKEN_BURAYA",
  "mongoDB": "MONGODB_BAGLANTI_LINKI_BURAYA"
}
```

### ayarlar.json
Bu dosyada botun tüm ayarlarını yapılandırabilirsiniz:

- **Bot Ayarları**: Sunucu ID, prefix, durum mesajı
- **Yetkiler**: Komut yetkileri ve roller
- **Permler**: Whitelist, yetkili ve diğer roller
- **Log Kanalları**: Tüm işlemler için log kanalları
- **FiveM Ayarları**: Sunucu bilgileri ve entegrasyon

Detaylı yapılandırma için `ayarlar.json` dosyasındaki tüm alanları doldurun.

## 🛠️ Teknik Detaylar

### Kullanılan Teknolojiler

- **Discord.js v14** - Discord API entegrasyonu
- **MongoDB/Mongoose** - Veritabanı yönetimi
- **Five.db** - Yerel veri depolama
- **Canvafy** - Görsel oluşturma
- **Moment.js** - Tarih/saat işlemleri
- **Node-cron** - Zamanlanmış görevler

### Dosya Yapısı

```
alsia-bot/
├── alsia.js                 # Ana bot dosyası
├── ayarlar.json            # Bot yapılandırması
├── config.json             # Token ve DB ayarları
├── package.json            # Proje bağımlılıkları
├── alsia/
│   ├── eventler/           # Bot event'leri
│   └── komutlar/           # Komut dosyaları
│       ├── Slash/          # Slash komutlar
│       ├── Prefix/         # Prefix komutlar
│       └── SağTık/         # Sağ tık komutlar
├── database/               # Veritabanı modelleri
└── croxydb/               # Yerel veri dosyaları
```

## 🔧 Özellikler Detayı

### Moderasyon Sistemi
- Otomatik ceza azaltma sistemi
- Detaylı log kayıtları
- Kanıt sistemi ile ceza verme
- Zaman bazlı ceza yönetimi

### Whitelist Sistemi
- Otomatik hex kontrolü
- Blacklist yönetimi
- Oyuncu onay/red sistemi
- FiveM entegrasyonu

### İstatistik Sistemi
- Mesaj ve ses istatistikleri
- Günlük/haftalık raporlar
- Oyuncu aktivite takibi
- Sıralama listeleri

## 📞 Destek

Herhangi bir sorun yaşarsanız veya öneriniz varsa:

- GitHub Issues bölümünden bildirebilirsiniz
- Discord sunucumuzdan destek alabilirsiniz

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👨‍💻 Geliştirici

**Alsia** - *FiveM Discord Bot*

---

⭐ **Projeyi beğendiyseniz yıldız vermeyi unutmayın!**
