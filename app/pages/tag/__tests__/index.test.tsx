
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import * as reactRouter from 'react-router';
import TagPage, { meta, loader } from '..';
import * as contentServer from '~/server';

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return { ...actual, useLoaderData: vi.fn() };
});

vi.mock('~/server', () => ({
  getArticlesByTag: vi.fn(),
}));

const mockArticles = [
  {
    slug: 'article-one',
    tag: 'software',
    basePath: '/contents/article-one',
    frontmatter: {
      title: 'article one',
      dateCreated: '2024-03-10',
      tags: ['software'],
      draft: false,
    },
    content: '',
  },
  {
    slug: 'article-two',
    tag: 'software',
    basePath: '/contents/article-two',
    frontmatter: {
      title: 'article two',
      dateCreated: '2024-01-05',
      tags: ['software'],
      draft: false,
    },
    content: '',
  },
];

describe('Tag page', () => {
  describe('component', () => {
    it('renders tag title and list of articles with formatted dates', () => {
      vi.mocked(reactRouter.useLoaderData).mockReturnValue({ tag: 'software', articles: mockArticles });
      render(<MemoryRouter><TagPage /></MemoryRouter>);
      expect(screen.getByTestId('list-template-title-test-id')).toHaveTextContent('software');
      const titles = screen.getAllByTestId('list-item-title-test-id');
      expect(titles[0]).toHaveTextContent('article one');
      expect(titles[1]).toHaveTextContent('article two');
      const dates = screen.getAllByTestId('list-item-date-test-id');
      expect(dates[0]).toHaveTextContent('March 10, 2024');
      expect(dates[1]).toHaveTextContent('January 5, 2024');
    });

    it('renders article links using tag and slug', () => {
      vi.mocked(reactRouter.useLoaderData).mockReturnValue({ tag: 'software', articles: mockArticles });
      render(<MemoryRouter><TagPage /></MemoryRouter>);
      const items = screen.getAllByTestId('list-item-test-id');
      expect(items[0]).toHaveAttribute('href', '/writing/software/article-one');
      expect(items[1]).toHaveAttribute('href', '/writing/software/article-two');
    });

    it('renders empty list when no articles exist for tag', () => {
      vi.mocked(reactRouter.useLoaderData).mockReturnValue({ tag: 'books', articles: [] });
      render(<MemoryRouter><TagPage /></MemoryRouter>);
      expect(screen.getByTestId('list-template-title-test-id')).toHaveTextContent('books');
      expect(screen.queryAllByTestId('list-item-test-id')).toHaveLength(0);
    });

    it('renders empty title when tag is undefined', () => {
      vi.mocked(reactRouter.useLoaderData).mockReturnValue({ tag: undefined, articles: [] });
      render(<MemoryRouter><TagPage /></MemoryRouter>);
      expect(screen.getByTestId('list-template-title-test-id')).toHaveTextContent('');
    });
  });

  describe('loader', () => {
    it('returns tag and articles for the given tag', () => {
      vi.mocked(contentServer.getArticlesByTag).mockReturnValue(mockArticles);
      const result = loader({ params: { tag: 'software' }, request: new Request('http://test.com'), context: {}, url: new URL("http://test.com"), pattern: ""  });
      expect(result).toEqual({ tag: 'software', articles: mockArticles });
    });

    it('defaults tag to empty string when param is missing', () => {
      vi.mocked(contentServer.getArticlesByTag).mockReturnValue([]);
      const result = loader({ params: {}, request: new Request('http://test.com'), context: {}, url: new URL('http://test.com'), pattern: '' });
      expect(result).toEqual({ tag: '', articles: [] });
    });
  });

  describe('meta', () => {
    it('returns capitalized tag with site name', () => {
      const result = meta({ data: { tag: 'software' } });
      expect(result[0].title).toBe('Software | Rahul Ramesh');
    });

    it('capitalizes each word in multi-word tag', () => {
      const result = meta({ data: { tag: 'software engineering' } });
      expect(result[0].title).toBe('Software Engineering | Rahul Ramesh');
    });
  });
});
