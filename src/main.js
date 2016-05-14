import 'webrtc-adapter';
import $ from 'jquery';
import promiseWhile from './promiseWhile';
import Promise from 'bluebird';
import {
  init,
  snap,
  post,
} from './webcam';
import moodMeter from './moodMeter';
import initializeCanvas from './draw';
const shapes = ['circle', 'square', 'star', 'triangle', 'star', 'oxygen molecule'];
let failCounter = 0;
let index = 0;
function displayQuestion() {
  if (index < shapes.length) {
    const shape = shapes[index];
    const img = shape.split(' ')[0];
    $('#question').html(`Draw a ${shape}`);
    $('#suggestion-box').css({
      visibility: 'hidden',
    });
    $('#suggestion').html('WHAT EVER THE FUCK MUHD WANTS');
    $('#suggestion-img').prop('src', `/images/${img}.png`);
  } else {
    $('#question').html('Congratulations!');
  }
}
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
        if (index === 2) {
          index = 5;
        } else index += 1;
        displayQuestion();
      } else {
        failCounter += 1;
        if (failCounter >= 3 && index === 2) {
          index = 3;
          displayQuestion();
        }
      }
    });
    displayQuestion();
  });
});
