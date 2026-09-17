const famousSongsSeed = [
  {
    title: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
    genre: "Rock",
    releaseYear: 1975,
    durationSeconds: 354,
    viewsCount: 1600000000,
    ratings: [{ score: 5, user: "Alice" }, { score: 5, user: "Bob" }],
    averageRating: 5.0,
    isFamousClassic: true
  },
  {
    title: "Billie Jean",
    artist: "Michael Jackson",
    album: "Thriller",
    genre: "Pop",
    releaseYear: 1982,
    durationSeconds: 294,
    viewsCount: 1400000000,
    ratings: [{ score: 5, user: "Charlie" }, { score: 4, user: "Dave" }],
    averageRating: 4.5,
    isFamousClassic: true
  },
  {
    title: "Hotel California",
    artist: "Eagles",
    album: "Hotel California",
    genre: "Rock",
    releaseYear: 1976,
    durationSeconds: 391,
    viewsCount: 1200000000,
    ratings: [{ score: 5, user: "Eve" }],
    averageRating: 5.0,
    isFamousClassic: true
  },
  {
    title: "Smells Like Teen Spirit",
    artist: "Nirvana",
    album: "Nevermind",
    genre: "Grunge",
    releaseYear: 1991,
    durationSeconds: 301,
    viewsCount: 1700000000,
    ratings: [{ score: 5, user: "Frank" }, { score: 5, user: "Grace" }],
    averageRating: 5.0,
    isFamousClassic: true
  },
  {
    title: "Imagine",
    artist: "John Lennon",
    album: "Imagine",
    genre: "Rock",
    releaseYear: 1971,
    durationSeconds: 183,
    viewsCount: 500000000,
    ratings: [{ score: 5, user: "Heidi" }],
    averageRating: 5.0,
    isFamousClassic: true
  },
  {
    title: "Shape of You",
    artist: "Ed Sheeran",
    album: "÷ (Divide)",
    genre: "Pop",
    releaseYear: 2017,
    durationSeconds: 233,
    viewsCount: 6000000000,
    ratings: [{ score: 4, user: "Ivan" }],
    averageRating: 4.0,
    isFamousClassic: true
  },
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    genre: "Synthwave / Pop",
    releaseYear: 2019,
    durationSeconds: 200,
    viewsCount: 4000000000,
    ratings: [{ score: 5, user: "Judy" }],
    averageRating: 5.0,
    isFamousClassic: true
  },
  {
    title: "Stairway to Heaven",
    artist: "Led Zeppelin",
    album: "Led Zeppelin IV",
    genre: "Hard Rock",
    releaseYear: 1971,
    durationSeconds: 482,
    viewsCount: 300000000,
    ratings: [{ score: 5, user: "Kevin" }],
    averageRating: 5.0,
    isFamousClassic: true
  },
  {
    title: "Like a Rolling Stone",
    artist: "Bob Dylan",
    album: "Highway 61 Revisited",
    genre: "Folk Rock",
    releaseYear: 1965,
    durationSeconds: 373,
    viewsCount: 200000000,
    ratings: [{ score: 5, user: "Leo" }],
    averageRating: 5.0,
    isFamousClassic: true
  },
  {
    title: "Sweet Child O' Mine",
    artist: "Guns N' Roses",
    album: "Appetite for Destruction",
    genre: "Hard Rock",
    releaseYear: 1987,
    durationSeconds: 356,
    viewsCount: 1500000000,
    ratings: [{ score: 5, user: "Mia" }],
    averageRating: 5.0,
    isFamousClassic: true
  },
  {
    title: "Hey Jude",
    artist: "The Beatles",
    album: "Single",
    genre: "Rock",
    releaseYear: 1968,
    durationSeconds: 431,
    viewsCount: 500000000,
    ratings: [{ score: 5, user: "Noah" }],
    averageRating: 5.0,
    isFamousClassic: true
  },
  {
    title: "Smooth",
    artist: "Santana ft. Rob Thomas",
    album: "Supernatural",
    genre: "Latin Rock",
    releaseYear: 1999,
    durationSeconds: 298,
    viewsCount: 350000000,
    ratings: [{ score: 4, user: "Olivia" }],
    averageRating: 4.0,
    isFamousClassic: true
  },
  {
    title: "Rolling in the Deep",
    artist: "Adele",
    album: "21",
    genre: "Soul / Pop",
    releaseYear: 2010,
    durationSeconds: 228,
    viewsCount: 2200000000,
    ratings: [{ score: 5, user: "Paul" }],
    averageRating: 5.0,
    isFamousClassic: true
  },
  {
    title: "Uptown Funk",
    artist: "Mark Ronson ft. Bruno Mars",
    album: "Uptown Special",
    genre: "Funk / Pop",
    releaseYear: 2014,
    durationSeconds: 270,
    viewsCount: 4800000000,
    ratings: [{ score: 5, user: "Quinn" }],
    averageRating: 5.0,
    isFamousClassic: true
  },
  {
    title: "Thriller",
    artist: "Michael Jackson",
    album: "Thriller",
    genre: "Pop",
    releaseYear: 1982,
    durationSeconds: 357,
    viewsCount: 950000000,
    ratings: [{ score: 5, user: "Rachel" }],
    averageRating: 5.0,
    isFamousClassic: true
  }
];

const famousArtistsSeed = [
  { name: "Queen", country: "Reino Unido", formedYear: 1970, genre: "Rock", bio: "Banda británica legendaria liderada por Freddie Mercury." },
  { name: "Michael Jackson", country: "Estados Unidos", formedYear: 1964, genre: "Pop", bio: "El Rey del Pop, uno de los artistas más vendidos de la historia." },
  { name: "Eagles", country: "Estados Unidos", formedYear: 1971, genre: "Rock", bio: "Banda de rock clásico famosa por Hotel California." },
  { name: "Nirvana", country: "Estados Unidos", formedYear: 1987, genre: "Grunge", bio: "Pioneros del Grunge liderados por Kurt Cobain." },
  { name: "Ed Sheeran", country: "Reino Unido", formedYear: 2004, genre: "Pop", bio: "Cantautor británico récord en reproducciones globales." }
];

module.exports = { famousSongsSeed, famousArtistsSeed };
