namespace Site_Project_BE.DTOs
{
    public class FolderResponseDTO
    {
        public Guid FolderId { get; set; }
        public string FolderName { get; set; }
        public Guid AccountId { get; set; }
        public int NoteCount { get; set; }
    }
}
