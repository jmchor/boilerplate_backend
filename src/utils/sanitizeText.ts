import sanitizeHtml from 'sanitize-html';

export const sanitizeText = (text: string) => {
	return sanitizeHtml(text, {
		allowedTags: ['h1', 'h2', 'h3', 'b', 'a', 'ul', 'ol', 'i', 'li', 'p', 'br', 'strong'],
		allowedAttributes: { a: ['href', 'name', 'target'] },
		allowedSchemes: ['http', 'https', 'ftp', 'mailto', 'tel'],
	});
};
