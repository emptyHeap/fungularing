class timeController {
  constructor() {
    this.url = 'https://github.com/preboot/angular-webpack'
    this.firstName = 'Why am i writing it?'
    this.secondName = 'functions passed as plain text here'
    this.date = new Date()
  }
  getDate() {
    return new Date()
  }
  refreshDate() {
    this.date = new Date()
  }
}

export default timeController
