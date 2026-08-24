using Backend_API.Services;

namespace Backend_API.Endpoints
{
    public static class ItemEndpoints
    {
        public static void MapItemEndpoints(this IEndpointRouteBuilder app)
        {
            var group = app.MapGroup("/api/items");

            group.MapGet("/", (int pageNumber, int pageSize, ItemService itemService) =>
            {
                var items = itemService.GetPaginatedItems(pageNumber, pageSize);
                return Results.Ok(items);
            });
        }
    }
}