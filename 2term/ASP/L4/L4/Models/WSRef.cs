using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace L4.Models
{
    public class WSRef
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Url can't be empty")]
        public string Url { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public uint Minus { get; set; }
        public uint Plus { get; set; }
        public ICollection<WSRefComment> WSRefComments { get; set; } = [];
    }
}
