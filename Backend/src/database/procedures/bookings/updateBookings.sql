CREATE OR ALTER PROCEDURE updateBookings(
    @bookId VARCHAR(255),
    @eventId VARCHAR(255),
    @userId VARCHAR(255) ,
    @ticketType VARCHAR(255)

)
AS
    BEGIN
    UPDATE Bookings SET bookId = @bookId,eventId = @eventId,userId = @userId,ticketType = @ticketType WHERE bookId = @bookId
END