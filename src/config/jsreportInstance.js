const jsreport = require('jsreport')({
    httpPort: process.env.REPORT_PORT, // Cambia el puerto por defecto a 3001
  });

jsreport.init();

module.exports = jsreport;
