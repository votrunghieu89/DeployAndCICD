namespace Site_Project_BE.Enums
{
    public class NoteEnum
    {
        public enum Create
        {
            Success,
            Fail,
            FolderNotFound
        }

        public enum Update
        {
            Success,
            Fail,
            NotFound
        }

        public enum Delete
        {
            Success,
            Fail,
            NotFound
        }

        public enum Get
        {
            Success,
            Fail,
            NotFound
        }
    }
}
