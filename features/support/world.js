const { setWorldConstructor } = require('cucumber');
const {expect } = require('chai');
const  puppeteer  = require ( 'puppeteer');

const HOME_PAGE = 'http://localhost:3000';

class AddressBookWorld {
  constructor() {}

  //Open the home page using puppeteer
  //async/await
  async  openHomePage(){
    this.browser = await puppeteer.launch({headless: false, slowMo: 30});
    this.page = await this.browser.newPage();
    await this.page.goto(HOME_PAGE);
  }
  async closeHomePage() {
    await this.browser.close();
  }

  async pageHasTexContent(expectedContent){
    const pageContent = await this.page.content()
    const actualContent = pageContent.match(expectedContent)[0]

    expect(actualContent).to.be.eq(expectedContent)
  }

  async pageHasNoTexContent(expectedContent){
    const pageContent = await this.page.content()
    const actualContent = pageContent.match(expectedContent)

    expect(actualContent).to.be.eq(null)
  }

  async clickOnButton(btnName) {
    const btnSelector = this.btnSelectorFromName(btnName.toLowerCase())
    await this.page.waitForSelector(btnSelector)
    await this.page.click(btnSelector)
  }
  async fillFormField(field, content) {
    const inputSelector = `#contact-${field}`
    await this.page.waitForSelector(inputSelector)
    this.inputElement = await this.page.$(inputSelector)
    await this.inputElement.type(content)
  }
  async checkContactStorage(expectedCount){
    const actualCount = await this.page.evaluate(() =>
    contacts = JSON.parse(window.localStorage.getItem('contacts')).length)
    expect(actualCount).to.be.eq(expectedCount)
  }

  btnSelectorFromName(btnName){
    switch(btnName){
      case 'add contact':
        return '.add-contact'
        break
      case 'save contact':
        return '.save-contact'
        break
      default:
        throw '${btnName}button is not finded'
        break
    }
  }
}

setWorldConstructor(AddressBookWorld);
