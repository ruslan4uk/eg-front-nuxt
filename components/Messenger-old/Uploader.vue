<template>
  <b-row class="messenger-uploader">
    <label class="position-absolute">
      <input type="file" id="files" ref="files" multiple v-on:change="handleFilesUpload()"/>
    </label>

    <div class="messenger-uploader__attach position-absolute" @click="addFiles()">
      <fa :icon="['fas', 'paperclip']" />
    </div>

    <b-col cols="12" md="12" v-for="(file, key) in files" :key="key" class="d-flex align-items-center mt-2">
      <b-progress :value="35" :max="100" animated></b-progress>
      <span class="messenger-uploader__filename">{{ file.name }}</span>
    </b-col>
  </b-row>
</template>

<script>
    export default {
        /*
          Defines the data used by the component
        */
        data(){
            return {
                files: []
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
                let formData = new FormData();

                /*
                  Iteate over any file sent over appending the files
                  to the form data.
                */
                for( var i = 0; i < this.files.length; i++ ){
                    let file = this.files[i];

                    formData.append('files[' + i + ']', file);
                }

                /*
                  Make the request to the POST /select-files URL
                */
                axios.post( '/select-files',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ).then(function(){
                    console.log('SUCCESS!!');
                })
                    .catch(function(){
                        console.log('FAILURE!!');
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
                console.log(this.files)
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
