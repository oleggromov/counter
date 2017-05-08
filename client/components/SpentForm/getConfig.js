export default (styles, strings) => ([
  {
    type: 'Label',
    text: strings.currency,
    containerClass: styles.currency
  },
  {
    type: 'Input',
    name: 'value',
    value: '',
    isInvalid: true,
    validator: 'PRICE',
    containerClass: styles.value
  },
  {
    type: 'Label',
    text: strings.for,
    containerClass: styles.for
  },
  {
    type: 'Input',
    name: 'name',
    value: '',
    isInvalid: true,
    validator: 'NOT_EMPTY',
    containerClass: styles.name
  },
  {
    type: 'Button',
    text: strings.save,
    containerClass: styles.button
  }
])
