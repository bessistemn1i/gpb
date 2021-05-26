<template>
  <div class="comments-container">
    <ul class="comments-list">
      <Comment
        v-for="(comment, commentIndex) in shownComments"
        :key="commentIndex"
        :comment="comment"
      />
    </ul>
    <b-button
      type="is-success"
      class="dynamic-subtitle dynamic-bg"
      v-if="messageComments.length > SLICED_END"
      @click="showMore()"
      >Показать больше комментариев</b-button
    >
  </div>
</template>

<script>
import Comment from "@/components/comments/Comment.vue";
export default {
  data() {
    return {
      startSlicePack: 0,
      SLICED_END: 3 // количество выводимых сообщений за 1 раз
    };
  },
  name: "Comments",
  components: {
    Comment
  },
  props: {
    messageComments: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    shownComments() {
      const allComments = this.messageComments;
      const commentsPack = allComments.slice(
        this.startSlicePack,
        this.SLICED_END
      );
      return commentsPack;
    }
  },
  methods: {
    showMore() {
      this.SLICED_END += 3;
      if (this.SLICED_END >= this.messageComments.length) {
        this.SLICED_END = this.messageComments.length;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.comments-list {
  padding: 0;
  list-style: none;
}
</style>
