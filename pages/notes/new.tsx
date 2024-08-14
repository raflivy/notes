import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Input, Textarea, Text } from '@chakra-ui/react';

const NewNote = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newNote = { title, body };

    try {
      await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      });
      router.push('/');
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  return (
    <Box p={4}>
      <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={4}>
      Tambah Note Baru</Text>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Judul"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          mb={4}
          required
        />
        <Textarea
          placeholder="Isi Catatan"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          mb={4}
          required
        />
        <Button colorScheme="green" width="50%" type="submit" mx="auto" display="block" >Simpan Note</Button>
      </form>
    </Box>
  );
};

export default NewNote;
