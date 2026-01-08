using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Site_Project_BE.Models
{
    [Table("Account")]
    public class AccountsModel
    {
        [Key]
        [Column("AccountId")]
        public Guid AccountId { get; set; }
        [Required]
        [StringLength(50)]
        [Column("UserName")]
        public string UserName { get; set; }
        [Required]
        [StringLength(244)]
        [Column("Password")]
        public string Password { get; set; }
        [StringLength(50)]
        [Column("Email")]
        public string Email { get; set; }
        [StringLength (10)]
        [Column("Role")]
        public string Role { get; set; } 

        public ICollection<FolderModel> Folders { get; set; }
    }
}
