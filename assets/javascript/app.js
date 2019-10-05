$(document).ready(function () {

    var recentTerms = []; //Will hold recent terms from firebase.  Still need to add the data from firebase
    var ttsWord;
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

    // Sets the recentTerms array to the firebase values.
    database.ref().on("value", function (snapshot) {
        recentTerms = snapshot.val();
        $("#add-buttons").empty();
        for (var i = 0; i < recentTerms.length; i++) {
            var button = $("<button>");
            button.addClass("recent-search");
            button.addClass("btn btn-light");
            button.css("margin", "5px");
            button.attr("id", 'recent' + i);
            button.attr("val", recentTerms[i]);
            button.text(recentTerms[i]);
            $("#add-buttons").append(button);
        }
    });



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
        $.ajax(udSettings)
            .done(function (response) {
                console.log(response);
                var short = response.list; // Shortened response from API.
                ttsWord = short[0].word; // Variable assignment to the word response.

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
        ttsWord = $('#definition-input').val().trim();
        apiCall(ttsWord);


        //FIREBASE SHIFT+PUSH
        recentTerms.push(ttsWord);
        if (recentTerms.length > 5) {
            recentTerms.shift();
        }
        console.log(recentTerms)
        database.ref().update(recentTerms);
    });
   

    //When clicking the recent search button it passes the value to the api call.  This was a pain in the ass and the only way I could get it to work.

    $(document).on('click', '#recent0', function (e) {
        e.preventDefault();
        apiCall($(this).attr('val'));
        agent.Play("Searching");
    });

    $(document).on('click', '#recent1', function (e) {
        e.preventDefault();
        apiCall($(this).attr('val'));
        agent.Play("Searching");
    });

    $(document).on('click', '#recent2', function (e) {
        e.preventDefault();
        apiCall($(this).attr('val'));
        agent.Play("Searching");
    });

    $(document).on('click', '#recent3', function (e) {
        e.preventDefault();
        apiCall($(this).attr('val'));
        agent.Play("Searching");
    });

    $(document).on('click', '#recent4', function (e) {
        e.preventDefault();
        apiCall($(this).attr('val'));
        agent.Play("Searching");
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

});

//Clippy Animation

clippy.load('Clippy', function(agent){    
    const animations = agent.animations();    
    $('#clippy').text(animations.join(' '));
    agent.show();
    agent.moveTo(100,100);
    agent.speak('When all else fails, bind some paper together. My name is Clippy.');
    setTimeout(animate.bind(null, agent, animations), 8000);        
  });
  
  function animate(agent, animations){  
    
    function doneCallback(animation){
      console.log('done ' + animation);
    }
    
    let statesText = animations.join(' '),
        $state = $('#clippy'),
        $states = $('#clippy');
      
    for(var i = 0; i<animations.length; i++){      
      ((index)=>{
        setTimeout(_=>{
          let animation = animations[index];
          let currentStateInStates = statesText.replace(animation, `<b>${animation}</b>`);
          $state.text(animation);                
          $states.html(currentStateInStates);
          agent.play(animation, undefined, doneCallback.bind(null, animation));  
        }, index*8000);
      })(i);        
    }
  }
  