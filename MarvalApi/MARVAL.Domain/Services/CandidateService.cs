using MARVAL.Domain.Entities;
using MARVAL.Domain.Interfaces;
using MARVAL.Domain.Models;

namespace MARVAL.Domain.Services
{
    public class CandidateService : ICandidateService
    {
        private readonly IRepository<Candidate> _candidateRepository;
        public CandidateService(IRepository<Candidate> repository)
        {
            _candidateRepository = repository;
        }

        public async Task<Candidate> AddCandidate(CandidateModel candidateModel)
        {
            try
            {

                var candidate = BuildCandidateEntity(candidateModel);
                return await _candidateRepository.AddItem(candidate);
            }
            catch (Exception exception)
            {
                throw;
            }
        }

        public async Task<bool> DeleteCandidate(int candidateId)
        {
            try
            {
                return await _candidateRepository.Remove(candidateId);
            }
            catch (Exception exception)
            {
                throw;
            }
        }

        public async Task<Candidate> GetCandidate(int candidateId)
        {

            try
            {
                return await _candidateRepository.Find(candidateId);
            }
            catch (Exception exception)
            {
                throw;
            }
        }

        public async Task<IEnumerable<Candidate>> GetCandidates()
        {
            try
            {
                return await _candidateRepository.GetItems();
            }
            catch (Exception exception)
            {
                throw;
            }
        }

        public async Task<bool> UpdateCandidate(int id, Candidate updatedInfo)
        {
            try
            {
                var candidateToUpdate = await GetCandidate(id);
                if (candidateToUpdate == null)
                    return false;
                candidateToUpdate.FirstName = updatedInfo.FirstName;
                candidateToUpdate.Surname = updatedInfo.Surname;
                candidateToUpdate.Active = updatedInfo.Active;
                candidateToUpdate.Age = updatedInfo.Age;
                candidateToUpdate.Sex = updatedInfo.Sex;
                candidateToUpdate.Mobile = updatedInfo.Mobile;
                return (await _candidateRepository.UpdateItem(id, candidateToUpdate)) != null;
            }
            catch (Exception exception)
            {
                throw;
            }
        }

        #region privates


        private Candidate BuildCandidateEntity(CandidateModel candidateModel)
        {
            return new Candidate
            {
                FirstName = candidateModel.FirstName,
                Surname = candidateModel.Surname,
                Mobile = candidateModel.Mobile,
                Active = candidateModel.Active,
                Age = candidateModel.Age,
                Sex = candidateModel.Sex

            };
        }
        #endregion

    }
}

