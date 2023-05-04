const jsreport = require('../config/jsreportInstance');
const path = require("path");
const fs = require("fs");

async function generateReport(reportType, fileName, template, data) {
  try {
    // Inicializa jsreport
  //  await jsreport.init();
    
    // Crea un objeto de configuración para jsreport
    const reportConfig = {
      template: {
        name: template,
        engine: 'handlebars',
        recipe: reportType,
        content: fs.readFileSync(path.join(__dirname, '../views/reports/'+template), 'utf8'),
      },
      data: { data },
      options: {
        preview: false
      }
    };

    // Genera el reporte con jsreport
    const report = await jsreport.render(reportConfig);

    // Devuelve el reporte con los headers adecuados para que se descargue como un archivo
    return {
      headers: {
        'Content-Disposition': `attachment; filename=${fileName}`
      },
      buffer: report.content
    };
  } catch (error) {
    console.log(`Error al generar el reporte: ${error}`);
    throw new Error('Error al generar el reporte');
  } finally {
   // await jsreport.close();
  }
}

module.exports = { generateReport };