module.exports = () => {
    return {
      "httpPort": 3001,
      "httpsPort": 0,
      "allowLocalFilesAccess": true,
      "templatingEngines": {
        "ejs": {
          "enabled": true
        }
      },
      "logger": {
        "console": {
          "transport": "console",
          "level": "debug"
        }
      },
      "extensions": {
        "chrome-pdf": {
          "timeout": 60000
        }
      }
    };
  };
  