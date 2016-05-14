import $ from 'jquery';
const feelings = [
  ['Enraged', 'Furious', 'Frustrated', 'Shocked', 'Surprised', 'Upbeat', 'Motivated', 'Ecstatic'],
  ['Livid', 'Frightened', 'Nervous', 'Restless', 'Hyper', 'Cheerful', 'Inspired', 'Elated'],
  ['Fuming', 'Apprehensive', 'Worried', 'Annoyed', 'Energized', 'Lively', 'Optimistic', 'Thrilled'],
  ['Repulsed', 'Troubled', 'Uneasy', 'Peeved', 'Pleasant', 'Joyful', 'Proud', 'Blissful'],
  ['Disgusted', 'Disappointed', 'Glum', 'Ashamed', 'Blessed', 'At Ease', 'Content', 'Fulfilled'],
  ['Mortified', 'Alienated', 'Mopey', 'Apathetic', 'Humble', 'Secure', 'Chill', 'Grateful'],
  ['Embarrassed', 'Excluded', 'Timid', 'Drained', 'Calm', 'Satisfied', 'Relaxed', 'Carefree'],
  ['Alone', 'Down', 'Bored', 'Tired', 'Relieved', 'Restful', 'Tranquil', 'Serene'],
];

class Drawer {
  constructor(options) {
    const { canvas, canvasPixelHeight, canvasPixelWidth } = options;
    /* eslint-disable no-param-reassign */
    canvas.height = canvas.width * (canvasPixelHeight / canvasPixelWidth);
    /* eslint-disable no-param-reassign */
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.gridSize = 4;
    this.width = canvas.width / (this.gridSize * 2 + 1);
    this.height = canvas.height / (this.gridSize * 2 + 1);
    this.leftX = 0.5 * this.width;
    this.topY = 0.5 * this.height;
    this.centerX = this.leftX + this.gridSize * this.width;
    this.centerY = this.topY + this.gridSize * this.height;
    this.transparencyStep = 1 / 60;
    this.transparency = 1;
    this.decreasingTransparency = true;
    this.props = null;
    this.render = this.render.bind(this);
  }

  getPixelColor(x, y) {
    const { ctx, width, height } = this;
    return ctx.getImageData(width * (x + 0.5) + 1, height * (y + 0.5) + 1, 1, 1).data;
  }

  grid(startPixelX, startPixelY, baseHue, baseLightness, hueStep, lightnessStep) {
    const { ctx, width, height, gridSize } = this;
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const lightness = baseLightness - lightnessStep * i;
        const hsla = `hsla(${baseHue + hueStep * j},100%,${lightness}%,1)`;
        ctx.fillStyle = hsla;
        ctx.fillRect(startPixelX + j * width, startPixelY + i * height, width, height);
      }
    }
  }

  magnifySquare(x, y) {
    const { ctx, width, height, gridSize } = this;
    const normalizedX = Math.max(Math.min(x, gridSize * 2 - 1), 0);
    const normalizedY = Math.max(Math.min(y, gridSize * 2 - 1), 0);
    const color = this.getPixelColor(normalizedX, normalizedY);
    ctx.shadowBlur = 20;
    ctx.shadowColor = 'black';
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.fillStyle = `rgb(${color[0]},${color[1]},${color[2]})`;
    ctx.fillRect(width * normalizedX, height * normalizedY, width * 2, height * 2);
    ctx.shadowBlur = 0;
  }

  sendProps(newProps) {
    this.props = newProps;
  }

  draw() {
    const { canvas, ctx, leftX, centerX, topY, centerY, transparency, props } = this;
    const { expressions, shouldShowDetails } = props;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.grid(leftX, topY, 0, 50, 8, 5);
    this.grid(centerX, topY, 40, 50, 5, 5);
    this.grid(leftX, centerY, 240, 50, -8, 5);
    this.grid(centerX, centerY, 120, 40, -8, 5);

    let text;
    if (!shouldShowDetails || !expressions) {
      text = 'Plotting';
    } else {
      /* eslint-disable max-len */
      const magnifiedX = Math.floor((expressions.happiness - expressions.sadness - expressions.disgust / 2 - expressions.anger) * 4 + 4);
      const magnifiedY = Math.floor((expressions.surprise - expressions.happiness + expressions.fear - expressions.anger + expressions.disgust / 2) * 1.6 + 4);
      /* eslint-enable max-len */
      this.magnifySquare(magnifiedX, magnifiedY);
      text = feelings[magnifiedY][magnifiedX];
    }
    ctx.font = '30px Raleway';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = `rgba(255, 255, 255, ${transparency})`;
    ctx.fillText(text, centerX, centerY);
  }

  render() {
    requestAnimationFrame(this.render);
    let { transparency, decreasingTransparency } = this;
    const { transparencyStep, props } = this;
    if (!props.shouldShowDetails) {
      transparency += decreasingTransparency ? -transparencyStep : transparencyStep;
      if (transparency >= 1) {
        decreasingTransparency = true;
      } else if (transparency <= 0) {
        decreasingTransparency = false;
      }
    } else {
      transparency = 1;
      decreasingTransparency = true;
    }
    this.draw();
  }
}

const canvasPixelWidth = 220;
const canvasPixelHeight = canvasPixelWidth;

const canvasStyle = {
  width: `${canvasPixelWidth}px`,
  height: `${canvasPixelHeight}px`,
  display: 'block',
  margin: '0 auto',
};

const canvas = $('#mood-meter');
$(canvas).css(canvasStyle);

const drawer = new Drawer({
  canvasPixelWidth,
  canvasPixelHeight,
  canvas: canvas[0],
});

drawer.sendProps({
  expressions: null,
  shouldShowDetails: false,
});

drawer.render();

module.exports = drawer;
