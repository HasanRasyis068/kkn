document.addEventListener('DOMContentLoaded', function() {
    const carouselContainer = document.getElementById('carousel-container');
    const slides = document.querySelectorAll('.plant-slide');
    const prevButton = document.getElementById('prev-slide');
    const nextButton = document.getElementById('next-slide');
    const showDetailButtons = document.querySelectorAll('.show-details-btn');

    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;
    let scrollLeftInitial = 0;

    // Fungsi untuk menggulir ke slide tertentu
    function scrollToSlide(index) {
        if (slides.length === 0) return; // Pastikan ada slide
        const slideWidth = slides[0].offsetWidth; // Lebar satu slide
        carouselContainer.scrollLeft = slideWidth * index;
        currentIndex = index; // Update current index
    }

    // Fungsi untuk maju ke slide berikutnya
    function nextSlide() {
        if (currentIndex < slides.length - 1) {
            scrollToSlide(currentIndex + 1);
        }
    }

    // Fungsi untuk mundur ke slide sebelumnya
    function prevSlide() {
        if (currentIndex > 0) {
            scrollToSlide(currentIndex - 1);
        }
    }

    // Event listener untuk tombol navigasi
    if (prevButton) {
        prevButton.addEventListener('click', prevSlide);
    }
    if (nextButton) {
        nextButton.addEventListener('click', nextSlide);
    }

    // --- Fungsi Swipe (Touch and Mouse Drag) ---
    if (carouselContainer) {
        // Touch events for mobile swiping
        carouselContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            scrollLeftInitial = carouselContainer.scrollLeft;
            isDragging = true;
        });

        carouselContainer.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const currentX = e.touches[0].clientX;
            const walk = (currentX - startX); // Jarak drag
            carouselContainer.scrollLeft = scrollLeftInitial - walk;
        });

        carouselContainer.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;

            const slideWidth = slides[0].offsetWidth;
            const currentScroll = carouselContainer.scrollLeft;
            
            // Hitung slide terdekat setelah drag berakhir
            const targetIndex = Math.round(currentScroll / slideWidth);
            scrollToSlide(targetIndex);
        });

        // Mouse events for desktop dragging (optional)
        carouselContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            scrollLeftInitial = carouselContainer.scrollLeft;
            carouselContainer.style.cursor = 'grabbing';
            e.preventDefault(); // Mencegah drag gambar atau teks
        });

        carouselContainer.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const currentX = e.clientX;
            const walk = (currentX - startX) * 1.5; // Sesuaikan sensitivitas
            carouselContainer.scrollLeft = scrollLeftInitial - walk;
        });

        carouselContainer.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;
            carouselContainer.style.cursor = 'grab';

            const slideWidth = slides[0].offsetWidth;
            const currentScroll = carouselContainer.scrollLeft;
            const targetIndex = Math.round(currentScroll / slideWidth);
            scrollToSlide(targetIndex);
        });

        carouselContainer.addEventListener('mouseleave', () => {
            if (isDragging) {
                isDragging = false;
                carouselContainer.style.cursor = 'grab';

                const slideWidth = slides[0].offsetWidth;
                const currentScroll = carouselContainer.scrollLeft;
                const targetIndex = Math.round(currentScroll / slideWidth);
                scrollToSlide(targetIndex);
            }
        });
    }

    // --- Fungsi Toggle Detail untuk Setiap Slide ---
    showDetailButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Dapatkan elemen detail-content yang relevan dengan tombol ini
            const detailContent = this.nextElementSibling; // Asumsi detail-content adalah sibling berikutnya

            if (detailContent) {
                detailContent.classList.toggle('hidden');
                // Ubah teks tombol
                if (detailContent.classList.contains('hidden')) {
                    this.textContent = 'Lihat Manfaat & Kandungan';
                } else {
                    this.textContent = 'Sembunyikan Detail';
                }
            }
        });
    });

    // Sesuaikan lebar slide saat jendela diubah ukurannya
    window.addEventListener('resize', () => {
        if (slides.length > 0) {
            scrollToSlide(currentIndex); // Kembali ke slide saat ini setelah resize
        }
    });

    // Gulir ke slide pertama saat halaman dimuat
    if (slides.length > 0) {
        scrollToSlide(0);
    }
});