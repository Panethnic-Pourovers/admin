import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as React from 'react';

export const MenuProps = {
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: 'bottom' as const,
    horizontal: 'left' as const
  },
  transformOrigin: {
    vertical: 'top' as const,
    horizontal: 'right' as const
  },

  PaperProps: {
    style: {
      maxHeight: '100%',
      width: 'fit-content'
    }
  }
};

export default function MultipleSelect(props: {
  selectedOptions: any;
  setSelectedOptions: any;
  options: any;
  label: any;
}) {
  const { selectedOptions, setSelectedOptions, options, label } = props;
  const handleChange = (event: SelectChangeEvent<typeof selectedOptions>) => {
    const {
      target: { value }
    } = event;
    setSelectedOptions(value);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <InputLabel id="multiple-input-label">{label}</InputLabel>
      <Select
        sx={{ width: '100%' }}
        labelId="multiple-input-label"
        id="multiple-input"
        multiple
        value={selectedOptions}
        onChange={handleChange}
        input={<OutlinedInput label="Name" />}
        MenuProps={MenuProps}
        renderValue={() => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selectedOptions.map((value: any) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      >
        {options.map((option: any) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
