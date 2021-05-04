import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import ReclRepActions from './recl-rep.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import ReclRepDeleteModal from './recl-rep-delete-modal';
import styles from './recl-rep-styles';

function ReclRepDetailScreen(props) {
  const { route, getReclRep, navigation, reclRep, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = reclRep?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('ReclRep');
      } else {
        setDeleteModalVisible(false);
        getReclRep(routeEntityId);
      }
    }, [routeEntityId, getReclRep, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the ReclRep.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="reclRepDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{reclRep.id}</Text>
      {/* NatureDeReclamation Field */}
      <Text style={styles.label}>NatureDeReclamation:</Text>
      <Text testID="natureDeReclamation">{reclRep.natureDeReclamation}</Text>
      {/* Timestamp Field */}
      <Text style={styles.label}>Timestamp:</Text>
      <Text testID="timestamp">{String(reclRep.timestamp)}</Text>
      {/* RecRep Field */}
      <Text style={styles.label}>RecRep:</Text>
      <Text testID="recRep">{reclRep.recRep}</Text>
      {/* ReclamationDeID Field */}
      <Text style={styles.label}>ReclamationDeID:</Text>
      <Text testID="reclamationDeID">{reclRep.reclamationDeID}</Text>
      {/* Note Field */}
      <Text style={styles.label}>Note:</Text>
      <Text testID="note">{reclRep.note}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('ReclRepEdit', { entityId })}
          accessibilityLabel={'ReclRep Edit Button'}
          testID="reclRepEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'ReclRep Delete Button'}
          testID="reclRepDeleteButton"
        />
        {deleteModalVisible && (
          <ReclRepDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={reclRep}
            testID="reclRepDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    reclRep: state.reclReps.reclRep,
    error: state.reclReps.errorOne,
    fetching: state.reclReps.fetchingOne,
    deleting: state.reclReps.deleting,
    errorDeleting: state.reclReps.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getReclRep: (id) => dispatch(ReclRepActions.reclRepRequest(id)),
    getAllReclReps: (options) => dispatch(ReclRepActions.reclRepAllRequest(options)),
    deleteReclRep: (id) => dispatch(ReclRepActions.reclRepDeleteRequest(id)),
    resetReclReps: () => dispatch(ReclRepActions.reclRepReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReclRepDetailScreen);
