const express = require('express');
const bodyParser = require('body-parser');
// const winston = require('winston');
const cors = require('cors'); // 跨域
const server = express();
const spawn = require('child_process').spawn;

const config = require('./config'); // 配置
const logger = config.logger;
const HOST = config.HOST;
const PORT = config.PORT;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());

// hook 需选用 x-www-form-urlencoded
server.post('/api/update', (request, response) => {
  if (request) {
    const repoName = request.body.repository.name
    const cmd = `/documents/Gitee/${repoName}`;

    let res = '';
    const process = spawn('sh', ['update.sh', cmd]);
    process.stdout.on('data', function(data) {
      const ds = data.toString();

      console.log(ds);
      logger.info(ds);
      res += ds;
    });

    process.stderr.on('data', function(data) {
      const ds = data.toString();

      console.log(ds);
      logger.error(ds);
    });
    response.json(res);
  }

  // response.json(request.body);
});

server.listen({
  host: HOST,
  port: PORT
}, function() {
  logger.info(`Server is running in http://${HOST}:${PORT}`);
  console.log(`Server is running in http://${HOST}:${PORT}`);
});