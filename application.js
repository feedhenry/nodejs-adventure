var connect = require('connect'), http = require('http');
function get(path, cb) {
  return function(req, res, next) {
    if (req.method != 'GET' || req.url != path) return next();
    cb(req, res, next);
  }
};
connect()
.use(get('/sys/info/ping', function(req, res, next){
  res.end(JSON.stringify("OK"));
}))
.use(connect.static('public'))
.listen(process.env.FH_PORT || 3000); 