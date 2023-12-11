const axios = require('axios');

function harperSaveMessage(message, username, room) {
  const dbUrl = process.env.HARPERDB_URL;
  const dbPw = process.env.HARPERDB_PW;

  // Check if required environment variables are available
  if (!dbUrl || !dbPw) {
    return Promise.reject(new Error('HarperDB URL or password is missing.'));
  }

  // Prepare the data for the HTTP POST request
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

  // Configuration for Axios request
  const config = {
    method: 'post',
    url: dbUrl,
    headers: {
      'Content-Type': 'application/json',
      Authorization: dbPw,
    },
    data: data,
  };

  // Return a promise for async handling
  return new Promise((resolve, reject) => {
    // Send the HTTP POST request using Axios
    axios(config)
      .then(function (response) {
        // Resolve with the JSON string representation of the response data
        resolve(JSON.stringify(response.data));
      })
      .catch(function (error) {
        // Reject with the error if there's a problem with the request
        reject(error);
      });
  });
}

module.exports = harperSaveMessage;
