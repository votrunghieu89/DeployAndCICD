using Microsoft.AspNetCore.Mvc;
using Site_Project_BE.DTOs;
using Site_Project_BE.Service;

namespace Site_Project_BE.Controllers
{
    [ApiController]
    [Route("api/folders")]
    public class FolderController : Controller
    {
        private readonly FolderService _folderService;

        public FolderController(FolderService folderService)
        {
            _folderService = folderService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateFolder([FromBody] CreateFolderDTO createFolderDTO)
        {
            var result = await _folderService.CreateFolder(createFolderDTO);

            if (!result.IsSuccess)
            {
                return StatusCode(result.StatusCode, new { message = result.Error });
            }

            return StatusCode(result.StatusCode, new { message = "T?o folder thành công" });
        }

        [HttpPut]
        public async Task<IActionResult> UpdateFolder([FromBody] UpdateFolderDTO updateFolderDTO)
        {
            var result = await _folderService.UpdateFolder(updateFolderDTO);

            if (!result.IsSuccess)
            {
                return StatusCode(result.StatusCode, new { message = result.Error });
            }

            return StatusCode(result.StatusCode, new { message = "C?p nh?t folder thành công" });
        }

        [HttpDelete("{folderId}")]
        public async Task<IActionResult> DeleteFolder(Guid folderId)
        {
            var result = await _folderService.DeleteFolder(folderId);

            if (!result.IsSuccess)
            {
                return StatusCode(result.StatusCode, new { message = result.Error });
            }

            return StatusCode(result.StatusCode, new { message = "Xóa folder thành công" });
        }

        [HttpGet("account/{accountId}")]
        public async Task<IActionResult> GetFoldersByAccountId(Guid accountId)
        {
            var result = await _folderService.GetFoldersByAccountId(accountId);

            if (!result.IsSuccess)
            {
                return StatusCode(result.StatusCode, new { message = result.Error });
            }

            return StatusCode(result.StatusCode, result.Data);
        }
    }
}
