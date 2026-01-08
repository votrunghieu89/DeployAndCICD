using Microsoft.EntityFrameworkCore;
using Site_Project_BE;
using Site_Project_BE.DALs;
using Site_Project_BE.Security;
using Site_Project_BE.Service;

var builder = WebApplication.CreateBuilder(args);

// ================== SERVICES ==================
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
    ));

// ===== Dependency Injection =====
builder.Services.AddScoped<AuthenticationDAL>();
builder.Services.AddScoped<AuthenticationService>();
builder.Services.AddScoped<Token>();

builder.Services.AddScoped<FolderDAL>();
builder.Services.AddScoped<FolderService>();

builder.Services.AddScoped<NoteDAL>();
builder.Services.AddScoped<NoteService>();

// ================== CORS ==================
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy
            .AllowAnyOrigin()   // 👉 Docker + EC2 + Nginx
            .AllowAnyHeader()
            .AllowAnyMethod()
    );
});

var app = builder.Build();

// ================== AUTO MIGRATION ==================
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    if (db.Database.GetPendingMigrations().Any())
    {
        db.Database.Migrate();
    }
}

// ================== MIDDLEWARE ==================
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

// ❌ KHÔNG dùng HTTPS redirect trong container
// app.UseHttpsRedirection();

app.UseAuthorization();
app.MapControllers();

// ⚠️ bắt buộc listen 0.0.0.0 trong Docker
app.Run("http://0.0.0.0:8080");
