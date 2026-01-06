import React from 'react';
import {
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Group,
  ScrollArea,
  Text,
  Stack,
  ActionIcon,
  useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconHome,
  IconUsers,
  IconMessage,
  IconCalendar,
  IconInfoCircle,
  IconSun,
  IconMoon,
} from '@tabler/icons-react';
import { motion } from 'motion/react';
import classes from './Header.module.css';

interface NavLinkProps {
  icon: React.ComponentType<{ size?: number }>;
  children: React.ReactNode;
  href: string;
  onClick?: () => void;
}

export default function AlumniNavbar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const NavLink: React.FC<NavLinkProps> = ({ icon: Icon, children, href, onClick }) => (
    <motion.a
      href={href}
      className={classes.link}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Group gap={8}>
        <Icon size={18} />
        <Text size="sm" fw={500}>{children}</Text>
      </Group>
    </motion.a>
  );

  return (
    <Box>
      {/* -------------------- HEADER ANIMÉ -------------------- */}
      <motion.header
        className={classes.header}
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Group justify="space-between" h="100%">
          {/* LOGO */}
          <Stack gap={0}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Text fw={700} size="lg" c="brandGreen.5">
                2ALSY
              </Text>
              <Text size="xs" c="neutral.6" fw={400}>
                Lycée Scientifique de Yamoussoukro
              </Text>
            </motion.div>
          </Stack>

          {/* -------------------- DESKTOP LINKS -------------------- */}
          <Group h="100%" gap="xs" visibleFrom="sm">
            <NavLink icon={IconHome} href="#accueil">
              Accueil
            </NavLink>

            <NavLink icon={IconUsers} href="#membres">
              Membres
            </NavLink>

            <NavLink icon={IconMessage} href="#messages">
              Messages
            </NavLink>

            <NavLink icon={IconCalendar} href="#evenements">
              Événements
            </NavLink>

            <NavLink icon={IconInfoCircle} href="#apropos">
              À propos
            </NavLink>
          </Group>

          {/* ------------------- DESKTOP BUTTONS -------------------- */}
          <Group visibleFrom="sm" gap="xs">
            {/* Toggle Dark/Light Mode */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <ActionIcon
                onClick={() => toggleColorScheme()}
                variant="default"
                size="lg"
                radius="md"
                aria-label="Toggle color scheme"
              >
                {colorScheme === 'dark' ? (
                  <IconSun size={18} />
                ) : (
                  <IconMoon size={18} />
                )}
              </ActionIcon>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button 
                variant="default" 
                radius="md"
                size="sm"
              >
                Se connecter
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                color="brandGreen"
                radius="md"
                size="sm"
              >
                S'inscrire
              </Button>
            </motion.div>
          </Group>

          {/* -------------------- BURGER MOBILE -------------------- */}
          <Box hiddenFrom="sm">
            <motion.div
              whileTap={{ rotate: 90, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Burger
                opened={drawerOpened}
                onClick={toggleDrawer}
                color="var(--mantine-color-brandGreen-5)"
              />
            </motion.div>
          </Box>
        </Group>
      </motion.header>

      {/* -------------------- MOBILE DRAWER ANIMÉ -------------------- */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="75%"
        padding="md"
        hiddenFrom="sm"
        zIndex={1000000}
        position="right"
        classNames={{
          body: classes.drawerBody,
          content: classes.drawerContent,
          header: classes.drawerHeader,
        }}
        transitionProps={{
          transition: "slide-left",
          duration: 250
        }}
      >
        <ScrollArea h="calc(100vh - 80px)" mx="-md">
          <Divider my="sm" />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Stack gap="xs" px="md">
              <NavLink icon={IconHome} href="#accueil" onClick={closeDrawer}>
                Accueil
              </NavLink>

              <NavLink icon={IconUsers} href="#membres" onClick={closeDrawer}>
                Membres
              </NavLink>

              <NavLink icon={IconMessage} href="#messages" onClick={closeDrawer}>
                Messages
              </NavLink>

              <NavLink icon={IconCalendar} href="#evenements" onClick={closeDrawer}>
                Événements
              </NavLink>

              <NavLink icon={IconInfoCircle} href="#apropos" onClick={closeDrawer}>
                À propos
              </NavLink>
            </Stack>

            <Divider my="md" />

            <Stack gap="sm" px="md" mt="md">
              {/* Toggle Dark/Light Mode Mobile */}
              <Group justify="center" mb="sm">
                <ActionIcon
                  onClick={() => toggleColorScheme()}
                  variant="default"
                  size="xl"
                  radius="md"
                  aria-label="Toggle color scheme"
                >
                  {colorScheme === 'dark' ? (
                    <IconSun size={20} />
                  ) : (
                    <IconMoon size={20} />
                  )}
                </ActionIcon>
              </Group>

              <Button
                onClick={closeDrawer}
                variant="default"
                fullWidth
                radius="md"
              >
                Se connecter
              </Button>

              <Button
                onClick={closeDrawer}
                color="brandGreen"
                fullWidth
                radius="md"
              >
                S'inscrire
              </Button>
            </Stack>
          </motion.div>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}