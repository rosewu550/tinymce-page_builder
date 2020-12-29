
const get = function (fullscreenState) {
  return {
    isFullscreen() {
      return fullscreenState.get() !== null;
    }
  };
};

export {
  get
};