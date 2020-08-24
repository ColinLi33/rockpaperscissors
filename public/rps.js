//game controls
let w, h;
let font;
let fontSize;
let currScreen = 0;
let yesButton, noButton;

//tracks stats vs computer
let wins = 0;
let ties = 0;
let losses = 0;

//buttons for interface
let rockButton;
let paperButton;
let scissorsButton;

//keeps track of player and computer throws
let computerResult = '';
let playerThrows = ''; //rock = 1, paper = 2, scissors = 3
let computerThrows = '';

function preload() {
  font = loadFont('Honey Bear.ttf');
}
//resizes everything if window size is changed
function windowResized() {
  w = windowWidth;
  h = windowHeight;
  rockButton.size(w/7,w/20);
  rockButton.position(w/4,h/1.8);

  paperButton.size(w/7,w/20);
  paperButton.position(w/2.35,h/1.8);

  scissorsButton.size(w/7,w/20);
  scissorsButton.position(w/5 * 3,h/1.8);
  resizeCanvas(w, h, true);
}
//sets up windows, font, and buttons
function setup(){
  w = windowWidth;
  h = windowHeight;
  createCanvas(windowWidth, windowHeight);
  textFont(font);
  textAlign(CENTER);

  rockButton = createButton("Rock");
  paperButton = createButton("Paper");
  scissorsButton = createButton("Scissors");

  rockButton.mouseClicked(rockResult);
  paperButton.mouseClicked(paperResult);
  scissorsButton.mouseClicked(scissorsResult);

  rockButton.size(w/7,w/20);
  rockButton.position(w/4,h/1.8);
  rockButton.style("font-size", "1.8vw"); // vw so the text scales correctly

  paperButton.size(w/7,w/20);
  paperButton.position(w/2.35,h/1.8);
  paperButton.style("font-size", "1.8vw");

  scissorsButton.size(w/7,w/20);
  scissorsButton.position(w/5 * 3,h/1.8);
  scissorsButton.style("font-size", "1.8vw");
}

function draw(){
  fill('black');
  background('lightGrey');

  //if computer isnt trained screen 0 else screen 1
  playerThrows.length < 25 ? currScreen = 0 : currScreen = 1

  if(playerThrows.length == 25){
    wins = 0;
    losses = 0;
    ties = 0;
  }

  textToPrint = '';
  if(currScreen == 0) {
    textToPrint = 'Games Left: ' + (25 - playerThrows.length + "\n");
  }
  textToPrint += 'Win: ' + wins + '\nTie: ' + ties + '\nLoss: ' + losses;

  textFont(font);
  textSize(w / 20);
  text('Train The Computer', w/2, h/7);

  textFont('Georgia');
  textSize(w / 30)
  text(textToPrint, w/2, h/4)
  text('Computer: ' + computerResult, w/3, h/4 * 3)
}

