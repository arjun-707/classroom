const glob = require("glob")

exports.initRoutes = app => {
  const routers = glob.sync(root_path(`/routes/*.route.js`));
  routers.forEach(route => require(route)(app));
}