function script() {

  // Grid variable declarations
  var cols = 8; 
  var rows = 6;  
  var counter = 0;
  var counterArray = new Array();
  var htmlRecord = new Array();
  // Grid reference array
  var referenceArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47];
  // JSON object to hold generated scenes
  var objectsceneName = '{"scenes": []}';
  var parsedSceneName = JSON.parse(objectsceneName);
  // STIMULI
  /////////////////////// Red Stimuli
  var RedimgArrayL = new Array();
  var RedimgArrayT = new Array();
  // L
  RedimgArrayL[0] = 'images/Red/L/0.png';
  RedimgArrayL[1] = 'images/Red/L/180.png';
  RedimgArrayL[2] = 'images/Red/L/90.png';
  RedimgArrayL[3] = 'images/Red/L/270.png';
  // T
  RedimgArrayT[0] = 'images/Red/T/L.png';
  RedimgArrayT[1] = 'images/Red/T/R.png';
  /////////////////////// Blue stimuli
  var BlueimgArrayL = new Array();
  var BlueimgArrayT = new Array();
  // L
  BlueimgArrayL[0] = 'images/Blue/L/0.png';
  BlueimgArrayL[1] = 'images/Blue/L/180.png';
  BlueimgArrayL[2] = 'images/Blue/L/90.png';
  BlueimgArrayL[3] = 'images/Blue/L/270.png';
  // T
  BlueimgArrayT[0] = 'images/Blue/T/L.png';
  BlueimgArrayT[1] = 'images/Blue/T/R.png';
  /////////////////////// Green Stimuli
  var GreenimgArrayL = new Array();
  var GreenimgArrayT = new Array();
  // L
  GreenimgArrayL[0] = 'images/Green/L/0.png';
  GreenimgArrayL[1] = 'images/Green/L/180.png';
  GreenimgArrayL[2] = 'images/Green/L/90.png';
  GreenimgArrayL[3] = 'images/Green/L/270.png';
  // T
  GreenimgArrayT[0] = 'images/Green/T/L.png';
  GreenimgArrayT[1] = 'images/Green/T/R.png';
  ///////////////////////  Yellow Stimuli
  // Yellow L Stimuli (4 Total)
  var YellowimgArrayL = new Array();
  var YellowimgArrayT = new Array();
  // L
  YellowimgArrayL[0] = 'images/Yellow/L/0.png';
  YellowimgArrayL[1] = 'images/Yellow/L/180.png';
  YellowimgArrayL[2] = 'images/Yellow/L/90.png';
  YellowimgArrayL[3] = 'images/Yellow/L/270.png';
  // T
  YellowimgArrayT[0] = 'images/Yellow/T/L.png';
  YellowimgArrayT[1] = 'images/Yellow/T/R.png';
  

  // ALL L STIMULI
  var allLStim = YellowimgArrayL.concat(BlueimgArrayL,GreenimgArrayL,RedimgArrayL);
  var randomLstim = parseInt(Math.random()*allLStim.length);
  var randomL = allLStim[randomLstim];

  // ALL T STIMULI
 var allLeftTstim = YellowimgArrayT.slice(0,1).concat((BlueimgArrayT.slice(0,1)),(GreenimgArrayT.slice(0,1)),(RedimgArrayT.slice(0,1)));
 console.log("all l :"+ allLeftTstim)

 var allRightTstim = YellowimgArrayT.slice(1,2).concat((BlueimgArrayT.slice(1,2)),(GreenimgArrayT.slice(1,2)),(RedimgArrayT.slice(1,2)));
 console.log("all r :"+ allRightTstim)

  var allTStim = YellowimgArrayT.concat(BlueimgArrayT,GreenimgArrayT,RedimgArrayT);
  var randomTstim = parseInt(Math.random()*allTStim.length);
  var randomT = allTStim[randomTstim];
  // console.log("random is :"+randomTstim);

  // The follwing declares the 12 stimuli locations for a scene
  var scene = new Array();
  // var newScene = new Array();

  function coinFlip() {
    return (Math.floor(Math.random() * 2) == 0) ? 'l' : 'r';
  }

  // alert(Math.floor(Math.random() * 2) ? 'l' : 'r');

  var allTpositions = jsPsych.randomization.sample(referenceArray, 24);
  var TOLD = allTpositions.slice(0,12);
  var TNEW = allTpositions.slice(12,24);
  // console.log("tpositins: " +allTpositions)
  console.log("tpositinsOLD: " +TOLD)
  console.log("tpositinsNEW: " +TNEW)

