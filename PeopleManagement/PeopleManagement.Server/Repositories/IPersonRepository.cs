using PeopleManagement.Server.Models;

namespace PeopleManagement.Server.Repositories
{
    public interface IPersonRepository
    {
        Task<IEnumerable<Person>> GetAllAsync();
        Task<Person> GetByIdAsync(int id);
        Task CreateAsync(Person person);
        Task UpdateAsync(Person person);
        Task DeleteAsync(Person person);
        IQueryable<Person> GetQueryable();
    }
}
