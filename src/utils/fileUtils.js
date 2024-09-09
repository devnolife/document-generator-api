const fs = require('fs');
const path = require('path');

/**
 * Membuat direktori jika belum ada.
 * @param {string} dirPath - Path dari direktori yang akan dibuat.
 */
const createDirectoryIfNotExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true }); // Membuat direktori secara rekursif jika belum ada
  }
};

/**
 * Menyimpan file dengan nama unik di direktori yang diberikan.
 * @param {string} dirPath - Path dari direktori tempat menyimpan file.
 * @param {Buffer} fileBuffer - Buffer file yang akan disimpan.
 * @param {string} fileExtension - Ekstensi file (misalnya, 'docx', 'pdf').
 * @returns {string} - Path file yang disimpan.
 */
const saveFileWithUniqueName = (dirPath, fileBuffer, fileExtension) => {
  // Pastikan direktori ada
  createDirectoryIfNotExists(dirPath);

  // Buat nama file unik berdasarkan timestamp
  const timestamp = Date.now();
  const fileName = `report_${timestamp}.${fileExtension}`;

  // Simpan file
  const filePath = path.join(dirPath, fileName);
  fs.writeFileSync(filePath, fileBuffer);

  return filePath;
};

/**
 * Memeriksa apakah file ada pada path yang diberikan.
 * @param {string} filePath - Path dari file yang akan diperiksa.
 * @returns {boolean} - True jika file ada, false jika tidak.
 */
const fileExists = (filePath) => {
  return fs.existsSync(filePath);
};

module.exports = {
  createDirectoryIfNotExists,
  saveFileWithUniqueName,
  fileExists,
};
