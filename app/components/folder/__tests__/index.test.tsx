
import { render, screen } from '@testing-library/react';
import Folder from '..';

describe('Folder', () => {
  it('renders the title', () => {
    render(<Folder id='software' title='software' link='/software' />)
    expect(screen.getByText('software')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/software');
  });
});
