import { fromJS, List } from 'immutable';
import * as _ from 'lodash';
import * as analyticsUtils from '../../app/analytics/AnalyticsUtils';

describe('Test getCurrentProductCodeAndCategory', () => {
  test('It should return a valid product code and category', () => {
    const productProperties = analyticsUtils.getCurrentProductCodeAndCategory(goodProduct);
    expect(productProperties).toHaveProperty('prodCode', '464678');
    expect(productProperties).toHaveProperty('prodCategory', 'Ombrelloni da bagno');
    expect(Object.keys(productProperties).length).toBe(2);
  });

  test('It should return default value for product code and category', () => {
    const productProperties = analyticsUtils.getCurrentProductCodeAndCategory(badProduct);
    expect(productProperties).toHaveProperty('prodCode', 0);
    expect(productProperties).toHaveProperty('prodCategory', '');
    expect(Object.keys(productProperties).length).toBe(2);
  });
});

describe('Test normalizeProductClickLayer', () => {
  const prodList = List().push('gallery-prodotto > Ombrelloni da bagno/Ombrellone');
  const index = List().push(2);

  test('It should return a normalized layer with and without some values', () => {
    const normalizedLayer = analyticsUtils.normalizeProductClickLayer(
      productLayer,
      2,
      goodProduct.get('464678'),
      ['catalogue']
    );
    expect(normalizedLayer.get(analyticsUtils.LABEL.PROD_POSITION)).toEqual(index);
    expect(normalizedLayer.get(analyticsUtils.LABEL.PROD_LIST)).toEqual(prodList);
    expect(normalizedLayer.get(analyticsUtils.LABEL.PROD_BUNDLE)).toBeUndefined();
    expect(normalizedLayer.get(analyticsUtils.LABEL.PROD_GAMMA)).toBeUndefined();
    expect(normalizedLayer.get(analyticsUtils.LABEL.PROD_NEW)).toBeUndefined();
    expect(normalizedLayer.get(analyticsUtils.LABEL.PROD_VARIANT)).toBeUndefined();
    expect(normalizedLayer.get(analyticsUtils.LABEL.PROD_PUNTI_OMAGGIO)).toBeDefined();
    expect(normalizedLayer.get(analyticsUtils.LABEL.PROD_IDEAPIU)).toBeDefined();
  });

  test('...', () => {
    productLayer.delete(analyticsUtils.LABEL.PROD_BUNDLE);

    const normalizedLayer = analyticsUtils.normalizeProductClickLayer(
      productLayer,
      2,
      goodProduct.get('464678'),
      ['catalogue']
    );
    expect(normalizedLayer.get(analyticsUtils.LABEL.PROD_POSITION)).toEqual(index);
    expect(normalizedLayer.get(analyticsUtils.LABEL.PROD_LIST)).toEqual(prodList);
    expect(normalizedLayer.get(analyticsUtils.LABEL.PROD_BUNDLE)).toBeUndefined();
    expect(normalizedLayer.get(analyticsUtils.LABEL.PROD_GAMMA)).toBeUndefined();
    expect(normalizedLayer.get(analyticsUtils.LABEL.PROD_NEW)).toBeUndefined();
    expect(normalizedLayer.get(analyticsUtils.LABEL.PROD_VARIANT)).toBeUndefined();
    expect(normalizedLayer.get(analyticsUtils.LABEL.PROD_PUNTI_OMAGGIO)).toBeDefined();
    expect(normalizedLayer.get(analyticsUtils.LABEL.PROD_IDEAPIU)).toBeDefined();
  });
});

describe('Test buildReleaseVersion', () => {
  test('it should return snake case of worldName + package version', () => {
    const release = analyticsUtils.buildReleaseVersion('Fake World Name');
    expect(_.startsWith(release, 'fake_world_name')).toBeTruthy();
  });

  test('it should return snake case of default worldName value', () => {
    const release = analyticsUtils.buildReleaseVersion();
    expect(_.startsWith(release, '')).toBeTruthy();
  });
});

describe('Test clearFilters', () => {
  test('should reset filter dataLayer with provided productsNumber', () => {
    const filterLayer = analyticsUtils.clearFilters(productLayer, 8);

    expect(filterLayer.get(analyticsUtils.LABEL.FILTER_VALUE)).toBe(List());
    expect(filterLayer.get(analyticsUtils.LABEL.FILTER_NAME)).toBe(List());
    expect(filterLayer.get(analyticsUtils.LABEL.FILTER_RESULT)).toBe('8');
  });

  test('should reset filter dataLayer with default productsNumber', () => {
    const filterLayer = analyticsUtils.clearFilters(productLayer);

    expect(filterLayer.get(analyticsUtils.LABEL.FILTER_VALUE)).toBe(List());
    expect(filterLayer.get(analyticsUtils.LABEL.FILTER_NAME)).toBe(List());
    expect(filterLayer.get(analyticsUtils.LABEL.FILTER_RESULT)).toBe('0');
  });
});


const goodProduct = fromJS({
  464678: {
    code: '464678',
    mainCategoryName: 'Ombrelloni da bagno',
    mainCategory: 'Ombrellone'
  }
});

const badProduct = fromJS({});

const productLayer = fromJS({
  [analyticsUtils.LABEL.PROD_BUNDLE]: '0',
  [analyticsUtils.LABEL.PROD_GAMMA]: 'A',
  [analyticsUtils.LABEL.PROD_NEW]: '1',
  [analyticsUtils.LABEL.PROD_VARIANT]: '1',
  [analyticsUtils.LABEL.PROD_PUNTI_OMAGGIO]: '1',
  [analyticsUtils.LABEL.PROD_IDEAPIU]: '0',
  [analyticsUtils.LABEL.FILTER_VALUE]: ['bagno', 'cucina'],
  [analyticsUtils.LABEL.FILTER_NAME]: ['SVF04040', 'SVF04040'],
  [analyticsUtils.LABEL.FILTER_RESULT]: 5
});
