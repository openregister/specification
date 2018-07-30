'use strict';

const visit = require('unist-util-visit');
const is = require('unist-util-is');
const findAfter = require('unist-util-find-after');


module.exports = (
  { markdownAST },
) => {
  let open = false;

  visit(markdownAST, 'thematicBreak', (node) => {
    if (open == true) {
      open = false;
      node.type = 'html';
      node.value = '</div>';
    } else {
      const next = findAfter(markdownAST, node);

      if (is('heading', next)) {
        let text = next.children[0];

        if (is('text', text) && text.value == 'Endpoint') {
          open = true;
          node.type = 'html';
          node.value = '<div class="http-interface">';
        }
      }

    }
  });

  return markdownAST;
};
