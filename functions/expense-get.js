const faunadb = require("faunadb");
// initialize faunaDB client with our secret
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
  domain: "db.fauna.com",
  scheme: "https",
});

const q = faunadb.query;

exports.handler = async function (event) {
  const expense = JSON.parse(event.body);
  try {
    const res = await client.query(
      q.Get(q.Match(q.Index("expense_by_id"), expense.id))
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: res,
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
