using PeopleManagement.Server.Models;
using PeopleManagement.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace PeopleManagement.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonsController : ControllerBase
    {
        private readonly PersonService _personService;

        public PersonsController(PersonService personService)
        { 
            _personService = personService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Person>>> GetAll()
        { 
            var persons = await _personService.GetAllAsync();
            return Ok(persons);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Person>> GetById(int id)
        {
            var person = await _personService.GetByIdAsync(id);
            if (person == null)
            {
                return NotFound();
            }
            return Ok(person);
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] Person person)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _personService.CreateAsync(person);
            return CreatedAtAction(nameof(GetById), new { id = person.Id }, person);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, [FromBody] Person person)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _personService.UpdateAsync(id, person);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _personService.DeleteAsync(id);
            return NoContent();
        }

        [HttpGet("paged")]
        public async Task<IActionResult> GetPaged([FromQuery] int page = 1, [FromQuery] int pageSize = 5)
        {
            var result = await _personService.GetPagedAsync(page, pageSize);
            return Ok(result);
        }

        [HttpGet("filter")]
        public async Task<IActionResult> Filter(
            [FromQuery] string? Name,
            [FromQuery] string? Gender,
            [FromQuery] string? Email,
            [FromQuery] int? Age)
        {            
            var filteredPersons = await _personService.FilterAsync(Name, Gender, Email, Age);
            return Ok(filteredPersons);
        }
    }
}
