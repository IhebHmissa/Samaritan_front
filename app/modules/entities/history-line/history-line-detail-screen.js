import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import HistoryLineActions from './history-line.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import HistoryLineDeleteModal from './history-line-delete-modal';
import styles from './history-line-styles';

function HistoryLineDetailScreen(props) {
  const { route, getHistoryLine, navigation, historyLine, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = historyLine?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('HistoryLine');
      } else {
        setDeleteModalVisible(false);
        getHistoryLine(routeEntityId);
      }
    }, [routeEntityId, getHistoryLine, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the HistoryLine.</Text>
      </View>
    );
  }
  if (!entityId || fetching || !correctEntityLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="historyLineDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{historyLine.id}</Text>
      {/* Timestamp Field */}
      <Text style={styles.label}>Timestamp:</Text>
      <Text testID="timestamp">{String(historyLine.timestamp)}</Text>
      {/* AgentID Field */}
      <Text style={styles.label}>AgentID:</Text>
      <Text testID="agentID">{historyLine.agentID}</Text>
      {/* Typeofhelp Field */}
      <Text style={styles.label}>Typeofhelp:</Text>
      <Text testID="typeofhelp">{historyLine.typeofhelp}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('HistoryLineEdit', { entityId })}
          accessibilityLabel={'HistoryLine Edit Button'}
          testID="historyLineEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'HistoryLine Delete Button'}
          testID="historyLineDeleteButton"
        />
        {deleteModalVisible && (
          <HistoryLineDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={historyLine}
            testID="historyLineDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    historyLine: state.historyLines.historyLine,
    error: state.historyLines.errorOne,
    fetching: state.historyLines.fetchingOne,
    deleting: state.historyLines.deleting,
    errorDeleting: state.historyLines.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHistoryLine: (id) => dispatch(HistoryLineActions.historyLineRequest(id)),
    getAllHistoryLines: (options) => dispatch(HistoryLineActions.historyLineAllRequest(options)),
    deleteHistoryLine: (id) => dispatch(HistoryLineActions.historyLineDeleteRequest(id)),
    resetHistoryLines: () => dispatch(HistoryLineActions.historyLineReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryLineDetailScreen);
