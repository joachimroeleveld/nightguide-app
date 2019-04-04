import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

class VenueMap extends React.PureComponent {
  static propTypes = {
    coordinates: PropTypes.shape({
      longitude: PropTypes.number.isRequired,
      latitude: PropTypes.number.isRequired,
    }).isRequired,
  };

  render() {
    return <View style={styles.container} />;
  }
}

export default VenueMap;

const styles = StyleSheet.create({
  container: {},
});
