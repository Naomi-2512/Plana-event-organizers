import { v4 } from "uuid";
import { Events } from "../interfaces/interface";
import { sqlConfig } from "../config/config";
import { Helper } from "../DbHelper/dbHelper";
import lodash from "lodash";
import mssql from 'mssql'

export class EventService {
    async createEvent(userId: string, event: Events) {
      let pool = await mssql.connect(sqlConfig);
      let eventId = v4();
  
      let result = (
        await pool
          .request()
          .input("eventId", eventId)
          .input("userId", userId)
          .input("eventName", event.eventName)
          .input("description", event.description)
          .input("longDescription", event.longDescription)
          .input("location", event.location)
          .input("startDate", event.startDate)
          .input("endDate", event.endDate)
          .input("images", event.images)
          .input("single", event.single)
          .input("couple", event.couple)
          .input("groups", event.groups)
          .input("totalTickets", event.totalTickets)
          .input("bookingDeadline", event.bookingDeadline)
          .execute("createEvent")
      ).rowsAffected;
  
      if (result[0] < 1) {
        return {
          error: "Failed creating this event",
        };
      } else {
        return {
          message: "Event created successfully",
        };
      }
    }
  
    async updateEvent(eventId: string, userId: string, event: Events) {
      let managerExists = (
        await Helper.query(`select * from Events where userId = '${userId}'`)
      ).recordset;
  
      if (lodash.isEmpty(managerExists)) {
        return {
          error: "You are not authorised to update the event",
        };
      }
  
      let eventExists = (
        await Helper.query(
          `select * from Events where eventId = '${eventId}' AND userId = '${userId}'`
        )
      ).recordset;
  
      if (lodash.isEmpty(eventExists)) {
        return {
          error: "Event does not exist",
        };
      }
  
      let pool = mssql.connect(sqlConfig);
  
      let result = (
        await (await pool)
          .request()
          .input("eventId", eventExists[0].eventId)
          .input("userId", eventExists[0].userId)
          .input("eventName", event.eventName)
          .input("description", event.description)
          .input("longDescription", event.longDescription)
          .input("location", event.location)
          .input("startDate", event.startDate)
          .input("endDate", event.endDate)
          .input("images", event.images)
          .input("single", event.single)
          .input("couple", event.couple)
          .input("groups", event.groups)
          .input("totalTickets", event.totalTickets)
          .input("bookingDeadline", event.bookingDeadline)
          .execute("updateEvent")
      ).rowsAffected;
  
      if (result[0] < 1) {
        return {
          error: "Unable to update the specified event",
        };
      } else {
        return {
          message: "Event successfully updated",
        };
      }
    }
  
    async updateEventStatusByAdmin(eventId: string) {
      let eventExists = (
        await Helper.query(`select * from Events where eventId = '${eventId}'`)
      ).recordset;
  
      if (lodash.isEmpty(eventExists)) {
        return {
          error: "This event does not exist",
        };
      }
  
      let result = (
        await Helper.query(
          `update Events set eventStatus = 1 where eventId = '${eventId}'`
        )
      ).rowsAffected;
  
      if (result[0] < 1) {
        return {
          error: "Unable to approve this event",
        };
      } else {
        return {
          message: "Event successfully approved ",
        };
      }
    }
  
    async updateAllEventStatusByAdmin() {
      let result = (
        await Helper.query(
          `update Events set eventStatus = 1 where eventStatus = 0`
        )
      ).rowsAffected;
  
      if (result[0] < 1) {
        return {
          error: "Unable to approve events",
        };
      } else {
        return {
          message: "All events successfully approved for booking",
        };
      }
    }
  
    async getEventByEventId(eventId: string) {
      let result = (
        await Helper.query(`select * from Events where eventId = '${eventId}'`)
      ).recordset;
  
      if (lodash.isEmpty(result)) {
        return {
          error: "The event specified does not exist",
        };
      } else {
        return {
          message: "Event successfully retrieved",
          event: result,
        };
      }
    }
  
    async getEventByUserId(userId: string) {
      let result = (
        await Helper.query(`select * from Events where userId = '${userId}'`)
      ).recordset;
  
      if (lodash.isEmpty(result)) {
        return {
          error: "No events for this id",
        };
      } else {
        return {
          message: "Events have successfully been retrieved",
          events: result,
        };
      }
    }
  
