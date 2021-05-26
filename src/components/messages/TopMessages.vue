<template>
  <div class="top-messages">
    <header class="top-messages__header">
      <h3 class="dynamic-subtitle">Самые популярные сообщения:</h3>
    </header>
    <ul class="top-messages__list">
      <li
        class="top-messages__item"
        v-for="(comment, commentIndex) in commentsNum"
        :key="commentIndex"
      >
        <span class="top-messages__num dynamic-subtitle">{{
          comment.currentComment.length
        }}</span>
        <p class="top-messages__text dynamic-subtitle">
          {{ comment.currentMessage.text | previewMessage }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    topMessages: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      topMess: []
    };
  },
  filters: {
    previewMessage(value) {
      if (!value) return "";
      const preview = value.split("").slice(0, 25).join("");
      return `${preview}...`;
    }
  },
  computed: {
    commentsNum() {
      const arr = this.topMessages;
      return arr
        .sort((a, b) => b.currentComment.length - a.currentComment.length)
        .slice(0, 3);
    }
  }
};
</script>

<style scoped>
.top-messages {
  width: 270px;
}
.top-messages h3 {
  margin: 0;
}
.top-messages ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.top-messages__header {
  margin-bottom: 15px;
}

.top-messages ul li {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.top-messages__num {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid #000;
  border-radius: 50%;
  margin-right: 15px;
}
.top-messages__item {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
}
</style>
