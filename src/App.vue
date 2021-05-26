<template>
  <div id="app" class="app-background">
    <div class="columns app-container">
      <div class="column is-four-fifths">
        <section class="hero is-small">
          <div class="buttons">
            <b-button
              :disabled="!darkMode"
              type="is-ghost"
              class="dynamic-bg dynamic-subtitle"
              @click="darkMode = false"
            >
              Светлая тема
            </b-button>
            <b-button
              :disabled="darkMode"
              type="is-ghost"
              class="is-black dynamic-bg dynamic-subtitle"
              @click="darkMode = true"
            >
              Темная тема
            </b-button>
          </div>
        </section>
        <section class="section">
          <div class="block">
            <div class="messages">
              <InputForm v-on:addMessage="addMessageToFeed($event)" />
              <MessagesFeed :messages="messages" />
            </div>
          </div>
        </section>
      </div>
      <section class="section">
        <div class="column">
          <TopMessages :topMessages="messages" />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import InputForm from "@/components/InputForm";
import MessagesFeed from "@/components/messages/MessagesFeed";
import TopMessages from "@/components/messages/TopMessages";
export default {
  name: "App",
  components: {
    InputForm,
    MessagesFeed,
    TopMessages
  },
  data() {
    return {
      messages: [],
      intervalComment: this.generateCommentTime(),
      avatar: "",
      darkMode: false
    };
  },
  mounted() {
    if (localStorage.getItem("messages")) {
      try {
        this.messages = JSON.parse(localStorage.getItem("messages"));
      } catch (e) {
        localStorage.removeItem("messages");
      }
    }
    /**
     * Добавление классов для смены темы (Темная/Светлая)
     */
    const bodyEl = document.body;
    bodyEl.classList.add("app-background");

    const htmlEl = document.documentElement;
    const theme = localStorage.getItem("theme");

    if (theme === "dark") {
      htmlEl.setAttribute("theme", "dark");
      this.darkMode = true;
    } else {
      htmlEl.setAttribute("theme", "light");
      this.darkMode = false;
    }
  },
  watch: {
    darkMode() {
      const htmlEl = document.documentElement;
      if (this.darkMode) {
        localStorage.setItem("theme", "dark");
        htmlEl.setAttribute("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
        htmlEl.setAttribute("theme", "light");
      }
    },
    messages(messages) {
      const parsedMessages = JSON.stringify(messages);
      localStorage.messages = parsedMessages;
    }
  },
  methods: {
    /**
     * Добавление сообщений в ленту
     */
    addMessageToFeed(message) {
      this.messages.push({
        currentMessage: message,
        currentComment: this.generateComment()
      });
    },

    generateCommentTime() {
      const startArray = 5;
      const times = [];
      for (let i = startArray; i < 31; i++) {
        times.push(i);
      }
      const rand = Math.floor(Math.random() * times.length);
      return times[rand] * 100;
    },
    generateMaxComments() {
      const startArray = 1;
      const arrayNums = [];
      for (let i = startArray; i < 10; i++) {
        arrayNums.push(i);
      }
      const rand = Math.floor(Math.random() * arrayNums.length);
      return arrayNums[rand];
    },
    generateUserNameOfComment() {
      const names = ["Павел", "Ольга", "Пётр", "Ира", "Роман", "Илья"];
      const rand = Math.floor(Math.random() * names.length);
      return names[rand];
    },
    generateCommentText() {
      let alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
      let word = "";
      for (let i = 0; i < 6; i++) {
        word += alphabet[Math.round(Math.random() * (alphabet.length - 1))];
      }
      return ` ${word}`.repeat(
        Math.round(Math.random() * (alphabet.length - 1))
      );
    },
    async generateCommentAvatar() {
      const MAX_USER_POSITION = 12;
      const MIN_USER_POSITION = 1;
      const random = Math.round(
        Math.random() * (MAX_USER_POSITION - MIN_USER_POSITION) +
          MIN_USER_POSITION
      );
      await fetch(`https://reqres.in/api/users/${random}`)
        .then((resp) => resp.json())
        .then((user) => {
          this.avatar = user.data.avatar;
        });
    },
    generateComment() {
      let currentComment = 0;
      const arrayOfComments = [];
      /**
       * Получаем максимальное число комментариев
       */
      const maxComments = this.generateMaxComments();

      /**
       * Получаем аватар для первого комментария
       */
      this.generateCommentAvatar();

      /**
       * создаем комментарии со случайным интервалом времени
       */
      let interval = setInterval(() => {
        this.generateCommentAvatar(); // получаем аватар
        const comment = {
          name: this.generateUserNameOfComment(), // получаем имя пользователя
          text: this.generateCommentText(), // получаем текст комментария
          avatar: this.avatar
        };
        arrayOfComments.push(comment);
        currentComment++;
        this.intervalComment = this.generateCommentTime(); // получаем случайным образом интервал добавления комментария

        /**
         * Очищаем интервал в случае достижения максимального кол-ва комментариев
         */
        if (currentComment >= maxComments) {
          clearInterval(interval);
        }
      }, this.intervalComment);
      return arrayOfComments;
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #2c3e50;
}
.app-container {
  width: 100%;
  max-width: 800px;
  margin-right: auto;
  margin-left: auto;
}
.messages {
  width: 500px;
}
</style>
