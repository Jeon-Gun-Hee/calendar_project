<template>
  <div>
    <h1>캘린더</h1>
    <FullCalendar :options="calendarOptions" ref="calendarRef" />
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

          // 현재 로그인된 사용자의 userId 가져오기
          const userId = localStorage.getItem('userId');

          if (!userId) {
            alert('로그인 정보가 유효하지 않습니다. 다시 로그인해 주세요.');
            this.$router.push({ name: 'HomePage' }); // 로그인 페이지로 리디렉션
            return;
          }

          // 이벤트 정보를 서버에 저장
          try {
            const response = await fetch('http://localhost:3000/events', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ userId, ...newEvent })
            });

            const data = await response.json();
            if (data.success) {
              // 서버에 저장된 이벤트를 가져오기 위해 다시 불러옵니다.
              const fetchEventsResponse = await fetch(`http://localhost:3000/events/${userId}`);
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

        calendarRef.value.getApi().unselect();
      },
      eventClick: async function(info) {
        if (confirm(`일정을 삭제하시겠습니까? '${info.event.title}'?`)) {
          // 서버에서 이벤트 삭제 요청
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
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          const response = await fetch(`http://localhost:3000/events/${userId}`);
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
