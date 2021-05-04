import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import NotificationActions from './notification.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './notification-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  timestamp: Yup.date().required(),
  lieu: Yup.string().required(),
  timewindow2: Yup.number().required(),
});

function NotificationEditScreen(props) {
  const {
    getNotification,
    updateNotification,
    route,
    notification,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getNotification(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getNotification, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(notification));
    }
  }, [notification, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {}, []);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack()
          ? navigation.replace('NotificationDetail', { entityId: notification?.id })
          : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateNotification(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const timestampRef = createRef();
  const lieuRef = createRef();
  const timewindow2Ref = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="notificationEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} validationSchema={validationSchema} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name="timestamp"
              ref={timestampRef}
              label="Timestamp"
              placeholder="Enter Timestamp"
              testID="timestampInput"
              inputType="datetime"
              onSubmitEditing={() => lieuRef.current?.focus()}
            />
            <FormField
              name="lieu"
              ref={lieuRef}
              label="Lieu"
              placeholder="Enter Lieu"
              testID="lieuInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => timewindow2Ref.current?.focus()}
            />
            <FormField
              name="timewindow2"
              ref={timewindow2Ref}
              label="Timewindow 2"
              placeholder="Enter Timewindow 2"
              testID="timewindow2Input"
              inputType="number"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />

            <FormButton title={'Save'} testID={'submitButton'} />
          </Form>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
}

// convenience methods for customizing the mapping of the entity to/from the form value
const entityToFormValue = (value) => {
  if (!value) {
    return {};
  }
  return {
    id: value.id ?? null,
    timestamp: value.timestamp ?? null,
    lieu: value.lieu ?? null,
    timewindow2: value.timewindow2 ?? null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    timestamp: value.timestamp ?? null,
    lieu: value.lieu ?? null,
    timewindow2: value.timewindow2 ?? null,
  };
  return entity;
};

const mapStateToProps = (state) => {
  return {
    notification: state.notifications.notification,
    fetching: state.notifications.fetchingOne,
    updating: state.notifications.updating,
    updateSuccess: state.notifications.updateSuccess,
    errorUpdating: state.notifications.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNotification: (id) => dispatch(NotificationActions.notificationRequest(id)),
    getAllNotifications: (options) => dispatch(NotificationActions.notificationAllRequest(options)),
    updateNotification: (notification) => dispatch(NotificationActions.notificationUpdateRequest(notification)),
    reset: () => dispatch(NotificationActions.notificationReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationEditScreen);
