import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';

const ITEM_HEIGHT = 30;
const ITEM_PADDING_TOP = 1;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: '13rem',
    },
  },
};

export default function MultiSelectFilter(props) {
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
        <label for="countryForm" className="form-label fw-bold">{props.description}</label>
      <FormControl sx={{ m: 1, width: '13rem'}} size="small" id="countryForm">
        <InputLabel id="demo-multiple-checkbox-label">{props.title}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Countries" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {props.items.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.includes(name)} sx={{m:0,p:0}}/>
              <Typography variant="body2">{name}</Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
