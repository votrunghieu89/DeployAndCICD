using Microsoft.EntityFrameworkCore;
using Site_Project_BE.Models;

namespace Site_Project_BE
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AccountsModel>()
        .Property(a => a.AccountId)
        .HasDefaultValueSql("NEWSEQUENTIALID()");

            modelBuilder.Entity<AccountsModel>()
        .HasIndex(a => a.UserName)
        .IsUnique();

            modelBuilder.Entity<AccountsModel>()
        .HasIndex(a => a.Email)
        .IsUnique();

            modelBuilder.Entity<AccountsModel>()
        .ToTable(t => t.HasCheckConstraint(
            "CK_Account_Role",
            "[Role] IN ('Admin', 'User')"
            ));
            modelBuilder.Entity<FolderModel>()
        .HasOne(f => f.Accounts)
        .WithMany(a => a.Folders)
        .HasForeignKey(f => f.AccountId)
        .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<FolderModel>()
        .Property(a => a.FolderId)
        .HasDefaultValueSql("NEWSEQUENTIALID()");

            modelBuilder.Entity<NoteModel>()
        .HasOne(n => n.Folders)
        .WithMany(a => a.Notes)
        .HasForeignKey(n => n.FolderId)
        .OnDelete(DeleteBehavior.Cascade);

              modelBuilder.Entity<NoteModel>()
        .Property(a => a.NoteId)
        .HasDefaultValueSql("NEWSEQUENTIALID()");

        
        }
        public DbSet<AccountsModel> Accounts { get; set; }
        public DbSet<NoteModel> Notes { get; set; }
        public DbSet<FolderModel> Folders { get; set; }
    }
}
