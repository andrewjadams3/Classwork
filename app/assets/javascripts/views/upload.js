App.WorksheetsNewView = Ember.View.extend({
  first_name: "steve",
  templateName: "teacherapp/upload",
  didInsertElement: function() {
    var router = this.get('controller.target.router');

    $('.image-processing').hide()

    $('#upload-button').click(function(e) {
      var files, formData, i
      e.preventDefault();

      $('#upload-button').replaceWith('<i class="fa fa-spinner fa-spin fa-2x"></i>')

      files = document.getElementById('file_path').files
      formData = new FormData();

      for (i = 0; i < files.length; i++) {
        var file = files[i];
        console.log(file)
        formData.append('file', file, file.name)
      }

      $.ajax('/upload/upload', {
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        dataType: 'json',
        success: function(params) {
          $('.thumbnail img').attr('src', "/" + params['filename'])
          $('input[name=filename]').val(params['filename'])
          $('.image-upload').hide()
          $('.image-processing').show()
        },
        error: function(response) {
          alert("The file could not be uploaded")
          console.log(response)
        }
      })
    })

    $('#submit-button').click(function(e) {
      e.preventDefault();

      $('#submit-button').replaceWith('<i class="fa fa-spinner fa-spin fa-2x"></i>')

      var data = {}
      data['name'] = $('input[name=name]').val()
      data['filename'] = $('input[name=filename]').val()
      data['rotation'] = $('input[name=rotation]:checked').val()

      console.log(data)

      $.ajax('/upload/process', {
        type: "POST",
        data: data,
        dataType: 'json',
        success: function(params) {
          router.transitionTo('worksheet.edit', params.id)
        },
        error: function(response) {
          alert("An error has occurred")
          console.log(response)
        }        
      })
    }); // upload finction

        
     var obj = $('.drop_image');

     obj.on('dragover', function(e){
        e.stopPropagation();
        e.preventDefault();
        $(this).css('border', "2px solid #3498db");
        console.log('drag')

     });

     obj.on('drop', function(e){
       e.stopPropagation();
       e.preventDefault();
       $(this).css('border', "2px dotted #3498db");

      var files = e.originalEvent.dataTransfer.files;
      var file = files[0];
      var formData = new FormData();


      formData.append('file', file, file.name)
    

      $.ajax('/upload/upload', {
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        dataType: 'json',
        success: function(params) {
          $('.thumbnail img').attr('src', "/" + params['filename'])
          $('input[name=filename]').val(params['filename'])
          $('.image-upload').hide()
          $('.image-processing').show()
        },
        error: function(response) {
          alert("The file could not be uploaded")
          console.log(response)
        }
      })
      
      


    }); // drop 

   } // action 
});
