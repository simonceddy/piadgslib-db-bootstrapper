const config = {
  client: process.env.DB_CLIENT || 'sqlite3',
  connection: () => ({
    filename: process.env.SQLITE_FILENAME || 'storage/database.sqlite'
  }),
  useNullAsDefault: true,
};

module.exports = config;
