using HarkTechTest_BE.Models.Requests;
using HarkTechTest_BE.Models.Responses;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HarkTechTest_BE.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]")]
    public class EnergyDataController : Controller
    {
        private readonly IMediator _mediator;

        public EnergyDataController(IMediator mediator)
        {
            _mediator = mediator;
        }

        /// <summary>
        /// Get energy data
        /// </summary>
        /// <param name="request"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Search([FromBody] EnergyDataRequest request, CancellationToken cancellationToken)
        {
            var response = await _mediator.Send(request, cancellationToken);

            return Ok(response);
        }
    }
}
