$(document).ready(function () {
    // This function runs when the DOM is ready

    // Select all elements with the class 'summernote-editor' and initialize Summernote on them
    $('.summernote-editor').summernote({
        height: 800, // Set the height of the editor to 800 pixels
        // You can add more configuration options for Summernote here if needed
    });
});
