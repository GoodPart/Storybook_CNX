<template>
  <button
    :class="['button', `button--${variant}`, `button--${size}`]"
    :disabled="disabled"
    @click="handleClick"
  >
    <span v-if="icon" class="btn-icon">{{ icon }}</span>
    {{ text }}
  </button>
</template>

<script setup>
import './Button.css';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  } 
});

const emit = defineEmits(['click']);

const handleClick = (event) => {
  emit('click', event);
};
</script> 