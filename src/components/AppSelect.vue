<template>
  <div class="input-group">
    <label :for="name" v-if="label">{{ label }}</label>
    <select
      v-model="internalValue"
      :name="name"
      :id="name"
      :disabled="disabled"
    >
      <option disabled selected value="">{{ message }}</option>
      <option v-for="(option, i) in options" :key="i" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppSelect',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    options: {
      type: Array as () => string[],
      default: () => [],
    },
    name: {
      type: String,
      required: false,
    },
    label: {
      type: String,
      required: false,
    },
    message: {
      type: String,
      default: 'Please Choose an Option',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    internalValue: {
      get(): string {
        return this.modelValue;
      },
      set(newVal: string): void {
        this.$emit('update:modelValue', newVal);
      },
    },
  },
});
</script>
<style lang="scss">
.input-group {
  padding-left: 1rem;
  padding-right: 1rem;
  margin-bottom: 2rem;
  label {
    display: inline-block;
    font-weight: bold;
    padding-bottom: 0.5rem;
  }
  select {
    border: 1px solid #cecece;
    background-color: #fff;
    display: block;
    width: 100%;
    height: 2.25rem;
    padding: 0 0.5em;
    font-size: 16px;
    &:disabled {
     //match the bg color of the multi-select component when disabled
     background-color: var(--ms-bg-disabled,#f3f4f6);
    }
  }
}
</style>
