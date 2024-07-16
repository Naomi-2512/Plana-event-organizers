CREATE OR ALTER PROCEDURE updateEvent(
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
    UPDATE Events SET eventId = @eventId,userId = @userId,eventName = @eventName,startDate = @startDate,endDate = @endDate,location = @location,description = @description,longDescription = @longDescription,images = @images,single = @single,couple = @couple,groups = @groups,totalTickets = @totalTickets,bookingDeadline = @bookingDeadline WHERE eventId = @eventId
END