import Version from '../Version';

const formString = (release: number, major: number, minor: number) => (
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

    expect(new Version(testString)).toMatchObject(version);
  });

  it('should correctly parse a valid string with multiple digits in each spot', () => {
    const version = {
      release: 1324,
      major: 223434,
      minor: 634563,
    };
    const testString = formString(version.release, version.major, version.minor);

    expect(new Version(testString)).toMatchObject(version);
  });

  it('should return null on an invalid string', () => {
    const version = null;
    const testString = 'Something Else';

    expect(new Version(testString)).toEqual(version);
  });

  it('should return null on an invalid string of size 2', () => {
    const version = null;
    const testString = '1.2.';

    expect(new Version(testString)).toEqual(version);
  });

  it('should return null on an invalid string of size 4', () => {
    const version = null;
    const testString = '1.2.3.4';

    expect(new Version(testString)).toEqual(version);
  });
});
