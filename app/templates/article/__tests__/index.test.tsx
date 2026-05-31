
import { render, screen } from '@testing-library/react';
import Article from '..';

describe('Article', () => {
  it('should render the title and date in', () => {
    render(<Article
            title='Do Androids Dream of Electric Sheep?'
            subtitle='Philip K. Dick'
            content='All those moments will be lost in time, like tears in rain'
          />)

    expect(screen.getByTestId("artile-title-test-id")).toHaveTextContent("Do Androids Dream of Electric Sheep?");
    expect(screen.getByTestId("article-subtitle-test-id")).toHaveTextContent("Philip K. Dick");
    expect(screen.getByText("All those moments will be lost in time, like tears in rain")).toBeInTheDocument();
  });

  it('should skip optional fields', () => {
    render(<Article
            title='Do Androids Dream of Electric Sheep?'
            content='All those moments will be lost in time, like tears in rain'
          />)

    expect(screen.getByTestId("artile-title-test-id")).toHaveTextContent("Do Androids Dream of Electric Sheep?");
    expect(screen.queryByTestId("article-subtitle-test-id")).not.toBeInTheDocument();
    expect(screen.getByText("All those moments will be lost in time, like tears in rain")).toBeInTheDocument();
  });

  it.each([
    {
      description: 'resolves ./ prefixed image src via imageMap',
      src: './images/photo.png',
      basePath: '/contents/software/my-article',
      expectedKey: '/contents/software/my-article/images/photo.png',
    },
    {
      description: 'resolves bare image src via imageMap',
      src: 'images/photo.png',
      basePath: '/contents/software/my-article',
      expectedKey: '/contents/software/my-article/images/photo.png',
    },
  ])('$description', async ({ src, basePath, expectedKey }) => {
    const resolvedUrl = '/assets/photo-hashed.png';
    const imageMap = { [expectedKey]: resolvedUrl };

    render(<Article
            title='Title'
            content={`![alt](${src})`}
            basePath={basePath}
            imageMap={imageMap}
          />)

    const img = await screen.findByRole('img', { name: 'alt' });
    expect(img).toHaveAttribute('src', resolvedUrl);
  });

  it('falls back to original src when imageMap key is missing', async () => {
    render(<Article
            title='Title'
            content='![alt](./images/missing.png)'
            basePath='/contents/software/my-article'
            imageMap={{}}
          />)

    const img = await screen.findByRole('img', { name: 'alt' });
    expect(img).toHaveAttribute('src', './images/missing.png');
  });

  it('renders img without modification when basePath or imageMap are absent', async () => {
    render(<Article
            title='Title'
            content='![alt](./images/photo.png)'
          />)

    const img = await screen.findByRole('img', { name: 'alt' });
    expect(img).toHaveAttribute('src', './images/photo.png');
  });
})
