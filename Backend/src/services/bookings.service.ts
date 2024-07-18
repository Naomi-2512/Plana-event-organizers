import lodash from "lodash";
import { Helper } from "../DbHelper/dbHelper";
import { EventService } from "./event.service";
import { v4 } from "uuid";
import { Bookings, Events, Users } from "../interfaces/interface";
import { UserService } from "./user.service";

let eventService = new EventService();
let userSevice = new UserService();

export class BookingService {
  async createBooking(userId: string, eventId: string, booking: Bookings) {
    let userExists = (
      await Helper.query(`select * from Users where userId = '${userId}' AND isDeleted = 0`)
    ).recordset;

    if (userExists.length == 0) {
      return {
        error: "Unable to book the event",
      };
    }

    let eventExists = (
      await Helper.query(`select * from Events where eventId = '${eventId}'`)
    ).recordset;

    if (lodash.isEmpty(eventExists)) {
      return {
        error: "Event does not exist",
      };
    }

    let result = (
      await Helper.execute("createBookings", {
        bookId: v4(),
        eventId: eventId,
        userId: userId,
        ticketType: booking.ticketType,
      })
    ).rowsAffected;

    if (result[0] < 1) {
      return {
        error: "Booking not complete",
      };
    } else {
      let decider = await eventService.bookingTally(
        eventId,
        booking.ticketType
      );

      if (decider.error) {
        return {
          error: "Unable to book the event",
        };
      } else {
        return {
          message:
            "Booking submitted successfully ",
        };
      }
    }
  }

  async updateBooking(eventId: string, userId: string, booking: Bookings) {
    let userExists = (
      await Helper.query(`select * from Users where userId = '${userId}'`)
    ).recordset;

    if (userExists.length == 0) {
      return {
        error: "Failed to update booking",
      };
    }

    let eventExists = (
      await Helper.query(`select * from Events where eventId = '${eventId}'`)
    ).recordset;

    if (lodash.isEmpty(eventExists)) {
      return {
        error: "This event does not exist",
      };
    }

    let bookingExists = (
      await Helper.query(
        `select * from Bookings where eventId = '${eventId}' AND userId = '${userId}' AND bookStatus = 0`
      )
    ).recordset;

    if (lodash.isEmpty(bookingExists)) {
      return {
        error: "failed to update...the event is approved",
      };
    }

    let result = (
      await Helper.execute("updateBookings", {
        bookId: bookingExists[0].bookId,
        eventId: bookingExists[0].eventId,
        userId: bookingExists[0].userId,
        ticketType: booking.ticketType,
      })
    ).rowsAffected;

    if (result[0] < 1) {
      return {
        error: "unable to update booked tickets",
      };
    } else {
      let removeExistingTally = await eventService.cancelBooking(
        bookingExists[0].eventId,
        bookingExists[0].ticketType
      );

      if (removeExistingTally.error) {
        return {
          error: removeExistingTally.error,
        };
      }

      let decider = await eventService.bookingTally(
        eventId,
        booking.ticketType
      );

      if (decider.error) {
        return {
          error: decider.error,
        };
      } else {
        return {
          message: decider.message,
        };
      }
    }
  }

  async deleteBooking(userId: string, bookId: string) {
    let userExists = (
      await Helper.query(`select * from Users where userId = '${userId}'`)
    ).recordset;

    if (userExists.length == 0) {
      return {
        error: "Cannot delete this event",
      };
    }

    let bookingExists = (
      await Helper.query(
        `select * from Bookings where bookId = '${bookId}' AND userId = '${userId}'`
      )
    ).recordset;

    if (lodash.isEmpty(bookingExists)) {
      return {
        error: "Booking to be deleted does not exist",
      };
    }
    {
      let result = (
        await Helper.query(`delete from Bookings where bookId = '${bookId}'`)
      ).rowsAffected;

      if (result[0] < 1) {
        return {
          error: "Unable to delete",
        };
      } else {
        let removeExistingTally = await eventService.cancelBooking(
          bookingExists[0].eventId,
          bookingExists[0].ticketType
        );

        if (removeExistingTally.error) {
          return {
            error:
              "Unable to update booked tickets",
          };
        }
        return {
          message: "Number of booked tickets updated successfully",
        };
      }
    }
  }

  async getAllBookingsByUserId(userId: string) {
    let eventIds: string[] = [];
    let fetchedEvents: Events[] = [];
    let fetchedBookings: Bookings[] = [];

    let userExists = (
      await Helper.query(`select * from Users where userId = '${userId}'`)
    ).recordset;

    if (userExists.length == 0) {
      return {
        error: "unable to get events",
      };
    }

    let eventsAvailable = (
      await Helper.query(`select * from Bookings where userId = '${userId}'`)
    ).recordset;

    if (lodash.isEmpty(eventsAvailable)) {
      return {
        error: "You have not booked any events yet,book to see your history",
      };
    } else {
      for (let event of eventsAvailable) {
        eventIds.push(event.eventId);
      }

      if (eventIds.length == 0) {
        return {
          error: "Unable to display your booked events",
        };
      } else {
        for (let userEventId of eventIds) {
          let retrievedEvent = await eventService.getEventByEventId(
            userEventId
          );

          if (retrievedEvent.event) {
            fetchedEvents.push(retrievedEvent.event[0] as unknown as Events);
          } else {
            return {
              error: retrievedEvent.error,
            };
          }
        }

        if (fetchedEvents.length == 0) {
          return {
            error: "unable to retrieve the events",
          };
        } else {
          let books = (await Helper.query(`SELECT * FROM Bookings WHERE userId = '${userId}'`)).recordset;

          if (lodash.isEmpty(books)) {
            return {
              error: "No bookings found",
            };
          }

          else {
            fetchedBookings = books;
          }
          return {
            message: "Booked Events successfully retrieved",
            events: fetchedEvents,
            bookings: fetchedBookings
          };
        }
      }
    }
  }

