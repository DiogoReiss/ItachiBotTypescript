import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('backpack', table => {
    table.increments('id').primary();
    table.string('gun').notNullable().defaultTo('none');
    table.integer('seed').notNullable().defaultTo(0);
    table.integer('bank').notNullable().defaultTo(0);
    table.integer('marijuana').notNullable().defaultTo(0);

    table.integer('backpack_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('backpack');
}