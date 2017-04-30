export default (styles, strings) => ([
  {
    type: 'Label',
    text: strings.currency,
    containerClass: styles.currencyColumn
  },
  {
    type: 'Input',
    name: 'amount',
    value: '',
    isInvalid: true,
    validator: 'PRICE',
    containerClass: styles.amountColumn
  },
  {
    type: 'Label',
    text: strings.for,
    containerClass: styles.forColumn
  },
  {
    type: 'Input',
    name: 'type',
    value: '',
    isInvalid: true,
    validator: 'NOT_EMPTY',
    containerClass: styles.typeColumn
  },
  {
    type: 'Button',
    text: strings.save,
    containerClass: styles.buttonColumn
  }
])
