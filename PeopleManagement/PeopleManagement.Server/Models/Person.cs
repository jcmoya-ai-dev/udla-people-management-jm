using System.ComponentModel.DataAnnotations;

namespace PeopleManagement.Server.Models
{
    public class Person
    {
        public int Id { get; set; }

        [Required, MaxLength(250)]
        public string Name { get; set; } = "";

        [Required, EmailAddress]
        public string Email { get; set; } = "";

        [Range(1,120)]
        public int Age { get; set; }
        
        [Required, MaxLength(250)]
        public string Direction { get; set; }

        public string Gender { get; set; }

        public string Status { get; set; }
    }
}
