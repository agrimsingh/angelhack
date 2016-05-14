import Promise from 'bluebird';
export default (condition, action) => (
  new Promise((resolve, reject) => {
    const loop = () => {
      if (!condition()) resolve();
      return Promise.try(action)
      .then(loop)
      .catch(reject);
    };
    Promise.delay(0).then(loop);
  })
);
