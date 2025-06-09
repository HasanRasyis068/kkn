document.addEventListener('DOMContentLoaded', function() {
    const showMoreBtn = document.getElementById('showMoreBtn');
    const detailContent = document.getElementById('detailContent');

    if (showMoreBtn && detailContent) {
        showMoreBtn.addEventListener('click', function() {
            // Toggle the 'hidden' class to show/hide content
            detailContent.classList.toggle('hidden');

            // Change button text based on visibility
            if (detailContent.classList.contains('hidden')) {
                showMoreBtn.textContent = 'Lihat Manfaat & Kandungan';
            } else {
                showMoreBtn.textContent = 'Sembunyikan Detail';
            }
        });
    }
});