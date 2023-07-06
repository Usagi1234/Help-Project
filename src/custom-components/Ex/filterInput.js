import React from 'react'
import PropTypes from 'prop-types'
import { TextField } from '@mui/material'

const FilterInput = ({ value, onChange, type, filterType, label, placeholder, error }) => {
  const handleChange = e => {
    const { value } = e.target
    let updatedValue = value

    if (filterType === 'th') {
      updatedValue = updatedValue.replace(/[^ก-๙เ\s]/g, '')
    } else if (filterType === 'en') {
      updatedValue = updatedValue.replace(/[^a-zA-Z\s]/g, '')
    } else if (filterType === 'email') {
      updatedValue = updatedValue.replace(/[^A-Za-z0-9.@+-]|[@][^A-Za-z0-9.@+-\u0E01-\u0E5B]/g, '')
    } else if (filterType === 'tel') {
      updatedValue = updatedValue.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
    } else if (filterType === 'code') {
      updatedValue = updatedValue.replace(/[^a-zA-Z0-9\s]/g, '')
    }

    onChange(updatedValue)
  }

  return (
    <TextField
      fullWidth
      label={label}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      error={error}
    />
  )
}

FilterInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  filterType: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.bool
}

export default FilterInput
