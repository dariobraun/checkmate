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
  try {
    await client.query(
      q.Create(q.Collection("categories"), { data: { ...data } })
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Successfully created category",
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
