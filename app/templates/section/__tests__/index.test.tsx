
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Section from '..';

const mockItems = [
  { title: 'software', link: '/writing/software' },
  { title: 'books', link: '/writing/books' },
];

describe('Section', () => {
  it("should render the title and subtitle correctly", () => {
    render(<MemoryRouter><Section title="Writing" subtitle='All those moments will be lost in time, like tears in rain' items={mockItems} /></MemoryRouter>);
    expect(screen.getByTestId("section-template-title-test-id")).toHaveTextContent("Writing");
    expect(screen.getByTestId("section-template-subtitle-test-id")).toHaveTextContent("All those moments will be lost in time, like tears in rain");
  });

  it("should render the list items correctly", () => {
    render(<MemoryRouter><Section title="Writing" items={mockItems} /></MemoryRouter>);

    expect(screen.getByTestId("software-folder-title-test-id")).toHaveTextContent("software");
    expect(screen.getByTestId("books-folder-title-test-id")).toHaveTextContent("books");
    expect(screen.getByTestId("software-folder-link-test-id")).toHaveAttribute("href", "/writing/software");
    expect(screen.getByTestId("books-folder-link-test-id")).toHaveAttribute("href", "/writing/books");
  });

  it('should skip optional fields', () => {
    render(<MemoryRouter><Section title="Writing" items={mockItems} /></MemoryRouter>);

    expect(screen.queryByTestId("section-template-subtitle-test-id")).not.toBeInTheDocument();
  });
});
