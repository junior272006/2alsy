import { useState } from 'react';
import { Container, Paper, TextInput, Button, Title, Text, Notification } from '@mantine/core';
import { IconMail } from '@tabler/icons-react';

const API_URL = 'https://twoalsy.onrender.com/api';

export default function Forgott() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Impossible d’envoyer le mail');
      }

      setSubmitted(true);
      console.log('Réponse backend:', data);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    }
  };

  return (
    <Container size={420} my={80}>
      <Title ta="center" mb="lg">
        Mot de passe oublié
      </Title>

      <Paper shadow="md" p="lg" radius="md">
        {submitted ? (
         <Notification color="green" title="Mail envoyé" withCloseButton={false}>
  Si cet email existe dans notre base, un lien de réinitialisation a été envoyé.
</Notification>

        ) : (
          <form onSubmit={handleSubmit}>
            <Text mb="sm">
              Entrez votre adresse email pour recevoir un lien de réinitialisation de mot de passe.
            </Text>

            <TextInput
              required
              label="Email"
              placeholder="votre.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              mb="md"
              leftSection={<IconMail size={16} />}
            />

            {error && <Text color="red" size="sm" mb="sm">{error}</Text>}

            <Button type="submit" fullWidth>
              Envoyer le lien
            </Button>
          </form>
        )}
      </Paper>
    </Container>
  );
}
