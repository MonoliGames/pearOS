let showBoot = true;

function boot() {
    const bootScreen = document.querySelector('.boot-screen');
    if (!bootScreen) return;

    bootScreen
        .querySelector('.perms-text')
        ?.classList.toggle('hide');

    bootScreen
        .querySelector('.content')
        ?.classList.toggle('hide');

    bootScreen.classList.add('started');

    playBootChime();
}

document.addEventListener('DOMContentLoaded', () => {
    const bootScreen = document.querySelector('.boot-screen');

    if (!bootScreen) return;

    if (showBoot) {
        bootScreen.classList.remove('hide');

        document.addEventListener('keydown', boot, { once: true });
    } else {
        bootScreen.remove();
    }
});