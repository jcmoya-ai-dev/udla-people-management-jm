using Microsoft.EntityFrameworkCore;
using PeopleManagement.Server.Models;

namespace PeopleManagement.Server.Infrastructure
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public DbSet<Person> Persons { get; set; }
    }
}
