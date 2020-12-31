// import * as tinyMCE from 'tinymce/tinymce';
import * as Events from '../api/Events';
import tinymce from 'tinymce/tinymce';
import { Css, EventUnbinder, SugarElement, WindowVisualViewport } from '@ephox/sugar';
import { Fun, Singleton, Cell } from '@ephox/katamari';

export interface ScrollInfo {
  scrollPos: {
    x: number;
    y: number;
  };
  containerWidth: string;
  containerHeight: string;
  containerTop: string;
  containerLeft: string;
  iframeWidth: string;
  iframeHeight: string;
  fullscreenChangeHandler: EventUnbinder;
}

declare const window: any;
// declare const tinymce: any;
const DOM = tinymce.DOM;
declare const document: any;

const getScrollPos = () => {
  const vp = WindowVisualViewport.getBounds(window);

  return {
    x: vp.x,
    y: vp.y
  };
};

const setScrollPos = (pos) => {
  window.scrollTo(pos.x, pos.y);
};

const viewportUpdate = WindowVisualViewport.get().fold(
  () => ({ bind: Fun.noop, unbind: Fun.noop }),
  (visualViewport) => {
    const editorContainer = Singleton.value<SugarElement>();
    const resizeBinder = Singleton.unbindable();
    const scrollBinder = Singleton.unbindable();

    const refreshScroll = () => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };

    const refreshVisualViewport = () => {
      window.requestAnimationFrame(() => {
        editorContainer.on((container) => Css.setAll(container, {
          top: visualViewport.offsetTop + 'px',
          left: visualViewport.offsetLeft + 'px',
          height: visualViewport.height + 'px',
          width: visualViewport.width + 'px'
        }));
      });
    };

    const update = tinymce.util.Delay.throttle(() => {
      refreshScroll();
      refreshVisualViewport();
    }, 50);

    const bind = (element) => {
      editorContainer.set(element);
      update();
      resizeBinder.set(WindowVisualViewport.bind('resize', update));
      scrollBinder.set(WindowVisualViewport.bind('scroll', update));
    };

    const unbind = () => {
      editorContainer.on(() => {
        resizeBinder.clear();
        scrollBinder.clear();
      });
      editorContainer.clear();
    };

    return {
      bind,
      unbind
    };
  }
);

const toggleFullscreen = (editor, fullscreenState: Cell<any>) => {
  const body = document.body;
  const documentElement = document.documentElement;
  const editorContainer = editor.getContainer();
  const editorContainerS = SugarElement.fromDom(editorContainer);

  const fullscreenInfo = fullscreenState.get();
  // const editorBody = SugarElement.fromDom(editor.getBody());

  // const isTouch = tinymce.Env.deviceType.isTouch();

  const editorContainerStyle = editorContainer.style;

  const iframe = editor.iframeElement;
  const iframeStyle = iframe.style;

  const cleanup = () => {
    //   if (isTouch) {
    //     Thor.restoreStyles(editor.dom);
    //   }

    DOM.removeClass(body, 'tox-fullscreen');
    DOM.removeClass(documentElement, 'tox-fullscreen');
    DOM.removeClass(editorContainer, 'tox-fullscreen');

    viewportUpdate.unbind();
  };

  if (!fullscreenInfo) {
    const newFullScreenInfo = {
      scrollPos: getScrollPos(),
      containerWidth: editorContainerStyle.width,
      containerHeight: editorContainerStyle.height,
      containerTop: editorContainerStyle.top,
      containerLeft: editorContainerStyle.left,
      iframeWidth: iframeStyle.width,
      iframeHeight: iframeStyle.height
    };

    iframeStyle.width = iframeStyle.height = '100%';
    editorContainerStyle.width = editorContainerStyle.height = '';

    DOM.addClass(body, 'tox-fullscreen');
    DOM.addClass(documentElement, 'tox-fullscreen');
    DOM.addClass(editorContainer, 'tox-fullscreen');

    viewportUpdate.bind(editorContainerS);

    editor.on('remove', cleanup);

    fullscreenState.set(newFullScreenInfo);
    Events.fireFullscreenStateChanged(editor, true);
  } else {
    iframeStyle.width = fullscreenInfo.iframeWidth;
    iframeStyle.height = fullscreenInfo.iframeHeight;

    editorContainerStyle.width = fullscreenInfo.containerWidth;
    editorContainerStyle.height = fullscreenInfo.containerHeight;
    editorContainerStyle.top = fullscreenInfo.containerTop;
    editorContainerStyle.left = fullscreenInfo.containerLeft;

    setScrollPos(fullscreenInfo.scrollPos);

    fullscreenState.set(null);
    Events.fireFullscreenStateChanged(editor, false);
    cleanup();
    editor.off('remove', cleanup);
  }
};

export {
  toggleFullscreen
};