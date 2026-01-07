import { useState } from 'react';
import { 
  Button, Group, TextInput, PasswordInput, Stack, Paper, Textarea,
  Title, Text, Container, Center, ThemeIcon, Alert, FileButton, Avatar
} from '@mantine/core';
import { 
  IconUser, IconMail, IconPhone, IconLock, IconAlertCircle, IconCheck,
  IconBriefcase, IconSchool, IconBuilding, IconUpload
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mantine/hooks';
import { registerUser } from '../../api/authService';
import type { UserData } from '../../api/authService';
export default function Signup () {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');

  const [formData, setFormData] = useState({
    firstname: '', 
    lastname: '', 
    email: '', 
    phone: '',
    password: '', 
    confirmPassword: '',
    promotion: '',
    bio: '',
    study: '',
    job: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (file: File | null) => {
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Veuillez sélectionner une image');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError('L\'image ne doit pas dépasser 5MB');
        return;
      }

      setAvatarFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setLoading(true);
    setCreating(true);

    try {
      const userData: UserData = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        promotion: formData.promotion,
        bio: formData.bio,
        study: formData.study,
        job: formData.job,
        avatar: avatarFile,
      };

      await registerUser(userData);

      setCreating(false);
      setSuccess(true);

      setTimeout(() => navigate('/'), 1500);
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'inscription");
      setCreating(false);
    } finally {
      setLoading(false);
    }
  };

  if (creating) {
    return (
      <Container size="md" py={60}>
        <Center style={{ minHeight: 300 }}>
          <Stack align="center" gap="xl">
            <ThemeIcon size={80} radius="xl" color="brandGreen" variant="light">
              <div className="animate-spin">⏳</div>
            </ThemeIcon>
            <Title order={2} c="brandGreen.6">Création en cours...</Title>
            <Text size="lg" ta="center" c="dimmed" maw={400}>
              Veuillez patienter pendant la création de votre compte.
            </Text>
          </Stack>
        </Center>
      </Container>
    );
  }

  if (success) {
    return (
      <Container size="md" py={60}>
        <Center style={{ minHeight: 300 }}>
          <Stack align="center" gap="xl">
            <ThemeIcon size={80} radius="xl" color="brandGreen" variant="light">
              <IconCheck size={48} />
            </ThemeIcon>
            <Title order={2} c="brandGreen.6">Inscription validée !</Title>
            <Text size="lg" ta="center" c="dimmed" maw={400}>
              Votre compte a été créé avec succès. Redirection en cours...
            </Text>
          </Stack>
        </Center>
      </Container>
    );
  }

  return (
    <Container size="md" py={60}>
      <Paper shadow="md" p="xl" radius="md">
        <Title order={2} ta="center" mb="xl">Créer un compte</Title>

        <form onSubmit={handleSubmit}>
          <Stack gap="md" w="100%" style={{ maxWidth: '600px', margin: 'auto' }}>

            {error && (
              <Alert 
                icon={<IconAlertCircle size={18} />} 
                color="brandRed" 
                withCloseButton
                onClose={() => setError('')}
              >
                {error}
              </Alert>
            )}

            {/* Avatar Upload */}
            <Center>
              <Stack align="center" gap="sm">
                {preview ? (
                  <Avatar src={preview} size={120} radius="xl" />
                ) : (
                  <Avatar size={120} radius="xl" color="brandGreen">
                    <IconUser size={48} />
                  </Avatar>
                )}
                <FileButton onChange={handleFileChange} accept="image/*">
                  {(props) => (
                    <Button 
                      {...props} 
                      variant="light" 
                      color="brandGreen"
                      leftSection={<IconUpload size={16} />}
                      size="sm"
                    >
                      {preview ? 'Changer la photo' : 'Ajouter une photo'}
                    </Button>
                  )}
                </FileButton>
                <Text size="xs" c="dimmed">JPG, PNG ou WEBP (max 5MB)</Text>
              </Stack>
            </Center>

            {/* Prénom et Nom */}
            {isMobile ? (
              <>
                <TextInput 
                  label="Prénom"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  placeholder="Saisissez votre prénom"
                  leftSection={<IconUser size={16} />}
                  required
                />
                <TextInput 
                  label="Nom"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  placeholder="Saisissez votre nom"
                  leftSection={<IconUser size={16} />}
                  required
                />
              </>
            ) : (
              <Group gap="md" grow>
                <TextInput 
                  label="Prénom"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  placeholder="Saisissez votre prénom"
                  leftSection={<IconUser size={16} />}
                  required
                />
                <TextInput 
                  label="Nom"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  placeholder="Saisissez votre nom"
                  leftSection={<IconUser size={16} />}
                  required
                />
              </Group>
            )}

            {/* Email */}
            <TextInput 
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="exemple@gmail.com"
              leftSection={<IconMail size={16} />}
              required
            />

            {/* Téléphone */}
            <TextInput 
              label="Téléphone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Ex : 0102030405"
              leftSection={<IconPhone size={16} />}
              required
            />

            {/* Mots de passe */}
            {isMobile ? (
              <>
                <PasswordInput 
                  label="Mot de passe"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="6 caractères minimum"
                  leftSection={<IconLock size={16} />}
                  required
                />
                <PasswordInput 
                  label="Confirmer"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirmez votre mot de passe"
                  leftSection={<IconLock size={16} />}
                  required
                />
              </>
            ) : (
              <Group gap="md" grow>
                <PasswordInput 
                  label="Mot de passe"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="6 caractères minimum"
                  leftSection={<IconLock size={16} />}
                  required
                />
                <PasswordInput 
                  label="Confirmer"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirmez votre mot de passe"
                  leftSection={<IconLock size={16} />}
                  required
                />
              </Group>
            )}

            {/* Promotion */}
            <TextInput 
              label="Promotion"
              name="promotion"
              value={formData.promotion}
              onChange={handleChange}
              placeholder="Ex : 2024"
              leftSection={<IconSchool size={16} />}
              required
            />

            {/* Études et Emploi */}
            {isMobile ? (
              <>
                <TextInput 
                  label="Études"
                  name="study"
                  value={formData.study}
                  onChange={handleChange}
                  placeholder="Ex : Informatique"
                  leftSection={<IconBuilding size={16} />}
                  required
                />
                <TextInput 
                  label="Emploi actuel"
                  name="job"
                  value={formData.job}
                  onChange={handleChange}
                  placeholder="Ex : Développeur"
                  leftSection={<IconBriefcase size={16} />}
                  required
                />
              </>
            ) : (
              <Group gap="md" grow>
                <TextInput 
                  label="Études"
                  name="study"
                  value={formData.study}
                  onChange={handleChange}
                  placeholder="Ex : Informatique"
                  leftSection={<IconBuilding size={16} />}
                  required
                />
                <TextInput 
                  label="Emploi actuel"
                  name="job"
                  value={formData.job}
                  onChange={handleChange}
                  placeholder="Ex : Développeur"
                  leftSection={<IconBriefcase size={16} />}
                  required
                />
              </Group>
            )}

            {/* Bio */}
            <Textarea 
              label="Biographie"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Parlez-nous de vous..."
              minRows={4}
              required
            />

            {/* Bouton */}
            <Button 
              type="submit"
              color="brandGreen"
              loading={loading}
              fullWidth
              mt="md"
            >
              Valider l'inscription
            </Button>

          </Stack>
        </form>
      </Paper>
    </Container>
  );
}