import request from 'request';
import cptmetro from '../../cptmetro-crawler';

exports.handler = function(event, context, callback) {
  var run = async function() {
    const metro = await cptmetro.metro();
    const cptm = await cptmetro.cptm()

    callback(null, {
      statusCode: 200,
      ContentType: "application/json; charset=utf-8",
      body: JSON.stringify({metro, cptm})
    });
  }
  run()
}
