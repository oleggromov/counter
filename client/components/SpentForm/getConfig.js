export default (styles, strings) => ([
  {
    type: 'Label',
    text: strings.currency,
    containerClass: styles.currency
  },
  {
    type: 'Input',
    name: 'amount',
    value: '',
    isInvalid: true,
    validator: 'PRICE',
    containerClass: styles.amount
  },
  {
    type: 'Label',
    text: strings.for,
    containerClass: styles.for
  },
  {
    type: 'Input',
    name: 'type',
    value: '',
    isInvalid: true,
    validator: 'NOT_EMPTY',
    containerClass: styles.type
  },
  {
    type: 'Button',
    text: strings.save,
    containerClass: styles.button
  }
])
