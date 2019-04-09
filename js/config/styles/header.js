import colors from './colors';
import dimensions from './dimensions';

const defaultHeaderStyles = {
  headerStyle: {
    backgroundColor: colors.defaultScreenColor,
    borderBottomWidth: 0,
  },
  headerTitleStyle: {
    fontSize: 14,
    color: colors.textDefault,
    fontWeight: '400',
  },
  headerLeftContainerStyle: {
    paddingLeft: dimensions.screenOffset,
  },
  headerRightContainerStyle: {
    paddingRight: dimensions.screenOffset,
  },
};

export default {
  defaultHeaderStyles,
};
