const request = require('request');
request.get({
  url: 'https://api.api-ninjas.com/v1/cats',
  headers: {
    'X-Api-Key': 'etIh2Zl310SQO2MkPLqG9EbthRiy1xugFITUyn0l'
  },
}, function(error, response, body) {
  if(error) return console.error('Request failed:', error);
  else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
  else console.log(body)
});