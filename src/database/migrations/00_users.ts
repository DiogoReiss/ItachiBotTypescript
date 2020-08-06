import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('avatar').notNullable();
    table.string('dad').nullable();
    table.string('mom').nullable();
    table.string('children').nullable();
    table.boolean('married').notNullable().defaultTo(false);
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('users');
}