import {scale, normalize} from '../utils';

export const fontSizes = {
    xxSmall: normalize(7),
    extraSmall: normalize(8),
    small: normalize(10),
    medium: normalize(12),
    regular: normalize(14),
    big: normalize(16),
    large: normalize(18),
    extraLarge: normalize(20),
    xxLarge: normalize(22),
  };

export const appHeaderSize = normalize(24);
export const headerFontSize = normalize(36);

export const fontFamily = {
  bold: 'SF-Pro-Rounded-Bold',
  regular: 'SF-Pro-Rounded-Regular'
}