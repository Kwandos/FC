document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById("modal");
    var modalImg = document.getElementById("modal-img");
    var close = document.getElementsByClassName("close")[0];

    document.querySelectorAll('.gallery-item img').forEach(function(img) {
        img.addEventListener('click', function() {
            modal.style.display = "block";
            modalImg.src = this.src;
        });
    });

    close.onclick = function() {
        modal.style.display = "none";
    };

    modal.onclick = function() {
        modal.style.display = "none";
    };
});
