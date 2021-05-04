const jestExpect = require('expect');
const {
  reloadApp,
  loginAsUser,
  logout,
  goBack,
  tapFirstElementByLabel,
  openAndTapDrawerMenuItemByLabel,
  waitThenTapButton,
  waitForElementToBeVisibleById,
  setDateTimePickerValue,
  scrollTo,
} = require('../utils');

describe('ReclRep Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToReclRepScreen();
  });

  const navigateToReclRepScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('reclRepEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('reclRepEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('reclRepScreen');
  };

  it('should allow you to create, update, and delete the ReclRep entity', async () => {
    await expect(element(by.id('reclRepScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('reclRepEditScrollView');
    await scrollTo('natureDeReclamationInput', 'reclRepEditScrollView');
    await element(by.id('natureDeReclamationInput')).replaceText('Refined');
    await scrollTo('timestampInput', 'reclRepEditScrollView');
    await setDateTimePickerValue('timestampInput', '2021-04-29T16:35:00+02:00', 'ISO8601');
    await scrollTo('recRepInput', 'reclRepEditScrollView');
    await element(by.id('recRepInput')).replaceText('Metal Sharable Books');
    await scrollTo('reclamationDeIDInput', 'reclRepEditScrollView');
    await element(by.id('reclamationDeIDInput')).replaceText('Clothing Bedfordshire');
    await scrollTo('noteInput', 'reclRepEditScrollView');
    await element(by.id('noteInput')).replaceText('GB Steel');
    await element(by.id('reclRepEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'reclRepEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('reclRepDetailScrollView');
    await scrollTo('natureDeReclamation', 'reclRepDetailScrollView');
    await expect(element(by.id('natureDeReclamation'))).toHaveLabel('Refined');
    await scrollTo('timestamp', 'reclRepDetailScrollView');
    const timestampCreateAttributes = await element(by.id('timestamp')).getAttributes();
    jestExpect(Date.parse(timestampCreateAttributes.label)).toEqual(Date.parse('2021-04-29T16:35:00+02:00'));
    await scrollTo('recRep', 'reclRepDetailScrollView');
    await expect(element(by.id('recRep'))).toHaveLabel('Metal Sharable Books');
    await scrollTo('reclamationDeID', 'reclRepDetailScrollView');
    await expect(element(by.id('reclamationDeID'))).toHaveLabel('Clothing Bedfordshire');
    await scrollTo('note', 'reclRepDetailScrollView');
    await expect(element(by.id('note'))).toHaveLabel('GB Steel');

    // update
    await scrollTo('reclRepEditButton', 'reclRepDetailScrollView');
    await tapFirstElementByLabel('ReclRep Edit Button');
    await waitForElementToBeVisibleById('reclRepEditScrollView');
    await scrollTo('natureDeReclamationInput', 'reclRepEditScrollView');
    await element(by.id('natureDeReclamationInput')).replaceText('Refined');
    await scrollTo('timestampInput', 'reclRepEditScrollView');
    await setDateTimePickerValue('timestampInput', '2021-04-29T11:57:00+02:00', 'ISO8601');
    await scrollTo('recRepInput', 'reclRepEditScrollView');
    await element(by.id('recRepInput')).replaceText('Metal Sharable Books');
    await scrollTo('reclamationDeIDInput', 'reclRepEditScrollView');
    await element(by.id('reclamationDeIDInput')).replaceText('Clothing Bedfordshire');
    await scrollTo('noteInput', 'reclRepEditScrollView');
    await element(by.id('noteInput')).replaceText('GB Steel');
    await element(by.id('reclRepEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'reclRepEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('reclRepDetailScrollView');
    await scrollTo('natureDeReclamation', 'reclRepDetailScrollView');
    await expect(element(by.id('natureDeReclamation'))).toHaveLabel('Refined');
    await scrollTo('timestamp', 'reclRepDetailScrollView');
    const timestampUpdateAttributes = await element(by.id('timestamp')).getAttributes();
    jestExpect(Date.parse(timestampUpdateAttributes.label)).toEqual(Date.parse('2021-04-29T11:57:00+02:00'));
    await scrollTo('recRep', 'reclRepDetailScrollView');
    await expect(element(by.id('recRep'))).toHaveLabel('Metal Sharable Books');
    await scrollTo('reclamationDeID', 'reclRepDetailScrollView');
    await expect(element(by.id('reclamationDeID'))).toHaveLabel('Clothing Bedfordshire');
    await scrollTo('note', 'reclRepDetailScrollView');
    await expect(element(by.id('note'))).toHaveLabel('GB Steel');

    // delete
    await scrollTo('reclRepDeleteButton', 'reclRepDetailScrollView');
    await waitThenTapButton('reclRepDeleteButton');
    await waitForElementToBeVisibleById('reclRepDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('reclRepScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
