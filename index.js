const QRCode = require("qrcode");

// Data meja
const dataMeja = {
  id: "meja_1",
  nomor: 1,
  kapasitas: 4,
  lokasi: "Lantai 1 - dekat jendela"
};

// Ubah ke string
const dataString = JSON.stringify(dataMeja);

// Generate QR Code ke file PNG
QRCode.toFile("meja1.png", dataString, {
  color: {
    dark: "#000000",
    light: "#ffffff"
  }
}, (err) => {
  if (err) throw err;
  console.log("QR Code meja berhasil dibuat!");
});
