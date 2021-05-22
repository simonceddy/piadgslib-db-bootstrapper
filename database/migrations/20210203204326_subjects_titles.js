
exports.up = function(knex) {
  return knex.schema.createTable('subjects_titles', function(table) {
    table.integer('subject_id').unsigned().references('subjects.id')
    table.integer('title_id').unsigned().references('titles.id')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('subjects_titles');
};
