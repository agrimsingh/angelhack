import 'webrtc-adapter';
import $ from 'jquery';
import promiseWhile from './promiseWhile';
import Promise from 'bluebird';
import randomJs from 'random-js'; // uses the nativeMath engine
const random = randomJs();
import {
  init,
  snap,
  post,
} from './webcam';
import moodMeter from './moodMeter';
import initializeCanvas from './draw';
const diagrams = ['circle', 'square', 'triangle', 'star', 'oxygen molecule'];
const alphabets_numbers = ['2', '3', 't', 'n', 'w'];
var shapes = diagrams;
const lines = [
  'Hello there, you look a little confused! Here\'s a quick tip.',
  'One thing I learned is to never give up when the going gets tough. Here\'s a quick tip.',
  'Here\'s a quick tip for this drawing.',
];
let failCounter = 0;
let index = 0;
let changeIndex = 0;
let suggestionAudioPlayed = false;
function displayQuestion() {
  if (index < shapes.length) {
    const shape = shapes[index];
    const img = shape.split(' ')[0];
    $('#question').html(`Draw a ${shape.toUpperCase()}`);
    $('#suggestion-box').css({
      visibility: 'hidden',
    });
    const lineIndex = random.integer(0, 2);
    $('#suggestion').html(lines[lineIndex]);
    $('#suggestion-audio').prop('src', `/audio/output${lineIndex}.wav`);
    $('#suggestion-img').prop('src', `/images/${img}.png`);
    suggestionAudioPlayed = false;
  } else {
    $('#question').html('Congratulations!');
  }
}

const alphabetButton = document.getElementById('alphabet');
alphabetButton.addEventListener('click', resetAlphabet);

function resetAlphabet() {
  index = 0;
//  shapes = alphabets_numbers;
//  $('#question').html(`Draw the number ${shapes[index]}`);
  if (changeIndex % 2 == 0) {
    shapes = alphabets_numbers;
    $('#question').html(`Draw the number ${shapes[index]}`);
    $('#alphabet').html(`Change to Shapes`)
  } else {
    shapes = diagrams;
    $('#question').html(`Draw a ${shapes[index]}`);
    $('#alphabet').html(`Change to Alphabets & Numbers`)
  };
  changeIndex += 1;
};

$(() => {
  initializeCanvas();
  init()
  .then(() => Promise.delay(2000))
  .then(() => {
    promiseWhile(
      () => true,
      () => (
        snap()
        .then(imgBlob => post(imgBlob))
        .then((expressions) => {
          if (expressions) {
            const magnifiedX = Math.floor((expressions.happiness - expressions.sadness - expressions.disgust / 2 - expressions.anger) * 4 + 4);
            if (magnifiedX < 4 && index < shapes.length) {
              $('#suggestion-box').css({
                visibility: 'visible',
              });
              if (!suggestionAudioPlayed) {
                $('#suggestion-audio')[0].play();
                suggestionAudioPlayed = true;
              }
            }
          }
          moodMeter.sendProps({
            expressions,
            shouldShowDetails: true,
          });
        })
      )
    );
    $(window).on('shape', (event, matchesObj) => {
      if (index >= shapes.length) return;
      const { matches } = matchesObj;
      const rank = matches[0].Score.toFixed(2) * 100;
      if (rank > 1 && matches[0].Name.toLowerCase() === shapes[index]) {
        failCounter = 0;
	index +=1;
        displayQuestion();
      } else {
        failCounter += 1;
        if (failCounter >= 5 && index >= 2) {
	  index -=1;
	  failCounter = 0;
//          index = 3;
	  displayQuestion();
        }
      }
    });
    displayQuestion();
  });
});
