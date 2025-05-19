<template>
  <input
    :type="type"
    :value="value"
    :placeholder="placeholder"
    :disabled="disabled"
    :class="['input', `input--${themeColor}`, `input--${size}`]"
    @input="handleInput"
  />
</template>

<script setup>
import './Input.css';

const props = defineProps({
  value: {
    type: [String, Number],
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  themeColor: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'transparent', 'primary', 'warning'].includes(value)
  },
  size: {
    type: String,
    default: 's',
    validator: (value) => ['s', 'm', 'l', 'xl'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:value']);

const handleInput = (event) => {
  emit('update:value', event.target.value);
};
</script> 