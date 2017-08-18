export default function (content) {
  const regex = /^\d+\.\d+\.\d+$/;

  if (!regex.test(content)) {
    return null;
  }

  const version = content.split('.');

  const minor = Number(version.pop());
  const major = Number(version.pop());
  const release = Number(version.pop());

  return {
    release,
    major,
    minor,
  };
}
