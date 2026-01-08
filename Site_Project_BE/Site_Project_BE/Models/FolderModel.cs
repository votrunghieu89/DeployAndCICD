using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Site_Project_BE.Models
{
    [Table("Folders")]
    public class FolderModel
    {
        [Key]
        [Column("FolderId")]
        public Guid FolderId { get; set; }
        [Required]
        [StringLength(50)]
        [Column("FolderName")]
        public string FolderName { get; set; }
        [Column("AccountId")]
        public Guid AccountId { get; set; }
        public AccountsModel Accounts { get; set; }

        public ICollection<NoteModel> Notes { get; set; }
    }
}
