using Site_Project_BE.DALs;
using Site_Project_BE.DTOs;
using Site_Project_BE.Enums;

namespace Site_Project_BE.Service
{
    public class NoteService
    {
        private readonly NoteDAL _noteDAL;

        public NoteService(NoteDAL noteDAL)
        {
            _noteDAL = noteDAL;
        }

        public async Task<Result<bool>> CreateNote(CreateNoteDTO createNoteDTO)
        {
            var result = await _noteDAL.CreateNote(createNoteDTO);

            switch (result)
            {
                case NoteEnum.Create.Success:
                    return Result<bool>.Success(true, 201);
                case NoteEnum.Create.FolderNotFound:
                    return Result<bool>.Failure("Không tìm th?y folder", 404);
                case NoteEnum.Create.Fail:
                default:
                    return Result<bool>.Failure("T?o note th?t b?i", 500);
            }
        }

        public async Task<Result<bool>> UpdateNote(UpdateNoteDTO updateNoteDTO)
        {
            var result = await _noteDAL.UpdateNote(updateNoteDTO);

            switch (result)
            {
                case NoteEnum.Update.Success:
                    return Result<bool>.Success(true);
                case NoteEnum.Update.NotFound:
                    return Result<bool>.Failure("Không tìm th?y note", 404);
                case NoteEnum.Update.Fail:
                default:
                    return Result<bool>.Failure("C?p nh?t note th?t b?i", 500);
            }
        }

        public async Task<Result<bool>> DeleteNote(Guid noteId)
        {
            var result = await _noteDAL.DeleteNote(noteId);

            switch (result)
            {
                case NoteEnum.Delete.Success:
                    return Result<bool>.Success(true);
                case NoteEnum.Delete.NotFound:
                    return Result<bool>.Failure("Không tìm th?y note", 404);
                case NoteEnum.Delete.Fail:
                default:
                    return Result<bool>.Failure("Xóa note th?t b?i", 500);
            }
        }

        public async Task<Result<List<NoteResponseDTO>>> GetNotesByFolderId(Guid folderId)
        {
            var result = await _noteDAL.GetNotesByFolderId(folderId);

            switch (result.Status)
            {
                case NoteEnum.Get.Success:
                    return Result<List<NoteResponseDTO>>.Success(result.Notes);
                case NoteEnum.Get.NotFound:
                    return Result<List<NoteResponseDTO>>.Failure("Không tìm th?y note nào", 404);
                case NoteEnum.Get.Fail:
                default:
                    return Result<List<NoteResponseDTO>>.Failure("L?y danh sách note th?t b?i", 500);
            }
        }

        public async Task<Result<NoteResponseDTO>> GetNoteById(Guid noteId)
        {
            var result = await _noteDAL.GetNoteById(noteId);

            switch (result.Status)
            {
                case NoteEnum.Get.Success:
                    return Result<NoteResponseDTO>.Success(result.Note);
                case NoteEnum.Get.NotFound:
                    return Result<NoteResponseDTO>.Failure("Không tìm th?y note", 404);
                case NoteEnum.Get.Fail:
                default:
                    return Result<NoteResponseDTO>.Failure("L?y thông tin note th?t b?i", 500);
            }
        }
    }
}
