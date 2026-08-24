using Backend_API.Models;

namespace Backend_API.Services
{
    // 必須係 public class！
    public class ItemRepository : IItemRepository
    {
        public IQueryable<Item> GetAllItems()
        {
            return Enumerable.Range(1, 100)
                             .Select(i => new Item {
                                 Id = i, 
                                 Name = $"name {i}",
                                 Price = i * 12.5M, 
                                 ImageUrl = $"https://xxxx.photos/id/{i + 10}/200/200" 
                             })
                             .AsQueryable();
        }
    }
}