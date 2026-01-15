export const sr = {
  // Language info
  languageName: 'Srpski',
  languageCode: 'sr',

  // Navigation
  nav: {
    home: 'Pocetna',
    memorials: 'Memorijali',
    obituaries: 'Umrlice',
    login: 'Prijava',
    register: 'Registracija',
    profile: 'Profil',
    logout: 'Odjava',
    myProfile: 'Moj profil',
  },

  // Common
  common: {
    loading: 'Ucitavanje...',
    save: 'Sacuvaj',
    cancel: 'Otkazi',
    delete: 'Obrisi',
    edit: 'Izmeni',
    create: 'Kreiraj',
    back: 'Nazad',
    next: 'Dalje',
    submit: 'Posalji',
    search: 'Pretrazi',
    filter: 'Filtriraj',
    all: 'Sve',
    none: 'Nista',
    yes: 'Da',
    no: 'Ne',
    close: 'Zatvori',
    confirm: 'Potvrdi',
    required: 'Obavezno',
    optional: 'Opciono',
  },

  // Auth
  auth: {
    email: 'Email adresa',
    password: 'Lozinka',
    confirmPassword: 'Potvrdi lozinku',
    fullName: 'Puno ime',
    loginTitle: 'Prijava',
    registerTitle: 'Registracija',
    loginButton: 'Prijavi se',
    registerButton: 'Registruj se',
    noAccount: 'Nemate nalog?',
    hasAccount: 'Vec imate nalog?',
    forgotPassword: 'Zaboravili ste lozinku?',
    invalidCredentials: 'Pogresna email adresa ili lozinka',
    passwordMismatch: 'Lozinke se ne poklapaju',
    passwordTooShort: 'Lozinka mora imati najmanje 6 karaktera',
    emailInvalid: 'Unesite ispravnu email adresu',
  },

  // Memorial
  memorial: {
    title: 'Memorijal',
    create: 'Kreiraj memorijal',
    edit: 'Izmeni memorijal',
    firstName: 'Ime',
    lastName: 'Prezime',
    dateOfBirth: 'Datum rodjenja',
    dateOfDeath: 'Datum smrti',
    placeOfBirth: 'Mesto rodjenja',
    placeOfDeath: 'Mesto smrti',
    fatherName: 'Ime oca',
    motherName: 'Ime majke',
    biography: 'Biografija',
    gallery: 'Galerija',
    comments: 'Komentari',
    gifts: 'Pokloni',
    noMemorials: 'Nema memorijala za prikaz',
    createFirst: 'Kreirajte prvi memorijal',
    viewAll: 'Pogledaj sve memorijale',
    yearsOld: 'godina',
  },

  // Obituary
  obituary: {
    title: 'Umrlica',
    create: 'Kreiraj umrlicu',
    funeralDetails: 'Detalji sahrane',
    funeralDate: 'Datum sahrane',
    funeralTime: 'Vreme sahrane',
    funeralLocation: 'Lokacija',
    funeralAddress: 'Adresa',
    funeralNotes: 'Napomene',
    donations: 'Donacije',
    donationGoal: 'Cilj donacije',
    donationRaised: 'Prikupljeno',
    donate: 'Doniraj',
    noObituaries: 'Nema umrlica za prikaz',
    publishObituary: 'Objavi umrlicu',
    saveDraft: 'Sacuvaj kao nacrt',
  },

  // Living Profile
  livingProfile: {
    title: 'Moj zivotni profil',
    create: 'Kreiraj zivotni profil',
    description: 'Pripremite vas memorijal dok ste jos zivi',
    familyMembers: 'Clanovi porodice',
    addFamily: 'Dodaj clana porodice',
    secretPhrase: 'Tajna fraza',
    activate: 'Aktiviraj memorijal',
    activationWarning: 'Aktivacija memorijala je nepovratna akcija',
    status: {
      draft: 'Nacrt',
      active: 'Aktivan',
      converted: 'Konvertovan',
    },
    relationship: {
      spouse: 'Suprug/a',
      child: 'Dete',
      sibling: 'Brat/sestra',
      parent: 'Roditelj',
      other: 'Drugo',
    },
  },

  // Comments
  comments: {
    title: 'Komentari',
    write: 'Napisi komentar',
    yourName: 'Vase ime',
    yourMessage: 'Vasa poruka',
    anonymous: 'Anonimno',
    pending: 'Na cekanju',
    approved: 'Odobren',
    rejected: 'Odbijen',
    noComments: 'Nema komentara',
    beFirst: 'Budite prvi koji ce ostaviti komentar',
  },

  // Gifts
  gifts: {
    title: 'Virtuelni pokloni',
    sendGift: 'Posalji poklon',
    candle: 'Sveca',
    flower: 'Cvet',
    wreath: 'Venac',
    cross: 'Krst',
    message: 'Poruka',
    from: 'Od',
  },

  // Errors
  errors: {
    generic: 'Doslo je do greske. Pokusajte ponovo.',
    notFound: 'Stranica nije pronadena',
    unauthorized: 'Nemate dozvolu za ovu akciju',
    networkError: 'Greska u mreznoj komunikaciji',
    validationError: 'Proverite unete podatke',
  },

  // Home
  home: {
    heroTitle: 'Sacuvajte uspomene na vase najdraže',
    heroSubtitle: 'Digitalna memorijalna platforma za cuvanje uspomena na preminule',
    getStarted: 'Zapocnite',
    learnMore: 'Saznajte vise',
    recentMemorials: 'Nedavni memorijali',
    features: {
      memorials: 'Kreirajte memorijale',
      obituaries: 'Objavite umrlice',
      donations: 'Prikupljajte donacije',
      gifts: 'Posaljite virtuelne poklone',
    },
  },
}

export type TranslationKeys = typeof sr