    async getAllEvents() {
      let result = (await Helper.query("select * from Events")).recordset;
  
      if (lodash.isEmpty(result)) {
        return {
          error: "No events created",
        };
      } else {
        return {
          message: "successfully retrieved all events",
          events: result,
        };
      }
    }

    async getApprovedEvents() {
      let result = (await Helper.query(`select * from Events where eventStatus = 1`)).recordset;
  
      if (lodash.isEmpty(result)) {
        return {
          error: "No approved events",
        };
      } else {
        return {
          message: "successfully retrieved approved events",
          events: result,
        };
      }
    }
  
    async deleteEvent(eventId: string) {
      let eventExists = (
        await Helper.query(`select * from Events where eventId = '${eventId}'`)
      ).recordset;
  
      if (lodash.isEmpty(eventExists)) {
        return {
          error: "The event does not exist",
        };
      }
  
      let result = (
        await Helper.query(`delete from Events where eventId = '${eventId}'`)
      ).rowsAffected;
  
      if (result[0] < 1) {
        return {
          error: "Unable to delete  event",
        };
      } else {
        return {
          message: "Event deleted successfully",
        };
      }
    }
  
    async bookingTally(eventId: string, ticketType: string) {
      switch (ticketType) {
        case "single": {
          let result = (
            await Helper.query(`update Events set bookedTickets = bookedTickets + 1, 
            remainingTickets = totalTickets - (bookedTickets + 1) where eventId = '${eventId}'`)
          ).rowsAffected;
  
          if (result[0] < 1) {
            return {
              error: "unable to update booked tickets",
            };
          } else {
            return {
              message: "number of booked tickets updated",
            };
          }
        };
          break;
        case "couple": {
          let result = (
            await Helper.query(`update Events set bookedTickets = bookedTickets + 2, 
            remainingTickets = totalTickets - (bookedTickets + 2) where eventId = '${eventId}'`)
          ).rowsAffected;
  
          if (result[0] < 1) {
            return {
              error: "unable to update booked tickets",
            };
          } else {
            return {
              message: "number of booked tickets updated",
            };
          }
        }
          break;
        case "groups": {
          let result = (
            await Helper.query(`update Events set bookedTickets = bookedTickets + 5, 
            remainingTickets = totalTickets - (bookedTickets + 5) where eventId = '${eventId}'`)
          ).rowsAffected;
  
          if (result[0] < 1) {
            return {
              error: "unable to update booked tickets",
            };
          } else {
            return {
              message: "number of booked tickets updated",
            };
          }
        }
          break;
        default: {
          return {
            error: "Invalid ticket type"
          }
        }
      }
    }
  
    async cancelBooking(eventId: string, ticketType: string) {
      switch (ticketType) {
        case "single": {
          let result = (
            await Helper.query(`update Events set bookedTickets = bookedTickets - 1, 
            remainingTickets = totalTickets - (bookedTickets - 1) where eventId = '${eventId}'`)
          ).rowsAffected;
  
          if (result[0] < 1) {
            return {
              error: "unable to update booked tickets",
            };
          } else {
            return {
              message: "number of booked tickets updated",
            };
          }
        };
          break;
        case "couple": {
          let result = (
            await Helper.query(`update Events set bookedTickets = bookedTickets - 2, 
            remainingTickets = totalTickets - (bookedTickets - 2) where eventId = '${eventId}'`)
          ).rowsAffected;
  
          if (result[0] < 1) {
            return {
              error: "unable to update booked tickets",
            };
          } else {
            return {
              message: "number of booked tickets updated",
            };
          }
        }
          break;
        case "groups": {
          let result = (
            await Helper.query(`update Events set bookedTickets = bookedTickets - 5, 
            remainingTickets = totalTickets - (bookedTickets - 5) where eventId = '${eventId}'`)
          ).rowsAffected;
  
          if (result[0] < 1) {
            return {
              error: "unable to update booked tickets",
            };
          } else {
            return {
              message: "number of booked tickets updated",
            };
          }
        }
          break;
        default: {
          return {
            error: "Invalid ticket type"
          }
        }
      }
    }
  }