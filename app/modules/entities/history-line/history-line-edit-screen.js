import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import HistoryLineActions from './history-line.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './history-line-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  timestamp: Yup.date().required(),
  agentID: Yup.string().required(),
  typeofhelp: Yup.string().required(),
});

function HistoryLineEditScreen(props) {
  const {
    getHistoryLine,
    updateHistoryLine,
    route,
    historyLine,
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
      getHistoryLine(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getHistoryLine, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(historyLine));
    }
  }, [historyLine, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {}, []);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack() ? navigation.replace('HistoryLineDetail', { entityId: historyLine?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateHistoryLine(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const timestampRef = createRef();
  const agentIDRef = createRef();
  const typeofhelpRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="historyLineEditScrollView"
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
              onSubmitEditing={() => agentIDRef.current?.focus()}
            />
            <FormField
              name="agentID"
              ref={agentIDRef}
              label="Agent ID"
              placeholder="Enter Agent ID"
              testID="agentIDInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => typeofhelpRef.current?.focus()}
            />
            <FormField
              name="typeofhelp"
              ref={typeofhelpRef}
              label="Typeofhelp"
              placeholder="Enter Typeofhelp"
              testID="typeofhelpInput"
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
    timestamp: value.timestamp ?? null,
    agentID: value.agentID ?? null,
    typeofhelp: value.typeofhelp ?? null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    timestamp: value.timestamp ?? null,
    agentID: value.agentID ?? null,
    typeofhelp: value.typeofhelp ?? null,
  };
  return entity;
};

const mapStateToProps = (state) => {
  return {
    historyLine: state.historyLines.historyLine,
    fetching: state.historyLines.fetchingOne,
    updating: state.historyLines.updating,
    updateSuccess: state.historyLines.updateSuccess,
    errorUpdating: state.historyLines.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHistoryLine: (id) => dispatch(HistoryLineActions.historyLineRequest(id)),
    getAllHistoryLines: (options) => dispatch(HistoryLineActions.historyLineAllRequest(options)),
    updateHistoryLine: (historyLine) => dispatch(HistoryLineActions.historyLineUpdateRequest(historyLine)),
    reset: () => dispatch(HistoryLineActions.historyLineReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryLineEditScreen);
