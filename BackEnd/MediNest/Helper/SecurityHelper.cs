using System.Reflection;
using BCrypt.Net;

namespace MediNest.Helpers;

public static class SecurityHelper
{
    public static string HashPassword(string password)
    {
        return BCrypt.Net.BCrypt.HashPassword(password);
    }

    public static bool VerifyPassword(string password, string hashedPassword)
    {
        return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
    }

    public static bool IsValidProperty<T>(string propertyName)
    {
        return typeof(T)
            .GetProperties(BindingFlags.Public | BindingFlags.Instance)
            .Any(p => p.Name.Equals(propertyName, StringComparison.OrdinalIgnoreCase));
    }
}