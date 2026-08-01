function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", function () {
    const video = document.querySelector(".hero-video");
    if (!video) return;

    let loaded = false;
    let isInView = false;

    function playWhenVisible() {
        if (!loaded) {
            video.load();
            loaded = true;
        }
        video.play().catch(function () {});
    }

    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                isInView = entry.isIntersecting;
                if (entry.isIntersecting) {
                    playWhenVisible();
                } else {
                    video.pause();
                }
            });
        },
        { threshold: 0.4 }
    );

    observer.observe(video);

    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            video.pause();
        } else if (isInView) {
            playWhenVisible();
        }
    });
});