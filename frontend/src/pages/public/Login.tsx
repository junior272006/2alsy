import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Checkbox,
  Anchor,
  Stack,
  Alert,
  Center,
  ThemeIcon,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconLock, IconMail, IconAlertCircle } from '@tabler/icons-react';
import { loginUser } from '../../api/authService';
import type { LoginData } from '../../api/authService';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs');
      setLoading(false);
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Email invalide');
      setLoading(false);
      return;
    }

    try {
      const response = await loginUser(formData);
      console.log(' Connexion réussie:', response);
      
      //  Redirection vers l'accueil
      navigate('/');
      
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Center mb="xl">
        <ThemeIcon size={80} radius="xl" variant="gradient">
          <IconLock size={40} />
        </ThemeIcon>
      </Center>

      <Title ta="center" fw={700} mb="xs">
        Bienvenue !
      </Title>
      <Text c="dimmed" size="sm" ta="center" mb="xl">
        Connectez-vous à votre compte
      </Text>

      <Paper radius="md" p="xl" withBorder>
        {error && (
          <Alert
            icon={<IconAlertCircle size={16} />}
            title="Erreur"
            color="brandRed"
            mb="lg"
            variant="light"
          >
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              label="Email"
              placeholder="exemple@email.com"
              leftSection={<IconMail size={16} />}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              disabled={loading}
              required
            />

            <PasswordInput
              label="Mot de passe"
              placeholder="Votre mot de passe"
              leftSection={<IconLock size={16} />}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              disabled={loading}
              required
            />

            <Group justify="space-between">
              <Checkbox label="Se souvenir de moi" />
              <Anchor size="sm" c="brandBlue" component={Link} to='/forgott'>
                Mot de passe oublié ?
              </Anchor>
            </Group>

            <Button
              type="submit"
              fullWidth
              loading={loading}
              color="brandGreen"
              size="md"
            >
              Se connecter
            </Button>
          </Stack>
        </form>
      </Paper>

      <Text c="dimmed" size="sm" ta="center" mt="md">
        Vous n'avez pas de compte ?{' '}
        <Anchor size="sm" fw={600} c="brandGreen" onClick={() => navigate('/register')}>
          S'inscrire
        </Anchor>
      </Text>
    </Container>
  );
}