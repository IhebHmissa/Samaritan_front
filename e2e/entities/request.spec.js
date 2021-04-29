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

describe('Request Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToRequestScreen();
  });

  const navigateToRequestScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('requestEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('requestEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('requestScreen');
  };

  it('should allow you to create, update, and delete the Request entity', async () => {
    await expect(element(by.id('requestScreen'))).toBeVisible();

    // create
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('requestEditScrollView');
    await scrollTo('timestampInput', 'requestEditScrollView');
    await setDateTimePickerValue('timestampInput', '2021-04-29T03:03:00+02:00', 'ISO8601');
    await scrollTo('lieuDeLaDemandeInput', 'requestEditScrollView');
    await element(by.id('lieuDeLaDemandeInput')).replaceText('invoice payment');
    await scrollTo('natureDeLaideInput', 'requestEditScrollView');
    await element(by.id('natureDeLaideInput')).replaceText('Interface Car');
    await scrollTo('timewindowInput', 'requestEditScrollView');
    await element(by.id('timewindowInput')).replaceText('94778');
    await scrollTo('degreDugenceInput', 'requestEditScrollView');
    await toggleSwitchToValue('degreDugenceInput', false);
    await element(by.id('requestEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'requestEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the creation
    await waitForElementToBeVisibleById('requestDetailScrollView');
    await scrollTo('timestamp', 'requestDetailScrollView');
    const timestampCreateAttributes = await element(by.id('timestamp')).getAttributes();
    jestExpect(Date.parse(timestampCreateAttributes.label)).toEqual(Date.parse('2021-04-29T03:03:00+02:00'));
    await scrollTo('lieuDeLaDemande', 'requestDetailScrollView');
    await expect(element(by.id('lieuDeLaDemande'))).toHaveLabel('invoice payment');
    await scrollTo('natureDeLaide', 'requestDetailScrollView');
    await expect(element(by.id('natureDeLaide'))).toHaveLabel('Interface Car');
    await scrollTo('timewindow', 'requestDetailScrollView');
    await expect(element(by.id('timewindow'))).toHaveLabel('94778');
    await scrollTo('degreDugence', 'requestDetailScrollView');
    await expect(element(by.id('degreDugence'))).toHaveLabel('false');

    // update
    await scrollTo('requestEditButton', 'requestDetailScrollView');
    await tapFirstElementByLabel('Request Edit Button');
    await waitForElementToBeVisibleById('requestEditScrollView');
    await scrollTo('timestampInput', 'requestEditScrollView');
    await setDateTimePickerValue('timestampInput', '2021-04-29T18:14:00+02:00', 'ISO8601');
    await scrollTo('lieuDeLaDemandeInput', 'requestEditScrollView');
    await element(by.id('lieuDeLaDemandeInput')).replaceText('invoice payment');
    await scrollTo('natureDeLaideInput', 'requestEditScrollView');
    await element(by.id('natureDeLaideInput')).replaceText('Interface Car');
    await scrollTo('timewindowInput', 'requestEditScrollView');
    await element(by.id('timewindowInput')).replaceText('52956');
    await scrollTo('degreDugenceInput', 'requestEditScrollView');
    await toggleSwitchToValue('degreDugenceInput', true);
    await element(by.id('requestEditScrollView')).swipe('down', 'slow');
    await scrollTo('submitButton', 'requestEditScrollView');
    await waitThenTapButton('submitButton');

    // view - validate the update
    await waitForElementToBeVisibleById('requestDetailScrollView');
    await scrollTo('timestamp', 'requestDetailScrollView');
    const timestampUpdateAttributes = await element(by.id('timestamp')).getAttributes();
    jestExpect(Date.parse(timestampUpdateAttributes.label)).toEqual(Date.parse('2021-04-29T18:14:00+02:00'));
    await scrollTo('lieuDeLaDemande', 'requestDetailScrollView');
    await expect(element(by.id('lieuDeLaDemande'))).toHaveLabel('invoice payment');
    await scrollTo('natureDeLaide', 'requestDetailScrollView');
    await expect(element(by.id('natureDeLaide'))).toHaveLabel('Interface Car');
    await scrollTo('timewindow', 'requestDetailScrollView');
    await expect(element(by.id('timewindow'))).toHaveLabel('52956');
    await scrollTo('degreDugence', 'requestDetailScrollView');
    await expect(element(by.id('degreDugence'))).toHaveLabel('true');

    // delete
    await scrollTo('requestDeleteButton', 'requestDetailScrollView');
    await waitThenTapButton('requestDeleteButton');
    await waitForElementToBeVisibleById('requestDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('requestScreen');

    // logout
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
