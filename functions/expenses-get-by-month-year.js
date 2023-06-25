const faunadb = require('faunadb');
// initialize faunaDB client with our secret
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
  domain: 'db.fauna.com',
  scheme: 'https',
});

const q = faunadb.query;

exports.handler = async function (event) {
  const date = new Date(event.queryStringParameters.dateInput);
  const month = date.getMonth() + 1; // Account for index based months;
  const year = date.getFullYear();

  try {
    const res = await client.query(
      // Map each object returned by Filter with Lambda function
      q.Map(
        // Filter through page returned by Paginate using Lambda function
        q.Filter(
          q.Paginate(q.Match(q.Index('all_expenses'))),
          q.Lambda(
            'doc',
            // Let takes an object of variables and an expression, returns evaluated expression (AND)
            q.Let(
              {
                entry: q.Get(q.Var('doc')),
                date: q.Select(['data', 'date'], q.Var('entry')),
                month: q.Month(q.ToTime(q.Var('date'))),
                year: q.Year(q.ToTime(q.Var('date'))),
              },
              q.And(
                q.Equals(q.Var('month'), month),
                q.Equals(q.Var('year'), year)
              )
            )
          )
        ),
        // Lambda function for mapping Filter return values
        q.Lambda((x) =>
          // Overwrite "date" value with a stringified one by merging original object
          // with a new one containing only the "date" property with stringified value
          q.Merge(q.Select(['data'], q.Get(x)), {
            date: q.ToString(q.Select(['data', 'date'], q.Get(x))),
          })
        )
      )
    );

    return {
      statusCode: 200,
      // res: { data: Expense[]}
      body: JSON.stringify(res),
    };
  } catch (error) {
    console.log('FAUNADB ERROR:', error.description);
    return {
      statusCode: error.statusCode,
      body: JSON.stringify({
        error,
      }),
    };
  }
};
