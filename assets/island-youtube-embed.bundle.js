// _src/js/islands/youtube-embed.js
import { deferrableData } from "data-island";

// _src/js/components/youtube-embed.js
var YT_PLAYER_STATE = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  VIDEO_CUED: 5
};
var youtube_embed_default = () => ({
  playerState: null,
  init() {
    this.$nextTick(() => {
      window.addEventListener("message", this._messageHandler.bind(this));
    });
    this.$watch("playerState", (value) => {
      if (value === YT_PLAYER_STATE.UNSTARTED) {
        this.$root.dispatchEvent(
          new CustomEvent("unstarted", {
            bubbles: true
          })
        );
      }
      if (value === YT_PLAYER_STATE.PLAYING) {
        this.$root.dispatchEvent(
          new CustomEvent("playing", {
            bubbles: true
          })
        );
      }
      if (value === YT_PLAYER_STATE.PAUSED) {
        this.$root.dispatchEvent(
          new CustomEvent("paused", {
            bubbles: true
          })
        );
      }
      if (value === YT_PLAYER_STATE.BUFFERING) {
        this.$root.dispatchEvent(
          new CustomEvent("buffering", {
            bubbles: true
          })
        );
      }
    });
  },
  onIFrameLoad() {
    this.$el.contentWindow.postMessage(
      JSON.stringify({
        event: "listening",
        id: this.$refs.video.id,
        args: ""
      }),
      "*"
    );
    this.$root.dispatchEvent(new CustomEvent("ready"));
  },
  play() {
    iFrameCommand(this.$refs.video, "playVideo");
  },
  pause() {
    iFrameCommand(this.$refs.video, "pauseVideo");
  },
  _messageHandler(e) {
    if (e.source !== this.$refs.video.contentWindow) return;
    let data;
    try {
      data = JSON.parse(e.data);
    } catch (e2) {
      console.warn("Could not parse message from YouTube embed", e2);
    }
    if (data.info && data.info.playerState) {
      this.playerState = data.info.playerState;
    }
  },
  destroy() {
    window.removeEventListener("message", this._messageHandler);
  }
});

// _src/js/islands/youtube-embed.js
deferrableData("YouTubeEmbed", youtube_embed_default);
