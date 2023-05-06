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
    const expenseToDelete = await client.query(
      q.Get(q.Match(q.Index("expense_by_id"), expense.id))
    );

    console.log(expenseToDelete);

    await client.query(q.Delete(q.Ref("expenses", expenseToDelete.id)));

    return {
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      body: JSON.stringify({
        error,
      }),
    };
  }
};
