import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const { rows } = await pool.query('SELECT * FROM notes WHERE id = $1', [id]);
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Note not found' });
      }
      return res.status(200).json(rows[0]);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error', error });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { title, body } = req.body;
      const result = await pool.query(
        'UPDATE notes SET title = $1, body = $2 WHERE id = $3 RETURNING *',
        [title, body, id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Note not found' });
      }
      return res.status(200).json(result.rows[0]);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error', error });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const result = await pool.query('DELETE FROM notes WHERE id = $1', [id]);
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Note not found' });
      }
      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error', error });
    }
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
