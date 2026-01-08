using Site_Project_BE.DALs;
using Site_Project_BE.DTOs;
using Site_Project_BE.Enums;

namespace Site_Project_BE.Service
{
    public class FolderService
    {
        private readonly FolderDAL _folderDAL;

        public FolderService(FolderDAL folderDAL)
        {
            _folderDAL = folderDAL;
        }

        public async Task<Result<bool>> CreateFolder(CreateFolderDTO createFolderDTO)
        {
            var result = await _folderDAL.CreateFolder(createFolderDTO);

            switch (result)
            {
                case FolderEnum.Create.Success:
                    return Result<bool>.Success(true, 201);
                case FolderEnum.Create.AlreadyExists:
                    return Result<bool>.Failure("Folder v?i tên này ?ã t?n t?i", 400);
                case FolderEnum.Create.Fail:
                default:
                    return Result<bool>.Failure("T?o folder th?t b?i", 500);
            }
        }

        public async Task<Result<bool>> UpdateFolder(UpdateFolderDTO updateFolderDTO)
        {
            var result = await _folderDAL.UpdateFolder(updateFolderDTO);

            switch (result)
            {
                case FolderEnum.Update.Success:
                    return Result<bool>.Success(true);
                case FolderEnum.Update.NotFound:
                    return Result<bool>.Failure("Không tìm th?y folder", 404);
                case FolderEnum.Update.Fail:
                default:
                    return Result<bool>.Failure("C?p nh?t folder th?t b?i", 500);
            }
        }

        public async Task<Result<bool>> DeleteFolder(Guid folderId)
        {
            var result = await _folderDAL.DeleteFolder(folderId);

            switch (result)
            {
                case FolderEnum.Delete.Success:
                    return Result<bool>.Success(true);
                case FolderEnum.Delete.NotFound:
                    return Result<bool>.Failure("Không tìm th?y folder", 404);
                case FolderEnum.Delete.Fail:
                default:
                    return Result<bool>.Failure("Xóa folder th?t b?i", 500);
            }
        }

        public async Task<Result<List<FolderResponseDTO>>> GetFoldersByAccountId(Guid accountId)
        {
            var result = await _folderDAL.GetFoldersByAccountId(accountId);

            switch (result.Status)
            {
                case FolderEnum.Get.Success:
                    return Result<List<FolderResponseDTO>>.Success(result.Folders);
                case FolderEnum.Get.NotFound:
                    return Result<List<FolderResponseDTO>>.Failure("Không tìm th?y folder nào", 404);
                case FolderEnum.Get.Fail:
                default:
                    return Result<List<FolderResponseDTO>>.Failure("L?y danh sách folder th?t b?i", 500);
            }
        }
    }
}
