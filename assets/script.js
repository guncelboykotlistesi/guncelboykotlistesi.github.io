// JSON verisini harici bir dosyadan çekmek ve listeleme işlemi
const renderBrands = () => {
    const brandList = document.getElementById('brandList');

    fetch('./assets/brands.json')
        .then(response => response.json())
        .then(brands => {
            // Verileri sıralayıp listeleme
            brands.sort((a, b) => a.name.localeCompare(b.name));

            // JSON'daki markaları döngü ile eklemek
            brands.forEach(brand => {
                const brandCard = document.createElement('div');
                brandCard.classList.add('brand-card', 'flex', 'items-center', 'bg-gray-800', 'border', 'border-gray-700', 'rounded-lg', 'shadow-sm');
                brandCard.setAttribute('data-type', brand.type);

                const brandImage = document.createElement('img');
                brandImage.classList.add('object-fit', 'w-24', 'h-24', 'rounded-s-lg');
                brandImage.src = brand.logo;
                brandImage.alt = brand.name;

                const brandName = document.createElement('h5');
                brandName.classList.add('text-xl', 'font-bold', 'text-white');
                brandName.textContent = brand.name;

                const boycottTag = document.createElement('span');
                if (brand.status === 1) {
                    boycottTag.classList.add('text-red-500', 'text-xs', 'font-thin');
                    boycottTag.textContent = 'Kesin boykot markasıdır!';
                } else if (brand.status === 0) {
                    boycottTag.classList.add('text-orange-500', 'text-xs', 'font-thin');
                    boycottTag.textContent = 'Boykot olduğu kesin değil!';
                }

                const cardContent = document.createElement('div');
                cardContent.classList.add('p-4', 'flex-1');
                cardContent.appendChild(brandName);
                cardContent.appendChild(boycottTag);

                brandCard.appendChild(brandImage);
                brandCard.appendChild(cardContent);

                brandList.appendChild(brandCard);
            });
        })
        .catch(error => console.error('Veri çekme hatası:', error));
};


// Arama işlemi
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => {
    const searchValue = searchInput.value.toLowerCase().trim();
    const brandCards = document.querySelectorAll('.brand-card');

    brandCards.forEach(card => {
        const brandName = card.querySelector('h5').textContent.toLowerCase();
        if (brandName.includes(searchValue) || searchValue === '') {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
});

// Filtreleme işlemi
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedFilter = button.getAttribute('data-filter');
        const brandCards = document.querySelectorAll('.brand-card');

        brandCards.forEach(card => {
            const brandType = card.getAttribute('data-type');
            if (selectedFilter === 'all' || selectedFilter === brandType) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// Sayfa yüklendiğinde markaları oluştur
document.addEventListener('DOMContentLoaded', renderBrands);