using Site_Project_BE.Enums;

namespace Site_Project_BE.DTOs
{
    public class LoginResponseDTO
    {
        public Guid Id { get; set; }
        public string Role { get; set; }
        public AuthenticationEnum.Login LoginStatus { get; set; }
    }
}
