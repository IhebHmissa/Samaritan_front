import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import ReclRepActions from './recl-rep.reducer';
import styles from './recl-rep-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function ReclRepScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { reclRep, reclRepList, getAllReclReps, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('ReclRep entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchReclReps();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [reclRep, fetchReclReps]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('ReclRepDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No ReclReps Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchReclReps = React.useCallback(() => {
    getAllReclReps({ page: page - 1, sort, size });
  }, [getAllReclReps, page, sort, size]);

  const handleLoadMore = () => {
    if (reclRepList.length) {
      return;
    }
    setPage(page + 1);
    fetchReclReps();
  };
  return (
    <View style={styles.container} testID="reclRepScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={reclRepList}
        renderItem={renderRow}
        keyExtractor={keyExtractor}
        initialNumToRender={oneScreensWorth}
        onEndReached={handleLoadMore}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    reclRepList: state.reclReps.reclRepList,
    reclRep: state.reclReps.reclRep,
    fetching: state.reclReps.fetchingAll,
    error: state.reclReps.errorAll,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllReclReps: (options) => dispatch(ReclRepActions.reclRepAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReclRepScreen);
