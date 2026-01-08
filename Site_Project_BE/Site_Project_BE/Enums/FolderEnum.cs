namespace Site_Project_BE.Enums
{
    public class FolderEnum
    {
        public enum Create
        {
            Success,
            Fail,
            AlreadyExists
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
