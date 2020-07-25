<template>
  <v-container>
    <youtube v-show="showYoutube" @buffering="setVolume" @ended="cueVideo" ref="youtube"></youtube>
  </v-container>
</template>

<script>
import {eventBus} from "../main";

export default {
  name: "youtube-stuff",

  data() {
    return {
      songName: "the number of the beast",
      showYoutube: true,
    };
  },

  methods: {
    
    playVideo(){
      this.player.playVideo();
    },
    // Get store
    setVolume(){
      this.player.setVolume(this.$store.state.volume);
    },
    cueVideo(){
      this.player.cueVideoById({'videoId': this.$store.state.videoId, 'startSeconds': 90, 'endSeconds': 105});
    }
  },

  computed: {
    player(){
      return this.$refs.youtube.player
    }
  },

  mounted(){
    this.cueVideo();

    eventBus.$on('zero', () => {
      this.playVideo();
    })

    eventBus.$on('cue', () => {
      this.cueVideo();
    })
  }
};
</script>

<style></style>
