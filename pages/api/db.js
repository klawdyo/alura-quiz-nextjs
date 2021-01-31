import db from '../../db.json';

function Db(request, response) {
  if (request.method === 'OPTIONS') {
    response.status(200).end();
    return;
  }

  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');

  response.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');

  response.json(db);
}

export default Db;
