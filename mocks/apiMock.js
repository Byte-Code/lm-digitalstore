const world = require('./world.json');

export default function fetchWorld() {
  return new Promise((resolve) => {
    process.nextTick(
      () => resolve(world)
    );
  });
}
