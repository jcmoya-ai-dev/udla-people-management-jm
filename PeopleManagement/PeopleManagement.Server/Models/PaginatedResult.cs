namespace PeopleManagement.Server.Models
{
    public class PaginatedResult<T>
    {
        public List<T> Items { get; set; } = new List<T>();
        public int TotalPages { get; set; }
    }
}
