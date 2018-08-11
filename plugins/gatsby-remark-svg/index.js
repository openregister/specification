'use strict';

const visit = require('unist-util-visit');

module.exports = ({markdownAST}) => {
  visit(markdownAST, 'image', (node) => {
    const fileType = node.url.slice(-3);

    if (fileType != 'svg') return visit.CONTINUE;

    const figure = `
      <figure class="figure-svg">
        <img src="${node.url}" alt="${node.alt}" title="${node.title || ''}">
      </figure>
    `;
    node.type = 'html';
    node.value = figure;

  });

  return markdownAST;
};
