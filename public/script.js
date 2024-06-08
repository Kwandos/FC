document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.getElementById('gallery');
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const closeModal = document.getElementById('close-modal');

    fetch('/images')
        .then(response => response.json())
        .then(images => {
            images.forEach(url => {
                const img = document.createElement('img');
                img.src = url;
                img.className = 'gallery-item';
                gallery.appendChild(img);

                img.onclick = () => {
                    modal.style.display = "flex";
                    modalImg.src = url;
                };
            });
        })
        .catch(err => {
            console.error('Error fetching images:', err);
        });

    closeModal.onclick = () => {
        modal.style.display = "none";
    };
});
