using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Site_Project_BE.Models
{
    [Table("Note")]
    public class NoteModel
    {
        [Key]
        [Column("NoteId")]
        public Guid NoteId { get; set; }
        [Required]
        [StringLength(50)]
        [Column("Title")]
        public string Title { get; set; }
        [Required]
        [StringLength(250)]
        [Column("Description")]
        public string Description { get; set; }
        [Column("FolderId")]
        public Guid FolderId { get; set; }
        public FolderModel Folders { get; set; }
    }
}
