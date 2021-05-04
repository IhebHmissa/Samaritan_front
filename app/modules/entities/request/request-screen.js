import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import RequestActions from './request.reducer';
import styles from './request-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function RequestScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { request, requestList, getAllRequests, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('Request entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchRequests();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [request, fetchRequests]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('RequestDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Requests Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchRequests = React.useCallback(() => {
    getAllRequests({ page: page - 1, sort, size });
  }, [getAllRequests, page, sort, size]);

  const handleLoadMore = () => {
    if (requestList.length) {
      return;
    }
    setPage(page + 1);
    fetchRequests();
  };
  return (
    <View style={styles.container} testID="requestScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={requestList}
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
    requestList: state.requests.requestList,
    request: state.requests.request,
    fetching: state.requests.fetchingAll,
    error: state.requests.errorAll,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllRequests: (options) => dispatch(RequestActions.requestAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestScreen);
