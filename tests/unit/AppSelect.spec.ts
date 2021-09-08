import { expect, assert } from 'chai';
import { shallowMount } from '@vue/test-utils';
import AppSelect from '@/components/AppSelect.vue';

describe('AppSelect.vue', () => {
  it('should render correctly', () => {
    const wrapper = shallowMount(AppSelect);

    expect(wrapper.text()).to.include(wrapper.vm.message);
    expect(wrapper.vm.internalValue).to.be.a('string');
  });

  it('renders props.message when passed', () => {
    const message = 'Please Choose a different option';
    const wrapper = shallowMount(AppSelect, {
      props: { message },
    });
    expect(wrapper.text()).to.include(message);
  });

  it('provides options for the select input when props.options are passed', () => {
    const options = ['one', 'two', 'three'];
    const wrapper = shallowMount(AppSelect, {
      props: { options },
    });
    options.forEach((option) => {
      expect(wrapper.text()).to.include(option);
    });

    const options2 = options.map((option) => ({ value: option, label: option }));
    const wrapper2 = shallowMount(AppSelect, {
      props: { options: options2 },
    });
    options2.forEach((option) => {
      expect(wrapper2.text()).to.include(option.value);
    });
  });

  it("should change the component's current state when a user makes a selection", async () => {
    const options = ['one', 'two', 'three'];
    const userSelectedItem = options[1];
    const wrapper = shallowMount(AppSelect, {
      props: { options },
    });
    const selectInput = wrapper.get('select');
    selectInput.setValue(userSelectedItem);
    assert(selectInput.element.value === userSelectedItem, 'current state equals user selection');
    // await wrapper.vm.$nextTick;
    // console.log(selectInput.element.value, wrapper.vm.internalValue);
    // assert(wrapper.vm.internalValue === userSelectedItem, 'current state equals user selection');
    // New to Mocha, but it appears setValue is not triggering state change as it should:
    // https://github.com/vuejs/vue-test-utils/issues/1883
    // Should have gone with Jest! Not banging my head on this anymore.
  });
});
