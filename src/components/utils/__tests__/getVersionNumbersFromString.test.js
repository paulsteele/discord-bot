import getVersionNumbersFromString from '../getVersionNumbersFromString';

const formString = (release, major, minor) => (
  `${release}.${major}.${minor}`
);

describe('getVersionNumbersFromString', () => {
  it('should correctly parse a valid string', () => {
    const version = {
      release: 1,
      major: 2,
      minor: 3,
    };
    const testString = formString(version.release, version.major, version.minor);

    expect(getVersionNumbersFromString(testString)).toMatchObject(version);
  });

  it('should correctly parse a valid string with multiple digits in each spot', () => {
    const version = {
      release: 1324,
      major: 223434,
      minor: 634563,
    };
    const testString = formString(version.release, version.major, version.minor);

    expect(getVersionNumbersFromString(testString)).toMatchObject(version);
  });

  it('should return null on an invalid string', () => {
    const version = null;
    const testString = 'Something Else';

    expect(getVersionNumbersFromString(testString)).toEqual(version);
  });

  it('should return null on an invalid string of size 2', () => {
    const version = null;
    const testString = '1.2.';

    expect(getVersionNumbersFromString(testString)).toEqual(version);
  });

  it('should return null on an invalid string of size 4', () => {
    const version = null;
    const testString = '1.2.3.4';

    expect(getVersionNumbersFromString(testString)).toEqual(version);
  });

  it('should return null on a null input', () => {
    const version = null;
    const testString = null;

    expect(getVersionNumbersFromString(testString)).toEqual(version);
  });
});
