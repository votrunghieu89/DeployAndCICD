namespace Site_Project_BE.DTOs
{
    public class UpdateNoteDTO
    {
        public Guid NoteId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }
}
