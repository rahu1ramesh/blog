
import { render, screen } from '@testing-library/react';
import Footer from '..';
import { APP_FOOTER_TEXT, SOCIAL_MEDIA_LINKS } from '~/constants/app';

describe('Footer', () => {
  it('it should render the copyright information with current year', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(APP_FOOTER_TEXT(currentYear))).toBeInTheDocument();
  });

  it.each(SOCIAL_MEDIA_LINKS)('should render social media link for $label', ({ id, label, link, icon }) => {
    render(<Footer />);
    const listItem = screen.getByTestId(`social-media-item-${id}-test-id`);
    expect(listItem).toBeInTheDocument();
    expect(listItem).toHaveAttribute('aria-label', label);

    const anchor = listItem.querySelector('a');
    expect(anchor).toHaveAttribute('href', link);
    expect(anchor).toHaveAttribute('aria-label', `${label} Link`);

    const img = listItem.querySelector('img');
    expect(img).toHaveAttribute('src', `${import.meta.env.BASE_URL}${icon}.svg`);
    expect(img).toHaveAttribute('alt', label);
  });
})
