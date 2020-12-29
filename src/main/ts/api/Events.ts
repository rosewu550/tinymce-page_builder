const fireFullscreenStateChanged = function (editor, state) {
  editor.fire('FullscreenStateChanged', { state });
};

export {
  fireFullscreenStateChanged
};
