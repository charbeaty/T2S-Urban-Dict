var term = ""; //The user input string we will pass to the Urban Dictionary API.
var ttsWord = ""; //Holds the word of the response from the urban dictionary API.
var ttsDef = ""; //Holds the definition of the response from the urban dictionary API. 
var ttsExam = ""; //Holds the example of the response from the urban dictionary API. 
var ttsAPI = 'b9adf06b180248ce99d0839658188104'; //TTS API key
var recentTerms = []; //Will hold recent terms from firebase.  Still need to add the data from firebase

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

// Ajax request with our Urban Dictionary settings passed in.  
$.ajax(udSettings).done(function (response) {
    console.log(response);

    var short = response.list;  // Shortened response from API.
    var i = 0;  // Placeholder until loop is set to run through list of responses.
    ttsWord = short[i].word; // Variable assignment to the word response.
    ttsDef = short[i].definition; // Variable assignment to the definition response.
    ttsExam = short[i].example; // Variable assignment to the example response.

    $("#definition").text(ttsDef); // Placeholder showing the definition to the screen on test machine.

    // Passes the variables into the TTS API to create an audio file that plays the search variables we got from our Urban Dictionary API.
    var audio = new Audio('http://api.voicerss.org/?key=' + ttsAPI + '&hl=en-us&src=' + ttsWord + " . " + ttsDef + " . " + ttsExam + '&r=0')
    
    audio.play();  // Plays the audio we created from our TTS API request. 

}); 

//Firebase Array
database.ref().set(recentTerms);

//Search New Term
$('#add-definition').click(function (event) {
    event.preventDefault();
    ttsWord = $('#definition-input').val().trim().replace(/ /g, '+');

    //FIREBASE SHIFT+PUSH

    })
});


//Recently Searched buttons
     function recentlySearched() {
        for (var i = 0; i < 5; i ++) {
            var searchesDiv = $('<div>');
            var searchesButtons = $('<button>');
            searchesButtons.addClass('searchesButtons');
            searchesButtons.attr('PLACEHOLDER/FIREBASE');
            searchesButtons.text('PLACEHOLDER/FIREBASE');

            searchesDiv.append(searchesButtons);
            $('#add-buttons').append(searchesButtons);
        }
    }


//Button Click for Recently Searched buttons
$(document).on('click', '#add-buttons', function() {
    $('#definition-view').empty();
});

//Add Definition to Div


function apiCall() {
    // Ajax request with our Urban Dictionary settings passed in.  
    $.ajax(udSettings).done(function (response) {
        console.log(response);

        var short = response.list;  // Shortened response from API.
        var i = 0;  // Placeholder until loop is set to run through list of responses.
        ttsWord = short[i].word; // Variable assignment to the word response.
        ttsDef = short[i].definition; // Variable assignment to the definition response.
        ttsExam = short[i].example; // Variable assignment to the example response.

        $("#definition").text(ttsDef); // Placeholder showing the definition to the screen on test machine.

        // Passes the variables into the TTS API to create an audio file that plays the search variables we got from our Urban Dictionary API.
        var audio = new Audio('http://api.voicerss.org/?key=' + ttsAPI + '&hl=en-us&src=' + ttsWord + " . " + ttsDef + " . " + ttsExam + '&r=0')

        audio.play();  // Plays the audio we created from our TTS API request. 
    });
}



