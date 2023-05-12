const faunadb = require("faunadb");
// initialize faunaDB client with our secret
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
  domain: "db.fauna.com",
  scheme: "https",
});

const q = faunadb.query;

exports.handler = async function (event) {
  const category = JSON.parse(event.body);
  try {
    // Delete Category
    await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index("category_by_id"), category.id)),
        q.Lambda((x) => q.Delete(x))
      )
    );
    //Delete expenses in Category
    await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index("expenses_by_category_id"), category.id)),
        q.Lambda((x) => q.Delete(x))
      )
    );

    return {
      statusCode: 200,
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
