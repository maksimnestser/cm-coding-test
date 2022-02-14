import { TextField, Box } from "@mui/material";
import React, { FC, FormEvent, ChangeEvent } from "react";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBoxProps {
  onSubmit: (query: string) => void;
  value: string;
  onChange: (query: string) => void;
}

export const SearchBox: FC<SearchBoxProps> = ({
  onSubmit,
  value,
  onChange,
}) => {
  const onTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(value);
  };

  const onSearchIconClick = () => {
    onSubmit(value);
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={onFormSubmit}
      sx={{ display: "flex" }}
    >
      <TextField
        id="search-input"
        label="Search"
        variant="outlined"
        size="small"
        sx={{
          "& .MuiOutlinedInput-root": {
            pr: 0,
            "&.Mui-focused fieldset": {
              borderColor: "primary.main",
              borderWidth: 1,
            },
            "&:hover fieldset": {
              borderColor: "primary.main",
            },
          },
          "& label": {
            color: "grey.400",
            fontSize: ".8rem",
            pl: 1,
          },
        }}
        value={value}
        onChange={onTextFieldChange}
        InputProps={{
          endAdornment: (
            <Box
              sx={{
                backgroundColor: "primary.dark",
                height: "100%",
                display: "flex",
                alignItems: "center",
                px: 1,
                borderTopWidth: 0,
                borderTopRightRadius: "4px",
                borderBottomRightRadius: "4px",
                ml: 1,
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "primary.main",
                },
              }}
              onClick={onSearchIconClick}
            >
              <SearchIcon sx={{ color: "grey.200" }} />
            </Box>
          ),
        }}
      />
    </Box>
  );
};
