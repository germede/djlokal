<!-- eslint-disable max-len -->
<template>
  <div class="calendar">
    <h1>Events in year</h1>
    <input type="number" v-model="year" @input="generateCalendar()">
    <template v-for="(month, monthNr) in calendar" :key="month">
      <h2 class="text-center w-100">{{ month.name }}</h2>
      <table class="table table-striped mb-3" style="table-layout: fixed;">
        <thead>
          <tr>
            <th>Mo</th>
            <th>Tu</th>
            <th>We</th>
            <th>Th</th>
            <th>Fr</th>
            <th>Sa</th>
            <th>Su</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="week in month.weeks" :key="week">
            <tr v-if="week.days[0].date.getMonth() == monthNr || week.days[6].date.getMonth() == monthNr">
              <td v-for="day in week.days" :key="day">
                <span v-if="day.date.getMonth() == monthNr">
                  {{ day.date.getDate() }}
                </span>
                <p v-for="event in day.events" :key="event">
                  <b class="text-primary"><vue-feather type="clock" size="11"></vue-feather> {{ event.time }} </b> {{
                    event.name }}
                </p>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </template>
  </div>
</template>
  
<script>

import Event from "../models/Event";

export default {
  name: "calendar-list",
  data() {
    return {
      calendar: [],
      events: [],
      year: new Date().getFullYear()
    };
  },
  methods: {
    generateCalendar() {
      const months = [];
      for (let month = 0; month < 12; month++) {
        const weeks = [];
        const firstDay = new Date(this.year, month, 1);
        const dayOffset = firstDay.getDay() - 1;
        for (let week = -1; week < 7; week++) {
          const days = [];
          for (let day = 0; day < 7; day++) {
            const date = new Date(
              this.year, month, 1 + week * 7 + day - dayOffset
            );
            days.push({ date: date, events: [] });
          }
          weeks.push({ days: days });
        }
        const monthName = new Date(
          this.year, month, 1).toLocaleString("default", { month: "long" });
        months.push({ name: monthName, weeks: weeks });
      }
      this.calendar = months;
      Event.getAll().get().then((qS) => {
        qS.docs.map((doc) => {
          let event = Event.fromFirestore(doc);
          let date = new Date(event.date);
          if (this.year === date.getFullYear()) {
            this.calendar[date.getMonth()]
              .weeks.forEach((week) => {
                let days = week.days;
                for (let day of days) {
                  if (day.date.getDate() == date.getDate() &&
                    day.date.getMonth() == date.getMonth()) {
                    day.events.push(event);
                  }
                }
              });
          }
        });
      });
    },
  },
  mounted() {
    this.generateCalendar();
  }
};

</script>
  
<style scoped></style>