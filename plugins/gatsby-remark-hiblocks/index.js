'use strict';

const visit = require('unist-util-visit');
const findAfter = require('unist-util-find-after');
const is = require('unist-util-is');


function openBlockMaybe(text, node) {
  let status = false;

  if (text.startsWith('WARNING:')) {
    text = text.substr(8);
    status = true;
    node.type = 'html';
    node.value = '<div class="hiblock warning">';
  }

  if (text.startsWith('NOTE:')) {
    text = text.substr(5);
    status = true;
    node.type = 'html';
    node.value = '<div class="hiblock note">';
  }

  if (text.startsWith('TODO:')) {
    text = text.substr(5);
    status = true;
    node.type = 'html';
    node.value = '<div class="hiblock todo">';
  }

  if (text.startsWith('EXAMPLE:')) {
    text = text.substr(8);
    status = true;
    node.type = 'html';
    node.value = '<div class="hiblock example">';
  }


  return {newNode: node, status, text};
}

module.exports = ({markdownAST}) => {
  let open = false;

  visit(markdownAST, node => {
    if (!is('thematicBreak', node)) {
      return visit.CONTINUE;
    }

    if (is('thematicBreak', node) && open == false) {
      const next = findAfter(markdownAST, node);

      if (is('paragraph', next)) {
        let firstChild = next.children[0];

        if (is('text', firstChild)) {
          let { newNode, status, text } = openBlockMaybe(firstChild.value, node);
          node = newNode;
          open = status;
          firstChild.value = text;
        } else if (is('strong', firstChild)) {
          const textChild = firstChild.children[0];
          if (is('text', textChild)) {
            let { newNode, status } = openBlockMaybe(textChild.value, node);
            node = newNode;
            open = status;
            firstChild.children.shift();
          }
        }
      }
    }

    if (is('thematicBreak', node) && open == true) {
      open = false;
      node.type = 'html';
      node.value = '</div>';
    }
  });


  return markdownAST;
};
