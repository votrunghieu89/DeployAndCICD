namespace Site_Project_BE.DTOs
{
    public class NoteResponseDTO
    {
        public Guid NoteId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Guid FolderId { get; set; }
        public string FolderName { get; set; }
    }
}