//player rock
function rockResult() {
  getComputerMove(1)
}
//player paper
function paperResult() {
  getComputerMove(2)
}
//player scissors
function scissorsResult() {
  getComputerMove(3)
}
//get random throw to train computer
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
//handles computer moves
function getComputerMove(result){
  //if computer is still training
  if(playerThrows.length < 25){
    let randInt = getRandomInt(3)
    //handles computer throws and outcome of game
    switch(randInt){
      case 0:
        computerResult = 'Rock'
        computerThrows = computerThrows + "1";
        if(result == 1)
          ties++;
        if(result == 2)
          wins++;
        if(result == 3)
          losses++;
        break;
      case 1:
        computerResult = 'Paper'
        computerThrows = computerThrows + "2";
        if(result == 1)
          losses++;
        if(result == 2)
          ties++;
        if(result == 3)
          wins++;
        break;
      case 2:
        computerResult = 'Scissors'
        computerThrows = computerThrows + "3";
        if(result == 1)
          wins++;
        if(result == 2)
          losses++;
        if(result == 3)
          ties++;
        break;
    }
  } else { //computer is trained
    let nextThrow = 0;

    //last x throws from player
    let lastOne = playerThrows.substring(playerThrows.length - 1);
    let lastTwo = playerThrows.substring(playerThrows.length - 2);
    let lastThree = playerThrows.substring(playerThrows.length - 3);
    console.log('Player Throws: ' + playerThrows);
    //if a pattern of 3 is found
    if(playerThrows.substring(0, playerThrows.length - 3).includes(lastThree)){
      console.log('3long')
      let indexes = [];
      let counter = 1;
      //find all occurances of the pattern
      while(counter >=1){
        index = nthIndex(playerThrows, lastThree, counter)
        if(index >= 0 && index < playerThrows.length - 3){
          indexes.push(index);
          counter++;
        } else {
          counter = -1;
        }
      }
      let humanNextThrows = [];
      console.log(indexes);
      //find the next throw after the pattern
      for(let i = 0; i < indexes.length; i++){
        humanNextThrows.push(playerThrows.substring(indexes[i] + 3, indexes[i] + 4));
      }
      console.log(humanNextThrows);
      //find most common next human throw
      nextThrow = findMode(humanNextThrows);
    } else if(playerThrows.substring(0, playerThrows.length - 2).includes(lastTwo)){
      //pattern length 2 is found
      console.log('2long')
      let indexes = [];
      let counter = 1;
      //find all occurances of the pattern in human throws
      while(counter >=1){
        index = nthIndex(playerThrows, lastTwo, counter)
        if(index >= 0 && index < playerThrows.length - 2){
          indexes.push(index);
          counter++;
        } else {
          counter = -1;
        }
      }
      let humanNextThrows = [];
      console.log(indexes);
      //find the next throw after the pattern
      for(let i = 0; i < indexes.length; i++){
        humanNextThrows.push(playerThrows.substring(indexes[i] + 2, indexes[i] + 3));
      }
      console.log(humanNextThrows);
      //find most common next human throw
      nextThrow = findMode(humanNextThrows);
    } else if(playerThrows.substring(0, playerThrows.length - 1).includes(lastOne)){
      //pattern length 1 is found
      console.log('1long')
      let indexes = [];
      let counter = 1;
      //find all occurances of the pattern in human throws
      while(counter >=1){
        index = nthIndex(playerThrows, lastOne, counter)
        if(index >= 0 && index < playerThrows.length - 1){
          indexes.push(index);
          counter++;
        } else {
          counter = -1;
        }
      }
      let humanNextThrows = [];
      console.log(indexes);
      //find the next throw after the pattern
      for(let i = 0; i < indexes.length; i++){
        humanNextThrows.push(playerThrows.substring(indexes[i] + 1, indexes[i] + 2));
      }
      console.log(humanNextThrows);
      //find most common next human throw
      nextThrow = findMode(humanNextThrows);
    } else {
      //player trying to trick computer, haven't decided what to do yet
      console.log('Stop trying to trick me');
    }
    console.log(nextThrow);
    //handles computer throw and outcome
    switch(Number(nextThrow)){
      case 1:
        console.log("CASE 1")
        computerResult = 'Paper'
        computerThrows = computerThrows + "2";
        if(result == 1)
          losses++;
        if(result == 2)
          ties++;
        if(result == 3)
          wins++;
        break;
      case 2:
        console.log("CASE 2")
        computerResult = 'Scissors'
        computerThrows = computerThrows + "3";
        if(result == 1)
          wins++;
        if(result == 2)
          losses++;
        if(result == 3)
          ties++;
        break;
      case 3:
        console.log("CASE 3")
        computerResult = 'Rock'
        computerThrows = computerThrows + "1";
        if(result == 1)
          ties++;
        if(result == 2)
          wins++;
        if(result == 3)
          losses++;
        break;
      default:
        console.log('COMPUTER SWITCH ERROR');
        break;
    }
  }
  //puts human throw in the string
  switch(result){
    case 1:
      playerThrows = playerThrows + "1";
      break;
    case 2:
      playerThrows = playerThrows + "2";
      break;
    case 3:
      playerThrows = playerThrows + "3";
  }
}

//find each index of pattern
function nthIndex(str, pat, n){
    var L= str.length, i= -1;
    while(n-- && i++<L){
        i= str.indexOf(pat, i);
        if (i < 0) break;
    }
    return i;
}

//find most occuring throw after pattern
function findMode(numbers) {
    let counted = numbers.reduce((acc, curr) => {
        if (curr in acc) {
            acc[curr]++;
        } else {
            acc[curr] = 1;
        }

        return acc;
    }, {});

    let mode = Object.keys(counted).reduce((a, b) => counted[a] > counted[b] ? a : b);

    return mode;
}
