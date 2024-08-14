import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Text, Button, Grid, Flex } from '@chakra-ui/react';

type Note = {
  id: string;
  title: string;
  body: string;
  createdat: string;
};

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/notes')
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch((error) => console.error('Error fetching notes:', error));
  }, []);

  return (
    <Box p={4}>
      <Text fontSize="5xl" fontWeight="bold" textAlign="center" mb={4}>
        Notes
      </Text>

      {notes.length === 0 ? (
        <Flex align="center" justify="center" height="50vh">
        <Text fontSize="2xl" color="grey" textAlign="center" >Tidak ada catatan</Text>
      </Flex>
      ) : (
        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          {notes.map((note, index) => {
            console.log('Created At:', note.createdat);

            const createdat = new Date(note.createdat);
            const createdatString = isNaN(createdat.getTime())
              ? 'Tanggal tidak valid'
              : createdat.toLocaleString();


            const bgColor = index % 3 === 0 ? 'blue.100' : index % 3 === 1 ? 'green.100' : 'orange.100';
            
            const truncatedBody = note.body.length > 100 ? note.body.slice(0, 100) + '...' : note.body;

            return (
              <Flex
                key={note.id}
                p={4}
                borderWidth="1px"
                borderRadius="lg"
                bg={bgColor}
                direction="column"
                justify="space-between"
                onClick={() => router.push(`/notes/${note.id}`)}
                cursor="pointer"
                height="100%"
              >
                <Box>
                  <Text fontSize="xl" fontWeight="bold">{note.title}</Text>
                  <Text>{truncatedBody}</Text> {}
                </Box>
                {}
                <Text fontSize="xs" color="gray.400" textAlign="right" mt="auto">
                  {createdatString}
                </Text>
              </Flex>
            );
          })}
        </Grid>
      )}

      <Button colorScheme="green" width="50%" mt={4} onClick={() => router.push('/notes/new')} mx="auto" display="block">
        Tambah Note Baru
      </Button>
    </Box>
  );
}
