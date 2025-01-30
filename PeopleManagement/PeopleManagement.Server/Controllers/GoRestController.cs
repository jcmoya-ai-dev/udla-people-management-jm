using Microsoft.AspNetCore.Mvc;
using PeopleManagement.Server.Services;

namespace PeopleManagement.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoRestController : ControllerBase
    {
        private readonly GoRestService _goRestService;

        public GoRestController(GoRestService goRestService)
        { 
            _goRestService = goRestService;
        }

        //Endpoint sin paginación
        [HttpGet("users")]
        public async Task<IActionResult> GetUsers()
        {
            try
            {
                var users = await _goRestService.GetUserAsync();
                return Ok(users);
            }
            catch (HttpRequestException) {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, "No se pudo conectar al servicio externo");
            }
        }

        //Endpoint con paginación
        [HttpGet("users/paged")]
        public async Task<IActionResult> GetUsersPaged(int page = 1, int pageSize = 5)
        {
            try
            {
                var result = await _goRestService.GetUsersPagedAsync(page, pageSize);
                return Ok(result);
            }
            catch (HttpRequestException ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, "No se pudo conectar con el servicio GoRest (HttpRequestException)");
            }
            catch (TaskCanceledException ex)
            {
                return StatusCode(StatusCodes.Status504GatewayTimeout, "Se agotó el tiempo de espera al conectar con GoRest.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Ocurrió un error inesperado consultando GoRest.");
            }
        }
    }
}
