import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import ReclRepActions from './recl-rep.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './recl-rep-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  natureDeReclamation: Yup.string().required(),
  timestamp: Yup.date().required(),
  recRep: Yup.string().required(),
  note: Yup.string().required(),
});

function ReclRepEditScreen(props) {
  const { getReclRep, updateReclRep, route, reclRep, fetching, updating, errorUpdating, updateSuccess, navigation, reset } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getReclRep(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getReclRep, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(reclRep));
    }
  }, [reclRep, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {}, []);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack() ? navigation.replace('ReclRepDetail', { entityId: reclRep?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateReclRep(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const natureDeReclamationRef = createRef();
  const timestampRef = createRef();
  const recRepRef = createRef();
  const reclamationDeIDRef = createRef();
  const noteRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="reclRepEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} validationSchema={validationSchema} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name="natureDeReclamation"
              ref={natureDeReclamationRef}
              label="Nature De Reclamation"
              placeholder="Enter Nature De Reclamation"
              testID="natureDeReclamationInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => timestampRef.current?.focus()}
            />
            <FormField
              name="timestamp"
              ref={timestampRef}
              label="Timestamp"
              placeholder="Enter Timestamp"
              testID="timestampInput"
              inputType="datetime"
              onSubmitEditing={() => recRepRef.current?.focus()}
            />
            <FormField
              name="recRep"
              ref={recRepRef}
              label="Rec Rep"
              placeholder="Enter Rec Rep"
              testID="recRepInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => reclamationDeIDRef.current?.focus()}
            />
            <FormField
              name="reclamationDeID"
              ref={reclamationDeIDRef}
              label="Reclamation De ID"
              placeholder="Enter Reclamation De ID"
              testID="reclamationDeIDInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => noteRef.current?.focus()}
            />
            <FormField
              name="note"
              ref={noteRef}
              label="Note"
              placeholder="Enter Note"
              testID="noteInput"
              inputType="text"
              autoCapitalize="none"
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
    natureDeReclamation: value.natureDeReclamation ?? null,
    timestamp: value.timestamp ?? null,
    recRep: value.recRep ?? null,
    reclamationDeID: value.reclamationDeID ?? null,
    note: value.note ?? null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    natureDeReclamation: value.natureDeReclamation ?? null,
    timestamp: value.timestamp ?? null,
    recRep: value.recRep ?? null,
    reclamationDeID: value.reclamationDeID ?? null,
    note: value.note ?? null,
  };
  return entity;
};

const mapStateToProps = (state) => {
  return {
    reclRep: state.reclReps.reclRep,
    fetching: state.reclReps.fetchingOne,
    updating: state.reclReps.updating,
    updateSuccess: state.reclReps.updateSuccess,
    errorUpdating: state.reclReps.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getReclRep: (id) => dispatch(ReclRepActions.reclRepRequest(id)),
    getAllReclReps: (options) => dispatch(ReclRepActions.reclRepAllRequest(options)),
    updateReclRep: (reclRep) => dispatch(ReclRepActions.reclRepUpdateRequest(reclRep)),
    reset: () => dispatch(ReclRepActions.reclRepReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReclRepEditScreen);
