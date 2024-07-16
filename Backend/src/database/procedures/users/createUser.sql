CREATE OR ALTER PROCEDURE registerUser(
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
    INSERT INTO Users (userId,userName, email, password, profileImage, location, userRole,phoneNumber)
    VALUES (@userId,@userName,@email,@password,@profileImage,@location,@userRole,@phoneNumber)
END