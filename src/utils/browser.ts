/* global window */
import Bowser from 'bowser';

const browser = {
  parser: null,
  isEdgeHTML: false,
};

if (typeof window !== 'undefined') {
  browser.parser = Bowser.getParser(window.navigator.userAgent);
  browser.isEdgeHTML = browser.parser.satisfies({
    windows: {
      edge: '<19',
    },
  });
}

export { browser };
