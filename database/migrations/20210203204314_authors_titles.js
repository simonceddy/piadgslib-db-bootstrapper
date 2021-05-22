
exports.up = function(knex) {
  return knex.schema.createTable('authors_titles', function(table) {
    table.integer('author_id').unsigned().references('authors.id')
    table.integer('title_id').unsigned().references('titles.id')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('authors_titles');
};
