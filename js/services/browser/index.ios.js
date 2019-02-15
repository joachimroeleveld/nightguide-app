import { Linking } from 'react-native';
import SafariView from 'react-native-safari-view';

let safariViewAvailable = null;

export async function openUrl(url, opts) {
  if (safariViewAvailable === null) {
    safariViewAvailable = await SafariView.isAvailable();
  }

  if (safariViewAvailable) {
    return SafariView.show({
      url,
      ...opts,
    });
  } else {
    return Linking.openUrl(url, opts);
  }
}
