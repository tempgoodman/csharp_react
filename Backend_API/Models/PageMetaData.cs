namespace Backend_API.Models
{
    public class PageMetaData
    {
        public int TotalRecords { get; set; }
        public int TotalPages { get; set; }
        public int CurrentPage { get; set; }
        public int PageSize { get; set; } // 順便加埋 PageSize，前端會更方便
    }
}