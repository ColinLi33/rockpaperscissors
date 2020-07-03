let w, h;
let font;
let fontSize;
let currScreen = 0;
let yesButton, noButton;
let color = 'lightGrey';
let wins = 0;
let ties = 0;
let losses = 0;
let rockButton;
let paperButton;
let scissorsButton;
let computerResult = '';
let playerThrows = ''; //rock = 1, paper = 2, scissors = 3
let computerThrows = '';

function preload() {
  font = loadFont('Honey Bear.ttf');
}

function windowResized() {
  const css = getComputedStyle(canvas.parentElement);
  let marginWidth = round(float(css.marginLeft) + float(css.marginRight));
  let marginHeight = round(float(css.marginTop) + float(css.marginBottom));
  w = windowWidth - marginWidth;
  h = windowHeight - marginHeight;
  resizeCanvas(w, h, true);
}

function setup(){
  const css = getComputedStyle(canvas.parentElement);
  let marginWidth = round(float(css.marginLeft) + float(css.marginRight));
  let marginHeight = round(float(css.marginTop) + float(css.marginBottom));
  w = windowWidth - marginWidth;
  h = windowHeight - marginHeight;
  resizeCanvas(w, h, true);
  createCanvas(windowWidth, windowHeight);
  textFont(font);
  textSize(fontSize);
  textAlign(CENTER);

  rockButton = createButton("Rock");
  paperButton = createButton("Paper");
  scissorsButton = createButton("Scissors");

  rockButton.mouseClicked(rockResult);
  paperButton.mouseClicked(paperResult);
  scissorsButton.mouseClicked(scissorsResult);

  rockButton.size(w/7,w/20);
  rockButton.position(w/5,h/2);
  rockButton.style("font-size", "48px");

  paperButton.size(w/7,w/20);
  paperButton.position(w/2.5,h/2);
  paperButton.style("font-size", "48px");

  scissorsButton.size(w/7,w/20);
  scissorsButton.position(w/5 * 3,h/2);
  scissorsButton.style("font-size", "48px");

}

function draw(){
  windowResized();
  fill('black');
  background(color);
  if(playerThrows.length < 25){
    currScreen = 0;
  } else {
    currScreen = 1;
  }
  if(playerThrows.length == 25){
    wins = 0;
    losses = 0;
    ties = 0;
  }
  switch(currScreen){
    case 0:
      textFont(font);
      textSize(w / 20);
      text('Train The Computer', w/2, h/7);
      textFont('Georgia');
      textSize(w / 30)
      text('Games Left: ' + (25 - playerThrows.length) + '\nWin: ' + wins + '\nTie: ' + ties + '\nLoss: ' + losses, w/2, h/4)
      text('Computer: ' + computerResult, w/3, h/4 * 3)
      break;
    case 1:
      textFont(font);
      textSize(w / 20);
      text('Play The Computer', w/2, h/7);
      textFont('Georgia');
      textSize(w / 30)
      text('Win: ' + wins + '\nTie: ' + ties + '\nLoss: ' + losses, w/2, h/4)
      text('Computer: ' + computerResult, w/3, h/4 * 3)
      break;
  }
}

function rockResult(){
  getComputerMove(1)
}
function paperResult(){
  getComputerMove(2)
}
function scissorsResult(){
  getComputerMove(3)
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getComputerMove(result){
  if(playerThrows.length < 25){
    let randInt = getRandomInt(3)
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
  } else {
    let nextThrow = 0;
    let lastOne = playerThrows.substring(playerThrows.length - 1);
    let lastTwo = playerThrows.substring(playerThrows.length - 2);
    let lastThree = playerThrows.substring(playerThrows.length - 3);
    console.log(playerThrows);
    if(playerThrows.substring(0, playerThrows.length - 3).includes(lastThree)){
      console.log('3long')
      let indexes = [];
      let counter = 1;
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
      for(let i = 0; i < indexes.length; i++){
        humanNextThrows.push(playerThrows.substring(indexes[i] + 3, indexes[i] + 4));
      }
      console.log(humanNextThrows);
      //nextThrow = mostCommonThrow(humanNextThrows);
      nextThrow = findMode(humanNextThrows);
    } else if(playerThrows.substring(0, playerThrows.length - 2).includes(lastTwo)){
      console.log('2long')
      let indexes = [];
      let counter = 1;
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
      for(let i = 0; i < indexes.length; i++){
        humanNextThrows.push(playerThrows.substring(indexes[i] + 2, indexes[i] + 3));
      }
      console.log(humanNextThrows);
  //    nextThrow = mostCommonThrow(humanNextThrows);
      nextThrow = findMode(humanNextThrows);
    } else {
      console.log('1long')
      let indexes = [];
      let counter = 1;
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
      for(let i = 0; i < indexes.length; i++){
        humanNextThrows.push(playerThrows.substring(indexes[i] + 1, indexes[i] + 2));
      }
      console.log(humanNextThrows);
    //  nextThrow = mostCommonThrow(humanNextThrows);
      nextThrow = findMode(humanNextThrows);
    }
    console.log(nextThrow);
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

function nthIndex(str, pat, n){
    var L= str.length, i= -1;
    while(n-- && i++<L){
        i= str.indexOf(pat, i);
        if (i < 0) break;
    }
    return i;
}

function mostCommonThrow(arr){
  let mf = 1;
  let m = 0;
  let item;
  for(let i = 0; i < arr.length; i++){
    for(let j = i; j < arr.length; j++){
      if(arr[i] == arr[j])
        m++;
      if (mf < m){
        mf = m;
        item = arr[i];
      }
    }
    m=0;
  }
  return item;
}

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
