export interface Events {
    eventId :string,
    eventName :string,
    userId :string,
    startDate :string,
    endDate :string,
    location :string,
    description :string,
    longDescription :string , 
    images :string[] ,
    single :number ,
    couple:number ,
    groups :number ,
    totalTickets :string ,
    bookingDeadline :string 
}
export interface Users{
    userId : string,
    userName : string ,
    phoneNumber : string ,
    email : string ,
    password : string ,
    profileImage : string ,
    location : string ,
    userRole : string
}

export interface Bookings{
    bookId : string,
    eventId : string,
    userId : string ,
    ticketType : string
}
export interface Logins{
    email : string ,
    password : string , 
}
export interface Tokens {
    userId : string,
    userName : string ,
    phoneNumber : string ,
    email : string ,
    password : string ,
    profileImage : string ,
    location : string ,
    userRole : string
  }