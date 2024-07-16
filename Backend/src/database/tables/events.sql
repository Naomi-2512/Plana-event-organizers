CREATE TABLE Events(
    eventId VARCHAR(255) PRIMARY KEY NOT NULL,
    userId VARCHAR(255) NOT NULL,
    eventName VARCHAR(255) NOT NULL,
    startDate DATE NOT Null,
    endDate DATE NOT NULL,
    location VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    longDescription VARCHAR(255) NOT NULL, 
    images NVARCHAR(MAX) NOT NULL,
    single INT ,
    couple INT ,
    groups INT ,
    totalTickets INT ,
    bookedTickets INT DEFAULT 0,
    remainingTickets INT ,
    bookingDeadline DATE NOT NULL,
    eventStatus BIT DEFAULT 0,
    FOREIGN KEY (userId) REFERENCES Users (userId)

)
use Plana
SELECT * FROM Events 
