using Microsoft.EntityFrameworkCore;
using PeopleManagement.Server.Infrastructure;
using PeopleManagement.Server.Repositories;
using PeopleManagement.Server.Services;

var builder = WebApplication.CreateBuilder(args);

//Add DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add services to the container.
builder.Services.AddScoped<IPersonRepository, PersonRepository>();
builder.Services.AddScoped<PersonService>();
builder.Services.AddHttpClient<GoRestService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddHttpClient<GoRestService>(client =>
{
    client.Timeout = TimeSpan.FromSeconds(30); // Timeout de 30s
});

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:62562"));

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
