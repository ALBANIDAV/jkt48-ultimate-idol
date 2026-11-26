/* =============================================
   JKT48 MEMBER DATA (shared by all games)
   Ultimate Idol Matrix (ultimate-idol/ulti.js) & Draft Pick (draft-pick/draft.js)
   ============================================= */

const JKT48_MEMBERS = [
  // Team Love (13 members)
  { id: 3, name: 'Anindya Ramadhani', nickname: 'Anin', team: 'Team Love', img: null, gen: '11th' },
  { id: 10, name: 'Aurellia', nickname: 'Lia', team: 'Team Love', img: null, gen: '10th' },
  { id: 11, name: 'Aurhel Alana', nickname: 'Lana', team: 'Team Love', img: null, gen: '12th' },
  { id: 5, name: 'Celline Thefani', nickname: 'Elin', team: 'Team Love', img: null, gen: '11th' },
  { id: 7, name: 'Cynthia Yaputera', nickname: 'Cynthia', team: 'Team Love', img: null, gen: '11th' },
  { id: 1, name: 'Fiony Alveria', nickname: 'Fiony', team: 'Team Love', img: null, gen: '8th' },
  { id: 14, name: 'Fritzy Rosmerian', nickname: 'Fritzy', team: 'Team Love', img: null, gen: '12th' },
  { id: 6, name: 'Grace Octaviani', nickname: 'Gracie', team: 'Team Love', img: null, gen: '11th' },
  { id: 12, name: 'Hillary Abigail', nickname: 'Lily', team: 'Team Love', img: null, gen: '12th' },
  { id: 2, name: 'Indah Cahya', nickname: 'Indah', team: 'Team Love', img: null, gen: '9th' },
  { id: 13, name: 'Jazzlyn Trisha', nickname: 'Trisha', team: 'Team Love', img: null, gen: '12th' },
  { id: 4, name: 'Michelle Alexandra', nickname: 'Michie', team: 'Team Love', img: null, gen: '11th' },
  { id: 15, name: 'Nayla Suji', nickname: 'Nayla', team: 'Team Love', img: null, gen: '12th' },
  // Team Dream (12 members)
  { id: 26, name: 'Adeline Wijaya', nickname: 'Delynn', team: 'Team Dream', img: null, gen: '12th' },
  { id: 18, name: 'Febriola Sinambela', nickname: 'Olla', team: 'Team Dream', img: null, gen: '7th' },
  { id: 17, name: 'Freya Jayawardana', nickname: 'Freya', team: 'Team Dream', img: null, gen: '7th' },
  { id: 22, name: 'Gabriela Abigail', nickname: 'Ella', team: 'Team Dream', img: null, gen: '10th' },
  { id: 16, name: 'Gita Sekar Andarini', nickname: 'Gita', team: 'Team Dream', img: null, gen: '6th' },
  { id: 23, name: 'Greesella Adhalia', nickname: 'Greesel', team: 'Team Dream', img: null, gen: '11th' },
  { id: 19, name: 'Helisma Putri', nickname: 'Eli', team: 'Team Dream', img: null, gen: '7th' },
  { id: 21, name: 'Jesslyn Elly', nickname: 'Lyn', team: 'Team Dream', img: null, gen: '10th' },
  { id: 20, name: 'Marsha Lenathea', nickname: 'Marsha', team: 'Team Dream', img: null, gen: '9th' },
  { id: 27, name: 'Nina Tutachia', nickname: 'Nachia', team: 'Team Dream', img: null, gen: '12th' },
  { id: 25, name: 'Oline Manuel', nickname: 'Oline', team: 'Team Dream', img: null, gen: '12th' },
  { id: 24, name: 'Shabilqis Naila', nickname: 'Nala', team: 'Team Dream', img: null, gen: '12th' },
  // Team Passion (15 members)
  { id: 40, name: 'Abigail Rachel', nickname: 'Aralie', team: 'Team Passion', img: null, gen: '12th' },
  { id: 28, name: 'Angelina Christy', nickname: 'Christy', team: 'Team Passion', img: null, gen: '7th' },
  { id: 38, name: 'Catherina Vallencia', nickname: 'Erine', team: 'Team Passion', img: null, gen: '12th' },
  { id: 32, name: 'Cornelia Vanisa', nickname: 'Oniel', team: 'Team Passion', img: null, gen: '8th' },
  { id: 36, name: 'Dena Natalia', nickname: 'Danella', team: 'Team Passion', img: null, gen: '11th' },
  { id: 35, name: 'Desy Natalia', nickname: 'Daisy', team: 'Team Passion', img: null, gen: '11th' },
  { id: 99, name: 'Feni Fitriyanti', nickname: 'Feni', team: 'Team Passion', img: null, gen: '3rd' },
  { id: 30, name: 'Jessica Chandra', nickname: 'Jessi', team: 'Team Passion', img: null, gen: '7th' },
  { id: 33, name: 'Kathrina Irene', nickname: 'Kathrina', team: 'Team Passion', img: null, gen: '9th' },
  { id: 31, name: 'Lulu Salsabila', nickname: 'Lulu', team: 'Team Passion', img: null, gen: '8th' },
  { id: 39, name: 'Michelle Levia', nickname: 'Levi', team: 'Team Passion', img: null, gen: '12th' },
  { id: 29, name: 'Mutiara Azzahra', nickname: 'Muthe', team: 'Team Passion', img: null, gen: '7th' },
  { id: 34, name: 'Raisha Syifa', nickname: 'Raisha', team: 'Team Passion', img: null, gen: '10th' },
  { id: 41, name: 'Ribka Budiman', nickname: 'Ribka', team: 'Team Passion', img: null, gen: '12th' },
  { id: 37, name: 'Victoria Kimberly', nickname: 'Kimmy', team: 'Team Passion', img: null, gen: '12th' },
  // Trainee (18 members)
  { id: 51, name: 'Afera Thalia', nickname: 'Fera', team: 'Trainee', img: null, gen: '14th' },
  { id: 42, name: 'Astrella Virgiananda', nickname: 'Virgi', team: 'Trainee', img: null, gen: '13th' },
  { id: 44, name: 'Bong Aprilli', nickname: 'Rilly', team: 'Trainee', img: null, gen: '13th' },
  { id: 52, name: 'Carissa Dini', nickname: 'Carissa', team: 'Trainee', img: null, gen: '14th' },
  { id: 53, name: 'Christabella Bonita', nickname: 'Bella', team: 'Trainee', img: null, gen: '14th' },
  { id: 54, name: 'Fahira Putri', nickname: 'Fahira', team: 'Trainee', img: null, gen: '14th' },
  { id: 55, name: 'Fatimah Azzahra', nickname: 'Rara', team: 'Trainee', img: null, gen: '14th' },
  { id: 45, name: 'Hagia Sopia', nickname: 'Giaa', team: 'Trainee', img: null, gen: '13th' },
  { id: 56, name: 'Heidi Suyangga', nickname: 'Heidi', team: 'Trainee', img: null, gen: '14th' },
  { id: 46, name: 'Humaira Ramadhani', nickname: 'Maira', team: 'Trainee', img: null, gen: '13th' },
  { id: 47, name: 'Jacqueline Immanuela', nickname: 'Ekin', team: 'Trainee', img: null, gen: '13th' },
  { id: 48, name: 'Jemima Evodie', nickname: 'Jemima', team: 'Trainee', img: null, gen: '13th' },
  { id: 57, name: 'Maxine Faye', nickname: 'Maxine', team: 'Trainee', img: null, gen: '14th' },
  { id: 49, name: 'Mikaela Kusjanto', nickname: 'Mikaela', team: 'Trainee', img: null, gen: '13th' },
  { id: 50, name: 'Nur Intan', nickname: 'Intan', team: 'Trainee', img: null, gen: '13th' },
  { id: 58, name: 'Putry Jazyta', nickname: 'Jazzy', team: 'Trainee', img: null, gen: '14th' },
  { id: 59, name: 'Ralyne Van Irwan', nickname: 'Ralyne', team: 'Trainee', img: null, gen: '14th' },
  { id: 60, name: 'Sona Kalyana', nickname: 'Sona', team: 'Trainee', img: null, gen: '14th' },
];

// Local photo path: "assets/members/<team-folder>/<Full_Name>.jpg"
function memberPhotoPath(name, team) {
  let folder = 'team-love';
  if (team === 'DREAM' || team === 'Team Dream') folder = 'team-dream';
  else if (team === 'PASSION' || team === 'Team Passion') folder = 'team-passion';
  else if (team === 'TRAINEE' || team === 'Trainee') folder = 'trainee';
  const cleanName = (name || 'Unknown').trim().replace(/\s+/g, '_');
  const base = (typeof window !== 'undefined' && window.JKT48_ASSET_BASE) ? window.JKT48_ASSET_BASE : '';
  return base + encodeURI(`assets/members/${folder}/${cleanName}.jpg`);
}
