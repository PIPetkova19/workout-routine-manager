import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

const MultiDatePicker = (props) => {
  const {
    required = false,
    format = 'MM/DD/YYYY',
    disabled = false,
    onChange,
    inputVariant = 'outlined',
    value = [],
    label
  } = props;

  const removeTime = (date) => date ? dayjs(date).startOf('day') : null;
  const formatDate = (date) => date ? date.format(format) : '';

  const [selectedDates, setSelectedDates] = useState(
    value.map((k) => removeTime(dayjs(k))).filter(Boolean)
  );
  const [pickerValue, setPickerValue] = useState(dayjs());

  useEffect(() => {
    if (onChange) onChange(selectedDates.map(date => date.format('YYYY-MM-DD')));
  }, [selectedDates, onChange]);

  const findDate = (date) => {
    if (!date) return false;
    const formattedDate = formatDate(removeTime(date));
    return selectedDates.some(currentDate => formatDate(currentDate) === formattedDate);
  };

  const handleDateChange = (date) => {
    if (!date) return;
    const dateWithoutTime = removeTime(date);
    const isSelected = findDate(date);
    
    let newSelectedDates;
    if (isSelected) {
      // Remove date
      newSelectedDates = selectedDates.filter(
        currentDate => formatDate(currentDate) !== formatDate(dateWithoutTime)
      );
    } else {
      // Add date
      newSelectedDates = [...selectedDates, dateWithoutTime];
    }

    setSelectedDates(newSelectedDates.sort((a, b) => a.diff(b)));
  };

  const clearDates = () => setSelectedDates([]);

  const CustomDay = (props) => {
    const { day, ...other } = props;
    const isSelected = findDate(day);
    
    return (
      <PickersDay
        {...other}
        day={day}
        selected={isSelected}
        onClick={() => handleDateChange(day)}
        sx={{
          backgroundColor: isSelected ? '#1976d2 !important' : undefined,
          color: isSelected ? 'white !important' : undefined,
          '&:hover': {
            backgroundColor: isSelected ? '#1565c0 !important' : undefined,
          },
        }}
      />
    );
  };

  const inputDates = selectedDates.map((date) => formatDate(date)).join(', ');

  return (
    <div>
      <TextField
        label={label}
        value={inputDates}
        variant={inputVariant}
        disabled={disabled}
        required={required}
        multiline
        maxRows={4}
        fullWidth
        InputProps={{
          readOnly: true,
          endAdornment: !disabled && selectedDates.length > 0 && (
            <button 
              onClick={clearDates}
              style={{ border: 'none', background: 'none', cursor: 'pointer' }}
            >
              ✕
            </button>
          )
        }}
        sx={{ mb: 2 }}
      />
      
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          value={pickerValue}
          onChange={setPickerValue}
          displayStaticWrapperAs="desktop"
          slots={{
            day: CustomDay,
            actionBar: () => null
          }}
        />
      </LocalizationProvider>
    </div>
  );
};

MultiDatePicker.propTypes = {
  disabled: PropTypes.bool,
  format: PropTypes.string,
  inputVariant: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  value: PropTypes.array,
};

export default MultiDatePicker;