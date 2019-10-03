var recentTerms = []; //Will hold recent terms from firebase.  Still need to add the data from firebase
var audioDef0 = "";
var audioDef1 = "";
var audioDef2 = "";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBADdFEM1R_H16JbRWh90kGOB4X4pK6yFs",
    authDomain: "urban-text-to-speech.firebaseapp.com",
    databaseURL: "https://urban-text-to-speech.firebaseio.com",
    projectId: "urban-text-to-speech",
    storageBucket: "",
    messagingSenderId: "567386930661",
    appId: "1:567386930661:web:367eb94614400531c4030c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// The variable to shorten the call to the firebase database.
var database = firebase.database();

function apiCall(term) {
    //The settings we pass to the Urban Dictionary API.  The same as using url and method with extra info required for the API.
    var udSettings = {
        "async": true,
        "crossDomain": true,
        "url": "https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=" + term,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com",
            "x-rapidapi-key": "865d7325ecmshf0a5dcd3da7a815p1672a1jsn663835f71fe6"
        }
    }

    var ttsAPI = 'b9adf06b180248ce99d0839658188104'; //TTS API key
    // Ajax request with our Urban Dictionary settings passed in.  
    $.ajax(udSettings).done(function (response) {
        console.log(response);

        var short = response.list; // Shortened response from API.
        var ttsWord = short[0].word; // Variable assignment to the word response.

        recentTerms.push(ttsWord);
        if(recentTerms.length > 5) {
            recentTerms.shift();
        }
        console.log(recentTerms)
        database.ref().update(recentTerms);

        $("#current-word").text("Current Word: " + ttsWord);
        $("#definition-view-1").text(short[0].definition);
        $("#definition-view-2").text(short[1].definition);
        $("#definition-view-3").text(short[2].definition); 

        audioDef0 = new Audio('http://api.voicerss.org/?key=' + ttsAPI + '&hl=en-us&src=' + short[0].word + " . " + short[0].definition + " . Example: " + short[0].example + '&r=0');
        audioDef1 = new Audio('http://api.voicerss.org/?key=' + ttsAPI + '&hl=en-us&src=' + short[1].word + " . " + short[1].definition + " . Example: " + short[1].example + '&r=0');
        audioDef2 = new Audio('http://api.voicerss.org/?key=' + ttsAPI + '&hl=en-us&src=' + short[2].word + " . " + short[2].definition + " . Example: " + short[2].example + '&r=0');
    });
}

function play(audio) {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
        audio.currentTime = 0
    }
    audio.currentTime = 0
}

//Search New Term
$('#add-definition').click(function (event) {
    event.preventDefault();
    ttsWord = $('#definition-input').val().trim().replace(/ /g, '+');
    apiCall(ttsWord);

    //Add New Term to Button Div
    recentTerms.push(ttsWord);
    recentlySearched();

    //Clear Text Box
    $('#definition-input').val('');

    //FIREBASE SHIFT+PUSH
    database.ref().set(ttsWord);

});

//Recently Searched buttons
function recentlySearched() {
    for (var i = 0; i < recentTerms.length; i ++) {
            var searchesDiv = $('<div>');
            var searchesButtons = $('<button>');
            searchesButtons.addClass('searchesButtons');
            searchesButtons.attr('data-name', recentTerms[i]);
            searchesButtons.text(recentTerms[i]);

            searchesDiv.append(searchesButtons);
            $('#add-buttons').append(searchesButtons);
    }
}

//Button Click for Recently Searched buttons
$(document).on('click', '#add-buttons', function() {
    $('#definition').empty();

    var thisTerm = $(this).attr('data-name')

    

    //RUN AJAX FUNCTION
});

//Button Click for Definition T2S

$("#definition-view-1").on("click", function () {
    play(audioDef0);
});

$("#definition-view-2").on("click", function () {
    play(audioDef1);
});

$("#definition-view-3").on("click", function () {
    play(audioDef2);
});
































































































//Testing graveyard that we still may need.

// var term = ""; //The user input string we will pass to the Urban Dictionary API.
// var ttsWord = ""; //Holds the word of the response from the urban dictionary API.
// var ttsDef = ""; //Holds the definition of the response from the urban dictionary API. 
// var ttsExam = ""; //Holds the example of the response from the urban dictionary API.

// //The settings we pass to the Urban Dictionary API.  The same as using url and method with extra info required for the API.
// var udSettings = {
//     "async": true,
//     "crossDomain": true,
//     "url": "https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=" + term,
//     "method": "GET",
//     "headers": {
//         "x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com",
//         "x-rapidapi-key": "865d7325ecmshf0a5dcd3da7a815p1672a1jsn663835f71fe6"
//     }
// }

// // Ajax request with our Urban Dictionary settings passed in.  
// $.ajax(udSettings).done(function (response) {
//     console.log(response);

//     var short = response.list; // Shortened response from API.
//     var i = 0; // Placeholder until loop is set to run through list of responses.
//     ttsWord = short[i].word; // Variable assignment to the word response.
//     ttsDef = short[i].definition; // Variable assignment to the definition response.
//     ttsExam = short[i].example; // Variable assignment to the example response.

//     $("#definition").text(ttsDef); // Placeholder showing the definition to the screen on test machine.

//     // Passes the variables into the TTS API to create an audio file that plays the search variables we got from our Urban Dictionary API.
//     var audio = new Audio('http://api.voicerss.org/?key=' + ttsAPI + '&hl=en-us&src=' + ttsWord + " . " + ttsDef + " . " + ttsExam + '&r=0')

//     audio.play(); // Plays the audio we created from our TTS API request. 

// });