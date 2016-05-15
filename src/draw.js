/* eslint-disable new-cap, no-param-reassign */
import outlines from 'outlines';
import recognizer from './recognizer';
import $ from 'jquery';

const width = 480;
const height = 480;
const laneWidth = width / 8;
const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');
const $cvs = $(cvs);
let last;
let mouseIsDown = false;
let points = [];
let strokeId = 0;

cvs.width = width;
cvs.height = height;
$cvs.css({
  border: '1px solid black',
  margin: '0 auto',
});

function line(x0, y0, x1, y1, color) {
  ctx.strokeStyle = color || 'rgb(173, 216, 230)';
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.lineWidth = 7;
  ctx.shadowBlur = 7 + 2 * Math.random();
  ctx.shadowColor = color || 'rgb(173, 216, 230)';
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.stroke();
}

function getLocalCoordinates(event) {
  const offset = $cvs.offset();
  return {
    x: event.clientX - offset.left,
    y: event.clientY - offset.top + $(window).scrollTop(),
  };
}

function drawPointCloud(pointCloud, x, y, scale, color) {
  for (let i = 1; i < pointCloud.length; i++) {
        // Draw from the previous point to this point so long as they have the same
        // stroke id
    if (pointCloud[i - 1].ID === pointCloud[i].ID) {
      line(
        pointCloud[i - 1].X * scale + x + scale / 2,
        pointCloud[i - 1].Y * scale + y + scale / 2,
        pointCloud[i].X * scale + x + scale / 2,
        pointCloud[i].Y * scale + y + scale / 2,
        color
      );
    }
  }
}

function initializeCanvas() {
  ctx.clearRect(0, 0, cvs.width, cvs.height);

    // Draw all the set of shapes
//   for (let i = 0; i < recognizer.PointClouds.length; i++) {
//     drawPointCloud(
//       recognizer.PointClouds[i].Points,
//       (i % 8) * laneWidth,
//       380 + Math.floor(i / 8) * laneWidth,
//       laneWidth * 0.9, '#9f9fff'
//     );
//   }
}

function getShade(score) {
  const intensity = Math.floor((1.0 - score) * 255);
  return `rgb(${intensity}, ${intensity}, ${intensity})`;
}

function getPointCloud(name) {
  let pointCloud;
  // Find the point cloud based on the supplied name
  for (let i = 0; i < recognizer.PointClouds.length; i++) {
    if (recognizer.PointClouds[i].Name === name) {
      pointCloud = recognizer.PointClouds[i].Points;
      break;
    }
  }
  return pointCloud;
}

function displayMatches(matches) {
  const adjustedWidth = Math.floor(laneWidth * 1.2);
  // Clear background of shapes
  ctx.clearRect(cvs.width - adjustedWidth, 0, adjustedWidth, 370);

  if (matches.length) {
    drawPointCloud(outlines.Normalize(points), cvs.width - laneWidth, 300, laneWidth, 'red');
  }

  const matchesElem = document.getElementById('matches');
  let output = '<div>';

  for (let i = 0; i < matches.length; i++) {
    const rank = matches[i].Score.toFixed(2) * 100;
    if (rank > 1) {
      // Render Canvas Shape Feedback
      drawPointCloud(
        getPointCloud(matches[i].Name),
        cvs.width - laneWidth,
        10 + i * laneWidth * 1.2,
        laneWidth,
        getShade(matches[i].Score)
      );
      // Render DOM UI
      output += `<span>'${matches[i].Name}' : ${(rank.toFixed(1))}</span></br>`;
    }
  }
  output += '</div>';
  matchesElem.innerHTML = output;
}

function onMouseDown(event) {
  event.preventDefault();
  event.stopPropagation();

  last = getLocalCoordinates(event);
  mouseIsDown = true;

  strokeId++;

  points.push(new outlines.Point(last.x, last.y, strokeId));
}

function onMouseMove(event) {
  event.preventDefault();
  event.stopPropagation();

  if (!mouseIsDown) {
    return;
  }

  const mouse = getLocalCoordinates(event);
  line(last.x, last.y, mouse.x, mouse.y);
  last = mouse;

  points.push(new outlines.Point(mouse.x, mouse.y, strokeId));
}

function onMouseUp(event) {
  event.preventDefault();
  event.stopPropagation();

  mouseIsDown = false;
  const matches = recognizer.Rank(points);
  displayMatches(matches);
  $(window).trigger('shape', { matches });
}

function onTouchStart(event) {
  event.clientX = event.changedTouches[0].clientX;
  event.clientY = event.changedTouches[0].clientY;
  onMouseDown(event);
}

function onTouchMove(event) {
  event.clientX = event.changedTouches[0].clientX;
  event.clientY = event.changedTouches[0].clientY;
  onMouseMove(event);
}

function onTouchEnd(event) {
  onMouseUp(event);
}

cvs.addEventListener('mousedown', onMouseDown, false);
cvs.addEventListener('mousemove', onMouseMove, false);
cvs.addEventListener('mouseup', onMouseUp, false);

cvs.addEventListener('touchstart', onTouchStart, false);
cvs.addEventListener('touchmove', onTouchMove, false);
cvs.addEventListener('touchend', onTouchEnd, false);

function reset(event) {
  event.preventDefault();
  event.stopPropagation();

//   const result = recognizer.Recognize(points);
  points = [];
  strokeId = 0;

    // Clear our matched display info
  initializeCanvas();
  document.getElementById('matches').innerHTML = '';
}

const cancelButton = document.getElementById('cancel');
cancelButton.addEventListener('touchstart', reset, false);
cancelButton.addEventListener('mousedown', reset, true);

document.addEventListener('keydown', (event) => {
  if (event.keyCode === 32) {
    reset(event);
  }
}, false);

export default initializeCanvas;
