import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Text, Button, Stack } from '@chakra-ui/react';

type Note = {
  id: string;
  title: string;
  body: string;
  createdat: string;
};

export default function NoteDetail() {
  const [note, setNote] = useState<Note | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {

      fetch(`/api/notes/${id}`)
        .then((res) => res.json())
        .then((data) => setNote(data))
        .catch((error) => console.error('Error fetching note:', error));
    }
  }, [id]);

  const handleDelete = async () => {
    if (note && confirm('Yakin ingin menghapus note?')) {
      try {
        await fetch(`/api/notes/${note.id}`, { method: 'DELETE' });
        router.push('/');
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  };

  if (!note) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box p={4}>
      <Text fontSize="2xl" fontWeight="bold" mb={2} textAlign="center">
        {note.title}
      </Text>
      <Text fontSize="md" color="gray.500" textAlign="center" mb={4}>
        {new Date(note.createdat).toLocaleString()}
      </Text>
      <Box textAlign="center" mb={4} p={4} borderWidth={1} borderRadius="md">
        <Text textAlign="justify">{note.body}</Text> {}
      </Box>
      <Stack spacing={4} mt={4} direction="row" align="center" justify="center">
        <Button colorScheme="blue" width="40%" onClick={() => router.push('/')}>Kembali</Button>
        <Button colorScheme="yellow" width="40%" onClick={() => router.push(`/edit/${note.id}`)}>Edit</Button>
      </Stack>
      <Stack spacing={4} mt={4} align="center">
        <Button colorScheme="red" width="50%" onClick={handleDelete}>Hapus</Button>
      </Stack>
    </Box>
  );
}
