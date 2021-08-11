const InterpolateRegex = /<%=([\s\S]+?)%>/g;
const CommentRegex = /<%#([\s\S]+?)%>/g;

type TokenType = 'content' | 'interpolate' | 'comment';

export type Token = {
  type: TokenType;
  value: string;
};

const tokenizer = (source: TemplateStringsArray, ...args: string[]) => {
  const reExpressions = [CommentRegex, InterpolateRegex];
  const reDelimiters = RegExp(
    reExpressions.map((x) => x.source).join('|') + '|$',
    'g'
  );

  const increment = reExpressions.length + 1;

  console.log({ reDelimiters });
  const tokenized = source[0].split(reDelimiters).filter((token) => token);

  for (let i = 0; i < tokenized.length; i += increment) {
    const [content, escape, comment, interpolate, evaluate] = tokenized.slice(
      i,
      i + increment
    );
    console.log({ content, escape, comment, interpolate, evaluate });
  }

  return tokenized;
};
export default tokenizer;
