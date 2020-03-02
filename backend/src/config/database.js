require('../bootstrap');

module.exports = {
  // dialect: process.env.DB_DIALECT,
  dialect: process.env.NODE_ENV === 'test' ? 'sqlite' : process.env.DB_DIALECT,
  storage: './__tests__/database.sqlite',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
