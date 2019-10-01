
class Version {
  release: number = -1;
  major: number = -1;
  minor: number = -1;

  constructor(content: string) {
    // RELEASE.MAJOR.MINOR
    const regex = /^\d+\.\d+\.\d+$/;

    if (!regex.test(content)) {
      return;
    }

    const version = content.split('.');

    this.minor = Number(version.pop());
    this.major = Number(version.pop());
    this.release = Number(version.pop());
  }
}

export default Version;
