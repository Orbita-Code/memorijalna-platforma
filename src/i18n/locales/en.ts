import type { TranslationKeys } from './sr'

export const en: TranslationKeys = {
  // Language info
  languageName: 'English',
  languageCode: 'en',

  // Navigation
  nav: {
    home: 'Home',
    memorials: 'Memorials',
    obituaries: 'Obituaries',
    login: 'Login',
    register: 'Register',
    profile: 'Profile',
    logout: 'Logout',
    myProfile: 'My Profile',
  },

  // Common
  common: {
    loading: 'Loading...',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    create: 'Create',
    back: 'Back',
    next: 'Next',
    submit: 'Submit',
    search: 'Search',
    filter: 'Filter',
    all: 'All',
    none: 'None',
    yes: 'Yes',
    no: 'No',
    close: 'Close',
    confirm: 'Confirm',
    required: 'Required',
    optional: 'Optional',
  },

  // Auth
  auth: {
    email: 'Email address',
    password: 'Password',
    confirmPassword: 'Confirm password',
    fullName: 'Full name',
    loginTitle: 'Login',
    registerTitle: 'Register',
    loginButton: 'Sign in',
    registerButton: 'Sign up',
    noAccount: "Don't have an account?",
    hasAccount: 'Already have an account?',
    forgotPassword: 'Forgot password?',
    invalidCredentials: 'Invalid email or password',
    passwordMismatch: 'Passwords do not match',
    passwordTooShort: 'Password must be at least 6 characters',
    emailInvalid: 'Please enter a valid email address',
  },

  // Memorial
  memorial: {
    title: 'Memorial',
    create: 'Create Memorial',
    edit: 'Edit Memorial',
    firstName: 'First name',
    lastName: 'Last name',
    dateOfBirth: 'Date of birth',
    dateOfDeath: 'Date of death',
    placeOfBirth: 'Place of birth',
    placeOfDeath: 'Place of death',
    fatherName: "Father's name",
    motherName: "Mother's name",
    biography: 'Biography',
    gallery: 'Gallery',
    comments: 'Comments',
    gifts: 'Gifts',
    noMemorials: 'No memorials to display',
    createFirst: 'Create the first memorial',
    viewAll: 'View all memorials',
    yearsOld: 'years old',
  },

  // Obituary
  obituary: {
    title: 'Obituary',
    create: 'Create Obituary',
    funeralDetails: 'Funeral Details',
    funeralDate: 'Funeral date',
    funeralTime: 'Funeral time',
    funeralLocation: 'Location',
    funeralAddress: 'Address',
    funeralNotes: 'Notes',
    donations: 'Donations',
    donationGoal: 'Donation goal',
    donationRaised: 'Raised',
    donate: 'Donate',
    noObituaries: 'No obituaries to display',
    publishObituary: 'Publish obituary',
    saveDraft: 'Save as draft',
  },

  // Living Profile
  livingProfile: {
    title: 'My Living Profile',
    create: 'Create Living Profile',
    description: 'Prepare your memorial while you are still alive',
    familyMembers: 'Family Members',
    addFamily: 'Add family member',
    secretPhrase: 'Secret phrase',
    activate: 'Activate Memorial',
    activationWarning: 'Memorial activation is an irreversible action',
    status: {
      draft: 'Draft',
      active: 'Active',
      converted: 'Converted',
    },
    relationship: {
      spouse: 'Spouse',
      child: 'Child',
      sibling: 'Sibling',
      parent: 'Parent',
      other: 'Other',
    },
  },

  // Comments
  comments: {
    title: 'Comments',
    write: 'Write a comment',
    yourName: 'Your name',
    yourMessage: 'Your message',
    anonymous: 'Anonymous',
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
    noComments: 'No comments',
    beFirst: 'Be the first to leave a comment',
  },

  // Gifts
  gifts: {
    title: 'Virtual Gifts',
    sendGift: 'Send a gift',
    candle: 'Candle',
    flower: 'Flower',
    wreath: 'Wreath',
    cross: 'Cross',
    message: 'Message',
    from: 'From',
  },

  // Errors
  errors: {
    generic: 'An error occurred. Please try again.',
    notFound: 'Page not found',
    unauthorized: 'You are not authorized for this action',
    networkError: 'Network error',
    validationError: 'Please check your input',
  },

  // Home
  home: {
    heroTitle: 'Preserve memories of your loved ones',
    heroSubtitle: 'Digital memorial platform for preserving memories of the deceased',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    recentMemorials: 'Recent Memorials',
    features: {
      memorials: 'Create memorials',
      obituaries: 'Publish obituaries',
      donations: 'Collect donations',
      gifts: 'Send virtual gifts',
    },
  },
}
