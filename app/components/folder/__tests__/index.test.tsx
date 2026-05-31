
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Folder from '..';

describe('Folder', () => {
  it('renders the title', () => {
    render(<MemoryRouter><Folder id='software' title='software' link='/software' /></MemoryRouter>)
    expect(screen.getByText('software')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/software');
  });
});
