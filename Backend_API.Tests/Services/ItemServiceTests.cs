using Xunit;
using System.Linq;
using Backend_API.Services;
using Backend_API.Models;
using Moq; 

namespace Backend_API.Tests.Services
{
    public class ItemServiceTests
    {
        [Fact]
        public void GetPaginatedItems_ShouldReturnSecondPage_WithCorrectPageSize()
        {
            int pageNumber = 2;
            int pageSize = 3;
            var fakeItems = Enumerable.Range(1, 10)
                          .Select(i => new Item
                          {
                            Id = i, 
                            Name = $"name {i}", 
                            Price = i * 10m,
                            ImageUrl = $"https://picsum.photos/id/{i}/200/200"
                          })
                          .ToList();

            var mockRepo = new Mock<IItemRepository>();

            mockRepo.Setup(repo => repo.GetAllItems()).Returns(fakeItems.AsQueryable());
            var service = new ItemService(mockRepo.Object);

            var result = service.GetPaginatedItems(pageNumber, pageSize);
            Assert.Equal(3, result.Count()); 
            Assert.Equal("name 4", result.First().Name); 
        }

        [Fact]
        public void GetPaginatedItems_ShouldReturnEmpty_WhenPageIsOutOfBounds()
        {
            var fakeItems = Enumerable.Range(1, 10).Select(i => new Item { Id = i, Name = $"Item {i}" }).ToList();
            var mockRepo = new Mock<IItemRepository>();
            mockRepo.Setup(repo => repo.GetAllItems()).Returns(fakeItems.AsQueryable());
            
            var service = new ItemService(mockRepo.Object);
            
            var result = service.GetPaginatedItems(5, 3);

            Assert.Empty(result); 
        }

        [Theory]
        [InlineData(0, 10)] 
        [InlineData(-1, 10)] 
        [InlineData(1, 0)]  
        [InlineData(1, -5)] 
        public void GetPaginatedItems_ShouldThrowException_WhenInputIsInvalid(int invalidPage, int invalidSize)
        {
            var mockRepo = new Mock<IItemRepository>();
            var service = new ItemService(mockRepo.Object);
            Assert.Throws<ArgumentException>(() => service.GetPaginatedItems(invalidPage, invalidSize));
        }
    }
}