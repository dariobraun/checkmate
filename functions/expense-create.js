const faunadb = require("faunadb");
// initialize faunaDB client with our secret
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
  domain: "db.fauna.com",
  scheme: "https",
});

const q = faunadb.query;

exports.handler = async function (event) {
  const data = JSON.parse(event.body);
  console.log(data);
  try {
    await client.query(
      q.Create(q.Collection("expenses"), { data: { ...data } })
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Successfully fetched expense",
      }),
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
