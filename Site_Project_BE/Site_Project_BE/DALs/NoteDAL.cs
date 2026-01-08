using Microsoft.EntityFrameworkCore;
using Site_Project_BE.DTOs;
using Site_Project_BE.Enums;
using Site_Project_BE.Models;

namespace Site_Project_BE.DALs
{
    public class NoteDAL
    {
        private readonly AppDbContext _appDbContext;

        public NoteDAL(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<NoteEnum.Create> CreateNote(CreateNoteDTO createNoteDTO)
        {
            try
            {
                var folderExists = await _appDbContext.Folders
                    .AnyAsync(f => f.FolderId == createNoteDTO.FolderId);

                if (!folderExists)
                {
                    return NoteEnum.Create.FolderNotFound;
                }

                var newNote = new NoteModel()
                {
                    Title = createNoteDTO.Title,
                    Description = createNoteDTO.Description,
                    FolderId = createNoteDTO.FolderId
                };

                await _appDbContext.Notes.AddAsync(newNote);
                await _appDbContext.SaveChangesAsync();
                return NoteEnum.Create.Success;
            }
            catch (Exception ex)
            {
                return NoteEnum.Create.Fail;
            }
        }

        public async Task<NoteEnum.Update> UpdateNote(UpdateNoteDTO updateNoteDTO)
        {
            try
            {
                var note = await _appDbContext.Notes
                    .Where(n => n.NoteId == updateNoteDTO.NoteId)
                    .FirstOrDefaultAsync();

                if (note == null)
                {
                    return NoteEnum.Update.NotFound;
                }

                note.Title = updateNoteDTO.Title;
                note.Description = updateNoteDTO.Description;

                await _appDbContext.SaveChangesAsync();
                return NoteEnum.Update.Success;
            }
            catch (Exception ex)
            {
                return NoteEnum.Update.Fail;
            }
        }

        public async Task<NoteEnum.Delete> DeleteNote(Guid noteId)
        {
            try
            {
                var note = await _appDbContext.Notes
                    .Where(n => n.NoteId == noteId)
                    .FirstOrDefaultAsync();

                if (note == null)
                {
                    return NoteEnum.Delete.NotFound;
                }

                _appDbContext.Notes.Remove(note);
                await _appDbContext.SaveChangesAsync();
                return NoteEnum.Delete.Success;
            }
            catch (Exception ex)
            {
                return NoteEnum.Delete.Fail;
            }
        }

        public async Task<(NoteEnum.Get Status, List<NoteResponseDTO>? Notes)> GetNotesByFolderId(Guid folderId)
        {
            try
            {
                var notes = await _appDbContext.Notes
                    .Where(n => n.FolderId == folderId)
                    .Include(n => n.Folders)
                    .Select(n => new NoteResponseDTO
                    {
                        NoteId = n.NoteId,
                        Title = n.Title,
                        Description = n.Description,
                        FolderId = n.FolderId,
                        FolderName = n.Folders.FolderName
                    })
                    .ToListAsync();

                if (!notes.Any())
                {
                    return (NoteEnum.Get.NotFound, null);
                }

                return (NoteEnum.Get.Success, notes);
            }
            catch (Exception ex)
            {
                return (NoteEnum.Get.Fail, null);
            }
        }

        public async Task<(NoteEnum.Get Status, NoteResponseDTO? Note)> GetNoteById(Guid noteId)
        {
            try
            {
                var note = await _appDbContext.Notes
                    .Where(n => n.NoteId == noteId)
                    .Include(n => n.Folders)
                    .Select(n => new NoteResponseDTO
                    {
                        NoteId = n.NoteId,
                        Title = n.Title,
                        Description = n.Description,
                        FolderId = n.FolderId,
                        FolderName = n.Folders.FolderName
                    })
                    .FirstOrDefaultAsync();

                if (note == null)
                {
                    return (NoteEnum.Get.NotFound, null);
                }

                return (NoteEnum.Get.Success, note);
            }
            catch (Exception ex)
            {
                return (NoteEnum.Get.Fail, null);
            }
        }
    }
}
