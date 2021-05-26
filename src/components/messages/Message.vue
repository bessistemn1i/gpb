<template>
  <div class="theme-block">
    <li class="message-item">
      <div class="theme-block message-container">
        <div class="dropdown is-hoverable">
          <div class="dropdown-trigger">
            <div
              class="avatar-container"
              aria-haspopup="true"
              aria-controls="dropdown-menu4"
              alt="Фото пользователя"
            >
              <img :src="user.avatar" class="user-avatar" />
            </div>
          </div>
          <div class="dropdown-menu" id="dropdown-menu4" role="menu">
            <div class="dropdown-content">
              <div class="dropdown-item">
                <span>{{ user.first_name }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="message-content">
          <p class="dynamic-subtitle">{{ message.currentMessage.text }}</p>
          <div class="image-container" v-if="message.currentMessage.images">
            <figure
              class="image"
              v-for="(imageSRC, imageSRCIndex) in message.currentMessage.images"
              :key="imageSRCIndex"
            >
              <img
                class="message-preview_img"
                :src="imageSRC"
                alt="Превью фотографии"
              />
            </figure>
          </div>
        </div>
        <div class="message__date-container">
          <span class="dynamic-subtitle">{{
            message.currentMessage.date | dataInUserView
          }}</span>
        </div>
      </div>
      <Comments
        :messageComments="message.currentComment"
        v-if="message.currentComment.length > 0"
      />
    </li>
  </div>
</template>

<script>
import Comments from "@/components/comments/Comments.vue";
export default {
  components: {
    Comments
  },
  data() {
    return {
      user: {}
    };
  },
  props: {
    message: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    /**
     * Формируем дату в человеко-читаемом виде
     */
    dataInUserView(dataInTimeStamp) {
      const data = new Date(dataInTimeStamp);
      const year = data.getFullYear();
      const month = `0${data.getMonth() + 1}`.slice(-2);
      const day = `0${data.getDay()}`.slice(-2);
      const hour = `0${data.getHours()}`.slice(-2);
      const minutes = `0${data.getMinutes()}`.slice(-2);
      const formattedData = `${day} - ${month} - ${year} (${hour} : ${minutes})`;
      return formattedData;
    }
  },
  computed: {
    /**
     * формируем дефолтное изображение
     */
    avatarImagePath() {
      return this.user.avatar
        ? this.user.avatar
        : "@/assets/images/no-image.jpg";
    }
  },
  created() {
    this.getUser();
  },
  methods: {
    async getUser() {
      await fetch("https://reqres.in/api/users/2")
        .then((resp) => resp.json())
        .then((user) => (this.user = user.data));
    }
  }
};
</script>

<style lang="scss" scoped>
.message-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 30px;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #000;
}
.message-item {
  margin-bottom: 15px;
}
.message__date-container {
  display: flex;
  width: 100%;
  max-width: 100%;
  flex-direction: row;
  justify-content: flex-end;
}
.message__date-container span {
  font-size: 12px;
  font-weight: 400;
}
.avatar-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
}
.user-avatar {
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: 50%;
}
.message-content {
  width: calc(100% - 85px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 15px;
}
.message-content p {
  margin: 0;
  margin-bottom: 15px;
  text-align: justify;
}
.message-preview_img {
  width: 100%;
  height: 300px;
  object-fit: contain;
  display: block;
}
</style>
