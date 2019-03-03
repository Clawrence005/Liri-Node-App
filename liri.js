

/////////////////////////////////////

require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var request = require('request');

// var =[concert-this, spotify - this - song, movie - this, do -what - it - says];


// Make it so liri.js can take in one of the following commands:
var searchCommand = process.argv[2];
var parameter = process.argv[3];
// const args = process.argv.slice(2);

// Possible commands for this liri app
function switchCase() {

    switch (searchCommand) {

        case "concert-this":
            bandsInTown(parameter);
            console.log("concert-this" + parameter);
            break;

        case "spotify-this-song":
            spotifySong(parameter);
            console.log("spotify-this-song" + parameter);
            break;

        case "movie-this":
            movieInfo(parameter);
            console.log("movie-this" + parameter);
            break;

        case "do-what-it-says":
            readTxtFile();
            console.log("do-what-it-says");
            break;

        // case "do-what-it-says":
        //     spotifySong(parameter);
        //     console.log("spotify-this-song" + parameter);
        //     break;

        default:
            console.log("Invalid Instruction. Refer to readMe for instructions")
            break;

    }
};

function bandsInTown(parameter) {

    // // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
    var queryURL = "https://rest.bandsintown.com/artists/" + parameter + "?app_id=codingbootcamp";

    //i couldnt get this api to work exactly
    // var queryURL = "https://rest.bandsintown.com/artists/" + parameter + "/events?app_id=codingbootcamp";

    // axios.get(queryURL, function (error, response, body) {
    //     console.log("band1");

    //     if (!error && response.statusCode === 200) {
    //     } else {
    //         console.log("band2");
    //     }
    // }).then(function (response) {
    //     var band = JSON.parse(response);
    //     console.log(response);
    //     console.log(band);
    // })

    axios.get(queryURL)
        .then(function (response) {
            var jsonData = response.data;


            // var JS = JSON.parse(body);
            // // for (i = 0; i < JS.length; i++)

            // for (i = 0; i < jsonData.length; i++) {
            //     console.log("1" + response.data);
            //     console.log("2" + JS);
            //     console.log("3" + jsonData);
            // }
            var bandLog =
                ` 
Bands In Town      
~~~~~~~~~~~~~~~~~~~~~~~~~~~~            
Artist Name: ${response.data.name}
Upcoming Events: ${response.data.upcoming_event_count}

~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        `;
            fs.appendFile('log.txt', bandLog, function (err) {
                if (err) throw err;
                console.log(bandLog);
            })
        });
}

//////////
function spotifySong(parameter) {
    // var search = parameter;

    var searchTrack;
    if (parameter === undefined) {
        searchTrack = "The Sign ace of base";
    } else {
        searchTrack = parameter;
    }

    spotify.search({
        type: 'track',
        query: searchTrack
    }, function (error, data) {
        if (error) {
            console.log('Error occurred: ' + error);
            return;
        } else {
            // this format is pushing blank space?????
            // var spotifyLog2 = [
            //     console.log("\n-----------------------begin spotify----------------------------\n"),
            //     console.log("Artist: " + data.tracks.items[0].artists[0].name),
            //     console.log("Song: " + data.tracks.items[0].name),
            //     console.log("Preview: " + data.tracks.items[3].preview_url),
            //     console.log("Album: " + data.tracks.items[0].album.name),
            //     console.log("\n----------------------end spotify-----------------------------\n"),
            // ].join("\n\n");

            var spotifyLog =

                ` 
Spotify     
~~~~~~~~~~~~~~~~~~~~~~~~~~~~            
Artist Name: ${data.tracks.items[0].artists[0].name},
Language: ${data.tracks.items[0].name},
Plot: ${ data.tracks.items[3].preview_url},
Actors: ${data.tracks.items[0].album.name},
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        `;
            fs.appendFile('log.txt', spotifyLog, function (err) {
                if (err) throw err;
                console.log(spotifyLog);
            });
        }
    });

}

/////////
function movieInfo(parameter) {
    var movie = parameter;
    console.log("movie : " + parameter);
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    if (movie === undefined) {
        queryUrl = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy";
    }
    else {
        queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    }


    request(queryUrl, function (error, results, body) {
        var movieData = JSON.parse(body);
        if (error) {
            console.log('Error occurred: ' + error);
            return;
        }
        else {
            var movieLog =
                `
OMBD Movie Database
~~~~~~~~~~~~~~~~~~~~~~~~~~~~              
Movie: ${movieData.Title}
Year: ${movieData.Year}
imdbRating: ${movieData.imdbRating}
Rotten Tomatoes Rating: ${movieData.Ratings[1].Value}
Rotten Tomatoes Rating: ${movieData.Country}
Language: ${movieData.Language}
Plot: ${movieData.Plot}
Actors: ${movieData.Actors}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            `;
            // this format wont log???
            // var movieLog2 = [
            //     console.log("\n-----------------------begin movie----------------------------\n"),
            //     console.log("Title :" + movieData.Title),
            //     console.log("Year :" + movieData.Year),
            //     console.log("imdbRating :" + movieData.imdbRating),
            //     console.log("Rotten Tomatoes Rating :" + movieData.Ratings[1].Value),
            //     console.log("Country :" + movieData.Country),
            //     console.log("Language :" + movieData.Language),
            //     console.log("Plot :" + movieData.Plot),
            //     console.log("Actors :" + movieData.Actors),
            //     console.log("\n--------------------------end movie-------------------------\n"),
            // ].join("\n\n");
            // console.log(movieData);
            fs.appendFile('log.txt', movieLog, function (err) {
                if (err) throw err;
                // console.log("response =" + results);
                console.log("response = " + movieLog);
            });
        }
    });
};
///////////
function readTxtFile(parameter) {
    fs.readFile("random.txt", "utf8", function (error, contents) {
        var newData2 = "";
        if (error) {
            return console.log(error);
        }
        var data = contents.split(' ').join("");
        var newData = data.split('"').join('');
        newData2 = newData.split(',').join(' ');
        // var newData3 = newData2.slice(0, 9);
        console.log("1 : " + data);
        console.log("2 : " + newData);
        console.log("3 : " + newData2);
        // i can return spotify-this-song IWantitThatWay
        // need to figure out how to make this a command in the spotify function 
        // i will probably need to change some architecture.

    });
}
//     var searchTrack = data.split(",").join(" ");

//     spotify.search({
//         type: 'track',
//         query: searchTrack
//     }, function (error, data) {
//         if (error) {
//             console.log('Error occurred: ' + error);
//             return;
//         } else {

//             var spotifyLog =

//                 ` 
//     Spotify     
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~            
//     Artist Name: ${data.tracks.items[0].artists[0].name},
//     Language: ${data.tracks.items[0].name},
//     Plot: ${ data.tracks.items[3].preview_url},
//     Actors: ${data.tracks.items[0].album.name},
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//             `;
//             fs.appendFile('log.txt', spotifyLog, function (err) {
//                 if (err) throw err;
//                 console.log(spotifyLog);
//             });
//         }
//     });

// }

//////////
switchCase();