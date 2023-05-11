const faunadb = require("faunadb");
// initialize faunaDB client with our secret
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
  domain: "db.fauna.com",
  scheme: "https",
});

const q = faunadb.query;

exports.handler = async function () {
  try {
    const res = await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index("all_categories"))),
        q.Lambda((x) => q.Get(x))
      )
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: res.data,
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
