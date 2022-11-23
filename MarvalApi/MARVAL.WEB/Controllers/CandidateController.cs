using Grpc.Core;
using LinqToExcel;
using MARVAL.Domain.Entities;
using MARVAL.Domain.Interfaces;
using MARVAL.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using System.Data;
using System.Data.OleDb;
using System.Net;

namespace MARVAL.WEB.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class CandidateController : ControllerBase
    {

        readonly ICandidateService _candidateService;
        public CandidateController(ICandidateService candidateService)
        {

            _candidateService = candidateService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<Candidate>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetCandidates()
        {
            try
            {
                var candidates = await _candidateService.GetCandidates();
                return Ok(candidates);
            }
            catch (Exception exception)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, exception.Message);
            }
        }

        [Route("[action]/{id}")]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Candidate))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var candidate = await _candidateService.GetCandidate(id);
                if (candidate == null)
                    return BadRequest($"Could not find any candidate with provided Id");
                return Ok(candidate);
            }
            catch (Exception exception)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, exception.Message);
            }
        }
       
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(CandidateModel[]))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Post([FromBody] CandidateModel[] candidates)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);
                foreach(var candidate in candidates) { 
                 await _candidateService.AddCandidate(candidate);
                }
                return StatusCode(StatusCodes.Status201Created, new { message = "uploaded successfully" }); ;

            }
            catch (Exception exception)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, exception.Message);
            }
        }

        [HttpPut("{identity}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Put(int identity, [FromBody] Candidate candidate)
        {
            try
            {
                var updated = await _candidateService.UpdateCandidate(identity, candidate);
                if (!updated)
                    return StatusCode((int)HttpStatusCode.Conflict, "Failed to save updates to candidate ");
                return NoContent();
            }
            catch (Exception exception)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, exception.Message);
            }
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var toDelete = await _candidateService.DeleteCandidate(id);
                if (!toDelete)
                    return StatusCode((int)HttpStatusCode.Conflict, $"Failed to delete candidate  ");
                return NoContent();
            }
            catch (Exception exception)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, exception.Message);
            }
        }
    }
}

