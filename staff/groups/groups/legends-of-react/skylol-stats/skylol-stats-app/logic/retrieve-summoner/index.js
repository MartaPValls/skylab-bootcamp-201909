function retrieveSummoner(query, callback) {
    //validate.string(query)
    //validate.string.notVoid('query', query)
    validate.function(callback)

    query=query.split(' ').join('%20')
    call('GET', undefined,'https://skylabcoders.herokuapp.com/proxy?url=https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + query+'?api_key='+'RGAPI-bdd9804b-3c57-4771-a115-29636cc6d157 ', undefined, function (result) {
        if (result.status){
            callback(new Error(result.status.message))
        }else{
            callback(undefined, result)
        }           
        }       
)};



// // https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Bonnie%20Mcmurray

// // https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/_WiUZj3QaaFGq-Ioj073fHaiAUNRZibJHqZXxDGk78_s2kc

// var miInit = { method: 'GET',
// headers: {},
// cache: 'default' };



// fetch('https://skylabcoders.herokuapp.com/proxy?url=https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Martita%20Dinamita?api_key=RGAPI-e37053db-c5d7-4914-b52a-2c9ad00bd9a4',miInit)
// .then(function(response) {
// return response.text();
// })