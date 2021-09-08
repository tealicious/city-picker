<template>
  <div class="input-group">
    <label :for="name">
      <span v-if="hasSlotLabel">
        <slot name="label"></slot>
      </span>
      <span v-else>{{ label }}</span>
    </label>
    <Multiselect
      v-if="multi"
      :name="name"
      :id="name"
      v-model="internalValue"
      :disabled="disabled"
      :mode="mode"
      noResultsText="You picked 'em all!"
      :placeholder="message"
      :canClear="false"
      :closeOnSelect="false"
      :searchable="true"
      :createTag="true"
      :options="options"
    >
      <template v-slot:multiplelabel="{ values }">
        <div class="multiselect-multiple-label">
          {{ values.length }} {{ multiSelectedOptionLabel }} selected
        </div>
      </template>
    </Multiselect>
    <select
      v-else
      v-model="internalValue"
      :name="name"
      :id="name"
      :disabled="disabled"
    >
      <option disabled selected value="">{{ message }}</option>
      <option
        v-for="(option, i) in options"
        :key="i"
        :value="option.value ? option.value : option"
      >
        {{ option.label ? option.label : option }}
      </option>
    </select>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Multiselect from '@vueform/multiselect';
import { Option } from '@/types';

export default defineComponent({
  name: 'AppSelect',
  components: {
    Multiselect,
  },
  props: {
    modelValue: {
      type: [String as () => string, Array as () => string[]],
      default: '',
    },
    options: {
      type: Array as () => string[] | Option[],
      default: () => [],
    },
    name: {
      type: String,
    },
    label: {
      type: String,
    },
    message: {
      type: String,
      default: 'Please Choose an Option',
    },
    multiSelectedOptionLabel: {
      type: String,
      default: 'options',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    multi: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String,
    },
  },
  computed: {
    internalValue: {
      get(): string | string[] {
        return this.modelValue;
      },
      set(newVal: string | string[]): void {
        this.$emit('update:modelValue', newVal);
      },
    },
    hasSlotLabel(): boolean {
      return !!this.$slots.label;
    },
  },
});
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss">
$color-disabled: rgb(170, 170, 170);
$red: #d2322d;
$blue: #34799b;
$yellow: #8a6e3c;

.input-group {
  &.fetching {
    label {
      color: #417f42;
    }
  }
  &.has-options {
    label {
      color: $yellow;
    }
  }
  &.has-no-options {
    label {
      color: $red;
    }
  }
  label {
    display: inline-block;
    font-weight: bold;
    padding-bottom: 0.5rem;
    font-size: 18px;
  }
  select {
    border: 1px solid #cecece;
    background-color: #fff;
    display: block;
    width: 100%;
    height: 40px;
    padding: 0 0.5em;
    font-size: 16px;
    &:disabled {
      //match the bg color of the multi-select component when disabled
      background-color: var(--ms-bg-disabled, #f3f4f6);
    }
  }
}

.multiselect,
.multiselect-dropdown {
  border-radius: 0;
}
.multiselect-dropdown {
  max-height: var(--ms-max-height, 10rem);
  border: 1px solid #cecece; // override to match native select styles
  &.is-active {
    box-shadow: none;
  }
}

.multiselect.is-active,
select:focus,
select:active {
  box-shadow: none;
  outline: 5px auto Highlight;
  outline: 5px auto -webkit-focus-ring-color;
}

.multiselect.is-disabled {
  color: $color-disabled;
}
</style>
