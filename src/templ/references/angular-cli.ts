// Users/hj.song/ghq/github.com/angular/angular-cli/packages/angular_devkit/core/src/utils/template.ts

/**
 * Given a source text (and a fileName), returns a TemplateAst.
 */
export function templateParser(
  sourceText: string,
  fileName: string
): TemplateAst {
  const children = [];

  // Compile the regexp to match each delimiter.
  const reExpressions = [kEscapeRe, kCommentRe, kInterpolateRe, kEvaluateRe];
  const reDelimiters = RegExp(
    reExpressions.map((x) => x.source).join('|') + '|$',
    'g'
  );

  const parsed = sourceText.split(reDelimiters);
  let offset = 0;
  // Optimization that uses the fact that the end of a node is always the beginning of the next
  // node, so we keep the positioning of the nodes in memory.
  let start = _positionFor(sourceText, offset);
  let end: Position | null;

  const increment = reExpressions.length + 1;
  for (let i = 0; i < parsed.length; i += increment) {
    const [content, escape, comment, interpolate, evaluate] = parsed.slice(
      i,
      i + increment
    );
    if (content) {
      end = _positionFor(sourceText, offset + content.length);
      offset += content.length;
      children.push({
        kind: 'content',
        content,
        start,
        end,
      } as TemplateAstContent);
      start = end;
    }
    if (escape) {
      end = _positionFor(sourceText, offset + escape.length + 5);
      offset += escape.length + 5;
      children.push({
        kind: 'escape',
        expression: escape,
        start,
        end,
      } as TemplateAstEscape);
      start = end;
    }
    if (comment) {
      end = _positionFor(sourceText, offset + comment.length + 5);
      offset += comment.length + 5;
      children.push({
        kind: 'comment',
        text: comment,
        start,
        end,
      } as TemplateAstComment);
      start = end;
    }
    if (interpolate) {
      end = _positionFor(sourceText, offset + interpolate.length + 5);
      offset += interpolate.length + 5;
      children.push({
        kind: 'interpolate',
        expression: interpolate,
        start,
        end,
      } as TemplateAstInterpolate);
      start = end;
    }
    if (evaluate) {
      end = _positionFor(sourceText, offset + evaluate.length + 5);
      offset += evaluate.length + 5;
      children.push({
        kind: 'evaluate',
        expression: evaluate,
        start,
        end,
      } as TemplateAstEvaluate);
      start = end;
    }
  }

  return {
    fileName,
    content: sourceText,
    children,
  };
}
