import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('avatar').notNullable();
    table.integer('level').defaultTo(0);
    table.integer('money').defaultTo(5000);
    table.string('job').defaultTo('none');
    table.string('dad').defaultTo('none');
    table.string('mom').defaultTo('none');
    table.string('children').defaultTo('none');
    table.string('married').defaultTo("none");
    table.integer('terrain').defaultTo(0);
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('users');
}