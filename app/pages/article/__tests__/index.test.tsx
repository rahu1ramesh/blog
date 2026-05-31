
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import * as reactRouter from 'react-router';
import * as contentServer from '~/server';
import ArticlePage, { meta, loader } from '..';

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return { ...actual, useLoaderData: vi.fn() };
});

vi.mock('~/server', () => ({
  getArticle: vi.fn(),
  imageMap: {
    '/contents/my-article/images/photo.png': '/assets/photo.png',
    '/contents/other-article/images/other.png': '/assets/other.png',
  },
}));

const mockArticle = {
  slug: 'my-article',
  tag: 'software',
  basePath: '/contents/my-article',
  frontmatter: {
    title: 'my article title',
    dateCreated: '2024-01-15',
    tags: ['software'],
    draft: false,
  },
  content: 'This is the article content',
};

describe('Article page', () => {
  describe('component', () => {
    it('renders the article with formatted date', () => {
      vi.mocked(reactRouter.useLoaderData).mockReturnValue({ article: mockArticle, imageMap: {} });
      render(<MemoryRouter><ArticlePage /></MemoryRouter>);
      expect(screen.getByTestId('artile-title-test-id')).toHaveTextContent('my article title');
      expect(screen.getByTestId('article-subtitle-test-id')).toHaveTextContent('January 15, 2024');
    });

    it('renders article content', () => {
      vi.mocked(reactRouter.useLoaderData).mockReturnValue({ article: mockArticle, imageMap: {} });
      render(<MemoryRouter><ArticlePage /></MemoryRouter>);
      expect(screen.getByText('This is the article content')).toBeInTheDocument();
    });
  });

  describe('loader', () => {
    it('returns article and filtered imageMap for valid slug', () => {
      vi.mocked(contentServer.getArticle).mockReturnValue(mockArticle);
      const result = loader({ params: { slug: 'my-article' }, request: new Request('http://test.com'), context: {}, url: new URL('http://test.com'), pattern: '' });
      expect(result).toMatchObject({ article: mockArticle });
      expect((result as { imageMap: Record<string, string> }).imageMap).toEqual({
        '/contents/my-article/images/photo.png': '/assets/photo.png',
      });
    });

    it('throws 404 when article is not found', () => {
      vi.mocked(contentServer.getArticle).mockReturnValue(undefined);
      expect(() => loader({ params: { slug: 'not-found' }, request: new Request('http://test.com'), context: {}, url: new URL('http://test.com'), pattern: '' })).toThrow();
    });

    it('falls back to empty string when slug param is missing', () => {
      vi.mocked(contentServer.getArticle).mockReturnValue(undefined);
      expect(() => loader({ params: {}, request: new Request('http://test.com'), context: {}, url: new URL('http://test.com'), pattern: '' })).toThrow();
      expect(contentServer.getArticle).toHaveBeenCalledWith('');
    });
  });

  describe('meta', () => {
    it('returns capitalized title with site name', () => {
      const result = meta({ data: { article: { frontmatter: { title: 'my article title' } } } });
      expect(result[0].title).toBe('My Article Title | Rahul Ramesh');
    });

    it('capitalizes each word in the title', () => {
      const result = meta({ data: { article: { frontmatter: { title: 'hello world from space' } } } });
      expect(result[0].title).toBe('Hello World From Space | Rahul Ramesh');
    });
  });
});
