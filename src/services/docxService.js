const PizZip = require('pizzip');
const { parseStringPromise, Builder } = require('xml2js');

// Fungsi untuk mengganti placeholder secara dinamis dan menambahkan gambar
const generateReport = async (templateBuffer, imageBuffer, data) => {
  const zip = new PizZip(templateBuffer);
  const documentXml = zip.file('word/document.xml').asText();
  const modifiedDocumentXml = await replacePlaceholdersAndAddImage(documentXml, imageBuffer, data);
  zip.file('word/document.xml', modifiedDocumentXml);

  const imagePath = `word/media/${data.imageName}`;
  zip.file(imagePath, imageBuffer);

  await addImageRelationship(zip, 1, imagePath);

  return zip.generate({ type: 'nodebuffer' });
};

// Fungsi untuk mengganti placeholder berdasarkan data dinamis
const replacePlaceholdersAndAddImage = async (documentXml, imageBuffer, data) => {
  const parsedXml = await parseStringPromise(documentXml);

  parsedXml['w:document']['w:body'][0]['w:p'].forEach(paragraph => {
    paragraph['w:r']?.forEach(run => {
      if (run['w:t']) {
        let textContent = run['w:t'][0];
        const placeholders = textContent.match(/{[^}]+}/g); // Temukan semua {variabel}
        if (placeholders) {
          placeholders.forEach(placeholder => {
            const key = placeholder.replace(/{|}/g, ''); // Hilangkan tanda kurung {}
            if (data[key]) {
              textContent = textContent.replace(placeholder, data[key]);
            }
          });
          run['w:t'][0] = textContent; // Update nilai dalam XML
        }
      }
    });
  });

  const builder = new Builder();
  return builder.buildObject(parsedXml);
};

// Fungsi untuk menambahkan relasi gambar
const addImageRelationship = async (zip, imageId, imagePath) => {
  const relsPath = 'word/_rels/document.xml.rels';
  const relsXml = zip.file(relsPath).asText();
  const parsedRels = await parseStringPromise(relsXml);

  parsedRels.Relationships.Relationship.push({
    $: {
      Id: `rId${imageId}`,
      Type: 'http://schemas.openxmlformats-officedocument/2006/relationships/image',
      Target: imagePath,
    },
  });

  const builder = new Builder();
  const newRelsXml = builder.buildObject(parsedRels);
  zip.file(relsPath, newRelsXml);
};

module.exports = {
  generateReport,
};
