
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Aside from '..';
import { APP_ASIDE_ITEMS } from '../constants';

describe('Aside', () => {
  it("should show icon", () => {
    render(<MemoryRouter><Aside /></MemoryRouter>);
    expect(screen.getByTestId("logo-test-id")).toBeInTheDocument();
  })

  it("should navigate to / when logo is clicked", () => {
    render(<MemoryRouter><Aside /></MemoryRouter>);
    expect(screen.getByTestId("page-aside-logo-test-id")).toHaveAttribute('href', '/');
  })

  it.each(APP_ASIDE_ITEMS)('should render nav links', ({ id, label, link }) => {
    render(<MemoryRouter><Aside /></MemoryRouter>);
    const listItem = screen.getByTestId(`page-aside-${id}-test-id`);
    expect(listItem).toBeInTheDocument();
    expect(listItem).toHaveAttribute('aria-label', label);

    const anchor = listItem.querySelector('a');
    expect(anchor).toHaveAttribute('href', link);
    expect(anchor).toHaveAttribute('aria-label', `${label} Link`);
  });

  it.each([
    { path: '/writing', activeId: 'writing' },
    { path: '/', activeId: 'about' },
  ])('should mark $activeId as current for path $path', ({ path, activeId }) => {
    render(<MemoryRouter initialEntries={[path]}><Aside /></MemoryRouter>);
    const activeItem = screen.getByTestId(`page-aside-${activeId}-test-id`);
    expect(activeItem.querySelector('a')).toHaveAttribute('aria-label', `${activeId.charAt(0).toUpperCase() + activeId.slice(1)} Link`);
  });
})
