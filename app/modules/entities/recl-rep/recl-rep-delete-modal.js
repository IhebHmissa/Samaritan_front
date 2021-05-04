import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import ReclRepActions from './recl-rep.reducer';

import styles from './recl-rep-styles';

function ReclRepDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteReclRep(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('ReclRep');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete ReclRep {entity.id}?</Text>
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
    reclRep: state.reclReps.reclRep,
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

export default connect(mapStateToProps, mapDispatchToProps)(ReclRepDeleteModal);
