import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import RequestActions from './request.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import RequestDeleteModal from './request-delete-modal';
import styles from './request-styles';

function RequestDetailScreen(props) {
  const { route, getRequest, navigation, request, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = request?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('Request');
      } else {
        setDeleteModalVisible(false);
        getRequest(routeEntityId);
      }
    }, [routeEntityId, getRequest, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the Request.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="requestDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{request.id}</Text>
      {/* Timestamp Field */}
      <Text style={styles.label}>Timestamp:</Text>
      <Text testID="timestamp">{String(request.timestamp)}</Text>
      {/* LieuDeLaDemande Field */}
      <Text style={styles.label}>LieuDeLaDemande:</Text>
      <Text testID="lieuDeLaDemande">{request.lieuDeLaDemande}</Text>
      {/* NatureDeLaide Field */}
      <Text style={styles.label}>NatureDeLaide:</Text>
      <Text testID="natureDeLaide">{request.natureDeLaide}</Text>
      {/* Timewindow Field */}
      <Text style={styles.label}>Timewindow:</Text>
      <Text testID="timewindow">{request.timewindow}</Text>
      {/* DegreDugence Field */}
      <Text style={styles.label}>DegreDugence:</Text>
      <Text testID="degreDugence">{String(request.degreDugence)}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('RequestEdit', { entityId })}
          accessibilityLabel={'Request Edit Button'}
          testID="requestEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'Request Delete Button'}
          testID="requestDeleteButton"
        />
        {deleteModalVisible && (
          <RequestDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={request}
            testID="requestDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    request: state.requests.request,
    error: state.requests.errorOne,
    fetching: state.requests.fetchingOne,
    deleting: state.requests.deleting,
    errorDeleting: state.requests.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRequest: (id) => dispatch(RequestActions.requestRequest(id)),
    getAllRequests: (options) => dispatch(RequestActions.requestAllRequest(options)),
    deleteRequest: (id) => dispatch(RequestActions.requestDeleteRequest(id)),
    resetRequests: () => dispatch(RequestActions.requestReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestDetailScreen);