function arr_diff (a1, a2) {

    var a = [], diff = [];

    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }

    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }

    for (var k in a) {
        diff.push(k);
    }

    return diff;
};



  // Creates OLD array of 12 sets of t & l Positions
  for (var i = 0; i < 12; i++) {
  // var twelvePositions = jsPsych.randomization.sample(referenceArray, 12);
  var twelvePositions = TOLD;
  // console.log("twelvePositions: "+ twelvePositions);
  var tPosition = [twelvePositions[i]];
  // console.log("tPosition = "+ tPosition);

  var allpossibleLPositions = arr_diff(referenceArray, tPosition);
  // console.log("diff: "+allpossibleLPositions);

  var lPositions = jsPsych.randomization.sample(allpossibleLPositions, 11);
  // console.log("lPositions = "+ lPositions);

  var coinResult =  coinFlip();

  scene[i] = { data: {
    'Tstim' : tPosition ,
    'Lstim' : lPositions ,
    'orientation' : coinResult,
    'oldORnew' : "old"},
    'html' : ""};
  }



  function generateNew() {
    for (var i = 0; i < 12; i++) {
      // var twelvePositions = jsPsych.randomization.sample(referenceArray, 12);
      var twelvePositions = TNEW;
      // console.log("twelvePositions: "+ twelvePositions);
      var tPosition = [twelvePositions[i]];
      // console.log("tPosition = "+ tPosition);

      var allpossibleLPositions = arr_diff(referenceArray, tPosition);
      // console.log("diff: "+allpossibleLPositions);

      var lPositions = jsPsych.randomization.sample(allpossibleLPositions, 11);
      // console.log("lPositions = "+ lPositions);

      var coinResult =  coinFlip();


      scene[i+12] = { data: {
        'Tstim' : tPosition ,
        'Lstim' : lPositions ,
        'orientation' : coinResult,
        'oldORnew' : "new"},
        'html' : "", };
    }
  }

  generateNew();




  // FUNCTION: inArray
  // The following function checks whether a number exists within an 
  // array. If it does, it returns that number.
  function inArray(number, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (number == myArray[i])
        return true;
    }
    return false;
  }

  // FUNCTION: inCheck
  // Checks whether the current loop counter matches 
  // that of a stimulus coutner. 
  // If it does, checks and places a random stimulus 
  // image in that img box. 
  function inCheck(imageSRC, myArray, tOrientation) {

    if (imageSRC == "t"){

      if ((inArray(counter, myArray)) && (tOrientation == "l")) {
        var randomTstim = parseInt(Math.random()*allLeftTstim.length);
        var randomLeftT = allLeftTstim[randomTstim];
        return randomLeftT;

      } else if ((inArray(counter, myArray)) && (tOrientation == "r")){
        var randomTstim = parseInt(Math.random()*allRightTstim.length);
        var randomRightT = allRightTstim[randomTstim];
        return randomRightT;
      } else {
          return '';
      }

    } else if (imageSRC == "l") {
      if (inArray(counter, myArray)) {
        var randomLstim = parseInt(Math.random()*allLStim.length);
        var randomL = allLStim[randomLstim];
        return randomL;
      } else {
        return "";
      }
    }
  }



  // FUNCTION: generateScene
  // INPUT: array, imageSRC, sceneName
  // OUTPUT: A scene with an image in all of the img id's specified in the 
  // input array.

  // console.log(scene);

  function generateScene(Larray, Tposition, tOrientation) {
    var html = '';

    for(var i =0; i < rows; i++) { 

      html += '<div class="row">';
      for(var h=0; h< cols; h++) { 
         var imgresult = inCheck("l", Larray, tOrientation) || inCheck("t", Tposition, tOrientation);
         html += "<div class='square'>"+ "<div class='innerSquare'>" + '<img id="'+counter+'" src="'+imgresult+'" style="top: calc(50% - 20px); left(50% - 20px);"></img>' + '</div>' + '</div>';
         counterArray[counter] = counter;
         counter = counter + 1;
      } 
        html += '</div>'; 
    }
    counter = 0;
    // Save the scene in the scene JSON onbject
    // parsedSceneName.scenes.push({scene: '<div id="scene">' + html +  '</div>'});     
    // console.log(parsedSceneName);
    // htmlRecord[sceneName] 
    return '<div id="scene">' + html +  '</div>';
    // console.log(htmlRecord);
  }

  for (var i = 0; i < scene.length; i++) {
    // scene[i].scene.html = 
    // var responsehtml = ((generateScene((scene[i].scene.Lstim), (scene[i].scene.Tstim), (scene[i].scene.orientation))));
    var responsehtml = (generateScene((scene[i].data.Lstim), (scene[i].data.Tstim), (scene[i].data.orientation)));
    // console.log(generateScene((scene[i].scene.Lstim), (scene[i].scene.Tstim), (scene[i].scene.orientation)));
    // console.log(responsehtml);
    scene[i].html = responsehtml;
  }


  console.log(scene);




  var consentForm = {
    type: 'single-stim',
    // stimulus: 'jsPsych/examples/img/happy_face_1.jpg',
    choices: [32], // Spacebar
    stimulus: '<p class="center-content">Press spacebar to continue</p>',
    // prompt: "YO", 
    is_html: true
  }

  var prompt1 = {
    type: 'single-stim',
    choices: [32], // Spacebar
    stimulus: '<p class="center-content">You will be presented with an array of stimuli, T’s and L’s. They will be of varying colors (Red, Yellow, Blue, and Green) and the stimuli will be located in various locations and orientations. After reading these instructions, please press the spacebar to continue. At the start of each trial, a fixation dot will appear in the center of the screen. Please focus your eyes on the fixation dot when it appears. After a brief period of time, an image consisting of several letters oriented in different directions will appear. Most of the letters will be L’s, but there will be one T among them. When you see the array of letters appear on the screen, please locate the T and indicate whether the bottom of the T is oriented 90 degrees to the left, or 90 degrees to the right. To indicate “left”, press “z”. To indicate “right”, press “/”. Please complete this as quickly and accurately as possible. You will hear a short, high-pitched chirp if your answer is correct, or a long, low-pitched tone if your answer is incorrect. Each trial will stop once the key “z” or “/” is pressed. During the audio feedback, you will see a blank, white screen. After a brief period of time, the fixation dot will appear once more to indicate the start of the next trial. After 30 trials, there will be a break lasting a minimum of 10 seconds, but you may rest for longer if you wish. When you are ready, please press the spacebar to start the next round of trials. </p>',
    is_html: true
  }

  var debrief = {
    type: 'single-stim',
    choices: [32], // Spacebar
    stimulus: "Thank you for participating in this study.  Some of the specific displays of the letters were repeated during the experiment though people may not notice that.  The purpose was to see if those repetitions cause people to respond more quickly due to incidental learning as suggested by previous research."
  }

  var block = {
    timeline: [{
      type: 'single-stim',
      choices: [70,72], // Spacebar
      stimulus: jsPsych.timelineVariable('html'),
      is_html: true,
      data: jsPsych.timelineVariable('data'),
    }],
    timeline_variables: scene,
    randomize_order: true
  }


  //   on_finish: function(data) {
  //     if (oldScene[10].scene.orientation == "l") {
  //       if((jsPsych.pluginAPI.convertKeyCharacterToKeyCode('f') == data.key_press)){
  //         return true;
  //       }
  //       else {
  //         return false;
  //       }
  //     } else if (oldScene[10].scene.orientation == "r") {
  //       if((jsPsych.pluginAPI.convertKeyCharacterToKeyCode('h') == data.key_press)){
  //         return true;
  //       }
  //       else {
  //         return false;
  //       }
  //     }
  //   }
  // }


  var node = {
    type: 'single-stim',
    timeline: [],
  }

  jsPsych.init({
    timeline: [block],
    on_finish: function() {
      jsPsych.data.displayData();
    },
    default_iti: 250
  });
}