<template>
  <b-row class="messenger-uploader">
    <label class="position-absolute">
      <input type="file" id="files" ref="files" multiple @change="handleFilesUpload()"/>
    </label>

    <div class="messenger-uploader__attach position-absolute" @click="addFiles()">
      <fa :icon="['fas', 'paperclip']" />
    </div>

    <b-col cols="12" md="12" v-for="(file, key) in files" :key="key">
      <div v-if="file && !file.uploaded" class="d-flex align-items-center mt-2">
        <b-progress :value="35" :max="100" animated></b-progress>
        <span class="messenger-uploader__filename">{{ file.name }}</span>
      </div>
    </b-col>

    <b-col cols="12" class="messenger-uploader__error mt-2" v-if="error">Один или несколько файлов не удалось загрузить!<br/>Максимальный размер каждого файла не больше 2мб. Разрешенные типы файлов для загрузки: jpeg, png, jpg, gif, pdf, doc, docx, xsls, xslsx.</b-col>

  </b-row>
</template>

<script>
    export default {
        props: {
            uid: { type: String, default: '' }
        },
        /*
          Defines the data used by the component
        */
        data(){
            return {
                files: [],
                error: false,
            }
        },

        computed: {

        },

        methods: {
            /*
              Adds a file
            */
            addFiles(){
                this.$refs.files.click();
            },

            /*
              Submits files to the server
            */
            submitFiles(){
                /*
                  Initialize the form data
                */
                this.files.forEach((item,index) => {
                    let formData = new FormData();
                    formData.append('file', item);
                    formData.append('uid', this.uid);

                    this.$axios.post( '/messenger/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' }} ).then(res => {
                        console.log('SUCCESS!!!');
                        this.files = [];
                        this.$emit('attach', res.data.files);
                        this.error = false;
                    })
                    .catch( res => {
                        console.log('FAILURE!!');
                        this.error = true;
                    });
                });

            },

            /*
              Handles the uploading of files
            */
            handleFilesUpload(){
                let uploadedFiles = this.$refs.files.files;

                /*
                  Adds the uploaded file to the files array
                */
                for( var i = 0; i < uploadedFiles.length; i++ ){

                    this.files.push( uploadedFiles[i] );
                }

                // Send files
                this.submitFiles();
                // console.log(this.files)
            },

            /*
              Removes a select file the user has uploaded
            */
            removeFile( key ){
                this.files.splice( key, 1 );
            }
        }
    }
</script>

<style scoped lang="sass">
  .messenger-uploader
    & .progress
      width: 100%
      max-width: 10rem
      border: 1px solid #007bff
      margin-right: 0.5rem
    &__filename
      font-size: 0.875rem
      line-height: 0.875rem
    &__attach
      left: 0.75rem
      top: 0.685rem
      color: #cccccc
      cursor: pointer
    &__error
      color: red
      font-size: 13px
      font-weight: 400

    input[type="file"]
      position: absolute
      left: -10000px

    div.file-listing
      width: 200px

    span.remove-file
      color: red
      cursor: pointer
      float: right
</style>
