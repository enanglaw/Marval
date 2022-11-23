using MARVAL.Domain.Entities;
using MARVAL.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MARVAL.Domain.Interfaces
{
    public interface ICandidateService
    {
       
        Task<Candidate> AddCandidate(CandidateModel candidate);
        Task<Candidate> GetCandidate(int candidateId);
        Task<bool> UpdateCandidate(int identity, Candidate updatedInfo);
        Task<bool> DeleteCandidate(int candidateId);
        Task<IEnumerable<Candidate>> GetCandidates();

    }
}
