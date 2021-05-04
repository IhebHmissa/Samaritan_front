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

describe('HistoryLine Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToHistoryLineScreen();
  });

  const navigateToHistoryLineScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('historyLineEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('historyLineEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('historyLineScreen');
  };

  it('should allow you to create, update, and delete the HistoryLine entity', async () => {
    await expect(element(by.id('historyLineScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('historyLineEditScrollView');
    await scrollTo('timestampInput', 'historyLineEditScrollView');
    await setDateTimePickerValue('timestampInput', '2021-04-29T16:05:00+02:00', 'ISO8601');
    await scrollTo('agentIDInput', 'historyLineEditScrollView');
    await element(by.id('agentIDInput')).replaceText('24/7 cyan quantify');
    await scrollTo('typeofhelpInput', 'historyLineEditScrollView');
    await element(by.id('typeofhelpInput')).replaceText('South hacking JSON');
    await element(by.id('historyLineEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'historyLineEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('historyLineDetailScrollView');
    await scrollTo('timestamp', 'historyLineDetailScrollView');
    const timestampCreateAttributes = await element(by.id('timestamp')).getAttributes();
    jestExpect(Date.parse(timestampCreateAttributes.label)).toEqual(Date.parse('2021-04-29T16:05:00+02:00'));
    await scrollTo('agentID', 'historyLineDetailScrollView');
    await expect(element(by.id('agentID'))).toHaveLabel('24/7 cyan quantify');
    await scrollTo('typeofhelp', 'historyLineDetailScrollView');
    await expect(element(by.id('typeofhelp'))).toHaveLabel('South hacking JSON');

    // update
    await scrollTo('historyLineEditButton', 'historyLineDetailScrollView');
    await tapFirstElementByLabel('HistoryLine Edit Button');
    await waitForElementToBeVisibleById('historyLineEditScrollView');
    await scrollTo('timestampInput', 'historyLineEditScrollView');
    await setDateTimePickerValue('timestampInput', '2021-04-29T00:24:00+02:00', 'ISO8601');
    await scrollTo('agentIDInput', 'historyLineEditScrollView');
    await element(by.id('agentIDInput')).replaceText('24/7 cyan quantify');
    await scrollTo('typeofhelpInput', 'historyLineEditScrollView');
    await element(by.id('typeofhelpInput')).replaceText('South hacking JSON');
    await element(by.id('historyLineEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'historyLineEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('historyLineDetailScrollView');
    await scrollTo('timestamp', 'historyLineDetailScrollView');
    const timestampUpdateAttributes = await element(by.id('timestamp')).getAttributes();
    jestExpect(Date.parse(timestampUpdateAttributes.label)).toEqual(Date.parse('2021-04-29T00:24:00+02:00'));
    await scrollTo('agentID', 'historyLineDetailScrollView');
    await expect(element(by.id('agentID'))).toHaveLabel('24/7 cyan quantify');
    await scrollTo('typeofhelp', 'historyLineDetailScrollView');
    await expect(element(by.id('typeofhelp'))).toHaveLabel('South hacking JSON');

    // delete
    await scrollTo('historyLineDeleteButton', 'historyLineDetailScrollView');
    await waitThenTapButton('historyLineDeleteButton');
    await waitForElementToBeVisibleById('historyLineDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('historyLineScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
