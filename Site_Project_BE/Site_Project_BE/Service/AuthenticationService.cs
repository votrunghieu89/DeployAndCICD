using Site_Project_BE.DALs;
using Site_Project_BE.DTOs;
using Site_Project_BE.Enums;
using Site_Project_BE.Security;

namespace Site_Project_BE.Service
{
    public class AuthenticationService
    {
        private readonly Token _token;
        private readonly AuthenticationDAL _authenticationDAL;

        public AuthenticationService(Token token, AuthenticationDAL authenticationDAL)
        {
            _token = token;
            _authenticationDAL = authenticationDAL;
        }

        public async Task<Result<LoginResultDTO>> Login(LoginDTO loginDTO)
        {
            var loginResult = await _authenticationDAL.Login(loginDTO);

            switch (loginResult.LoginStatus) { 
                case AuthenticationEnum.Login.Success:
                    var accessToken = _token.generateAccessToken(loginResult.Id, loginResult.Role);
                    return Result<LoginResultDTO>.Success(new LoginResultDTO
                    {
                        AccessToken = accessToken,
                    });
                case AuthenticationEnum.Login.Wrong:
                    return Result<LoginResultDTO>.Failure("Sai tên đăng nhập hoặc mật khẩu", 401);
                case AuthenticationEnum.Login.Fail:
                default:
                    return Result<LoginResultDTO>.Failure("Đăng nhập thất bại", 500);
            }
        }

        public async Task<Result<bool>> Register(RegisterDTO registerDTO)
        {
            var RegisterResult = await _authenticationDAL.Register(registerDTO);
            switch (RegisterResult)
            {
                case AuthenticationEnum.Register.Success:
                    return Result<bool>.Success(true);
                case AuthenticationEnum.Register.Exsist:
                    return Result<bool>.Failure("Tên đăng nhập đã tồn tại", 400);
                case AuthenticationEnum.Register.Fail:
                default:
                    return Result<bool>.Failure("Đăng nhập thất bại", 500);
            }
        }

    }
}
