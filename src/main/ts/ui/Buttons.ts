import { Cell } from '@ephox/katamari';

const makeSetupHandler = (editor, fullscreenState: Cell<object>) => (api) => {
    api.setActive(fullscreenState.get() !== null);
    const editorEventCallback = (e) => api.setActive(e.state);
    editor.on('FullscreenStateChanged', editorEventCallback);
    return () => editor.off('FullscreenStateChanged', (e) => {
        api.setActive(e.state);
    });
};

const register = (editor, fullscreenState: Cell<object>) => {
    editor.ui.registry.addToggleMenuItem('fullscreen', {
        text: 'Fullscreen',
        icon: 'fullscreen',
        shortcut: 'Meta+Shift+F',
        onAction: () => editor.execCommand('mceFullScreen'),
        onSetup: makeSetupHandler(editor, fullscreenState)
    });

    editor.ui.registry.addToggleButton('fullscreen', {
        tooltip: '全屏',
        icon: 'fullscreen',
        onAction: () => editor.execCommand('mceFullScreen'),
        onSetup: makeSetupHandler(editor, fullscreenState)
    });
};

export {
    register
};
