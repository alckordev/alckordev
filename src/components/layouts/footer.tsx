"use client";

import {
  ActionIcon,
  Anchor,
  Box,
  Container,
  Divider,
  Flex,
  Group,
  Text,
  ThemeIcon,
} from "@mantine/core";
import {
  RiArrowUpLine,
  RiGithubFill,
  RiLinkedinFill,
  RiTiktokFill,
  RiTwitterXFill,
} from "@remixicon/react";
import { LanguageSwitcher } from "../language-switcher";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Box component="footer" mih={70}>
      <Divider
        label={
          <ActionIcon
            size="lg"
            aria-label="Scroll to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <RiArrowUpLine />
          </ActionIcon>
        }
        labelPosition="center"
      />
      <Container size="xl">
        <Flex
          justify="space-between"
          align="center"
          p={{ base: "32 0", md: "16 0 32" }}
          direction={{ base: "column", md: "row" }}
          gap={32}
        >
          <Group gap="xs" justify="center">
            <Anchor
              aria-label="Github"
              href="https://github.com/alckordev"
              rel="noopener"
              display="inline-flex"
              target="_blank"
            >
              <ThemeIcon variant="transparent" color="white">
                <RiGithubFill size={18} />
              </ThemeIcon>
            </Anchor>
            <Divider orientation="vertical" />
            <Anchor
              aria-label="TwitterX"
              href="https://x.com/alckordev"
              rel="noopener"
              display="inline-flex"
              target="_blank"
            >
              <ThemeIcon variant="transparent" color="white">
                <RiTwitterXFill size={18} />
              </ThemeIcon>
            </Anchor>
            <Divider orientation="vertical" />
            <Anchor
              aria-label="Tiktok"
              href="https://www.tiktok.com/@alckordev"
              rel="noopener"
              display="inline-flex"
              target="_blank"
            >
              <ThemeIcon variant="transparent" color="white">
                <RiTiktokFill size={18} />
              </ThemeIcon>
            </Anchor>
            <Divider orientation="vertical" />
            <Anchor
              aria-label="LinkedIn"
              href="https://www.linkedin.com/in/alckordev"
              rel="noopener"
              display="inline-flex"
              target="_blank"
            >
              <ThemeIcon variant="transparent" color="white">
                <RiLinkedinFill size={18} />
              </ThemeIcon>
            </Anchor>
          </Group>
          <Group justify="flex-start">
            <Text>© {year} - alckordev</Text>
            <LanguageSwitcher />
          </Group>
        </Flex>
      </Container>
    </Box>
  );
};
