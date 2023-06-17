import React, { useEffect,useState } from 'react'
import classes from './Calendar.module.css'
import Fullcalendar from '@fullcalendar/react'
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'


export const api_url = 'http://127.0.0.1:8000';
export const auth = 'JWT ' + localStorage.getItem('access_token');


function Calendar() {
    const [isLoading, setIsLoading] = useState(true);
    const [events, setEvents] = useState(null);
    async function fetchData() {
        await fetch("https://elms.fly.dev/dashboard/user-events/", {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": auth
            },
        })
            .then((res) => {
                if (res.status == 200)
                    return res.json()
                else
                    throw res.json()
            })
            .then(
                (result) => {
                    setEvents(result);
                },
                (error) => {
                    return error
                }
            ).then((err) => {
                if (err) {
                    
                }
                setIsLoading(false);
            })
    }

    useEffect(() => {
        fetchData()
    }, []);

  return (
    <div className={classes.container}>
        <div className={classes.calendar}>
        <Fullcalendar 
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin,listPlugin]}
            initialView="dayGridMonth"
            events={events}
            themeSystem="Cosmo"
            headerToolbar={{
                left: "prev today next",
                center: "title",
                right: "dayGridMonth,listWeek,timeGridDay",
            }}
            height={"80vh"}
            ></Fullcalendar>
        </div>
    </div>
  )
}

export default Calendar