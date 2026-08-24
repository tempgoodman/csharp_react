using Backend_API.Models;

namespace Backend_API.Services
{
    public interface IItemRepository
    {
        IQueryable<Item> GetAllItems();
    }
}