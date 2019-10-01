import seperateArgsFromContent from '../seperateArgsFromContent';

describe('seperateArgsFromContent', () => {
  const wordBank = [
    'there',
    'is',
    'some',
    'reallly',
    'long',
    'content',
    'here',
  ];

  const combineWords = (numWords: number, numSpaces: number) => {
    let ret = '';
    for (let i = 0; i < numWords && i < wordBank.length; i += 1) {
      ret += wordBank[i];
      if (i !== numWords - 1 && i !== wordBank.length - 1) {
        ret += ' '.padEnd(numSpaces);
      }
    }
    return ret;
  };

  it('should return the correct arguments, and content when there are excess words', () => {
    const phrase = combineWords(4, 1);
    const res = seperateArgsFromContent(phrase, 2);
    expect(res.argArray).toEqual([wordBank[0], wordBank[1]]);
    expect(res.contentText).toEqual(`${wordBank[2]} ${wordBank[3]}`);
  });

  it('should return correct arguements, and content when zero args are asked for', () => {
    const phrase = combineWords(4, 1);
    const res = seperateArgsFromContent(phrase, 0);
    expect(res.argArray).toEqual([]);
    expect(res.contentText).toEqual(`${wordBank[0]} ${wordBank[1]} ${wordBank[2]} ${wordBank[3]}`);
  });

  it('should return correct arguments, and content when not enough args are supplied', () => {
    const phrase = combineWords(3, 1);
    const res = seperateArgsFromContent(phrase, 5);
    expect(res.argArray).toEqual([wordBank[0], wordBank[1], wordBank[2]]);
    expect(res.contentText).toEqual('');
  });

  it('should return correct arguments, when exact args are supplied', () => {
    const phrase = combineWords(3, 1);
    const res = seperateArgsFromContent(phrase, 3);
    expect(res.argArray).toEqual([wordBank[0], wordBank[1], wordBank[2]]);
    expect(res.contentText).toEqual('');
  });

  it('should return safe values when there is an empty string', () => {
    const res = seperateArgsFromContent('', 3);
    expect(res.argArray).toEqual([]);
    expect(res.contentText).toEqual('');
  });

  it('should return correct values when there is only one word, and one argument', () => {
    const res = seperateArgsFromContent(wordBank[1], 1);
    expect(res.argArray).toEqual([wordBank[1]]);
    expect(res.contentText).toEqual('');
  });

  it('should return correct values when there is only one word, and no arguments', () => {
    const res = seperateArgsFromContent(wordBank[1], 0);
    expect(res.argArray).toEqual([]);
    expect(res.contentText).toEqual(wordBank[1]);
  });

  it('should return correct values when words are only one character long', () => {
    const phrase = 'a b c';
    const res = seperateArgsFromContent(phrase, 2);
    expect(res.argArray).toEqual(['a', 'b']);
    expect(res.contentText).toEqual('c');
  });

  it('should return correct values when space is added to the front of the message', () => {
    const phrase = `   ${combineWords(3, 1)}`;
    const res = seperateArgsFromContent(phrase, 3);
    expect(res.argArray).toEqual([wordBank[0], wordBank[1], wordBank[2]]);
    expect(res.contentText).toEqual('');
  });

  it('should return correct values when space is added to the end of the message', () => {
    const phrase = `${combineWords(3, 1)}     `;
    const res = seperateArgsFromContent(phrase, 3);
    expect(res.argArray).toEqual([wordBank[0], wordBank[1], wordBank[2]]);
    expect(res.contentText).toEqual('');
  });

  it('should return correct values when words are spaced far apart, and there are excess words', () => {
    const phrase = combineWords(4, 5);
    const res = seperateArgsFromContent(phrase, 2);
    expect(res.argArray).toEqual([wordBank[0], wordBank[1]]);
    expect(res.contentText).toEqual(`${wordBank[2]}     ${wordBank[3]}`);
  });

  it('should return correct values when words are spaced far apart, and there are no args asked for', () => {
    const phrase = combineWords(4, 3);
    const res = seperateArgsFromContent(phrase, 0);
    expect(res.argArray).toEqual([]);
    expect(res.contentText).toEqual(`${wordBank[0]}   ${wordBank[1]}   ${wordBank[2]}   ${wordBank[3]}`);
  });

  it('should return correct arguments, and content when not enough args are supplied, and words are spaced', () => {
    const phrase = combineWords(3, 3);
    const res = seperateArgsFromContent(phrase, 5);
    expect(res.argArray).toEqual([wordBank[0], wordBank[1], wordBank[2]]);
    expect(res.contentText).toEqual('');
  });

  it('should return correct arguments, when exact args are supplied, and words are spaced', () => {
    const phrase = combineWords(3, 3);
    const res = seperateArgsFromContent(phrase, 3);
    expect(res.argArray).toEqual([wordBank[0], wordBank[1], wordBank[2]]);
    expect(res.contentText).toEqual('');
  });
});
