<template>
  <v-container>
    <timer-stuff v-show="true">
      <v-btn class="blue darken-2" id="show-modal" @click="showModal = true">Settings</v-btn>
    </timer-stuff> 
    <youtube-stuff v-show="false" slot="body" />
    <modal-template v-if="showModal" @close="showModal = false">
      <h3 slot="header">Settings</h3>
      <v-slider
        slot="body"
        append-icon="mdi-volume-high"
        prepend-icon="mdi-volume-low"
        v-model="volumeBar"
        @change="setVolume"
      ></v-slider>
      <!--<v-select
        slot="body"
        :items="sounds"
        label="Sample sounds"
      ></v-select>-->
      <v-text-field
        label="Youtube search"
        v-model="songName"
        slot="body"
      ></v-text-field>
      <v-btn slot="body" class="blue darken-2" @click="setSongFromYoutube(songName)">Set Sound</v-btn>
    </modal-template>
  </v-container>
</template>

<script>
import TimerStuff from "./TimerStuff";
import YoutubeStuff from "./YoutubeStuff";
import ModalTemplate from "./Modal";
import {eventBus} from "../main";

export default {
  name: "MainPage",

  components: {
    TimerStuff,
    YoutubeStuff,
    ModalTemplate,
  },

  data() {
    return {
      showModal: false,
      volumeBar: this.$store.state.volume,
      songName: "",
      //sounds: ["School bell", "Alien buzzer", "Crossing bell", "Tornado siren"]
    };
  },

  methods: {
    setVolume() {
      this.$store.commit("setVolumeLevel", this.volumeBar);
    },
    setSongFromYoutube(name) {
      this.$http
        .get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${name}&key=AIzaSyBPhpn-xk12DuIf6FVi65EQ3bBOtHZT5mQ`
        )
        .then((response) => {
          this.$store.commit("setVideoId", response.data.items[0].id.videoId);
          eventBus.$emit("cue")
        });
    },
  },
};
</script>

<style scoped>
</style>
