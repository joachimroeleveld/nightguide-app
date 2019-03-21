import DeviceInfo from 'react-native-device-info';
import moment from 'moment';
import 'moment-timezone';

moment.tz.setDefault(DeviceInfo.getTimezone());
