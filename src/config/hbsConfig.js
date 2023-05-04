const path = require("path");

module.exports = {
  viewEngine: "hbs",
  extname: '.hbs',
  viewsFolder: path.join(__dirname, "../views"),
  layoutsDir: path.join(__dirname, '../views/layouts'),
  partialsDir: path.join(__dirname, '../views/partials'),
  runtimeOptions:{allowProtoPropertiesByDefault:true,
  allowedProtoMethodsByDefault:true}
};