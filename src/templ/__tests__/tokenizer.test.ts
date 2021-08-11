import tokenizer from '../tokenizer';

type TokenType = 'content' | 'interpolate' | 'comment';

type Token = {
  type: TokenType;
  value: string;
};

const result: Token[] = [
  { type: 'content', value: '// 주석이다. \n        /**' },
  { type: 'comment', value: 'comment' },
  { type: 'content', value: '이 아닌가 */\n        const' },
  { type: 'interpolate', value: 'name' },
  { type: 'content', value: 'parser = () => {}' },
];

describe('Tokenizer', () => {
  it('정규식을 기준으로 토큰화한다.', () => {
    const tokens = tokenizer`
        // 주석이다. 
        /** <%# comment %>이 아닌가 */
        const <%= name %>parser = () => {}
    `;

    expect(tokens).toEqual(result);
  });
});
