using Backend_API.Models;
namespace Backend_API.Services
{
    public class ItemService
    {
        private readonly IItemRepository _repository;

        public ItemService(IItemRepository repository)
        {
            _repository = repository;
        }

        public PagedResult<Item> GetPaginatedItems(int pageNumber, int pageSize)
        {
            if (pageNumber <= 0) throw new ArgumentException("Page number must be greater than 0");
            if (pageSize <= 0) throw new ArgumentException("Page size must be greater than 0");

            var allItems = _repository.GetAllItems();
            
            int totalRecords = allItems.Count();
            
            int totalPages = (int)Math.Ceiling(totalRecords / (double)pageSize);

            var items = allItems.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

            return new PagedResult<Item>
            {
                Items = items,
                Meta = new PageMetaData
                {
                    TotalRecords = totalRecords,
                    TotalPages = totalPages,
                    CurrentPage = pageNumber,
                    PageSize = pageSize
                }
            };
        }
    }
}