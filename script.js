function script() {

  // Grid variable declarations
  var cols = 8; 
  var rows = 6; 
  var html = ""; 
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
  var allTStim = YellowimgArrayT.concat(BlueimgArrayT,GreenimgArrayT,RedimgArrayT);
  // console.log("all t stim is: "+ allTStim)
  var randomTstim = parseInt(Math.random()*allTStim.length);
  var randomT = allTStim[randomTstim];
  // console.log("random is :"+randomTstim);

  // The follwing declares the 12 stimuli locations for a scene
  var twelvePositions = jsPsych.randomization.sample(referenceArray, 12);
  console.log("twelvePositions: "+ twelvePositions);
  var tPosition = [twelvePositions[0]];
  console.log("tPosition = "+ tPosition);
  var lPositions = twelvePositions.slice(1,12);
  console.log("lPositions = "+ lPositions);

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
  function inCheck(imageSRC, myArray) {
    if (imageSRC == "t"){
      if (inArray(counter, myArray)) {
        var randomTstim = parseInt(Math.random()*allTStim.length);
        var randomT = allTStim[randomTstim];
        return randomT;
      } else {
        return "";
      }
    } else {
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
  function generateScene(Larray, Tposition, sceneName) {
    for(var i =0; i < rows; i++) { 
      html += '<div class="row">';
      for(var h=0; h< cols; h++) { 
         var imgresult = inCheck("l", Larray) || inCheck("t", Tposition);
         html += "<div class='square'>"+ "<div class='innerSquare'>" + '<img id="'+counter+'" src="'+imgresult+'"></img>' + '</div>' + '</div>';
         counterArray[counter] = counter;
         // console.log(counterArray);
         counter = counter + 1;
      } 
        html += '</div>'; 
    }
    // Save the scene in the scene JSON onbject
    parsedSceneName.scenes.sceneName = html;
    console.log(parsedSceneName);
  }

  var exampleArray = ["1","2","3","4","20"];

  generateScene(lPositions, tPosition, "EXAMPLE");

  var generalScene = '<div id="scene">' + html +  '</div>';


  // Choose the 24 TARGET positions
  // var TchosenPositions = jsPsych.randomization.sample(counterArray, 24);
  // console.log('All T positions: '+ TchosenPositions);
  // var oldTchosenPositions = TchosenPositions.slice(0,12);
  // console.log('Old: ' + oldTchosenPositions);
  // var newTchosenPositions = TchosenPositions.slice(12,25);
  // console.log('New: ' + newTchosenPositions);
  // console.log(counterArray);


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

  var scene1 = {
    type: 'single-stim',
    choices: [32], // Spacebar
    stimulus: generalScene,
    is_html: true
  }

  var node = {
    type: 'single-stim',
    timeline: [scene1],
  }

  jsPsych.init({
    timeline: [node],
    on_finish: function() {
      jsPsych.data.displayData();
    },
    default_iti: 250
  });
}