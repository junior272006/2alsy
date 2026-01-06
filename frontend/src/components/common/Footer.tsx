import { 
  Box, 
  Container, 
  SimpleGrid, 
  Stack, 
  Text, 
  Group, 
  ActionIcon, 
  useMantineColorScheme 
} from '@mantine/core';

import { 
  IconBrandFacebook, 
  IconBrandLinkedin, 
  IconBrandInstagram, 
  IconBrandTwitter 
} from '@tabler/icons-react';

import { motion } from 'framer-motion';
import classes from './Footer.module.css';

export default function Footer() {
  const { colorScheme } = useMantineColorScheme();

  // Gradient background comme le hero
  const bgGradient = colorScheme === 'dark'
    ? 'linear-gradient(135deg, var(--mantine-color-dark-9), var(--mantine-color-dark-7))'
    : 'linear-gradient(135deg, var(--mantine-color-brandGreen-5), var(--mantine-color-brandBlue-5))';

  const textColor = colorScheme === 'dark' ? 'var(--mantine-color-gray-3)' : 'white';
  const hoverColor = 'var(--mantine-color-brandGreen-4)';

  return (
    <Box component="footer" py={50} px={20} style={{ background: bgGradient }}>
      <Container size="lg">
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="xl">
          
          {/* Logo & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Stack gap="xs" className={classes.footerStack}>
              <Text fw={700} c={textColor}>Alumni Connect</Text>
              <Text c={textColor} size="sm">
                La plateforme officielle pour rester en lien avec votre lycée.
              </Text>
            </Stack>
          </motion.div>

          {/* Liens rapides */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Stack gap="xs" className={classes.footerStack}>
              <Text fw={600} c={textColor}>Liens rapides</Text>
              {['Accueil', 'Membres', 'Événements', 'Messagerie'].map((link) => (
                <Text
                  key={link}
                  component="a"
                  href="#"
                  c={textColor}
                  size="sm"
                  styles={{
                    root: {
                      textDecoration: 'none',
                      cursor: 'pointer',
                      ':hover': { color: hoverColor },
                    },
                  }}
                >
                  {link}
                </Text>
              ))}
            </Stack>
          </motion.div>

          {/* Infos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Stack gap="xs" className={classes.footerStack}>
              <Text fw={600} c={textColor}>Infos</Text>
              {['Contact', 'FAQ', 'Politique de confidentialité'].map((info) => (
                <Text
                  key={info}
                  component="a"
                  href="#"
                  c={textColor}
                  size="sm"
                  styles={{
                    root: {
                      textDecoration: 'none',
                      cursor: 'pointer',
                      ':hover': { color: hoverColor },
                    },
                  }}
                >
                  {info}
                </Text>
              ))}
            </Stack>
          </motion.div>

          {/* Réseaux sociaux */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Stack gap="xs" className={classes.footerStack}>
              <Text fw={600} c={textColor}>Réseaux</Text>
              <Group gap="sm" className={classes.footerGroup}>
                <ActionIcon variant="light" color="white" component="a" href="#">
                  <IconBrandFacebook size={20} />
                </ActionIcon>
                <ActionIcon variant="light" color="white" component="a" href="#">
                  <IconBrandLinkedin size={20} />
                </ActionIcon>
                <ActionIcon variant="light" color="white" component="a" href="#">
                  <IconBrandInstagram size={20} />
                </ActionIcon>
                <ActionIcon variant="light" color="white" component="a" href="#">
                  <IconBrandTwitter size={20} />
                </ActionIcon>
              </Group>
            </Stack>
          </motion.div>

        </SimpleGrid>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Text ta="center" mt={40} c={textColor} size="xs">
            © 2026 Alumni Connect – Tous droits réservés
          </Text>
        </motion.div>
      </Container>
    </Box>
  );
}
