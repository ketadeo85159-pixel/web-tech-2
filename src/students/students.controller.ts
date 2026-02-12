import type { Context } from "hono";
import { pool } from "../config/db.js";
import type { Student } from "./students.model.js";
import type { ResultSetHeader } from "mysql2";

// ✅ GET ALL STUDENTS
export const getStudents = async (c: Context) => {
  try {
    const [rows] = await pool.query<Student[]>(
      "SELECT * FROM students"
    );

    return c.json(rows);
  } catch (error) {
    console.error(error);
    return c.json({ message: "Error getting students" }, 500);
  }
};

// ✅ CREATE STUDENT
export const createStudent = async (c: Context) => {
  try {
    const { name, email, age } = await c.req.json();
    const createdAt = new Date();

    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO students (name, email, age, created_at) VALUES (?, ?, ?, ?)",
      [name, email, age, createdAt]
    );

    const [rows] = await pool.query<Student[]>(
      "SELECT * FROM students WHERE id = ?",
      [result.insertId]
    );

    return c.json(rows[0]); // ✅ return single object
  } catch (error) {
    console.error(error);
    return c.json({ message: "Error creating student" }, 500);
  }
};

// ✅ UPDATE STUDENT
export const updateStudent = async (c: Context) => {
  try {
    const id = c.req.param("id"); // ✅ FIXED
    const { name, email, age } = await c.req.json();

    const [result] = await pool.query<ResultSetHeader>(
      "UPDATE students SET name = ?, email = ?, age = ? WHERE id = ?",
      [name, email, age, id]
    );

    if (result.affectedRows === 0) {
      return c.json({ message: "Student not found" }, 404);
    }

    const [rows] = await pool.query<Student[]>(
      "SELECT * FROM students WHERE id = ?",
      [id]
    );

    return c.json(rows[0]); // ✅ return single object
  } catch (error) {
    console.error(error);
    return c.json({ message: "Error updating student" }, 500);
  }
};

// ✅ DELETE STUDENT
export const deleteStudent = async (c: Context) => {
  try {
    const id = c.req.param("id"); // ✅ FIXED

    const [result] = await pool.query<ResultSetHeader>(
      "DELETE FROM students WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return c.json({ message: "Student not found" }, 404);
    }

    return c.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error(error);
    return c.json({ message: "Error deleting student" }, 500);
  }
};
