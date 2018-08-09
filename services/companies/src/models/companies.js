import uuid from 'uuid/v4';

const schema = client => () => ({
  companies: {
    create: async (params = {}) => {
      const p = { ...params, uuid: uuid() };
      return await client.table('companies').insert(p).returning('*');
    },
    find: async ({ id }) => (await client.select().table('companies').where({ id })),

    findAll: async () => (await client.select().table('companies')),

    remove: async ({ id }) => (await client.table('companies').where({ id }).del()),

    removeAll: async () => (await client.del().table('companies')),

    upsert: async (params = {}, { id }) => (await client.table('companies').where({ id }).update(params).returning('*')),
  }
});

export default schema;
