import { Platform, Linking } from 'react-native';
import SafariView from 'react-native-safari-view';
import { CustomTabs } from 'react-native-custom-tabs';

let safariViewAvailable = null;

async function openURL(url, opts) {
  if (Platform.OS === 'ios') {
    if (safariViewAvailable === null) {
      safariViewAvailable = await SafariView.isAvailable();
    }

    if (safariViewAvailable) {
      return SafariView.show({
        url,
        ...opts,
      });
    } else {
      Linking.openUrl(url, opts);
    }
  } else {
    return CustomTabs.openUrl(url, opts);
  }
}

export default {
  openURL,
};
