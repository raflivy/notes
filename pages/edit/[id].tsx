import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Input, Textarea, Text } from '@chakra-ui/react';

const EditNote = () => {
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    const fetchNote = async () => {
      if (id) {
        const response = await fetch(`/api/notes/${id}`);
        const note = await response.json();
        setTitle(note.title);
        setBody(note.body);
      }
    };
    fetchNote();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedNote = { title, body };

    try {
      await fetch(`/api/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedNote),
      });
      router.push('/');
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  return (
    <Box p={4}>
      <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={4}>Edit Note</Text>
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
        <Button width="50%" colorScheme="green" type="submit" mx="auto" display="block" >Perbarui</Button>
      </form>
    </Box>
  );
};

export default EditNote;
