using MongoDB.Driver;

namespace Site_Project_BE
{
    public class MongoDbContext
    {
        private readonly IMongoDatabase _database;
        public MongoDbContext(IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("MongoDb");
            var databaseName = configuration["MongoDbSettings:DatabaseName"];

            var client = new MongoClient(connectionString);
            _database = client.GetDatabase(databaseName);
        }
        //public IMongoCollection<AuditLogModel> AuditLog => _database.GetCollection<AuditLogModel>("AuditLog");
    }
}
