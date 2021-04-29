import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import HistoryLineActions from './history-line.reducer';

import styles from './history-line-styles';

function HistoryLineDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteHistoryLine(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('HistoryLine');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete HistoryLine {entity.id}?</Text>
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
    historyLine: state.historyLines.historyLine,
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

export default connect(mapStateToProps, mapDispatchToProps)(HistoryLineDeleteModal);
