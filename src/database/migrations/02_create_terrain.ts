import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('user_terrain', table => {
    table.integer('id').primary();
    table.integer('terrain_level')
      .notNullable()
      .references('terrain')
      .inTable('user_inventory')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.integer('terrain_owner')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.integer('seed')
      .defaultTo(0)

    table.timestamp('planted_at')
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('user_terrain');
}