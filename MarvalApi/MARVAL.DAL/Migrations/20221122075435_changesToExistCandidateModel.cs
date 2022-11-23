using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MARVAL.DAL.Migrations
{
    /// <inheritdoc />
    public partial class changesToExistCandidateModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Gender",
                table: "Candidates");

            migrationBuilder.RenameColumn(
                name: "SurName",
                table: "Candidates",
                newName: "Surname");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "Candidates",
                newName: "Active");

            migrationBuilder.AddColumn<string>(
                name: "Mobile",
                table: "Candidates",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Sex",
                table: "Candidates",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Mobile",
                table: "Candidates");

            migrationBuilder.DropColumn(
                name: "Sex",
                table: "Candidates");

            migrationBuilder.RenameColumn(
                name: "Surname",
                table: "Candidates",
                newName: "SurName");

            migrationBuilder.RenameColumn(
                name: "Active",
                table: "Candidates",
                newName: "Status");

            migrationBuilder.AddColumn<int>(
                name: "Gender",
                table: "Candidates",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
