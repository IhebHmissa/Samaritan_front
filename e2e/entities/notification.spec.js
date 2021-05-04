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

describe('Notification Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToNotificationScreen();
  });

  const navigateToNotificationScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('notificationEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('notificationEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('notificationScreen');
  };

  it('should allow you to create, update, and delete the Notification entity', async () => {
    await expect(element(by.id('notificationScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('notificationEditScrollView');
    await scrollTo('timestampInput', 'notificationEditScrollView');
    await setDateTimePickerValue('timestampInput', '2021-04-29T02:30:00+02:00', 'ISO8601');
    await scrollTo('lieuInput', 'notificationEditScrollView');
    await element(by.id('lieuInput')).replaceText('morph');
    await scrollTo('timewindow2Input', 'notificationEditScrollView');
    await element(by.id('timewindow2Input')).replaceText('5670');
    await element(by.id('notificationEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'notificationEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('notificationDetailScrollView');
    await scrollTo('timestamp', 'notificationDetailScrollView');
    const timestampCreateAttributes = await element(by.id('timestamp')).getAttributes();
    jestExpect(Date.parse(timestampCreateAttributes.label)).toEqual(Date.parse('2021-04-29T02:30:00+02:00'));
    await scrollTo('lieu', 'notificationDetailScrollView');
    await expect(element(by.id('lieu'))).toHaveLabel('morph');
    await scrollTo('timewindow2', 'notificationDetailScrollView');
    await expect(element(by.id('timewindow2'))).toHaveLabel('5670');

    // update
    await scrollTo('notificationEditButton', 'notificationDetailScrollView');
    await tapFirstElementByLabel('Notification Edit Button');
    await waitForElementToBeVisibleById('notificationEditScrollView');
    await scrollTo('timestampInput', 'notificationEditScrollView');
    await setDateTimePickerValue('timestampInput', '2021-04-29T06:15:00+02:00', 'ISO8601');
    await scrollTo('lieuInput', 'notificationEditScrollView');
    await element(by.id('lieuInput')).replaceText('morph');
    await scrollTo('timewindow2Input', 'notificationEditScrollView');
    await element(by.id('timewindow2Input')).replaceText('29177');
    await element(by.id('notificationEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'notificationEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('notificationDetailScrollView');
    await scrollTo('timestamp', 'notificationDetailScrollView');
    const timestampUpdateAttributes = await element(by.id('timestamp')).getAttributes();
    jestExpect(Date.parse(timestampUpdateAttributes.label)).toEqual(Date.parse('2021-04-29T06:15:00+02:00'));
    await scrollTo('lieu', 'notificationDetailScrollView');
    await expect(element(by.id('lieu'))).toHaveLabel('morph');
    await scrollTo('timewindow2', 'notificationDetailScrollView');
    await expect(element(by.id('timewindow2'))).toHaveLabel('29177');

    // delete
    await scrollTo('notificationDeleteButton', 'notificationDetailScrollView');
    await waitThenTapButton('notificationDeleteButton');
    await waitForElementToBeVisibleById('notificationDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('notificationScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
