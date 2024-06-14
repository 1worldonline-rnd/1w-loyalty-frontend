export function sanitizeHTML(input: string): string {
    const temp = document.createElement('div');
    temp.innerHTML = input;
    const sanitized = temp.textContent || temp.innerText || '';
    return sanitized.replace(/[\r\n]+/gm, '').trim();
}
