<template>
  <div class="messages-container app-background">
    <ul class="messages-list">
      <Message
        :message="message"
        v-for="(message, messageID) in messages"
        :key="messageID"
      />
    </ul>
  </div>
</template>

<script>
import Message from "@/components/messages/Message";
export default {
  props: {
    messages: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    Message
  }
};
</script>

<style scoped>
.messages-list {
  max-width: 500px;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding: 0;
  list-style: none;
}
</style>
