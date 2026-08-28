document.addEventListener("DOMContentLoaded", () => {

    const windowsContainer =
        document.querySelector(".windows");

    const dock =
        document.querySelector(".dock");

    let highestZIndex = 100;

    const MIN_WIDTH = 300;
    const MIN_HEIGHT = 200;

    function getDockTop() {

        if (!dock) {
            return window.innerHeight;
        }

        return dock.getBoundingClientRect().top;
    }

    function focusWindow(windowEl) {

        highestZIndex++;

        windowEl.style.zIndex =
            highestZIndex;
    }

    function clampPosition(windowEl) {

        const rect =
            windowEl.getBoundingClientRect();

        const dockTop =
            getDockTop();


        let left =
            rect.left;

        let top =
            rect.top;


        const maxLeft =
            Math.max(
                0,
                window.innerWidth -
                rect.width
            );


        const maxTop =
            Math.max(
                0,
                dockTop -
                rect.height
            );


        left =
            Math.max(
                0,
                Math.min(
                    maxLeft,
                    left
                )
            );


        top =
            Math.max(
                0,
                Math.min(
                    maxTop,
                    top
                )
            );


        windowEl.style.left =
            `${left}px`;

        windowEl.style.top =
            `${top}px`;
    }

    function minimizeWindow(windowEl) {

        const app =
            windowEl.dataset.app;

        const icon =
            document.querySelector(
                `.dock .icon[data-app="${app}"]`
            );

        const rect =
            windowEl.getBoundingClientRect();


        windowEl.dataset.savedLeft =
            `${rect.left}px`;

        windowEl.dataset.savedTop =
            `${rect.top}px`;

        windowEl.dataset.savedWidth =
            `${rect.width}px`;

        windowEl.dataset.savedHeight =
            `${rect.height}px`;


        if (!icon) {

            windowEl.style.display =
                "none";

            windowEl.dataset.hidden =
                "true";

            return;
        }


        const iconRect =
            icon.getBoundingClientRect();


        const windowCenterX =
            rect.left +
            rect.width / 2;

        const windowCenterY =
            rect.top +
            rect.height / 2;


        const iconCenterX =
            iconRect.left +
            iconRect.width / 2;

        const iconCenterY =
            iconRect.top +
            iconRect.height / 2;


        const translateX =
            iconCenterX -
            windowCenterX;

        const translateY =
            iconCenterY -
            windowCenterY;

        windowEl.style.transition =
            "transform 0.35s cubic-bezier(.2,.8,.2,1), opacity 0.35s ease";

        windowEl.style.transform =
            `translate(${translateX}px, ${translateY}px) scale(0.08)`;

        windowEl.style.opacity =
            "0";


        setTimeout(() => {

            windowEl.style.display =
                "none";

            windowEl.style.transition =
                "";

            windowEl.style.transform =
                "";

            windowEl.style.opacity =
                "";

            windowEl.dataset.hidden =
                "true";

        }, 350);
    }

    function openWindow(windowEl, icon) {

        const hasSavedGeometry =
            windowEl.dataset.savedLeft &&
            windowEl.dataset.savedTop &&
            windowEl.dataset.savedWidth &&
            windowEl.dataset.savedHeight;


        if (hasSavedGeometry) {

            windowEl.style.left =
                windowEl.dataset.savedLeft;

            windowEl.style.top =
                windowEl.dataset.savedTop;

            windowEl.style.width =
                windowEl.dataset.savedWidth;

            windowEl.style.height =
                windowEl.dataset.savedHeight;

        }

        windowEl.style.display =
            "block";

        windowEl.dataset.hidden =
            "false";

        clampPosition(windowEl);

        focusWindow(windowEl);


        if (!icon) {
            return;
        }

        const iconRect =
            icon.getBoundingClientRect();

        const windowRect =
            windowEl.getBoundingClientRect();


        const windowCenterX =
            windowRect.left +
            windowRect.width / 2;

        const windowCenterY =
            windowRect.top +
            windowRect.height / 2;


        const iconCenterX =
            iconRect.left +
            iconRect.width / 2;

        const iconCenterY =
            iconRect.top +
            iconRect.height / 2;


        const translateX =
            iconCenterX -
            windowCenterX;

        const translateY =
            iconCenterY -
            windowCenterY;

        windowEl.style.transition =
            "none";

        windowEl.style.transform =
            `translate(${translateX}px, ${translateY}px) scale(0.08)`;

        windowEl.style.opacity =
            "0";

        windowEl.getBoundingClientRect();

        requestAnimationFrame(() => {

            windowEl.style.transition =
                "transform 0.35s cubic-bezier(.2,.8,.2,1), opacity 0.25s ease";

            windowEl.style.transform =
                "scale(1)";

            windowEl.style.opacity =
                "1";


            setTimeout(() => {

                windowEl.style.transition =
                    "";

                windowEl.style.transform =
                    "";

                windowEl.style.opacity =
                    "";

            }, 350);

        });
    }

    function closeWindow(windowEl) {

        const rect =
            windowEl.getBoundingClientRect();

        windowEl.dataset.savedLeft =
            `${rect.left}px`;

        windowEl.dataset.savedTop =
            `${rect.top}px`;

        windowEl.dataset.savedWidth =
            `${rect.width}px`;

        windowEl.dataset.savedHeight =
            `${rect.height}px`;


        windowEl.style.transition =
            "transform 0.18s ease, opacity 0.18s ease";

        windowEl.style.transform =
            "scale(0.95)";

        windowEl.style.opacity =
            "0";


        setTimeout(() => {

            windowEl.style.display =
                "none";

            windowEl.style.transition =
                "";

            windowEl.style.transform =
                "";

            windowEl.style.opacity =
                "";

            windowEl.dataset.hidden =
                "true";

        }, 180);
    }

    function registerWindow(windowEl) {

        if (
            windowEl.dataset.initialized ===
            "true"
        ) {
            return;
        }

        windowEl.dataset.initialized =
            "true";


        const controls =
            windowEl.querySelector(".controls");

        const closeButton =
            windowEl.querySelector(".close");

        const minimizeButton =
            windowEl.querySelector(".minimize");

        const maximizeButton =
            windowEl.querySelector(".maximize");

        windowEl.addEventListener(
            "mousedown",
            () => {

                focusWindow(windowEl);

            }
        );


        windowEl.addEventListener(
            "focusWindow",
            () => {

                focusWindow(windowEl);

            }
        );

        if (closeButton) {

            closeButton.addEventListener(
                "click",
                (e) => {

                    e.stopPropagation();

                    closeWindow(windowEl);

                }
            );

        }

        if (minimizeButton) {

            minimizeButton.addEventListener(
                "click",
                (e) => {

                    e.stopPropagation();

                    minimizeWindow(windowEl);

                }
            );

        }

        if (maximizeButton) {

            maximizeButton.addEventListener(
                "click",
                (e) => {

                    e.stopPropagation();

                    if (
                        windowEl.dataset.maximized ===
                        "true"
                    ) {

                        windowEl.style.left =
                            windowEl.dataset.savedLeft;

                        windowEl.style.top =
                            windowEl.dataset.savedTop;

                        windowEl.style.width =
                            windowEl.dataset.savedWidth;

                        windowEl.style.height =
                            windowEl.dataset.savedHeight;


                        windowEl.dataset.maximized =
                            "false";


                        clampPosition(
                            windowEl
                        );

                        focusWindow(
                            windowEl
                        );

                        return;
                    }

                    const rect =
                        windowEl.getBoundingClientRect();


                    windowEl.dataset.savedLeft =
                        `${rect.left}px`;

                    windowEl.dataset.savedTop =
                        `${rect.top}px`;

                    windowEl.dataset.savedWidth =
                        `${rect.width}px`;

                    windowEl.dataset.savedHeight =
                        `${rect.height}px`;

                    windowEl.dataset.maximized =
                        "true";


                    windowEl.style.left =
                        "0px";

                    windowEl.style.top =
                        "0px";

                    windowEl.style.width =
                        `${window.innerWidth}px`;

                    windowEl.style.height =
                        `${getDockTop()}px`;

                    focusWindow(
                        windowEl
                    );

                }
            );

        }

if (controls) {

    let dragging = false;

    let grabOffsetX = 0;
    let grabOffsetY = 0;


    controls.addEventListener("mousedown", (e) => {

        if (e.target.closest("button")) {
            return;
        }

        if (windowEl.dataset.maximized === "true") {
            return;
        }

        if (windowEl.dataset.animating === "true") {
            return;
        }

        dragging = true;

        windowEl.style.transition = "none";
        windowEl.style.transform = "none";

        const windowRect =
            windowEl.getBoundingClientRect();

        const containerRect =
            windowsContainer.getBoundingClientRect();

        grabOffsetX =
            e.clientX -
            windowRect.left;

        grabOffsetY =
            e.clientY -
            windowRect.top;

        focusWindow(windowEl);

        document.addEventListener(
            "mousemove",
            drag
        );

        document.addEventListener(
            "mouseup",
            stopDrag
        );

        e.preventDefault();

    });


    function drag(e) {

        if (!dragging) {
            return;
        }

        const windowRect =
            windowEl.getBoundingClientRect();

        const containerRect =
            windowsContainer.getBoundingClientRect();

        let left =
            e.clientX -
            containerRect.left -
            grabOffsetX;

        let top =
            e.clientY -
            containerRect.top -
            grabOffsetY;

        const dockTop =
            getDockTop() -
            containerRect.top;

        left = Math.max(
            0,
            left
        );

        left = Math.min(
            containerRect.width -
            windowRect.width,
            left
        );

        top = Math.max(
            0,
            top
        );

        top = Math.min(
            dockTop -
            windowRect.height,
            top
        );

        windowEl.style.left =
            `${left}px`;

        windowEl.style.top =
            `${top}px`;

    }


    function stopDrag() {

        if (!dragging) {
            return;
        }

        dragging = false;

        windowEl.style.transition = "";

        document.removeEventListener(
            "mousemove",
            drag
        );

        document.removeEventListener(
            "mouseup",
            stopDrag
        );

    }

}

        const resizeHandle =
            document.createElement("div");


        resizeHandle.className =
            "window-resize-handle";


        windowEl.appendChild(
            resizeHandle
        );


        let resizing = false;

        let startX = 0;
        let startY = 0;

        let startWidth = 0;
        let startHeight = 0;


        resizeHandle.addEventListener(
            "mousedown",
            (e) => {

                if (
                    windowEl.dataset.maximized ===
                    "true"
                ) {
                    return;
                }


                const rect =
                    windowEl.getBoundingClientRect();


                resizing = true;


                startX =
                    e.clientX;

                startY =
                    e.clientY;

                startWidth =
                    rect.width;

                startHeight =
                    rect.height;

                windowEl.style.transition =
                    "none";


                focusWindow(
                    windowEl
                );


                document.addEventListener(
                    "mousemove",
                    resize
                );

                document.addEventListener(
                    "mouseup",
                    stopResize
                );


                e.preventDefault();

                e.stopPropagation();

            }
        );


        function resize(e) {

            if (!resizing) {
                return;
            }


            const rect =
                windowEl.getBoundingClientRect();


            const dockTop =
                getDockTop();


            const deltaX =
                e.clientX -
                startX;

            const deltaY =
                e.clientY -
                startY;


            const maxWidth =
                window.innerWidth -
                rect.left;


            const maxHeight =
                dockTop -
                rect.top;


            let width =
                startWidth +
                deltaX;

            let height =
                startHeight +
                deltaY;


            width =
                Math.max(
                    MIN_WIDTH,
                    Math.min(
                        maxWidth,
                        width
                    )
                );


            height =
                Math.max(
                    MIN_HEIGHT,
                    Math.min(
                        maxHeight,
                        height
                    )
                );


            windowEl.style.width =
                `${width}px`;

            windowEl.style.height =
                `${height}px`;

        }


        function stopResize() {

            if (!resizing) {
                return;
            }


            resizing = false;


            windowEl.style.transition =
                "";


            document.removeEventListener(
                "mousemove",
                resize
            );

            document.removeEventListener(
                "mouseup",
                stopResize
            );

        }

    }

    document
        .querySelectorAll(".window")
        .forEach(registerWindow);

    function createWindow(app) {

        const windowEl =
            document.createElement("div");


        windowEl.className =
            "window";


        windowEl.dataset.app =
            app;


        windowEl.dataset.hidden =
            "true";


        windowEl.innerHTML = `
            <div class="controls">
                <div class="left">
                    <button class="close"></button>
                    <button class="minimize"></button>
                    <button class="maximize"></button>
                </div>
            </div>

            <div class="window-content"></div>
        `;


        windowsContainer.appendChild(
            windowEl
        );

        windowEl.style.position =
            "absolute";

        windowEl.style.width =
            "600px";

        windowEl.style.height =
            "400px";

        windowEl.style.left =
            `${Math.max(
                0,
                (window.innerWidth - 600) / 2
            )}px`;

        windowEl.style.top =
            `${Math.max(
                0,
                (getDockTop() - 400) / 2
            )}px`;


        registerWindow(
            windowEl
        );


        return windowEl;
    }

    function openApp(app, icon) {

        let windowEl =
            document.querySelector(
                `.window[data-app="${app}"]`
            );

        if (!windowEl) {

            windowEl =
                createWindow(app);

        }

        openWindow(
            windowEl,
            icon
        );


        return windowEl;
    }

    window.pearOS = {

        focusWindow,
        minimizeWindow,
        closeWindow,
        openWindow,
        openApp,
        createWindow,
        clampPosition

    };

});