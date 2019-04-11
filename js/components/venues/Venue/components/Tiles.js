import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Image } from 'react-native';
import _ from 'lodash';
import TouchableScale from 'react-native-touchable-scale';

import Text from '../../../Text';
import __, { _o } from '../../../../services/i18n';
import S from '../../../../config/styles';
import {
  getSymbolForCurrency,
  formatAmount,
} from '../../../../services/currencies';
import Modal from '../../../Modal';
import { VENUE_FACILITIES } from '../../../../config/venueConstants';
import Section from '../../../Section';

function VenueTile({
  title,
  subtitle,
  iconId,
  dialogTitle,
  dialogContent,
  style,
}) {
  const [showDialog, setShowDialog] = useState(false);

  const toggleDialog = () => setShowDialog(!showDialog);

  const content = (
    <React.Fragment>
      <Image source={{ uri: `tile_${iconId}` }} style={styles.tileIcon} />
      <View style={styles.tileTextContainer}>
        <Text style={styles.tileTitle}>{title}</Text>
        {!!subtitle && <Text style={styles.tileSubtitle}>{subtitle}</Text>}
      </View>
      {!!dialogContent && (
        <React.Fragment>
          <Image
            source={require('../../../../img/info.png')}
            style={styles.tileInfoIcon}
          />
          <Modal
            visible={showDialog}
            title={dialogTitle}
            onRequestClose={toggleDialog}
          >
            {dialogContent}
          </Modal>
        </React.Fragment>
      )}
    </React.Fragment>
  );

  if (!dialogContent) {
    return <View style={[styles.tile, style]}>{content}</View>;
  } else {
    return (
      <TouchableScale
        activeScale={S.dimensions.touchableScale}
        style={[styles.tile, style]}
        onPress={toggleDialog}
      >
        {content}
      </TouchableScale>
    );
  }
}

VenueTile.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  iconId: PropTypes.string.isRequired,
  dialogContent: PropTypes.element,
};

