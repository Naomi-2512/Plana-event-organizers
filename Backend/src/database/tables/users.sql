CREATE TABLE Users(
    userId VARCHAR(255) PRIMARY KEY NOT NULL,
    userName VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(255) NOT Null,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    profileImage VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    userRole VARCHAR(255) NOT NULL,
    isManager BIT DEFAULT 0,
    isDeleted BIT NOT NULL DEFAULT 0,
    isWelcome BIT NOT NULL DEFAULT 0,

)
use Plana
SELECT * FROM Users