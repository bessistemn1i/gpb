<template>
  <div class="input-container">
    <b-field>
      <template slot="label">
        <span class="dynamic-subtitle">О чем вы думаете?</span>
      </template>
      <b-input
        class="textfield"
        v-model.lazy="message"
        maxlength="400"
        type="textarea"
      ></b-input>
    </b-field>
    <b-button class="is-primary" @click="addMessageToFeed">Поделиться</b-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
      imageCounter: 0,
      res: ""
    };
  },
  computed: {
    /**
     * Получение массива адресов картинок в текстово поле
     */
    previewImages() {
      const imageUrl = this.message;
      const regexp = RegExp(/(https?:\/\/\S+(?:jpg|jpeg|png))/gm);
      let matchUrl = imageUrl.match(regexp);
      return matchUrl;
    }
  },
  methods: {
    /**
     * Формирование сообщения для добавления в ленту
     */
    addMessageToFeed() {
      const messageText = this.checkTextfieldOnImages(); // Добавление текста (замена ссылок на изображения на сами изображения)
      const currentData = Date.now();
      const message = {};
      message.date = currentData;
      message.text = messageText;
      message.images = this.previewImages;
      message.user = this.user;
      this.$emit("addMessage", message);
      this.resetTextarea();
    },

    /**
     * Проверка текстового поля на наличие ссылок на изображения, формирование текста сообщения
     */
    checkTextfieldOnImages() {
      let text = this.message;
      const isImagesInTextfield = this.previewImages !== null; // есть ли изображения в текстовом поле
      let result = "";
      if (isImagesInTextfield) {
        const imagesInTexfield = this.previewImages;
        let regExp = "";
        /**
         * удаляем адреса на изображения из текста сообщения
         */
        while (this.imageCounter < imagesInTexfield.length) {
          regExp = new RegExp(`${imagesInTexfield[this.imageCounter]}`, "gi");
          result = text.replace(regExp, "");
          text = text.replace(imagesInTexfield[this.imageCounter], "");
          this.imageCounter++;
        }
        this.imageCounter = 0; // обнуляем счетчик
        return result;
      }
      return text;
    },

    resetTextarea() {
      this.message = "";
    }
  }
};
</script>

<style scoped>
.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}
.textfield {
  padding: 5px 10px;
  min-width: 100%;
}
</style>
