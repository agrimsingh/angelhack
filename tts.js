const watson = require('watson-developer-cloud');
const fs = require('fs');
const _ = require('lodash');

const tts = watson.text_to_speech({
  username: '290026de-7586-424a-b2d9-99c29f08fa1b',
  password: 'CxdNbktJTopM',
  version: 'v1',
  url: 'https://stream.watsonplatform.net/text-to-speech/api',
});

const lines = [
  'Hello there, you look a little confused! Here\'s a quick tip.',
  'One thing I learned is to never give up when the going gets tough. Here\'s a quick tip.',
  'Here\'s a quick tip for this drawing.',
];

_.forEach(lines, (line, index) => {
  const params = {
    text: line,
    voice: 'en-US_AllisonVoice', // Optional voice
    accept: 'audio/wav',
  };
  // Pipe the synthesized text to a file
  tts.synthesize(params).pipe(fs.createWriteStream(`build/audio/output${index}.wav`));
});




