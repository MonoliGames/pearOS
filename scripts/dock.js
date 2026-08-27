document.addEventListener("DOMContentLoaded", () => {
    const icons = document.querySelectorAll(".dock .icon");

    const appInfo = [
        ["Browser", true, "./assets/browser.png", "hsl(0deg,0%,15%),hsl(0deg,0%,5%)", "hsl(0deg,0%,90%),hsl(0deg,0%,80%)", true],
        ["App #2", true, "", "hsl(0deg,0%,15%),hsl(0deg,0%,5%)", "hsl(0deg,0%,90%),hsl(0deg,0%,80%)", true],
        ["App #3", true, "", "hsl(0deg,0%,15%),hsl(0deg,0%,5%)", "hsl(0deg,0%,90%),hsl(0deg,0%,80%)", true],
        ["App #4", true, "", "hsl(0deg,0%,15%),hsl(0deg,0%,5%)", "hsl(0deg,0%,90%),hsl(0deg,0%,80%)", true],
        ["App #5", true, "", "hsl(0deg,0%,15%),hsl(0deg,0%,5%)", "hsl(0deg,0%,90%),hsl(0deg,0%,80%)", true],
        ["App #6", true, "", "hsl(0deg,0%,15%),hsl(0deg,0%,5%)", "hsl(0deg,0%,90%),hsl(0deg,0%,80%)", true],
        ["App #7", true, "", "hsl(0deg,0%,15%),hsl(0deg,0%,5%)", "hsl(0deg,0%,90%),hsl(0deg,0%,80%)", true],
        ["App #8", true, "", "hsl(0deg,0%,15%),hsl(0deg,0%,5%)", "hsl(0deg,0%,90%),hsl(0deg,0%,80%)", true],
        ["Trash", false, "./assets/trash.png", "hsl(0deg,0%,15%),hsl(0deg,0%,5%)", "hsl(0deg,0%,90%),hsl(0deg,0%,80%)", true]
    ];

    function lightImagePath(path) {
        if (!path) return path;

        // ./assets/browser.png
        // becomes
        // ./assets/browser-light.png
        return path.replace(/(\.[^./]+)$/, "-light$1");
    }

    function updateIcons() {
        // Light theme is the default.
        // Only use the dark version when data-theme="dark".
        const useLightTheme =
            document.documentElement.dataset.theme !== "dark";

        icons.forEach((icon, idx) => {
            const [
                name,
                bg,
                url,
                darkCol,
                lightCol,
                useLightImage
            ] = appInfo[idx];

            icon.style.setProperty(
                "--app-name",
                `"${name}"`
            );

            const backgrounds = [];
            const sizes = [];
            const positions = [];
            const repeats = [];

            /*
             * IMAGE
             */
            let imageUrl = url;

            if (useLightTheme && useLightImage && url) {
                imageUrl = lightImagePath(url);
            }

            if (imageUrl) {
                backgrounds.push(`url("${imageUrl}")`);
                sizes.push("70% 70%");
                positions.push("center");
                repeats.push("no-repeat");
            }

            /*
             * GRADIENT
             */
            if (bg) {
                const colors = useLightTheme
                    ? lightCol
                    : darkCol;

                backgrounds.push(
                    `radial-gradient(circle at 50% 20%, ${colors})`
                );

                sizes.push("100% 100%");
                positions.push("center");
                repeats.push("no-repeat");
            }

            /*
             * APPLY BACKGROUNDS
             */
            icon.style.backgroundImage =
                backgrounds.join(", ");

            icon.style.backgroundSize =
                sizes.join(", ");

            icon.style.backgroundPosition =
                positions.join(", ");

            icon.style.backgroundRepeat =
                repeats.join(", ");

            /*
             * SHADOW
             *
             * bg=false means no shadow.
             */
            if (!bg) {
                icon.style.setProperty(
                    "box-shadow",
                    "none",
                    "important"
                );

                icon.style.setProperty(
                    "-webkit-box-shadow",
                    "none",
                    "important"
                );
            } else {
                icon.style.removeProperty("box-shadow");
                icon.style.removeProperty("-webkit-box-shadow");
            }
        });
    }

    /*
     * INITIAL SETUP
     */
    updateIcons();

    /*
     * WATCH FOR THEME CHANGES
     *
     * This catches:
     *
     * data-theme="dark"
     * data-theme="light"
     * removing data-theme
     * changing data-theme to anything else
     */
    const themeObserver = new MutationObserver(() => {
        updateIcons();
    });

    themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"]
    });

    /*
     * DOCK MAGNIFICATION
     */
    const hoverTimers = new WeakMap();

    const reset = () => {
        icons.forEach(icon => {
            icon.style.transform =
                "scale(1) translateY(0)";

            icon.style.margin = "0";
        });
    };

    const magnify = index => {
        reset();

        [
            [-2, 1.1, 0, 11],
            [-1, 1.2, -10, 12],
            [0, 1.5, -18, 15],
            [1, 1.2, -10, 12],
            [2, 1.1, 0, 11]
        ].forEach(([offset, scale, y, margin]) => {
            const icon = icons[index + offset];

            if (icon) {
                icon.style.transform =
                    `scale(${scale}) translateY(${y * 1.2}px)`;

                icon.style.margin =
                    `0 ${margin}px`;
            }
        });
    };

    /*
     * HOVER EVENTS
     */
    icons.forEach((icon, index) => {
        icon.addEventListener("mouseenter", () => {
            magnify(index);

            const timer = setTimeout(() => {
                icon.classList.add("hovered");
            }, 1000);

            hoverTimers.set(icon, timer);
        });

        icon.addEventListener("mouseleave", () => {
            reset();

            const timer = hoverTimers.get(icon);

            if (timer) {
                clearTimeout(timer);
            }

            icon.classList.remove("hovered");
        });
    });
});