
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Base from '..';

describe('Base', () => {
  it('should render the-t structure', () => {
    render(<MemoryRouter><Base body={<div>content</div>} /></MemoryRouter>);
    expect(screen.getByTestId('base-template-test-id')).toBeInTheDocument();
    expect(screen.getByTestId('content-area-test-id')).toBeInTheDocument();
    expect(screen.getByTestId('left-section-test-id')).toBeInTheDocument();
    expect(screen.getByTestId('right-section-test-id')).toBeInTheDocument();
    expect(screen.getByTestId('footer-area-test-id')).toBeInTheDocument();
  });

  it('should render the body prop in the right section', () => {
    render(<MemoryRouter><Base body={<p data-testid="body-content">hello world</p>} /></MemoryRouter>);
    expect(screen.getByTestId('body-content')).toBeInTheDocument();
    expect(screen.getByTestId('body-area-test-id')).toContainElement(screen.getByTestId('body-content'));
  });

  it('should render Aside in the left section', () => {
    render(<MemoryRouter><Base body={<div />} /></MemoryRouter>);
    expect(screen.getByTestId('header-area-test-id')).toBeInTheDocument();
    expect(screen.getByTestId('logo-test-id')).toBeInTheDocument();
  });

  it('should render Footer in the footer area', () => {
    render(<MemoryRouter><Base body={<div />} /></MemoryRouter>);
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
  });
});
