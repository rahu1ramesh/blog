
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
  })
})
