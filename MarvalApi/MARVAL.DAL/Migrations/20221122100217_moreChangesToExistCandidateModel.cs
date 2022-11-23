using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MARVAL.DAL.Migrations
{
    /// <inheritdoc />
    public partial class moreChangesToExistCandidateModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Candidates",
                newName: "Identity");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Identity",
                table: "Candidates",
                newName: "Id");
        }
    }
}
