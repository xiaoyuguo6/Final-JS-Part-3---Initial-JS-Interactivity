document.addEventListener('DOMContentLoaded', () => {
    const themeButtons = document.querySelectorAll('.theme-btn');

    // Default theme
    let currentTheme = 'spring';
    document.body.classList.add(`theme-${currentTheme}`);

    // Theme Switching
    themeButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            // Remove the current theme
            document.body.classList.remove(`theme-${currentTheme}`);

            // Get new theme from button class
            currentTheme = btn.classList[1]; // 'spring', 'summer', 'autumn', or 'winter'

            // Apply new theme
            document.body.classList.add(`theme-${currentTheme}`);
        });
    });
});
