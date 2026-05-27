
import { render, screen } from '@testing-library/react';
import Base from '..';

describe('Base', () => {
  it('should render the base template structure', () => {
    render(<Base body={<div>content</div>} />);
    expect(screen.getByTestId('Base Template-test-id')).toBeInTheDocument();
    expect(screen.getByTestId('content-area-test-id')).toBeInTheDocument();
    expect(screen.getByTestId('left-section-test-id')).toBeInTheDocument();
    expect(screen.getByTestId('right-section-test-id')).toBeInTheDocument();
    expect(screen.getByTestId('footer-area-test-id')).toBeInTheDocument();
  });

  it('should render the body prop in the right section', () => {
    render(<Base body={<p data-testid="body-content">hello world</p>} />);
    expect(screen.getByTestId('body-content')).toBeInTheDocument();
    expect(screen.getByTestId('body-area-test-id')).toContainElement(screen.getByTestId('body-content'));
  });

  it('should render Aside in the left section', () => {
    render(<Base body={<div />} />);
    expect(screen.getByTestId('header-area-test-id')).toBeInTheDocument();
    expect(screen.getByTestId('logo-test-id')).toBeInTheDocument();
  });

  it('should render Footer in the footer area', () => {
    render(<Base body={<div />} />);
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
  });
});
