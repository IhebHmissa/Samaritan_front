import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import HistoryLineActions from './history-line.reducer';
import styles from './history-line-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function HistoryLineScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { historyLine, historyLineList, getAllHistoryLines, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('HistoryLine entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchHistoryLines();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [historyLine, fetchHistoryLines]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('HistoryLineDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No HistoryLines Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchHistoryLines = React.useCallback(() => {
    getAllHistoryLines({ page: page - 1, sort, size });
  }, [getAllHistoryLines, page, sort, size]);

  const handleLoadMore = () => {
    if (historyLineList.length) {
      return;
    }
    setPage(page + 1);
    fetchHistoryLines();
  };
  return (
    <View style={styles.container} testID="historyLineScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={historyLineList}
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
    historyLineList: state.historyLines.historyLineList,
    historyLine: state.historyLines.historyLine,
    fetching: state.historyLines.fetchingAll,
    error: state.historyLines.errorAll,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllHistoryLines: (options) => dispatch(HistoryLineActions.historyLineAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryLineScreen);
