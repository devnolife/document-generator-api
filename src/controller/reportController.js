const { generateReport } = require('../services/docxService');
const path = require('path');
const fs = require('fs');
const moment = require('moment');
require('moment-hijri');

const generateReportHandler = async (req, res) => {
  try {
    // Dapatkan template dan gambar
    const templatePath = path.resolve(__dirname, '../../template.docx');
    const imagePath = path.resolve(__dirname, '../../images.jpg');
    const templateBuffer = fs.readFileSync(templatePath);
    const imageBuffer = fs.readFileSync(imagePath);

    // Dapatkan tanggal sekarang dalam format Masehi dan Hijriyah
    const currentMasehiDate = moment().format('DD MMMM YYYY') + ' M'; // Contoh: "03 September 2024 M"
    const currentHijriyahDate = moment().iFormat('iD iMMMM iYYYY') + ' H'; // Contoh: "29 Shafar 1446 H"

    // Data dinamis dari request body
    const data = {
      no: req.body.no || '12345',
      nama: req.body.nama || 'John Doe',
      imageName: 'gambar.png', // Nama gambar yang digunakan di placeholder
      tanggal: moment().format('DD/MM/YYYY'), // Tanggal sekarang format umum
      tanggal_masehi: currentMasehiDate, // Tanggal Masehi
      tanggal_hijriyah: currentHijriyahDate, // Tanggal Hijriyah
    };

    // Panggil service untuk generate report
    const reportBuffer = await generateReport(templateBuffer, imageBuffer, data);

    // Simpan file hasil di folder 'generated_reports'
    const outputDir = path.resolve(__dirname, '../../generated_reports');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    const timestamp = Date.now();
    const outputFilePath = path.join(outputDir, `report_${timestamp}.docx`);
    fs.writeFileSync(outputFilePath, reportBuffer);

    // Kirimkan respon dengan link untuk download
    res.json({
      message: 'Report generated successfully',
      downloadLink: `/download/${path.basename(outputFilePath)}`,
    });
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  generateReportHandler,
};
