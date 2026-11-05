import lottie from "lottie-web";

export function setupLottie(id, path) {

    const container = document.getElementById(id);

    if (!container) {
        return;
    }

    const animation = lottie.loadAnimation({
        container,
        renderer: "svg",
        loop: true,
        autoplay: false,
        path
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    animation.play();
                } else {
                    animation.pause();
                }

            });
        },
        {
            threshold: 0.2
        }
    );

    observer.observe(container);

    document.addEventListener("visibilitychange", () => {

        if (document.hidden) {
            animation.pause();
        } else if (container.getBoundingClientRect().top < window.innerHeight) {
            animation.play();
        }

    });

    return animation;
}