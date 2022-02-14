import { Typography, Box } from "@mui/material";
import React, { FC, useState } from "react";
import { SearchBox } from "./SearchBox";

interface FilterBoxProps {
  searchLabel: string;
  onSubmit: (query: string) => void;
}

export const FilterBox: FC<FilterBoxProps> = ({ searchLabel, onSubmit }) => {
  const [value, setValue] = useState("");

  const onChange = (value: string) => {
    setValue(value);
  };

  return (
    <Box
      sx={{
        border: "2px solid",
        borderColor: "grey.200",
        py: 2,
        px: 2,
        top: 16,
      }}
      position="sticky"
    >
      <Typography
        sx={{
          fontWeight: "fontWeightMedium",
          color: "text.primary",
          pb: 2,
        }}
      >
        {searchLabel}
      </Typography>
      <SearchBox value={value} onChange={onChange} onSubmit={onSubmit} />
    </Box>
  );
};
