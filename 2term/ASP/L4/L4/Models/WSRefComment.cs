using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace L4.Models
{
    public class WSRefComment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [ForeignKey(nameof(WSRef))]
        public int WSRefId { get; set; }
        public string SessionId { get; set; } = "undefined";
        public DateTime Stamp { get; init; } = DateTime.Now;
        public required string ComText { get; set; }
        public required WSRef WSRef { get; set; }
    }
}
