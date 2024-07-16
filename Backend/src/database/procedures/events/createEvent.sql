CREATE OR ALTER PROCEDURE createEvent(
    @eventId VARCHAR(255),
    @userId VARCHAR(255),
    @eventName VARCHAR(255),
    @startDate DATE ,
    @endDate DATE,
    @location VARCHAR(255),
    @description VARCHAR(255),
    @longDescription VARCHAR(255) , 
    @images NVARCHAR(MAX) ,
    @single INT ,
    @couple INT ,
    @groups INT ,
    @totalTickets INT ,
    @bookingDeadline DATE 

)
AS
    BEGIN
    INSERT INTO Events (eventId,userId, eventName, startDate, endDate, location, description,longDescription,images,single,couple,groups,totalTickets,bookingDeadline)
    VALUES (@eventId,@userId,@eventName,@startDate,@endDate,@location,@description,@longDescription,@images,@single,@couple,@groups,@totalTickets,@bookingDeadline)
END