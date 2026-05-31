vi.mock('~/server/constants', () => ({
  markdownModules: {
    '/contents/newer-software/newer-software.md': [
      '---',
      'title: Newer Software',
      'dateCreated: 2024-06-01',
      'tags:',
      '  - software',
      '  - javascript',
      'draft: false',
      '---',
      'Newer content',
    ].join('\n'),
    '/contents/older-software/older-software.md': [
      '---',
      'title: Older Software',
      'dateCreated: 2024-01-01',
      'tags:',
      '  - software',
      'draft: false',
      '---',
      'Older content',
    ].join('\n'),
    '/contents/books-article/books-article.md': [
      '---',
      'title: Books Article',
      'dateCreated: 2024-03-10',
      'tags:',
      '  - books',
      'draft: false',
      '---',
      'Books content',
    ].join('\n'),
    '/contents/draft-article/draft-article.md': [
      '---',
      'title: Draft Article',
      'dateCreated: 2024-05-01',
      'tags:',
      '  - software',
      'draft: true',
      '---',
      'Draft content',
    ].join('\n'),
    '/contents/no-tags-article/no-tags-article.md': [
      '---',
      'title: No Tags Article',
      'dateCreated: 2024-02-01',
      'tags: []',
      'draft: false',
      '---',
      'No tags content',
    ].join('\n'),
  },
  imageMap: {
    '/contents/newer-software/images/photo.png': '/assets/photo.png',
  },
}));

import { getAllTags, getArticlesByTag, getArticle, imageMap } from '~/server';

describe('server', () => {
  describe('getAllTags', () => {
    it('returns sorted unique tags from non-draft articles', () => {
      expect(getAllTags()).toEqual(['books', 'javascript', 'software']);
    });

    it('excludes tags from draft articles', () => {
      expect(getAllTags()).not.toContain('draft-only-tag');
    });
  });

  describe('getArticlesByTag', () => {
    it('returns articles matching the given tag', () => {
      const result = getArticlesByTag('software');
      expect(result).toHaveLength(2);
      expect(result.map(a => a.slug)).toContain('newer-software');
      expect(result.map(a => a.slug)).toContain('older-software');
    });

    it('sorts articles by dateCreated descending', () => {
      const result = getArticlesByTag('software');
      expect(result[0].slug).toBe('newer-software');
      expect(result[1].slug).toBe('older-software');
    });

    it('excludes draft articles', () => {
      const result = getArticlesByTag('software');
      expect(result.map(a => a.slug)).not.toContain('draft-article');
    });

    it('returns empty array when no articles match the tag', () => {
      expect(getArticlesByTag('nonexistent')).toEqual([]);
    });
  });

  describe('getArticle', () => {
    it('returns the article matching the slug', () => {
      const article = getArticle('books-article');
      expect(article).toBeDefined();
      expect(article?.frontmatter.title).toBe('Books Article');
      expect(article?.basePath).toBe('/contents/books-article');
    });

    it('returns undefined for a missing slug', () => {
      expect(getArticle('nonexistent')).toBeUndefined();
    });
  });

  describe('article shape', () => {
    it('sets slug from the directory name', () => {
      expect(getArticle('newer-software')?.slug).toBe('newer-software');
    });

    it('sets tag from the first tag in frontmatter', () => {
      expect(getArticle('newer-software')?.tag).toBe('software');
    });

    it('sets tag to empty string when tags array is empty', () => {
      expect(getArticle('no-tags-article')?.tag).toBe('');
    });

    it('trims content', () => {
      expect(getArticle('newer-software')?.content).toBe('Newer content');
    });
  });

  describe('imageMap', () => {
    it('re-exports imageMap from constants', () => {
      expect(imageMap).toEqual({
        '/contents/newer-software/images/photo.png': '/assets/photo.png',
      });
    });
  });
});
