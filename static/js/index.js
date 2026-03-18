window.HELP_IMPROVE_VIDEOJS = false;

// More Works Dropdown Functionality
function toggleMoreWorks() {
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');

    if (!dropdown || !button) return;

    if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    } else {
        dropdown.classList.add('show');
        button.classList.add('active');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const container = document.querySelector('.more-works-container');
    const dropdown = document.getElementById('moreWorksDropdown');
    const button = document.querySelector('.more-works-btn');

    if (!container || !dropdown || !button) return;

    if (!container.contains(event.target)) {
        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

// Close dropdown on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const dropdown = document.getElementById('moreWorksDropdown');
        const button = document.querySelector('.more-works-btn');

        if (!dropdown || !button) return;

        dropdown.classList.remove('show');
        button.classList.remove('active');
    }
});

// Copy BibTeX to clipboard
function copyBibTeX() {
    const bibtexElement = document.getElementById('bibtex-code');
    const button = document.querySelector('.copy-bibtex-btn');

    if (!bibtexElement || !button) return;

    const copyText = button.querySelector('.copy-text');

    navigator.clipboard.writeText(bibtexElement.textContent).then(function() {
        button.classList.add('copied');
        if (copyText) copyText.textContent = 'Copied';

        setTimeout(function() {
            button.classList.remove('copied');
            if (copyText) copyText.textContent = 'Copy';
        }, 2000);
    }).catch(function(err) {
        console.error('Failed to copy: ', err);

        const textArea = document.createElement('textarea');
        textArea.value = bibtexElement.textContent;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        button.classList.add('copied');
        if (copyText) copyText.textContent = 'Copied';

        setTimeout(function() {
            button.classList.remove('copied');
            if (copyText) copyText.textContent = 'Copy';
        }, 2000);
    });
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (!scrollButton) return;

    if (window.pageYOffset > 300) {
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }
});

// Video carousel autoplay when in view
function setupVideoCarouselAutoplay() {
    const carouselVideos = document.querySelectorAll('.results-carousel video');

    if (carouselVideos.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                video.play().catch(e => {
                    console.log('Autoplay prevented:', e);
                });
            } else {
                video.pause();
            }
        });
    }, {
        threshold: 0.5
    });

    carouselVideos.forEach(video => {
        observer.observe(video);
    });
}

$(document).ready(function() {
    var options = {
        slidesToScroll: 1,
        slidesToShow: 1,
        loop: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    bulmaCarousel.attach('.carousel', options);
    bulmaSlider.attach();
    setupVideoCarouselAutoplay();
});

document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("demoVideo");
    const task = document.getElementById("task");
    const direction = document.getElementById("direction");
    const status = document.getElementById("status");

    if (!video || !task || !direction || !status) {
        console.log("Experiment video controls not found.");
        return;
    }

    function updateVideo() {
        const videoPath = `static/videos/${task.value}_${direction.value}_${status.value}_web.mp4`;
        console.log("Loading video:", videoPath);

        video.src = videoPath;
        video.load();

        video.play().catch((err) => {
            console.log("Autoplay blocked or failed:", err);
        });
    }

    task.addEventListener("change", updateVideo);
    direction.addEventListener("change", updateVideo);
    status.addEventListener("change", updateVideo);

    updateVideo();
});



document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("demo");
    const task = document.getElementById("demo-task");

    if (!video || !task) {
        console.log("Demo video controls not found.");
        return;
    }

    function updateDemoVideo() {
        const videoPath = `static/videos/${task.value}_demo_web.mp4`;
        console.log("Loading video:", videoPath);

        video.src = videoPath;
        video.load();

        video.play().catch((err) => {
            console.log("Autoplay blocked or failed:", err);
        });
    }

    task.addEventListener("change", updateDemoVideo);

    updateDemoVideo();
});


document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("novelObjectVideo");
  const videoContainer = document.getElementById("novelVideoContainer");
  const explanationBox = document.getElementById("novelExplanationBox");
  const task = document.getElementById("novel-task");
  const direction = document.getElementById("novel-direction");

  if (!video || !videoContainer || !explanationBox || !task || !direction) {
    console.log("Novel object video controls not found.");
    return;
  }

  function updateNovelVideo() {
    const selectedTask = task.value;
    const selectedDirection = direction.value;

    if (selectedTask === "key" && selectedDirection === "reverse") {
      video.pause();
      video.removeAttribute("src");
      video.load();

      videoContainer.style.display = "none";
      explanationBox.style.display = "block";
      return;
    }

    const videoPath = `static/videos/${selectedTask}_${selectedDirection}_novel_web.mp4`;

    explanationBox.style.display = "none";
    videoContainer.style.display = "block";

    video.src = videoPath;
    video.load();

    video.play().catch((err) => {
      console.log("Autoplay blocked or failed:", err);
    });
  }

  task.addEventListener("change", updateNovelVideo);
  direction.addEventListener("change", updateNovelVideo);

  updateNovelVideo();
});
