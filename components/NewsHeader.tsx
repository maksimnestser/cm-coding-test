import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";
import React, { FC } from "react";

interface AppHeaderProps {
  logoData: {
    url: string;
    width: number;
    height: number;
  };
  menuLabel: string;
}

export const NewsHeader: FC<AppHeaderProps> = ({ logoData, menuLabel }) => {
  return (
    <Box
      component="header"
      sx={{ borderBottom: "2px solid", borderBottomColor: "grey.200" }}
    >
      <Container
        sx={{
          mt: 1,
          px: 6,
          pb: 1,
        }}
        maxWidth="lg"
      >
        <Box
          sx={{
            pb: 1,
            mb: 1,
            borderBottom: "2px solid",
            borderBottomColor: "grey.200",
          }}
        >
          <Image
            src={logoData.url}
            alt="CredibleMind logo"
            width={logoData.width}
            height={logoData.height}
          />
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: "1.1rem",
              color: "text.secondary",
            }}
          >
            {menuLabel}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
