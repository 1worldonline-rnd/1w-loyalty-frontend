export function toRGBA(color: string, opacity = 1) {
    let r, g, b;

    // Check if color is in hex format
    if (color[0] === '#') {
        // Check if the color is in short hex format
        if (color.length === 4) {
            // Convert short hex format to full hex format
            color = `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`;
        }
        r = parseInt(color.slice(1, 3), 16);
        g = parseInt(color.slice(3, 5), 16);
        b = parseInt(color.slice(5, 7), 16);
    } else {
        // If not, it's probably in rgb format
        // This is a basic check and might not cover all edge cases
        const parts = color.split(',');
        r = parseInt(parts[0].split('(')[1]);
        g = parseInt(parts[1]);
        b = parseInt(parts[2]);
    }

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
