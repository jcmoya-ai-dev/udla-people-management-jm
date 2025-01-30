using Microsoft.EntityFrameworkCore;
using PeopleManagement.Server.Models;
using PeopleManagement.Server.Repositories;

namespace PeopleManagement.Server.Services
{
    public class PersonService
    {
        private readonly IPersonRepository _personRepository;

        public PersonService(IPersonRepository personRepository)
        {
            _personRepository = personRepository;
        }

        public async Task<IEnumerable<Person>> GetAllAsync() => await _personRepository.GetAllAsync();

        public async Task<Person> GetByIdAsync(int id) => await _personRepository.GetByIdAsync(id);

        public async Task CreateAsync(Person person) => await _personRepository.CreateAsync(person);

        public async Task UpdateAsync(int id, Person updated)
        {
            var existing = await _personRepository.GetByIdAsync(id) ?? throw new Exception("Persona no encontrada");
            existing.Name = updated.Name;
            existing.Email = updated.Email;
            existing.Age = updated.Age;
            existing.Gender = updated.Gender;

            await _personRepository.UpdateAsync(existing);
        }

        public async Task DeleteAsync(int id)
        {
            var existing = await _personRepository.GetByIdAsync(id) ?? throw new Exception("Persona no encontrada");
            await _personRepository.DeleteAsync(existing);
        }

        public async Task<PaginatedResult<Person>> GetPagedAsync(int page, int pageSize)
        {
            var query = _personRepository.GetQueryable();

            var totalCount = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            var items = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PaginatedResult<Person>
            {
                Items = items,
                TotalPages = totalPages
            };
        }

        public async Task<IEnumerable<Person>> FilterAsync(
            string? name,
            string? gender,
            string? email,
            int? age)
        {
            var query = _personRepository.GetQueryable();

            if (!string.IsNullOrWhiteSpace(name))
            {
                query = query.Where(p => p.Name.Contains(name));
            }

            if (!string.IsNullOrWhiteSpace(gender))
            {
                query = query.Where(p => p.Gender == gender);
            }

            if (!string.IsNullOrWhiteSpace(email))
            {
                query = query.Where(p => p.Email.Contains(email));
            }

            if (age.HasValue)
            {
                query = query.Where(p => p.Age == age.Value);
            }

         
            return await query.ToListAsync();
        }
    }
}

