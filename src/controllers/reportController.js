const { generateReport } = require("../utils/reportGenerator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllUsersReportPDF = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    const report = await generateReport("chrome-pdf", "all-users", "userReport.hbs", { users });

    //res.contentType("application/pdf");
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=${report.fileName}`
    });
    
    //console.log(report);
    res.send(report.buffer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to generate report" });
  }
};

const getAllUsersReportExcel = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    const report = await generateReport("xlsx", "all-users", "userReport2.hbs", { users });

    res.contentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.set({
      'Content-Disposition': `attachment; filename=${report.fileName}`
    });

    res.send(report.buffer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to generate report" });
  }
};

module.exports = { getAllUsersReportPDF, getAllUsersReportExcel };
