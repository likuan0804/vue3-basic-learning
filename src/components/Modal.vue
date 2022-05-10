<script setup>

  const app = Vue.createApp({});
  app.component('modal-button', {
    template: `
      <button @click="modalOpen = true">
          Open full screen modal!
      </button>

      <div v-if="modalOpen" class="modal">
        <div>
          I'm a modal! 
          <button @click="modalOpen = false">
            Close
          </button>
        </div>
      </div>
    `,
    data() {
      return { 
        modalOpen: false
      }
    }
  })
</script>
