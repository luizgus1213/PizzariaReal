module.exports = {
  publicPath: "/digital-menu",
  outputDir: "../digital-menu-build",
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Menu Real";
      return args;
    });
  },
};
