import $ from 'jquery';
import Promise from 'bluebird';
import superagent from 'superagent';
import wrapper from 'superagent-promise';
const request = wrapper(superagent, Promise);
let video;

export const init = () => {
  video = $('#video')[0];
  $('#video').css({
    width: '90%',
    height: 'auto',
    margin: '0 auto',
  });
  const constraints = {
    video: true,
    audio: false,
  };
  return navigator.mediaDevices.getUserMedia(constraints).then((mediaStream) => {
    const src = window.URL.createObjectURL(mediaStream);
    video.src = src;
    video.play();
    return Promise.resolve({ mediaStream, src });
  });
};

const canvas = document.createElement('canvas');
canvas.style.visibility = 'hidden';
const context = canvas.getContext('2d');

export const snap = () => {
  if (!video.videoWidth || !video.videoHeight) {
    return Promise.resolve(null);
  }
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0);
  return new Promise((resolve) => {
    canvas.toBlob(resolve);
  });
};

export const post = (imgBlob) => {
  const req = request
  .post('http://emotion.facerecog.io:3001/')
  .field('imgFile', imgBlob);
  return req.end().then((res) => {
    if (res.body.status === 'error') {
      throw new Error(res.body.message);
    }
    if (!res.body.data.length) {
      return null;
    }
    return res.body.data[0].scores;
  });
  // console.log(imgBlob);
  // return Promise
  // .delay(2000, {
  //   age: 23,
  //   gender: 'male',
  //   expressions: {
  //     happiness: 0.1,
  //     sadness: 0.1,
  //     surprise: 0.1,
  //     neutral: 0.1,
  //     anger: 0.1,
  //     disgust: 0.1,
  //     contempt: 0.1,
  //     fear: 0.1,
  //   },
  // });
};