function VenueTiles({
  facilities = [],
  dresscode,
  fees = {},
  entranceFeeRange,
  paymentMethods = [],
  capacityRange,
  doorPolicy = {},
  currency,
}) {
  const [width, setWidth] = useState(0);

  const onLayout = ({
    nativeEvent: {
      layout: { width },
    },
  }) => setWidth(width);

  const tiles = [];

  const terraceHeaters = facilities.includes(
    VENUE_FACILITIES.FACILITY_TERRACE_HEATERS
  );
  if (
    facilities.includes(VENUE_FACILITIES.FACILITY_TERRACE) ||
    terraceHeaters
  ) {
    tiles.push({
      title: __('venueScreen.tiles.terrace'),
      subtitle: terraceHeaters
        ? __('venueScreen.tiles.terraceHeated')
        : __('yes'),
      iconId: 'terrace',
    });
  }

  if (entranceFeeRange) {
    let subtitle = getSymbolForCurrency(currency);
    if (entranceFeeRange.length !== 1) {
      subtitle += entranceFeeRange.join('-');
    } else {
      subtitle += `${entranceFeeRange}+`;
    }
    tiles.push({
      title: __('venueScreen.tiles.entranceFee'),
      iconId: 'entrance_fee',
      subtitle,
    });
  }

  if (doorPolicy.policy || doorPolicy.description) {
    const subtitle = doorPolicy.policy
      ? __(`venueScreen.tiles.doorPolicy${_.pascalCase(doorPolicy.policy)}`)
      : __('venueScreen.tiles.doorPolicyNonStrict');
    const tile = {
      title: __('venueScreen.tiles.doorPolicy'),
      iconId: 'doorpolicy',
      subtitle,
    };
    if (doorPolicy.description) {
      Object.assign(tile, {
        dialogTitle: __('venueScreen.tiles.doorPolicy'),
        dialogContent: (
          <Text style={styles.doorPolicyDescription}>
            {_o(doorPolicy.description)}
          </Text>
        ),
      });
    }
    tiles.push(tile);
  }

  if (dresscode) {
    tiles.push({
      title: __('venueScreen.tiles.dresscode'),
      iconId: 'dresscode',
      subtitle: __(`venueScreen.tiles.dresscode${_.pascalCase(dresscode)}`),
    });
  }

  if (facilities.includes(VENUE_FACILITIES.FACILITY_KITCHEN)) {
    tiles.push({
      title: __('venueScreen.tiles.kitchen'),
      subtitle: __('yes'),
      iconId: 'kitchen',
    });
  }

  if (facilities.includes(VENUE_FACILITIES.FACILITY_COAT_CHECK)) {
    let subtitle = __('yes');
    if (fees.coatCheck) {
      subtitle = __('venueScreen.tiles.coatCheckFee', {
        fee: formatAmount(fees.coatCheck, currency, 2, true),
      });
    }
    tiles.push({
      title: __('venueScreen.tiles.coatCheck'),
      iconId: 'coat_check',
      subtitle,
    });
  }

  if (capacityRange) {
    let subtitle = capacityRange.join('-');
    if (capacityRange.length === 1) {
      subtitle = '10.000+';
    }
    tiles.push({
      title: __('venueScreen.tiles.capacity'),
      iconId: 'capacity',
      subtitle: subtitle,
    });
  }

  if (facilities.includes(VENUE_FACILITIES.FACILITY_BOUNCERS)) {
    tiles.push({
      title: __('venueScreen.tiles.bouncers'),
      subtitle: __('yes'),
      iconId: 'bouncers',
    });
  }

  if (paymentMethods.length) {
    const subtitle = paymentMethods
      .map(method =>
        __(`venueScreen.tiles.paymentMethod${_.pascalCase(method)}`)
      )
      .join(', ');
    tiles.push({
      title: __('venueScreen.tiles.payment'),
      iconId: 'payment',
      subtitle,
    });
  }

  if (facilities.includes(VENUE_FACILITIES.FACILITY_PARKING)) {
    tiles.push({
      title: __('venueScreen.tiles.parking'),
      subtitle: __('yes'),
      iconId: 'parking',
    });
  }

  const hasSmokingArea = facilities.includes(
    VENUE_FACILITIES.FACILITY_SMOKING_AREA
  );
  const sellsPacks = facilities.includes(VENUE_FACILITIES.FACILITY_CIGARETTES);
  if (hasSmokingArea || sellsPacks) {
    let subtitle;
    if (hasSmokingArea && sellsPacks) {
      subtitle = __('venueScreen.tiles.smokingYesAndForSale');
    } else if (hasSmokingArea) {
      subtitle = __('yes');
    } else if (sellsPacks) {
      subtitle = __('venueScreen.tiles.smokingPacksForSale');
    }
    tiles.push({
      title: __('venueScreen.tiles.smoking'),
      iconId: 'cigarettes',
      subtitle,
    });
  }

  if (facilities.includes(VENUE_FACILITIES.FACILITY_VIP)) {
    tiles.push({
      title: __('venueScreen.tiles.vipArea'),
      subtitle: __('yes'),
      iconId: 'vip',
    });
  }

  if (facilities.includes(VENUE_FACILITIES.FACILITY_ACCESSIBLE)) {
    tiles.push({
      title: __('venueScreen.tiles.accessibleBuilding'),
      subtitle: __('yes'),
      iconId: 'accessible',
    });
  }

  if (!tiles.length) {
    return null;
  }

  const size = Math.floor((width - 6 * styles.tile.margin) / 3);

  return (
    <Section>
      <View onLayout={onLayout} style={styles.container}>
        {!!width &&
          tiles.map(props => (
            <VenueTile
              key={props.iconId}
              style={{
                width: size,
                height: size,
              }}
              {...props}
            />
          ))}
      </View>
    </Section>
  );
}

VenueTiles.propTypes = {
  facilities: PropTypes.arrayOf(PropTypes.string),
  dresscode: PropTypes.string,
  paymentMethods: PropTypes.arrayOf(PropTypes.string),
  capacityRange: PropTypes.array,
  entranceFeeRange: PropTypes.array,
  doorPolicy: PropTypes.shape({
    policy: PropTypes.string,
    description: PropTypes.object,
  }),
};

export default VenueTiles;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: -5,
    paddingVertical: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  tile: {
    margin: S.dimensions.tile.margin,
    backgroundColor: S.colors.elevatedBgColor,
    borderRadius: S.dimensions.tile.borderRadius,
    padding: S.dimensions.tile.padding,
  },
  tileInfoIcon: {
    position: 'absolute',
    right: S.dimensions.tile.padding,
    top: S.dimensions.tile.padding,
  },
  tileIcon: {
    height: 30,
    width: 30,
    resizeMode: 'center',
  },
  tileTitle: {
    fontWeight: '700',
    lineHeight: 16,
    justifyContent: 'flex-end',
  },
  tileSubtitle: {
    lineHeight: 16,
    marginTop: 4,
  },
  tileTextContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  doorPolicyDescription: {
    ...S.text.paragraph,
  },
});
