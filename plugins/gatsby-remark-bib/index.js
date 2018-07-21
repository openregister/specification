'use strict';

const visit = require('unist-util-visit');

module.exports = (
  { markdownAST },
  { db }
) => {
  const bib = db.bibliography;

  visit(markdownAST, 'link', node => {
    const { url } = node;

    if (url.startsWith('@')) {
      const ref = bib.find(({ id }) => id == url.substr(1));

      if (ref == undefined) {
        throw `Found a reference ${url} without an entry in the bibliography database`;
      }

      const { title, authors, publisher } = ref;

      node.url = ref.url;
      node.title = [title, authors.join('; '), publisher].join('. ');
      // node.children = node.children.concat([
      //   {type: 'html', value: '<sup>'},
      //   {type: 'text', value: id},
      //   {type: 'html', value: '</sup>'}
      // ]);

    }
  });

  return markdownAST;
};
