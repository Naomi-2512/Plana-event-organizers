import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventsService } from '../../../services/events.service';
import { Router } from '@angular/router';
import { Events } from '../../../interfaces/interface';

@Component({
  selector: 'app-organizer-events',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,],
  templateUrl: './organizer-events.component.html',
  styleUrl: './organizer-events.component.css'
})
export class OrganizerEventsComponent {
  updateId: string = '';
  value: string = 'Create';
  errorMessage:string = '';
  success:string = '';
  displays = {};

  display = {
    'display':'none'
  };
  events:Events[] = [];
  eventId!:Events;
  eventPhotos:string[] = [];

  eventForm!:FormGroup;

  constructor(private router:Router,private eventService:EventsService,private formBuilder:FormBuilder){
    this.eventForm = this.formBuilder.group({
      eventName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
      longDescription: ['', Validators.required],
      images: ['[]', Validators.required],
      single: ['', Validators.required],
      couple: ['', Validators.required],
      groups: ['', Validators.required],
      totalTickets: ['', Validators.required],
      bookingDeadline: ['', Validators.required]
    });
    this.displayEvents();
  }

  

  toggleForm() {
    this.display = {
      'display': 'none'
    }

    this.eventForm.patchValue({
      eventName: '',
        startDate: '',
        endDate: '',
        location: '',
        description: '',
        longDescription: '',
        images: '',
        single: '',
        couple: '',
        groups: '',
        totalTickets: '',
        bookingDeadline: ''
    })
  }

  toggleFormFlex() {
    this.display = {
      'display': 'flex'
    }
  }

  toggleUpdateFlex(eventId: string) {
    this.updateId = eventId;
    this.display = {
      'display': 'flex'
    }

    this.eventService.getEventByEventId(eventId).subscribe(res=>{
      let myEvent = (res.event as Events[])[0];

      this.eventForm.patchValue({
        eventName: myEvent.eventName,
        startDate: myEvent.startDate,
        endDate: myEvent.endDate,
        location: myEvent.location,
        description: myEvent.description,
        longDescription: myEvent.longDescription,
        images: myEvent.images,
        single: myEvent.single,
        couple: myEvent.couple,
        groups: myEvent.groups,
        totalTickets: myEvent.totalTickets,
        bookingDeadline: myEvent.bookingDeadline
      })
    })
    this.value = 'update'
  }

  geteventPhotos(event:any){
    const file = event.target.files[0];
    console.log(file);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'planaProject');
    formData.append('cloud_name','dqxwy25mr');

    fetch('https://api.cloudinary.com/v1_1/dqxwy25mr/image/upload', {
      method: 'POST',
      body: formData
    }).then(res=>res.json()).then(res=>{
      console.log(res.url);
      
      this.eventPhotos.push(res.url)
      this.eventForm.patchValue({images:this.eventPhotos})
    })
    
  }

  chooseMethod() {
    if(this.updateId != ''){

      this.eventService.updateEvent(this.eventForm.value, this.updateId).subscribe(res=>{
        if(res.error ){
          this.errorMessage = res.error;
          this.displays = {
            'background-color':'red',
            'display':'flex'
          }
          setTimeout(()=>{
            this.errorMessage = '',
            this.displays = {}
          },5000)
        }
        else if(res.message){
          this.success = res.message;
          this.displays = {
            'background-color':'green',
            'display':'flex'
          }
          this.eventForm.setValue({
            eventName: '',
            startDate: '',
            endDate: '',
            location: '',
            description: '',
            longDescription: '',
            images: [''],
            single: '',
            couple: '',
            groups: '',
            totalTickets: '',
            bookingDeadline: ''
          });
          this.events = [];
          this.displayEvents();
          this.toggleForm()
  
          setTimeout(()=>{
            this.success = '',
            this.displays = {};
          },2000)
        }
      })

    }
    else {
      this.createEvent();
    }
  }

  createEvent(){
    this.toggleForm();
    const eventData = {
      ...this.eventForm.value,
      images: this.eventForm.value.images.join(', ')
    };
    this.eventService.createEvent(eventData).subscribe(res =>{
      if(res.error ){
        this.errorMessage = res.error;
        this.displays = {
          'background-color':'red',
          'display':'flex'
        }
        setTimeout(()=>{
          this.errorMessage = '',
          this.displays = {}
        },5000)
      }
      else if(res.message){
        this.success = res.message;
        this.displays = {
          'background-color':'green',
          'display':'flex'
        }
        this.eventForm.setValue({
          eventName: '',
          startDate: '',
          endDate: '',
          location: '',
          description: '',
          longDescription: '',
          images: [''],
          single: '',
          couple: '',
          groups: '',
          totalTickets: '',
          bookingDeadline: ''
        });
        this.events = [];
        this.displayEvents();

        setTimeout(()=>{
          this.success = '',
          this.displays = {};
        },2000)
      }
    })
  }

  displayEvents(){
    this.eventService.getEventByUserId().subscribe(res=>{
      this.events = res.events;
      console.log(res.events); 
    })
  }

  deleteEvents(eventId: string){
    this.eventService.deleteEvent(eventId).subscribe(res=>{
      this.events = this.events.filter(event => event.eventId !== eventId);
    })
  }
}
