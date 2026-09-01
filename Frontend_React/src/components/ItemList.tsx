import { useState, useEffect } from 'react';
import './ItemList.css';
import { fetchWithAuth } from '../api/fetchClient';

const PAGE_SIZE_OPTIONS = [6, 12, 24, 48];

// 1. 定義 TypeScript 介面 (對應返 C# 嘅 Model)
interface Item {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface PageMetaData {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

interface PagedResponse {
  items: Item[];
  meta: PageMetaData; 
}

export default function ItemList() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalRecords, setTotalRecords] = useState<number>(0);  
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(6);

 useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`/api/items?pageNumber=${page}&pageSize=${pageSize}`);
      const data: PagedResponse = await response.json();
      setItems(data.items);
      setTotalPages(data.meta.totalPages);
      setTotalRecords(data.meta.totalRecords);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, [page, pageSize]);

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setPage(1);
  };

  return (
    <div className="item-list-container">
      <h2>Item List </h2>
      <div data-testid="summary" className="item-list-summary">
        Total: <strong>{totalRecords}</strong> items | page: <strong>{page} / {totalPages}</strong>
      </div>
      {loading ? (
        <h3>Please wait, it could take more then 50 sec due to the Server API need to cold boot... </h3>
      ) : (
        <div className="item-list-grid">
          {items.map(item => (
            <div key={item.id} className="item-card">
              <img
                src={item.imageUrl}
                alt={item.name}
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = '/image-placeholder.svg';
                }}
              />
              <h3>{item.name}</h3>
              <p>${item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}

      <div className="item-list-controls">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous Page
        </button>

        <label>
          Page:{' '}
          <select value={page} onChange={(e) => setPage(Number(e.target.value))}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </label>

        <button
          onClick={() => setPage(page + 1)}
          disabled={items.length < pageSize || page >= totalPages}
        >
          Next Page
        </button>

        <label>
          Page size:{' '}
          <select value={pageSize} onChange={handlePageSizeChange}>
            {PAGE_SIZE_OPTIONS.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}