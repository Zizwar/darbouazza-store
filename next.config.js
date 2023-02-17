const path = require("path");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  experimental: {
    externalDir:
      true |
      {
        enabled: true,
        silent: true,
      },
  },
};
