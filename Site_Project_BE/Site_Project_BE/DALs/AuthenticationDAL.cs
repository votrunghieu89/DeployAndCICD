using Microsoft.EntityFrameworkCore;
using Site_Project_BE.DTOs;
using Site_Project_BE.Enums;
using Site_Project_BE.Models;
using Site_Project_BE.Security;

namespace Site_Project_BE.DALs
{
    public class AuthenticationDAL
    {
        private readonly AppDbContext _appDbContext;

        public AuthenticationDAL(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<AuthenticationEnum.Register> Register(RegisterDTO registerDTO)
        {
            try
            {
                string? UserName = await _appDbContext.Accounts.Where(a => a.UserName == registerDTO.UserName).Select(a => a.UserName).FirstOrDefaultAsync();
                if (UserName != null)
                {
                    return AuthenticationEnum.Register.Exsist;
                }
                AccountsModel newAccount = new AccountsModel()
                {
                    UserName = registerDTO.UserName,
                    Password = Hash.HashPassword(registerDTO.Password),
                    Email = registerDTO.Email,
                    Role = "User"
                };
                await _appDbContext.Accounts.AddAsync(newAccount);
                await _appDbContext.SaveChangesAsync();
                return AuthenticationEnum.Register.Success;
            }
            catch (Exception ex)
            {
                return AuthenticationEnum.Register.Fail;
            }
        }

        public async Task<LoginResponseDTO> Login(LoginDTO loginDTO)
        {
            try
            {
                var UserName = await _appDbContext.Accounts.Where(a => a.UserName == loginDTO.UserName).FirstOrDefaultAsync();
                if (UserName == null) {
                    return new LoginResponseDTO()
                    {
                       LoginStatus = AuthenticationEnum.Login.Wrong,
                    };
                }
                bool checkPassword = Hash.VerifyPassword(loginDTO.Password,UserName.Password);
                if (!checkPassword) {
                    return new LoginResponseDTO()
                    {
                        LoginStatus = AuthenticationEnum.Login.Wrong,
                    };
                }
                return new LoginResponseDTO()
                {
                    Id = UserName.AccountId,
                    Role = UserName.Role,
                    LoginStatus = AuthenticationEnum.Login.Success,
                };
            }
            catch (Exception ex)
            {
                return new LoginResponseDTO()
                {
                    LoginStatus = AuthenticationEnum.Login.Fail,
                };
            }
        }
    }
}
