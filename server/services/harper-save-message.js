const axios = require('axios');

function harperSaveMessage(message, username, room) {
  const dbUrl = process.env.HARPERDB_URL;
  const dbPw = process.env.HARPERDB_PW;


  if (!dbUrl || !dbPw) {
    return Promise.reject(new Error('HarperDB URL or password is missing.'));
  }


  const data = JSON.stringify({
    operation: 'insert',
    schema: 'realtime_chat_app',
    table: 'messages',
    records: [
      {
        message,
        username,
        room,
      },
    ],
  });


  const config = {
    method: 'post',
    url: dbUrl,
    headers: {
      'Content-Type': 'application/json',
      Authorization: dbPw,
    },
    data: data,
  };


  return new Promise((resolve, reject) => {

    axios(config)
      .then(function (response) {

        resolve(JSON.stringify(response.data));
      })
      .catch(function (error) {

        reject(error);
      });
  });
}

module.exports = harperSaveMessage;
