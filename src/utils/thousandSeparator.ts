const thousandSeparator = (text= '', separator =  ' ') => {
  text = text.toString().replace(' ', '')
  return text.replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${separator}`)
}

export default thousandSeparator
