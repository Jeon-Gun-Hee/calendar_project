<template>
  <div>
    <h1>캘린더 페이지</h1>
    <FullCalendar :options="calendarOptions" ref="calendar" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

export default {
  components: {
    FullCalendar
  },
  setup() {
    const calendarRef = ref(null);
    const calendarOptions = ref({
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
      height: '700px',
      expandRows: true,
      slotMinTime: '08:00',
      slotMaxTime: '20:00',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      initialView: 'dayGridMonth',
      navLinks: true,
      editable: true,
      selectable: true,
      nowIndicator: true,
      dayMaxEvents: true,
      locale: 'ko',
      events: [],
      select: async function(arg) {
        var title = prompt('Event Title:');
        if (title) {
          const newEvent = {
            title: title,
            start: arg.start,
            end: arg.end,
            allDay: arg.allDay
          };

          const username = localStorage.getItem('username');

          if (!username) {
            alert('로그인이 필요합니다.');
            return;
          }

          try {
            const response = await fetch('http://localhost:3000/events', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ username, ...newEvent })
            });

            const data = await response.json();
            if (data.success) {
              const fetchEventsResponse = await fetch(`http://localhost:3000/events/${username}`);
              const fetchEventsData = await fetchEventsResponse.json();
              if (fetchEventsData.success) {
                calendarOptions.value.events = fetchEventsData.events.map(event => ({
                  id: event.id,
                  title: event.title,
                  start: event.start,
                  end: event.end,
                  allDay: event.allDay
                }));
              }
            } else {
              alert('이벤트 저장에 실패했습니다.');
            }
          } catch (error) {
            console.error('Error saving event:', error);
          }
        }

        if (calendarRef.value) {
          calendarRef.value.getApi().unselect();
        }
      },
      eventClick: async function(info) {
        if (confirm(`Are you sure you want to delete the event '${info.event.title}'?`)) {
          try {
            const response = await fetch(`http://localhost:3000/events/${info.event.id}`, {
              method: 'DELETE'
            });

            const data = await response.json();
            if (data.success) {
              info.event.remove();
            } else {
              alert('이벤트 삭제에 실패했습니다.');
            }
          } catch (error) {
            console.error('Error deleting event:', error);
          }
        }
      }
    });

    onMounted(async () => {
      const username = localStorage.getItem('username');
      if (username) {
        try {
          const response = await fetch(`http://localhost:3000/events/${username}`);
          const data = await response.json();
          if (data.success) {
            calendarOptions.value.events = data.events.map(event => ({
              id: event.id,
              title: event.title,
              start: event.start,
              end: event.end,
              allDay: event.allDay
            }));
          }
        } catch (error) {
          console.error('Error fetching events:', error);
        }
      }
    });

    return { calendarOptions, calendarRef };
  }
};
</script>

<style>
html, body {
  overflow: hidden;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}
.fc-header-toolbar {
  padding-top: 1em;
  padding-left: 1em;
  padding-right: 1em;
}
</style>
