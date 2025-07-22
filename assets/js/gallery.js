document.addEventListener('DOMContentLoaded', function() {
    (function() {
        const mainInner = document.querySelector('#main .inner');
        if (!mainInner) {
            console.log('Gallery script: #main .inner not found.');
            return;
        }

        const gallerySection = document.createElement('section');
        gallerySection.className = 'photo-gallery-section';
        const galleryHeader = document.createElement('header');
        galleryHeader.className = 'major';
        const galleryTitle = document.createElement('h2');
        galleryTitle.textContent = 'Photo Gallery';
        galleryHeader.appendChild(galleryTitle);

        const galleryDiv = document.createElement('div');
        galleryDiv.id = 'gallery';

        gallerySection.appendChild(galleryHeader);
        gallerySection.appendChild(galleryDiv);

        const seeMoreLink = document.createElement('a');
        seeMoreLink.href = '/photos'; // The user can change this URL if needed
        seeMoreLink.textContent = 'See more...';
        seeMoreLink.className = 'button gallery-see-more'; // Using an existing theme class for styling
        gallerySection.appendChild(seeMoreLink);

        const recentPostsSection = mainInner.querySelector('section');
        if (recentPostsSection) {
            mainInner.insertBefore(gallerySection, recentPostsSection);
        } else {
            mainInner.appendChild(gallerySection);
        }

        const apiUrl = 'https://www.habbo.com/extradata/public/users/hhus-3fd67feba0fdf3a9e911756833cd039f/photos';

        function grabPicture(amount = 5) {
            fetch(apiUrl)
                .then(function(response) { return response.json(); })
                .then(function(data) {
                    const picturesArray = Object.values(data).slice(0, amount);
                    displayPictures(picturesArray);
                })
                .catch(function(error) { 
                    console.error('Error fetching pictures:', error); 
                    galleryDiv.innerHTML = 'Failed to load gallery.';
                });
        }

        function displayPictures(pictures) {
            galleryDiv.innerHTML = '';
            pictures.forEach(function(picture) {
                const img = document.createElement('img');
                img.src = picture.url.startsWith('http') ? picture.url : 'https:' + picture.url;
                img.alt = picture.title || 'Habbo Photo';
                img.className = 'gallery-photo';

                galleryDiv.appendChild(img);
            });
        }

        grabPicture();
    })();
});
