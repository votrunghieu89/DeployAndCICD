namespace Site_Project_BE.DTOs
{
    public class CreateNoteDTO
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public Guid FolderId { get; set; }
    }
}
