<template>
  <div class="input-group">
    <label :for="name" v-if="label">{{ label }}</label>
    <select v-model="internalValue" :name="name" :id="name" :disabled="disabled">
      <option disabled selected value="">{{message}}</option>
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
      default: undefined,
    },
    name: {
      type: String,
      required: true,
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
  display: inline-flex;
  flex-flow: column nowrap;
  align-items: flex-start;
}
</style>
