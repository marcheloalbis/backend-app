const fs = require("fs");
const jsreport = require("jsreport");
const path = require("path");

async function generateReport(templateName, data, reportType) {
  try {
    // Lee el contenido del archivo HTML que contiene el template
    const template = fs.readFileSync(path.join(__dirname, "templates", `${templateName}.html`), "utf-8");
    
    // Crea un objeto con los datos a renderizar
    const requestData = {
      data: data,
      reportType: reportType
    };
    
    // Inicializa el motor de jsreport
    const jsreportInstance = jsreport();
    
    // Genera el reporte
    const result = await jsreportInstance.init().then(() => {
      return jsreportInstance.render({
        template: {
          content: template,
          engine: "handlebars",
          recipe: reportType // Usa el tipo de reporte indicado en la llamada a la función
        },
        data: requestData
      });
    });

    // Devuelve el reporte generado
    return result.content;
    
  } catch (error) {
    console.log("Error generating report:", error);
  }
}

module.exports = generateReport;
