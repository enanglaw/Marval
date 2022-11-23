using MARVAL.DAL.Data;
using MARVAL.DAL.Repositories;
using MARVAL.Domain.Entities;
using MARVAL.Domain.Interfaces;
using MARVAL.Domain.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);



builder.Services.AddDbContext<MarvalApplicationDbContext>(options => options
    .UseSqlServer(builder.Configuration.GetConnectionString("connString")));

builder.Services.AddScoped<IDbInitializer, DbInitializer>();
builder.Services.AddScoped<ICandidateService, CandidateService>();
builder.Services.AddScoped<IRepository<Candidate>, BaseEFRepository<Candidate>>();
builder.Services.AddControllers()
    .AddNewtonsoftJson(options => { options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
   options.SerializerSettings.PreserveReferencesHandling = Newtonsoft.Json.PreserveReferencesHandling.None; options.SerializerSettings.Formatting = Newtonsoft.Json.Formatting.Indented;
    });


builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policy =>
    {
        var frontend_url = builder.Configuration.GetValue<string>("frontend_url");
        policy.WithOrigins(frontend_url).AllowAnyHeader().AllowAnyMethod();
    });
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHealthChecks();
var app = builder.Build();

app.UseStaticFiles();
app.UseStaticFiles();
//app.UseStaticFiles(new StaticFileOptions()
//{
//    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"Resources")),
//    RequestPath = new PathString("/Resources")
//});
app.UseRouting();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Marval Candidate Portal  API v1");
    });
}

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Marval Candidate Portal  API v1");
});
app.MapHealthChecks("/health");
app.UseHttpsRedirection();

app.UseAuthorization();
app.UseCors("CorsPolicy");

app.MapControllers();

app.Run();
