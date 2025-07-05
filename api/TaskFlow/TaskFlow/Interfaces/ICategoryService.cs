using TaskFlow.Models;

public interface ICategoryService
{
    Task<IEnumerable<Category>> GetAllCategoriesAsync();
    Task<Category> AddCategoryAsync(Category category);
}
