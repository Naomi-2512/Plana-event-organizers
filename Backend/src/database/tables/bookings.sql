CREATE TABLE Bookings(
    bookId VARCHAR(255) PRIMARY KEY NOT NULL,
    eventId VARCHAR(255) NOT NULL,
    userId VARCHAR(255) NOT Null,
    ticketType VARCHAR(255) NOT NULL,
    bookStatus BIT NOT NULL DEFAULT 0,
    isCanceled BIT NOT NULL DEFAULT 0,
    FOREIGN KEY (userId) REFERENCES Users (userId),
    FOREIGN KEY (eventId) REFERENCES Events (eventId)

)
use Plana
SELECT * FROM Bookings 