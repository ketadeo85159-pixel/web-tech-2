export const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'YOUR_PASSWORD', // ⚠️ Change this!
  database: 'student_management',
  // ...
});