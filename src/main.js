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
          console.log(expressions);
          moodMeter.sendProps({
            expressions,
            shouldShowDetails: true,
          });
        })
      )
    );
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
