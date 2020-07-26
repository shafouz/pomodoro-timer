<template>
  <v-container>
    <v-row>
      <v-col class="col-8">
        <v-btn class="blue darken-2" @click="startTimer(0.1)">0</v-btn>
        <v-btn class="blue darken-2" @click="startTimer(5)">5</v-btn>
        <v-btn class="blue darken-2" @click="startTimer(10)">10</v-btn>
        <v-btn class="blue darken-2" @click="startTimer(15)">15</v-btn>
        <v-btn class="blue darken-2" @click="startTimer(25)">25</v-btn>
      </v-col>
      <v-col class="col-4 text-right">
        <slot></slot>
      </v-col>
    </v-row>
    <v-container class="text-center">
      <p id="timer">{{ timer }}</p>
    </v-container>
    <v-col>
      <v-btn class="red accent-4" @click="stopTimer">Stop</v-btn>
      <v-btn class="blue darken-2" @click="clearTimer">Reset</v-btn>
    </v-col>
  </v-container>
</template>

<script>
import {eventBus} from "../main";

export default {
  name: "timer-stuff",
  data() {
    return {
      minutes: 0,
      timer: "00:00",
      interval: 0,
    };
  },
  methods: {
    startTimer(duration) {
      this.clearTimer();
      let that = this;
      var start = Date.now(),
        diff,
        minutes,
        seconds;
      function timer() {
        diff = (duration * 60) - (((Date.now() - start) / 1000) | 0);

        minutes = (diff / 60) | 0;
        seconds = diff % 60 | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        that.timer = minutes + ":" + seconds;
        document.title = that.timer;

        if (diff <= 0) {
          that.clearTimer();
          eventBus.$emit("zero");
        }
      }
      timer();
      this.interval = setInterval(timer, 1000);
    },
    stopTimer() {
      clearInterval(this.interval);
    },
    clearTimer() {
      this.stopTimer();
      this.timer = "00:00";
    },
  },
};
</script>

<style scoped>
#timer {
  font-size: 15em;
  margin: 0;
}

.v-btn {
  margin-right: 5px;
}
</style>
