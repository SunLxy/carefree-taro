/**
 * padding  按照 size/10 计算
 * borderRadius 先按照 宽高的一半计算
 * **/

/**
 * @description: 内部背景区域
 * @param {string} size 设置的大小
 * @param {number} borderWidth 边框宽度
 * @param {number} magnification 圆角倍率 用于计算圆角(宽/倍率)
 * @return {*}
 */
export const getCircleBgSize = (
  size: string | number,
  borderWidth: number = 1,
  magnification: number = 2,
) => {
  let width = 26;
  let height = 26;

  // 根据 size 计算 宽度和高度
  if (typeof size === 'string') {
    const num = parseInt(size);
    if (!isNaN(num)) {
      width = height = num - 2 * borderWidth - (num / 10) * 2;
    }
  }
  if (typeof size === 'number') {
    width = height = size - 2 * borderWidth - (size / 10) * 2;
  }
  return {
    width: `${width}px`,
    height: `${height}px`,
    borderRadius: `${width / magnification}px`,
  };
};

/**
 * @description: 最外层包裹区域
 * @param {string} size 设置的大小
 * @param {number} borderWidth  边框宽度
 * @param {number} magnification  圆角倍率 用于计算圆角(宽/倍率)
 * @return {*}
 */
export const getCircleSize = (
  size: string | number,
  borderWidth: number = 1,
  magnification: number = 2,
) => {
  let widthHeight = size;
  let borderRadius = 10;
  let padding = 2;
  if (typeof size === 'number') {
    widthHeight = `${size}px`;
    borderRadius = size / magnification;
    padding = size / 10;
  }
  if (typeof size === 'string') {
    const num = parseInt(size);
    if (!isNaN(num)) {
      borderRadius = num / magnification;
      padding = num / 10;
    }
  }

  return {
    width: widthHeight,
    height: widthHeight,
    borderWidth: `${borderWidth}px`,
    borderRadius: `${borderRadius}px`,
    padding: `${padding}px`,
  };
};
