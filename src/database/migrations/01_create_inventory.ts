import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('user_inventory', table => {
    table.integer('id').primary();
    table.integer('terrain').defaultTo(0);
    table.string('gun').notNullable().defaultTo('none');
    table.integer('seed').notNullable().defaultTo(0);
    table.integer('marijuana').notNullable().defaultTo(0);

    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('user_inventory');
}