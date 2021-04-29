import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import RequestActions from './request.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './request-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  timestamp: Yup.date().required(),
  lieuDeLaDemande: Yup.string().required(),
  natureDeLaide: Yup.string().required(),
  timewindow: Yup.number().required(),
  degreDugence: Yup.boolean().required(),
});

function RequestEditScreen(props) {
  const { getRequest, updateRequest, route, request, fetching, updating, errorUpdating, updateSuccess, navigation, reset } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getRequest(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getRequest, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(request));
    }
  }, [request, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {}, []);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack() ? navigation.replace('RequestDetail', { entityId: request?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateRequest(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const timestampRef = createRef();
  const lieuDeLaDemandeRef = createRef();
  const natureDeLaideRef = createRef();
  const timewindowRef = createRef();
  const degreDugenceRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="requestEditScrollView"
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
              onSubmitEditing={() => lieuDeLaDemandeRef.current?.focus()}
            />
            <FormField
              name="lieuDeLaDemande"
              ref={lieuDeLaDemandeRef}
              label="Lieu De La Demande"
              placeholder="Enter Lieu De La Demande"
              testID="lieuDeLaDemandeInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => natureDeLaideRef.current?.focus()}
            />
            <FormField
              name="natureDeLaide"
              ref={natureDeLaideRef}
              label="Nature De Laide"
              placeholder="Enter Nature De Laide"
              testID="natureDeLaideInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => timewindowRef.current?.focus()}
            />
            <FormField
              name="timewindow"
              ref={timewindowRef}
              label="Timewindow"
              placeholder="Enter Timewindow"
              testID="timewindowInput"
              inputType="number"
              onSubmitEditing={() => degreDugenceRef.current?.focus()}
            />
            <FormField
              name="degreDugence"
              ref={degreDugenceRef}
              label="Degre Dugence"
              placeholder="Enter Degre Dugence"
              testID="degreDugenceInput"
              inputType="boolean"
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
    lieuDeLaDemande: value.lieuDeLaDemande ?? null,
    natureDeLaide: value.natureDeLaide ?? null,
    timewindow: value.timewindow ?? null,
    degreDugence: value.degreDugence ?? null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    timestamp: value.timestamp ?? null,
    lieuDeLaDemande: value.lieuDeLaDemande ?? null,
    natureDeLaide: value.natureDeLaide ?? null,
    timewindow: value.timewindow ?? null,
    degreDugence: value.degreDugence === null ? false : Boolean(value.degreDugence),
  };
  return entity;
};

const mapStateToProps = (state) => {
  return {
    request: state.requests.request,
    fetching: state.requests.fetchingOne,
    updating: state.requests.updating,
    updateSuccess: state.requests.updateSuccess,
    errorUpdating: state.requests.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRequest: (id) => dispatch(RequestActions.requestRequest(id)),
    getAllRequests: (options) => dispatch(RequestActions.requestAllRequest(options)),
    updateRequest: (request) => dispatch(RequestActions.requestUpdateRequest(request)),
    reset: () => dispatch(RequestActions.requestReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestEditScreen);
