
const imgDiv = document.querySelector('.profile-pic-div');
const img = document.querySelector('.immagine-profilo');
const file = document.querySelector('#file-immagine');
const uploadBtn = document.querySelector('#uploadBtn');

// if user hover on profile div

imgDiv.addEventListener('mouseenter', function()
{
    uploadBtn.style.display = "block"
});