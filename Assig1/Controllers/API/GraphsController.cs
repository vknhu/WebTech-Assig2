using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Assig1.Data;
using Assig1.Models;

namespace Assig1.Controllers.API
{
    /* 
     * If you would like to create D3 graphs from the data use this controller.
     * All actions in this controller must be requested using "/api/Graphs/[actionName]"
     * You can choose to pass parameters into your actions as queryStrings or use the 
     * OffenceDetail example below to see how to set a custom-named route parameter"
     */

    [Route("api/[controller]/[action]")]
    public class GraphsController : Controller
    {
        private readonly ExpiationsContext _context;

        public GraphsController(ExpiationsContext context)
        {
            _context = context;
        }



        // GET: /api/Graphs/OfenceList
        public async Task<object> OfenceList()
        {
            var expiationsContext = _context.Offences;
            return await expiationsContext.ToListAsync();
        }



        // GET: /api/Graphs/OffenceDetail/A002
        [HttpGet("{offenceCode}")]
        public async Task<object> OffenceDetail(string offenceCode)
        {
            var offence = await _context.Offences
                .FindAsync(offenceCode);
            if (offence == null)
            {
                return NotFound();
            }
            return offence;
        }


    }
}
