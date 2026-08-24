namespace Backend_API.Models
{
    public class PagedResult<T>
    {
        public IEnumerable<T> Items { get; set; } = new List<T>();
        public PageMetaData Meta { get; set; } = new PageMetaData();
    }
}