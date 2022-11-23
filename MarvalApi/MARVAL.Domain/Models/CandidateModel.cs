using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MARVAL.Domain.Models
{
    public class CandidateModel
    {

        public int Identity { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public string Mobile { get; set; }
        public int Age { get; set; }
        public bool Active { get; set; }
        public string Sex { get; set; }

    }

}
