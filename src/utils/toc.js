import {findById} from './section';

export function extendToc(toc, sections) {
  return toc.map(({id, items}) => {
    const section = findById(id, sections);
    const result = {
      id,
      items: items ? extendToc(items, sections) : null,
      title: section.frontmatter.title,
      url: section.frontmatter.url,
      status: section.frontmatter.status,
    };

    return result;
  });
}
