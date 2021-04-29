import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import RequestActions from './request.reducer';

import styles from './request-styles';

function RequestDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteRequest(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Request');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete Request {entity.id}?</Text>
          </View>
          <View style={[styles.flexRow]}>
            <TouchableHighlight
              style={[styles.openButton, styles.cancelButton]}
              onPress={() => {
                setVisible(false);
              }}>
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.openButton, styles.submitButton]} onPress={deleteEntity} testID="deleteButton">
              <Text style={styles.textStyle}>Delete</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    request: state.requests.request,
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

export default connect(mapStateToProps, mapDispatchToProps)(RequestDeleteModal);
