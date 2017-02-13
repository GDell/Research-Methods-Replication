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

  // The follwing declares the 12 stimuli locations for a scene
  var scene = new Array();

  function coinFlip() {
    return (Math.floor(Math.random() * 2) == 0) ? 'l' : 'r';
  }

  var allTpositions = jsPsych.randomization.sample(referenceArray, 24);
  var TOLD = allTpositions.slice(0,12);
  var TNEW = allTpositions.slice(12,24);
  // console.log("tpositinsOLD: " +TOLD)
  // console.log("tpositinsNEW: " +TNEW)

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
    'rightORwrong' : "",
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
        'rightORwrong' : "",
        'oldORnew' : "new"},
        'html' : "",
         };
    }
    tPosition = "";
    lPositions = "";
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

    return '<div id="scene">' + html +  '</div>';
  }

  for (var i = 0; i < scene.length; i++) {

    var responsehtml = (generateScene((scene[i].data.Lstim), (scene[i].data.Tstim), (scene[i].data.orientation)));

    scene[i].html = responsehtml;
  }


  console.log(scene);


  var consentForm = {
    type: 'single-stim',
    // stimulus: 'jsPsych/examples/img/happy_face_1.jpg',
    choices: [32], // Spacebar
    stimulus: '<p class="center-content">Consent form here. Press spacebar to continue. </p>',
    // prompt: "YO", 
    is_html: true
  }

  var prompt1 = {
    type: 'single-stim',
    choices: [32], // Spacebar
    stimulus: '<p class="center-content">In this study you will be presented with a series of scenes containing various forms of an "L" shaped stimuli and one left or right pointing "T" stimuli. The stimuli will be of varying colors (Red, Yellow, Blue, and Green) and will be located in various locations and orientations in each scene. When you see each scene appear on the screen, please do your best to locate the "T" stimuli as fast as possible and indicate whether the bottom of the T is oriented 90 degrees to the left, or 90 degrees to the right. To indicate left orientation, press the key f. To indicate right orientation, press the key h. Each trial will stop once you respond. After responding, you will hear a short, high-pitched chirp if your answer was correct, or a long, low-pitched tone if your answer was incorrect.  After a brief period of time, the next scene will appear and the following trial will begin. There will be a total of 3 blocks, each composed of 24 trials or scenes. In addition, you will recieve a break between each block. When you are ready, please press the spacebar to begin block one of the experiment.</p>',
    is_html: true
  }

  var debrief = {
    type: 'single-stim',
    choices: [32], // Spacebar
    stimulus: '<p class="center-content">Thank you for participating in this study.  12 specific scenes were repeatedly shown in a mix of randomly generated scenes throughout each block of this experiment. The purpose was to see if, due to incidental learning, participants would respond faster to the repeated scenes than the randomly generated scenes."<p class="center-content">',
    is_html: true
  }

  var takeAbreak = {
    type: 'single-stim',
    choices: [32], // Spacebar
    stimulus: "Take a break. Press the spacebar when you are ready to continue on to the next block of 24 trials.",
    on_finish: function(data) {
      generateNew();
      for (var i = 0; i < scene.length; i++) {

        var responsehtml = (generateScene((scene[i].data.Lstim), (scene[i].data.Tstim), (scene[i].data.orientation)));

        scene[i].html = responsehtml;
      }
      console.log(scene);
    },
    is_html: true
  }
  
  var block = {
    timeline: [{
      type: 'single-stim',
      choices: [70,72], // Spacebar
      stimulus: jsPsych.timelineVariable('html'),
      is_html: true,
      data: jsPsych.timelineVariable('data'),
      on_finish: function(data) {
        console.log(data.orientation);
        if (data.orientation == "l") {
          if((jsPsych.pluginAPI.convertKeyCharacterToKeyCode('f') == data.key_press)){
            data.rightORwrong = "RIGHT";
          }
          else {
            data.rightORwrong = "WRONG";
          }
          } else if (data.orientation == "r") {
              if((jsPsych.pluginAPI.convertKeyCharacterToKeyCode('h') == data.key_press)){
                data.rightORwrong = "RIGHT";
              }
              else {
                  data.rightORwrong = "WRONG";
                }
              }
            }
      }
    ],
    timeline_variables: scene,
    randomize_order: true
  }

  var node = {
    type: 'single-stim',
    timeline: [consentForm,prompt1,block,takeAbreak,block,takeAbreak,block,debrief],
  }

  jsPsych.init({
    timeline: [node], //block 
    on_finish: function() {
      jsPsych.data.displayData();
    },
    default_iti: 250
  });
}