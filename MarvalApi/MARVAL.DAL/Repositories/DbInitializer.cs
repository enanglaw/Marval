using MARVAL.DAL.Data;
using MARVAL.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MARVAL.DAL.Repositories
{
    public class DbInitializer : IDbInitializer
    {
        private readonly MarvalApplicationDbContext _db;
        public DbInitializer(MarvalApplicationDbContext db)
        {
            _db = db;
        }
        public void Initialize()
        {
            try
            {

                if (_db.Database.GetPendingMigrations().Count() > 0)
                {
                    _db.Database.Migrate();
                }
            }
            catch (Exception ex)
            {

                throw;
            }
        }
    }
}
