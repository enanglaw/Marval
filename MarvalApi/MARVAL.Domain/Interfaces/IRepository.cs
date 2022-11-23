using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MARVAL.Domain.Interfaces
{
    public interface IRepository<T> where T : class
    {

        Task<T> Find(int Id);  
        Task<IEnumerable<T>> GetItems();
        Task<T> AddItem(T tEntity);
        Task<T> UpdateItem(int id, T updatedEntity);
        Task<bool> Remove(int id);

    }
}
