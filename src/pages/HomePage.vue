<template>
  <div>
    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Télécharger un fichier</label>
    <input @change="handleFileUpload" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file">

    <textarea v-model="resultText" class="mt-4 h-52 w-full p-2 border border-gray-300 rounded-lg text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 focus:outline-none" placeholder="Tapez votre texte ou téléchargez un fichier"></textarea>
  </div>
</template>

<script>
import Tesseract from 'tesseract.js';

export default {
  name: 'HomePage',
  data() {
    return {
      resultText: ''
    };
  },
  methods: {
    // Fonction appelée lorsqu'un fichier est sélectionné
    handleFileUpload(event) {
      const fileInput = event.target;
      if (fileInput.files.length > 0) {
        const uploadedImage = fileInput.files[0];
        this.processImage(uploadedImage);
      }
    },
    // Fonction pour traiter l'image avec Tesseract.js
    processImage(image) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target.result;

        Tesseract.recognize(imageData, 'fra', {
          logger: m => console.log(m)
        })
        .then(({ data: { text } }) => {
          console.log(text);

          this.resultText = text;
        })
        .catch(error => {
          console.error('Erreur lors du traitement de l\'image:', error);
        });
      };
      reader.readAsDataURL(image);
    }
  }
}
</script>