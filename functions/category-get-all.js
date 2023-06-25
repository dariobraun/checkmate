const faunadb = require('faunadb');
// initialize faunaDB client with our secret
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
  domain: 'db.fauna.com',
  scheme: 'https',
});

const q = faunadb.query;

exports.handler = async function () {
  try {
    const res = await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index('all_categories'))),
        q.Lambda((x) => q.Select(['data'], q.Get(x)))
      )
    );

    return {
      statusCode: 200,
      // res: { data: Category[]}
      body: JSON.stringify(res),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: error.statusCode,
      body: JSON.stringify({
        error,
      }),
    };
  }
};
