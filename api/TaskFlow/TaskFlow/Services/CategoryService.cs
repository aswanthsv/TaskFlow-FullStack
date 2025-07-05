using TaskFlow.Interfaces;
using TaskFlow.Models;

public class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _categoryRepository;

    public CategoryService(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    public async Task<IEnumerable<Category>> GetAllCategoriesAsync()
    {
        return await _categoryRepository.GetAllCategoriesAsync();
    }

    public async Task<Category> AddCategoryAsync(Category category)
    {
        return await _categoryRepository.AddCategoryAsync(category);
    }
}
