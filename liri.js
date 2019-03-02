

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
            console.log("do-what-it-says" + parameter);
            break;

        default:
            // logIt("Invalid Instruction");
            console.log("default")
            break;

    }
};

function bandsInTown(parameter) {

    // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
    var queryURL = "https://rest.bandsintown.com/artists/" + parameter + "?app_id=codingbootcamp";
    request(queryURL, function (error, response, body) {
        console.log("band1");

        if (!error && response.statusCode === 200) {
        } else {
            console.log("band2");
        }
    }).then(function (response) {
        var JS = JSON.parse(body);
        console.log(JS)
    })
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
            console.log("\n-----------------------begin spotify----------------------------\n");
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song: " + data.tracks.items[0].name);
            console.log("Preview: " + data.tracks.items[3].preview_url);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("\n----------------------end spotify-----------------------------\n");
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


    request(queryUrl, function (error, res, body) {
        var movieObject = JSON.parse(body);
        // console.log(movieObject);

        if (error) {
            // var movieResults =
            console.log('Error occurred: ' + error);
            return;
        }
        else {
            console.log("\n-----------------------begin movie----------------------------\n");
            console.log("Title :" + movieObject.Title);
            console.log("Year :" + movieObject.Year);
            console.log("imdbRating :" + movieObject.imdbRating);
            console.log("Rotten Tomatoes Rating :" + movieObject.Ratings[1].Value);
            console.log("Country :" + movieObject.Country);
            console.log("Language :" + movieObject.Language);
            console.log("Plot :" + movieObject.Plot);
            console.log("Actors :" + movieObject.Actors);
            console.log("\n--------------------------end movie-------------------------\n");
        }
    });
};
///////////
function readTxtFile(parameter) {
    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }
        console.log("random : " + parameter);
    });
}
//////////
switchCase();