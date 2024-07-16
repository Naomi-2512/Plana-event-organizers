CREATE OR ALTER PROCEDURE updateUser(
    @userId VARCHAR(255),
    @userName VARCHAR(255) ,
    @phoneNumber VARCHAR(255) ,
    @email VARCHAR(255) ,
    @password VARCHAR(255) ,
    @profileImage VARCHAR(255) ,
    @location VARCHAR(255) ,
    @userRole VARCHAR(255)
)
AS
    BEGIN
    UPDATE Users SET userId = @userId,userName = @userName,phoneNumber = @phoneNumber,email = @email,password = @password,profileImage = @profileImage,location = @location,userRole = @userRole WHERE userId = @userId
END