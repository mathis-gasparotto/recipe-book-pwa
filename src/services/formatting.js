import { Remarkable } from 'remarkable'

export default () => ({
  currencyFormatting(price, showZero = true) {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      trailingZeroDisplay: showZero ? 'auto' : 'stripIfInteger'
    }).format(price)
  },
  timeFormatting(time) {
    let timeFormatting = time.toString().replace(':', 'h')
    return timeFormatting
  },
  timeFormattingFromFloat(time) {
    const hours = Math.floor(time)
    const minutes = Math.round((time - hours) * 60)
    return `${hours > 9 ? hours : '0' + hours}h${minutes > 9 ? minutes : '0' + minutes}`
  },
  timeFormattingFromDateTime(time) {
    return time
      .toLocaleString('fr-FR', {
        hour: 'numeric',
        minute: 'numeric'
      })
      .replace(':', 'h')
  },
  dateTimeFormatting(dateTime) {
    let date = dateTime
    if (typeof dateTime === 'string') {
      date = new Date(dateTime)
    }
    return date
      .toLocaleString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      })
      .replace(':', 'h')
  },
  dateFormatting(dateTime) {
    let date = dateTime
    if (typeof dateTime === 'string') {
      date = new Date(dateTime)
    }
    return date.toLocaleString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  },
  dateTimeFormattingNumeric(dateTime) {
    let date = dateTime
    if (typeof dateTime === 'string') {
      date = new Date(dateTime)
    }
    return date
      .toLocaleString('fr-FR', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      })
      .replace(':', 'h')
      .replace(' ', ' à ')
  },
  dateTimeFormattingFullNumeric(dateTime) {
    let date = dateTime
    if (typeof dateTime === 'string') {
      date = new Date(dateTime)
    }
    return date
      .toLocaleString('fr-FR', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      })
      .replace(':', 'h')
  },
  dateFormattingNumeric(dateTime) {
    let date = dateTime
    if (typeof dateTime === 'string') {
      date = new Date(dateTime)
    }
    return date.toLocaleString('fr-FR', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    })
  },
  maxStringLength(str, max) {
    return str.length > max ? str.substring(0, max) + '...' : str
  },
  mdToHtml(content) {
    const md = new Remarkable()
    return md.render(content)
  }
})
