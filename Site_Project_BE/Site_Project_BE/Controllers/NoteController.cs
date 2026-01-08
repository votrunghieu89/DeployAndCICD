using Microsoft.AspNetCore.Mvc;
using Site_Project_BE.DTOs;
using Site_Project_BE.Service;

namespace Site_Project_BE.Controllers
{
    [ApiController]
    [Route("api/notes")]
    public class NoteController : Controller
    {
        private readonly NoteService _noteService;

        public NoteController(NoteService noteService)
        {
            _noteService = noteService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateNote([FromBody] CreateNoteDTO createNoteDTO)
        {
            var result = await _noteService.CreateNote(createNoteDTO);

            if (!result.IsSuccess)
            {
                return StatusCode(result.StatusCode, new { message = result.Error });
            }

            return StatusCode(result.StatusCode, new { message = "T?o note thành công" });
        }

        [HttpPut]
        public async Task<IActionResult> UpdateNote([FromBody] UpdateNoteDTO updateNoteDTO)
        {
            var result = await _noteService.UpdateNote(updateNoteDTO);

            if (!result.IsSuccess)
            {
                return StatusCode(result.StatusCode, new { message = result.Error });
            }

            return StatusCode(result.StatusCode, new { message = "C?p nh?t note thành công" });
        }

        [HttpDelete("{noteId}")]
        public async Task<IActionResult> DeleteNote(Guid noteId)
        {
            var result = await _noteService.DeleteNote(noteId);

            if (!result.IsSuccess)
            {
                return StatusCode(result.StatusCode, new { message = result.Error });
            }

            return StatusCode(result.StatusCode, new { message = "Xóa note thành công" });
        }

        [HttpGet("folder/{folderId}")]
        public async Task<IActionResult> GetNotesByFolderId(Guid folderId)
        {
            var result = await _noteService.GetNotesByFolderId(folderId);

            if (!result.IsSuccess)
            {
                return StatusCode(result.StatusCode, new { message = result.Error });
            }

            return StatusCode(result.StatusCode, result.Data);
        }

        [HttpGet("{noteId}")]
        public async Task<IActionResult> GetNoteById(Guid noteId)
        {
            var result = await _noteService.GetNoteById(noteId);

            if (!result.IsSuccess)
            {
                return StatusCode(result.StatusCode, new { message = result.Error });
            }

            return StatusCode(result.StatusCode, result.Data);
        }
    }
}
