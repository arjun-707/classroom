const classes = require(root_path('/controllers/class.controller'));

module.exports = app => {

  app.route('/v1/class/list').get(classes.list).post(classes.list);
  app.route('/v1/class/add').post(classes.add);
  app.route('/v1/class/remove').delete(classes.remove);
  app.route('/v1/class/update').put(classes.update);
};