
import { render, screen } from '@testing-library/react';
import Aside from '..';
import { APP_ASIDE_ITEMS } from '~/constants/app';

describe('Aside', () => {
  it("should show icon", () => {
    render(<Aside />);
    expect(screen.getByTestId("logo-test-id")).toBeInTheDocument();
  })

  it.each(APP_ASIDE_ITEMS)('should render nav links', ({ id, label, link }) => {
    render(<Aside />);
    const listItem = screen.getByTestId(`page-aside-${id}-test-id`);
    expect(listItem).toBeInTheDocument();
    expect(listItem).toHaveAttribute('aria-label', label);

    const anchor = listItem.querySelector('a');
    expect(anchor).toHaveAttribute('href', link);
    expect(anchor).toHaveAttribute('aria-label', `${label} Link`);
  });
})
