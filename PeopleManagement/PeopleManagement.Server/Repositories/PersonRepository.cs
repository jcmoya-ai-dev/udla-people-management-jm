using Microsoft.EntityFrameworkCore;
using PeopleManagement.Server.Infrastructure;
using PeopleManagement.Server.Models;

namespace PeopleManagement.Server.Repositories
{
    public class PersonRepository : IPersonRepository
    {
        private readonly ApplicationDbContext _context;
        public PersonRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Person>> GetAllAsync()
        {
            return await _context.Persons.ToListAsync();
        }

        public async Task<Person> GetByIdAsync(int id)
        {
            var result = await _context.Persons.FindAsync(id);

            return result == null ? throw new Exception("Person not found") : result;
        }

        public async Task CreateAsync(Person person)
        {
            await _context.Persons.AddAsync(person);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Person person)
        {
            _context.Persons.Update(person);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Person person)
        {
            _context.Persons.Remove(person);
            await _context.SaveChangesAsync();
        }

        public IQueryable<Person> GetQueryable()
        {
            return _context.Persons.AsQueryable();    
        }
    }

}
