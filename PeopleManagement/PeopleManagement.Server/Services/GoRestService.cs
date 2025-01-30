using PeopleManagement.Server.Models;

namespace PeopleManagement.Server.Services
{
    public class GoRestService
    {
        private readonly HttpClient _httpClient;

        public GoRestService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<IEnumerable<GoRestUser>> GetUserAsync()
        {
            var response = await _httpClient.GetAsync("https://gorest.co.in/public/v2/users");
            response.EnsureSuccessStatusCode();

            var users = await response.Content.ReadFromJsonAsync<IEnumerable<GoRestUser>>();
            return users ?? Enumerable.Empty<GoRestUser>();

        }

        public async Task<PaginatedResult<GoRestUser>> GetUsersPagedAsync(int page, int pageSize)
        {            
            string url = $"https://gorest.co.in/public/v2/users?page={page}&per_page={pageSize}";
            var response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();

            var users = await response.Content.ReadFromJsonAsync<List<GoRestUser>>() ?? new List<GoRestUser>();

            int totalPages = 1;
            if (response.Headers.TryGetValues("X-Pagination-Pages", out var values))
            {
                var pagesHeader = values.FirstOrDefault();
                if (!string.IsNullOrEmpty(pagesHeader))
                {
                    int.TryParse(pagesHeader, out totalPages);
                }
            }

            return new PaginatedResult<GoRestUser>
            {
                Items = users,
                TotalPages = totalPages
            };
        }
    }

    public class GoRestUser
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public string Status { get; set; }
    }
}
