// Add a PDF to public/papers and an entry here to publish it.
// Keep slug unique and use a path relative to the Vite base, such as 'papers/example.pdf'.
// Example shape (do not publish placeholder metadata):
// { slug: 'paper-slug', title: 'Paper title', authors: 'Author name', date: '2026-09-27',
//   category: 'Sāṅkhya', language: 'English', abstract: 'Short abstract', pdf: 'papers/paper-slug.pdf' }
export const papers = [
  {
    slug: 'white-paper-upasana-english',
    title: 'White Paper on Upasana: Towards a New Age of Science',
    authors: 'Dr. Harish Chandra',
    date: '2024-03-28',
    category: 'Upāsanā',
    language: 'English',
    abstract: 'Dr. Harish Chandra examines Upasana through Sāṅkhya and Yoga, discusses the relationship between mind and consciousness, and presents a method of meditation and the vision of Mission Upasana.',
    pdf: 'papers/white-paper-upasana-english.pdf',
    relatedSlug: 'white-paper-upasana-hindi',
  },
  {
    slug: 'white-paper-upasana-hindi',
    title: 'उपासना पर श्वेतपत्र : सायंस के नये युग की ओर',
    authors: 'डॉ. हरिश्चन्द्र',
    date: '2024-03-28',
    category: 'Upāsanā',
    language: 'Hindi',
    abstract: 'डॉ. हरिश्चन्द्र सांख्य और योग के आलोक में उपासना, मन और चेतना के सम्बन्ध की चर्चा करते हैं तथा ध्यान-उपासना की विधि और मिशन उपासना की परिकल्पना प्रस्तुत करते हैं।',
    pdf: 'papers/white-paper-upasana-hindi.pdf',
    relatedSlug: 'white-paper-upasana-english',
  },
]
