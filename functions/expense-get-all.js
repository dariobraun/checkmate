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
        q.Paginate(q.Match(q.Index('all_expenses'))),
        q.Lambda((x) => q.Select(['data'], q.Get(x)))
      )
    );

    const dateFormattedRes = res.data.map((expense) => ({
      ...expense,
      date: expense.date.date,
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: dateFormattedRes,
      }),
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
