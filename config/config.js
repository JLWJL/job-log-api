module.exports = {

  'sess': {
    'secret': '127S$121%QHTYW8',
    'resave': false,
    'saveUninitialized': false,
    'cookie': {
      'maxAge': 200000,
    },
  },

  'LOCAL_DB': {
    connectionLimit: 100,
    host: process.env.DOCKER_MYSQL || 'localhost' ,
    user: 'root',
    password: '',
    database: 'job_log',
    multipleStatements: true
  },

  'jwtConfig': {
    'SECRET': 'htawen2231$$!&*11',
  },
};