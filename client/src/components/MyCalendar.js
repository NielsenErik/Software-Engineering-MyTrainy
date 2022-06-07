import React,{useState, useEffect, useMemo} from "react"
import { Calendar, momentLocalizer, Views,  } from 'react-big-calendar'
import moment from 'moment'
import 'moment-timezone'

import { luxonLocalizer } from 'react-big-calendar'
import { DateTime, Settings } from 'luxon'



import { Container } from 'react-bootstrap'




import useLocalStorage from '../useLocalStorage'

moment.tz.setDefault('America/Los_Angeles')
const localizer = momentLocalizer(moment) // or globalizeLocalizer

// const myEventsList = [
//     {
//     title: "string",
//     start: Date,
//     end: Date,
//     allDay?: boolean
//     resource?: any,
//   }
// ]

const myEventsList = [
    {
      "id": 0,
      "title": "All Day Event very long title",
      "allDay": true,
      "start": "2022-05-30T22:00:00.000Z",
      "end": "2022-05-31T22:00:00.000Z"
    },
    {
      "id": 1,
      "title": "Long Event",
      "start": "2022-05-06T22:00:00.000Z",
      "end": "2022-05-09T22:00:00.000Z"
    },
    {
      "id": 2,
      "title": "DTS STARTS",
      "start": "2016-05-12T23:00:00.000Z",
      "end": "2016-05-19T23:00:00.000Z"
    },
    {
      "id": 3,
      "title": "DTS ENDS",
      "start": "2016-11-05T23:00:00.000Z",
      "end": "2016-11-12T23:00:00.000Z"
    },
    {
      "id": 4,
      "title": "Some Event",
      "start": "2022-05-08T22:00:00.000Z",
      "end": "2022-05-09T22:00:00.000Z"
    },
    {
      "id": 5,
      "title": "Conference",
      "start": "2022-05-10T22:00:00.000Z",
      "end": "2022-05-12T22:00:00.000Z",
      "desc": "Big conference for important people"
    },
    {
      "id": 6,
      "title": "Meeting",
      "start": "2022-05-12T08:30:00.000Z",
      "end": "2022-05-12T10:30:00.000Z",
      "desc": "Pre-meeting meeting, to prepare for the meeting"
    },
    {
      "id": 7,
      "title": "Lunch",
      "start": "2022-05-12T10:00:00.000Z",
      "end": "2022-05-12T11:00:00.000Z",
      "desc": "Power lunch"
    },
    {
      "id": 8,
      "title": "Meeting",
      "start": "2022-05-12T12:00:00.000Z",
      "end": "2022-05-12T13:00:00.000Z"
    },
    {
      "id": 9,
      "title": "Happy Hour",
      "start": "2022-05-12T15:00:00.000Z",
      "end": "2022-05-12T15:30:00.000Z",
      "desc": "Most important meal of the day"
    }
  ]

  // {
  //   "id": 0,
  //   "title": "All Day Event very long title",
  //   "allDay": true,
  //   "start": "2022-05-30T22:00:00.000Z",
  //   "end": "2022-05-31T22:00:00.000Z"
  // },

  

const MyCalendar = ({userCards}) => {

  
  var events = []
  // console.log(userCards);


  return( 
    <Container style={{height:"90vh"}}>
      {
        userCards
        ?
        userCards.map((card) =>{
          // var i = 0;
          events.push(({id: card.id, title: card.title, allDay: true, start: card.startDate, end: card.endDate}))
        })
        :
        console.log(events)
      }
        <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        showMultiDayTimes
        step={60}
        // onDrillDown={}
        onDoubleClickEvent={(e) =>{
          // console.log(e)
          fetch('../api/v2/card/'+e.id, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(),
          })
          .then((resp) => resp.json())
          .then(function(data){
            // console.log(data);
            alert(`carta selezionata : ${data.cardSelected.title}`)
          })
        }}
        />
    </Container>
    )
}

export default MyCalendar;