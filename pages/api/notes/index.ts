import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { rows } = await pool.query('SELECT * FROM notes ORDER BY createdat DESC');
      return res.status(200).json(rows);
    } catch (error) {
      console.error('Error fetching notes:', error);
      return res.status(500).json({ error: 'Failed to fetch notes' });
    }
  }

  if (req.method === 'POST') {
    const { title, body } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO notes (title, body) VALUES ($1, $2) RETURNING *',
        [title, body]
      );
      return res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error adding note:', error);
      return res.status(500).json({ error: 'Failed to add note' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
