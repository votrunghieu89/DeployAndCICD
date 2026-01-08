using Microsoft.EntityFrameworkCore;
using Site_Project_BE.DTOs;
using Site_Project_BE.Enums;
using Site_Project_BE.Models;

namespace Site_Project_BE.DALs
{
    public class FolderDAL
    {
        private readonly AppDbContext _appDbContext;

        public FolderDAL(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<FolderEnum.Create> CreateFolder(CreateFolderDTO createFolderDTO)
        {
            try
            {
                var existingFolder = await _appDbContext.Folders
                    .Where(f => f.FolderName == createFolderDTO.FolderName && f.AccountId == createFolderDTO.AccountId)
                    .FirstOrDefaultAsync();

                if (existingFolder != null)
                {
                    return FolderEnum.Create.AlreadyExists;
                }

                var newFolder = new FolderModel()
                {
                    FolderName = createFolderDTO.FolderName,
                    AccountId = createFolderDTO.AccountId
                };

                await _appDbContext.Folders.AddAsync(newFolder);
                await _appDbContext.SaveChangesAsync();
                return FolderEnum.Create.Success;
            }
            catch (Exception ex)
            {
                return FolderEnum.Create.Fail;
            }
        }

        public async Task<FolderEnum.Update> UpdateFolder(UpdateFolderDTO updateFolderDTO)
        {
            try
            {
                var folder = await _appDbContext.Folders
                    .Where(f => f.FolderId == updateFolderDTO.FolderId)
                    .FirstOrDefaultAsync();

                if (folder == null)
                {
                    return FolderEnum.Update.NotFound;
                }

                folder.FolderName = updateFolderDTO.FolderName;
                await _appDbContext.SaveChangesAsync();
                return FolderEnum.Update.Success;
            }
            catch (Exception ex)
            {
                return FolderEnum.Update.Fail;
            }
        }

        public async Task<FolderEnum.Delete> DeleteFolder(Guid folderId)
        {
            try
            {
                var folder = await _appDbContext.Folders
                    .Where(f => f.FolderId == folderId)
                    .FirstOrDefaultAsync();

                if (folder == null)
                {
                    return FolderEnum.Delete.NotFound;
                }

                _appDbContext.Folders.Remove(folder);
                await _appDbContext.SaveChangesAsync();
                return FolderEnum.Delete.Success;
            }
            catch (Exception ex)
            {
                return FolderEnum.Delete.Fail;
            }
        }

        public async Task<(FolderEnum.Get Status, List<FolderResponseDTO>? Folders)> GetFoldersByAccountId(Guid accountId)
        {
            try
            {
                var folders = await _appDbContext.Folders
                    .Where(f => f.AccountId == accountId)
                    .Include(f => f.Notes)
                    .Select(f => new FolderResponseDTO
                    {
                        FolderId = f.FolderId,
                        FolderName = f.FolderName,
                        AccountId = f.AccountId,
                        NoteCount = f.Notes.Count
                    })
                    .ToListAsync();

                if (folders == null || !folders.Any())
                {
                    return (FolderEnum.Get.NotFound, null);
                }

                return (FolderEnum.Get.Success, folders);
            }
            catch (Exception ex)
            {
                return (FolderEnum.Get.Fail, null);
            }
        }
    }
}
