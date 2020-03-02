import database from '../../src/database';

export default function truncate() {
  return Promise.all(
    Object.keys(database.connection.models).reverse().map(key => {
      return database.connection.models[key].destroy({
        //truncate: true,
        where: {},
        force: true,
      });
    })
  );
}
