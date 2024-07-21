using System.ComponentModel.DataAnnotations;

namespace lab3b.DTO.Admin;

public class ChangePasswordDto
{
    public string Password { get; set; }

    [Length(2, 20, ErrorMessage = "password lenght should be from to 2 to 20 elements")]
    public string NewPassword { get; set; }
}
