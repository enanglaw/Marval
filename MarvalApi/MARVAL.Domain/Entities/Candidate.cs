using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MARVAL.Domain.Entities
{
    public class Candidate
    {
        [Key]
        public int Identity { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string Surname { get; set; }
        [Required]
        public string Mobile { get; set; }
        [Required]
        public int Age { get; set; }
        [Required]
        public bool Active { get; set; }
        [Required]
        public string Sex { get; set; }

    }


}
