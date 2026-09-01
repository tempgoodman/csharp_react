import { fireEvent, render, screen } from '@testing-library/react';
import { vi, describe, it, expect, afterEach } from 'vitest';
import ItemList from './ItemList';
import { fetchWithAuth } from '../api/fetchClient';

vi.mock('../api/fetchClient');

describe('ItemList Component', () => {

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render the title', () => {
    vi.mocked(fetchWithAuth).mockResolvedValue({
      ok: true,
      json: async () => ({ items: [], meta: { totalRecords: 0, totalPages: 1 } })
    } as Response);

    render(<ItemList />);
    expect(screen.getByText(/Item List/i)).toBeInTheDocument();
  });

  it('should show loading', () => {
    vi.mocked(fetchWithAuth).mockResolvedValue({
      ok: true,
      json: async () => ({ items: [], meta: { totalRecords: 0, totalPages: 1 } })
    } as Response);

    render(<ItemList />);
    expect(screen.getByText(/Please wait, it could take more then 50 sec due to the Server API need to cold boot.../i)).toBeInTheDocument();
  });

  it('show correct total items and page info', async () => {
    const mockData = {
      items: [
        { id: 1, name: 'Item A', price: 99.9, imageUrl: 'https://test.com/1.jpg' },
        { id: 2, name: 'Item B', price: 199.9, imageUrl: 'https://test.com/2.jpg' },
      ],
      meta: {
        totalRecords: 2,
        totalPages: 1,
        currentPage: 1,
        pageSize: 6
      }
    };

    vi.mocked(fetchWithAuth).mockResolvedValue({
      ok: true,
      json: async () => mockData, 
    } as Response);

    render(<ItemList />);

    const item1 = await screen.findByText('Item A');
    const item2 = await screen.findByText('Item B');
    
    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();

    expect(screen.getByText('$99.90')).toBeInTheDocument();

    const summaryDiv = screen.getByTestId('summary');
    expect(summaryDiv).toHaveTextContent(/Total:.*2.*items/i);
    expect(summaryDiv).toHaveTextContent(/page:.*1 \/ 1/i);

  });

  it('shows a placeholder when an item image cannot load', async () => {
    vi.mocked(fetchWithAuth).mockResolvedValue({
      ok: true,
      json: async () => ({
        items: [{ id: 1, name: 'Unavailable image', price: 99.9, imageUrl: 'https://test.com/missing.jpg' }],
        meta: { totalRecords: 1, totalPages: 1, currentPage: 1, pageSize: 6 }
      })
    } as Response);

    render(<ItemList />);

    const image = await screen.findByRole('img', { name: 'Unavailable image' });
    fireEvent.error(image);

    expect(image).toHaveAttribute('src', '/image-placeholder.svg');
  });

});