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
let index = 0;
function displayQuestion() {
  if (index < shapes.length) {
    $('#question').html(`Draw a ${shapes[index]}`);
  } else {
    $('question').html('Congratulations!');
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
          // console.log(expressions);
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
        index += 1;
        displayQuestion();
      } else {
        console.log(matches[0].Name.toLowerCase());
        console.log(shapes[index], index);
      }
    });
    displayQuestion();
  });
  // .then((imgBlob) => {
  //   console.log(imgBlob);
  //   return post(imgBlob);
  // })
  // .then((res) => {
  //   console.log(res);
  // })
  // .catch((err) => {
  //   console.error(err);
  // });
});
