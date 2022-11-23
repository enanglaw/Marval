using MARVAL.DAL.Data;
using MARVAL.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MARVAL.DAL.Repositories
{
    public class BaseEFRepository<T> : IRepository<T> where T : class
    {
        private readonly MarvalApplicationDbContext _db;

        public BaseEFRepository(MarvalApplicationDbContext db)
        {
            _db = db;
        }
      
     
        public virtual async Task<T> AddItem(T tEntity)
        {
            try
            {
                await _db.Set<T>().AddAsync(tEntity);
                return (await _db.SaveChangesAsync()) > 0 ? tEntity : null;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public virtual async Task<T> Find(int Id)
        {
            try
            {
                return await _db.Set<T>().FindAsync(Id);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public virtual async Task<IEnumerable<T>> GetItems()
        {
            try
            {
                return await _db.Set<T>().ToListAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }    
        public virtual async Task<bool> Remove(int id)
        {
            try
            {
                var item = await Find(id);
                if (item == null)
                    return false;
                _db.Set<T>().Remove(item);
                return await _db.SaveChangesAsync() > 0;
            }
            catch (Exception)
            {
                throw;
            }
        }       
        public async Task<T> UpdateItem(int id, T updatedEntity)
        {
            try
            {
                var item = await Find(id);
                if (item == null)
                    throw new KeyNotFoundException($"Item with key {id} not found");
                _db.Entry<T>(updatedEntity).State = EntityState.Modified;
                var updated = await _db.SaveChangesAsync() == 1;
                return updated ? item : null;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
