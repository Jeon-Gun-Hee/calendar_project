<template>
  <div>
    <h1>데모 앱</h1>
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script>
import { ref } from 'vue';
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
      select: function(arg) {
        var title = prompt('Event Title:');
        if (title) {
          this.addEvent({ // this를 사용하여 이벤트를 추가합니다.
            title: title,
            start: arg.start,
            end: arg.end,
            allDay: arg.allDay
          });
        }
      },
      eventClick: function(info) {
        if (confirm(`Are you sure you want to delete the event '${info.event.title}'?`)) {
          info.event.remove();
        }
      }
    });

    return { calendarOptions };
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
