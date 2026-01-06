import AlumniNavbar from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import {
  Container,
  Title,
  Text,
  Button,
  Group,
  SimpleGrid,
  Card,
  ThemeIcon,
  Stack,
  Box,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconUsers,
  IconMessage,
  IconCalendar,
  IconBriefcase,
  IconSchool,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import classes from "./home.module.css";

export default function Home() {
  const { colorScheme } = useMantineColorScheme();

  return (
    <>
      <AlumniNavbar />

      <Box>
        {/* ================= HERO ================= */}
        <Box
          py={80}
          style={{
             marginTop: '64px',
            background:
              colorScheme === "dark"
                ? "linear-gradient(135deg, var(--mantine-color-dark-9), var(--mantine-color-dark-7))"
                : "linear-gradient(135deg, var(--mantine-color-brandGreen-5), var(--mantine-color-brandBlue-5))",
          }}
          
        >
          <Container size="lg">
            <Stack align="center" gap="lg">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Title
                  ta="center"
                  c="white"
                  className={classes.heroTitle}
                >
                  Reconnectez-vous à votre réseau d’anciens élèves
                </Title>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Text
                  ta="center"
                  c="white"
                  maw={600}
                  className={classes.heroText}
                >
                  Alumni Connect est la plateforme officielle pour échanger,
                  partager des opportunités et rester en lien avec votre lycée.
                </Text>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Group className={classes.heroButtons}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="md" radius="md" color="brandGreen">
                      Rejoindre la communauté
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="md" radius="md" variant="white">
                      Découvrir les alumni
                    </Button>
                  </motion.div>
                </Group>
              </motion.div>
            </Stack>
          </Container>
        </Box>

        {/* ================= STATS ================= */}
        <Container size="lg" py={60}>
          <SimpleGrid cols={{ base: 2, sm: 4 }}>
            {[
              { label: "Alumni", value: "+1 200" },
              { label: "Messages", value: "+8 500" },
              { label: "Événements", value: "45" },
              { label: "Pays", value: "12" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  radius="md"
                  withBorder
                  className={classes.statCard}
                >
                  <Title order={3} ta="center" c="brandGreen.6">
                    {stat.value}
                  </Title>
                  <Text ta="center" c="dimmed" size="sm">
                    {stat.label}
                  </Text>
                </Card>
              </motion.div>
            ))}
          </SimpleGrid>
        </Container>

        {/* ================= FEATURES ================= */}
        <Container size="lg" py={60}>
          <Title ta="center" mb="xl">
            Ce que vous pouvez faire
          </Title>

          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
            {[
              {
                icon: IconUsers,
                title: "Réseau Alumni",
                text: "Retrouvez vos anciens camarades et élargissez votre réseau.",
              },
              {
                icon: IconMessage,
                title: "Messagerie",
                text: "Discutez en privé avec les autres alumni.",
              },
              {
                icon: IconCalendar,
                title: "Événements",
                text: "Participez à des rencontres et conférences.",
              },
              {
                icon: IconBriefcase,
                title: "Opportunités",
                text: "Stages, emplois et collaborations.",
              },
              {
                icon: IconSchool,
                title: "Vie du lycée",
                text: "Restez informé des actualités du lycée.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Card
                  radius="md"
                  withBorder
                  h="100%"
                  className={classes.featureCard}
                >
                  <ThemeIcon size="lg" radius="md" color="brandGreen" mb="sm">
                    <feature.icon size={20} />
                  </ThemeIcon>

                  <Title order={4}>{feature.title}</Title>
                  <Text size="sm" c="dimmed">
                    {feature.text}
                  </Text>
                </Card>
              </motion.div>
            ))}
          </SimpleGrid>
        </Container>

        {/* ================= EVENTS ================= */}
        <Container size="lg" py={60}>
          <Title mb="lg">Événements à venir</Title>

          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
            {[
              "Rencontre des anciens – Mars 2026",
              "Forum métiers – Avril 2026",
              "Conférence orientation – Juin 2026",
            ].map((event, index) => (
              <motion.div
                key={event}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  withBorder
                  radius="md"
                  className={classes.eventCard}
                >
                  <Text fw={500}>{event}</Text>
                  <Button
                    variant="light"
                    color="brandGreen"
                    fullWidth
                    mt="md"
                  >
                    Voir détails
                  </Button>
                </Card>
              </motion.div>
            ))}
          </SimpleGrid>
        </Container>
        {/* ================= TESTIMONIALS ================= */}
<Container size="lg" py={60}>
  <Title ta="center" mb="xl">
    Ils en parlent
  </Title>

  <SimpleGrid cols={{ base: 1, sm: 2 }}>
    {[
      {
        name: "Ancien élève – Promo 2018",
        text:
          "Grâce à Alumni Connect, j’ai retrouvé mes camarades et trouvé un stage.",
      },
      {
        name: "Ancienne élève – Promo 2020",
        text:
          "Une plateforme simple et efficace pour rester connecté.",
      },
    ].map((t, index) => (
      <motion.div
        key={t.name}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        viewport={{ once: true }}
      >
        <Card
          withBorder
          radius="md"
          className={classes.testimonialCard}
        >
          <Text size="sm">"{t.text}"</Text>
          <Text size="sm" c="dimmed" mt="sm">
            — {t.name}
          </Text>
        </Card>
      </motion.div>
    ))}
  </SimpleGrid>
</Container>


        {/* ================= CTA FINAL ================= */}
        <Box py={80} bg="brandGreen.6">
          <Container size="sm">
            <Stack align="center">
              <Title ta="center" c="white">
                Rejoignez la communauté Alumni
              </Title>
              <Text ta="center" c="white">
                Inscription gratuite et rapide
              </Text>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="md" variant="white">
                  Créer un compte
                </Button>
              </motion.div>
            </Stack>
          </Container>
        </Box>
      </Box>
      < Footer/>
    </>
  );
}
