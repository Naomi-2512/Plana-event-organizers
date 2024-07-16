CREATE OR ALTER PROCEDURE createBookings(
    @bookId VARCHAR(255),
    @eventId VARCHAR(255),
    @userId VARCHAR(255) ,
    @ticketType VARCHAR(255)

)
AS
    BEGIN
    INSERT INTO Bookings (bookId,eventId,userId,ticketType)
    VALUES (@bookId,@eventId,@userId,@ticketType)
END