  async getBookedUsers(manager_id: string) {
    let userIds: string[] = [];
    let eventIds: string[] = [];
    let fetchedUsers: Users[] = [];

    let userExists = (
      await Helper.query(`select * from Users where userId = '${manager_id}'`)
    ).recordset;

    if (userExists.length == 0) {
      return {
        error: "Unable to get users who have booked these events",
      };
    }

    let eventsCreated = await eventService.getEventByUserId(manager_id);

    if (eventsCreated.error) {
      return {
        error: eventsCreated.error,
      };
    } else if (eventsCreated.events) {
      let createdEvents = eventsCreated.events as Events[];

      for (let createdEvent of createdEvents) {
        eventIds.push(createdEvent.eventId);
      }

      if(eventIds.length == 0 ) {
        return {
          error: "Event creater cannot be found"
        }
      }

      else {
        for (let eventId of eventIds) {
          let bookingsAvailable = (await Helper.query(
            `select * from Bookings where eventId = '${eventId}'`
          )).recordset;

          if (lodash.isEmpty(bookingsAvailable)) {
            return {
              error: "This event has no bookings yet"
            };
          } else {
            for (let booking of bookingsAvailable) {
              userIds.push(booking.userId);
            }

            if (userIds.length == 0) {
              return {
                error: "Unable to display users who have booked this event",
              };
            }
            else {
              for (let userId of userIds) {
                let retrievedUser = await userSevice.getUserById(userId);

                if(retrievedUser.error) {
                  return {
                    error: "The history of the user does not exist."
                  }
                  break;
                }
                else if (retrievedUser.user) {
                  fetchedUsers.push(retrievedUser.user[0] as unknown as Users);
                }
              }

              if (fetchedUsers.length == 0) {
                return {
                  error: "Unable to display the users retrieved.",
                };
              }
              else {
                return {
                  message: "Users successfully retrieved",
                  users: fetchedUsers,
                };
              }
            }
          }
        }
      }
    }
  }


  async updateBookStatus(bookId: string) {

    let bookingExists = (await Helper.query(`select * from Bookings where bookId = '${bookId}'`)).recordset;

    if (lodash.isEmpty(bookingExists)) {
      return {
        error: "Cannot find booked events"
      }
    }

    let result = (await Helper.query(`update bookings set bookStatus = 1 where bookId = '${bookId}'`)).rowsAffected;

    if (result[0] < 1) {
      return {
        error: "Unable to approve booking"
      }
    }

    else {
      return {
        message: "Booking approved successfully"
      }  
    }
  }

  async getApprovedBookedUsers(manager_id: string) {
    let userIds: string[] = [];
    let eventIds: string[] = [];
    let fetchedUsers: Users[] = [];
    let approvedEvents: Events[] = [];
    let finalEvents: Events[] = [];

    let userExists = (
      await Helper.query(`select * from Users where userId = '${manager_id}'`)
    ).recordset;

    if (userExists.length == 0) {
      return {
        error: "Unable to get users who have booked these events",
      };
    }

    let eventsCreated = await eventService.getEventByUserId(manager_id);

    if (eventsCreated.error) {
      return {
        error: eventsCreated.error,
      };
    } else if (eventsCreated.events) {
      let createdEvents = eventsCreated.events as Events[];

      for (let createdEvent of createdEvents) {
        eventIds.push(createdEvent.eventId);
      }

      if(eventIds.length == 0 ) {
        return {
          error: "Event creater cannot be found"
        }
      }

      else {
        for (let eventId of eventIds) {
          let bookingsAvailable = (await Helper.query(
            `select * from Bookings where eventId = '${eventId}' and bookStatus = 1`
          )).recordset;

          if (lodash.isEmpty(bookingsAvailable)) {
            return {
              error: "This event has no bookings yet"
            };
          } else {
            for (let booking of bookingsAvailable) {
              userIds.push(booking.userId);
              approvedEvents.push(booking.eventId);
            }

            if (userIds.length == 0) {
              return {
                error: "Unable to display users who have booked this event",
              };
            }
            else {
              for (let userId of userIds) {
                let retrievedUser = await userSevice.getUserById(userId);

                if(retrievedUser.error) {
                  return {
                    error: "The history of the user does not exist."
                  }
                  break;
                }
                else if (retrievedUser.user) {
                  fetchedUsers.push(retrievedUser.user[0] as unknown as Users);
                }
              }

              if (fetchedUsers.length == 0) {
                return {
                  error: "Unable to display the approved users retrieved.",
                };
              }
              else {
                 for(let approvedEvent of approvedEvents) {
                   let eventDetails = await eventService.getEventByEventId(approvedEvent.eventId);
                   if(eventDetails.error) {
                     return {
                       error: "Unable to retrieve event details"
                     }
                    }
                   else if (eventDetails.event) {
                     let eventDetailsData = eventDetails.event as Events[];
                     finalEvents.push(eventDetailsData[0]);
                   }
                 }
                return {
                  message: "approved users successfully retrieved",
                  users: fetchedUsers,
                  events: finalEvents,
                };
              }
            }
          }
        }
      }
    }
  }
 
}
