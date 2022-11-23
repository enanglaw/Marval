using MARVAL.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MARVAL.DAL.Data
{
    public class MarvalApplicationDbContext:DbContext
    {
        public MarvalApplicationDbContext(DbContextOptions<MarvalApplicationDbContext>options):base(options)
        {

        }
        public DbSet<Candidate> Candidates { get; set; }
    }
}
