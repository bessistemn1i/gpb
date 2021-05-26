<template>
  <li class="comment-container">
    <div class="dropdown is-hoverable">
      <div class="dropdown-trigger">
        <div
          class="avatar-container"
          aria-haspopup="true"
          aria-controls="dropdown-menu4"
          alt="Фото пользователя"
        >
          <figure class="image is-32x32">
            <img class="is-rounded" :src="comment.avatar" :alt="comment.name" />
          </figure>
        </div>
      </div>
      <div class="dropdown-menu" id="dropdown-menu4" role="menu">
        <div class="dropdown-content">
          <div class="dropdown-item">
            <span class="dynamic-subtitle">{{ comment.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <p class="comment-text dynamic-subtitle">{{ comment.text }}</p>
  </li>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      default() {
        return {
          avatar: "",
          name: "Без имени",
          text: "Без комментария"
        };
      }
    }
  },
  name: "Comment"
};
</script>

<style lang="scss" scoped>
.comment-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
}
.comment-avatar__image-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
}
.comment-container p {
  margin: 0;
  text-align: left;
}
.comment-avatar__image-container {
  width: 60px;
  height: 60px;
  object-fit: contain;
  margin-right: 15px;
}
.comment-avatar__image-container img {
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 50%;
}
.comment-text {
  width: calc(100% - 60px);
}
</style>
